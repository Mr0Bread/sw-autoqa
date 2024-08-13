import { execSync } from "child_process";
import path from "node:path";
import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import * as fsp from "fs/promises";
import { Piscina } from 'piscina';

const PORT = 8080;
const HOST = "0.0.0.0";

const piscina = new Piscina({
	// The URL must be a file:// URL
	filename: new URL('./worker.mjs', import.meta.url).href
});

async function log(message: string){
	const logDir = `${import.meta.dirname}/../var/log`;
	// create log dir if not exists
	await fsp.mkdir(logDir, { recursive: true });

	const logFile = `${import.meta.dirname}/../var/log/log.txt`;
	// log to file
	await fsp.appendFile(logFile, `[${new Date().toISOString()}]: ${message}\n`);
}

function deltaToMs({
	days = 0,
	hours = 0,
	minutes = 0,
	seconds = 0,
}: {
	days?: number;
	hours?: number;
	minutes?: number;
	seconds?: number;
}) {
	return (
		days * 24 * 60 * 60 * 1000 +
		hours * 60 * 60 * 1000 +
		minutes * 60 * 1000 +
		seconds * 1000
	);
}

async function deleteStaleReports(deltaAsMs: number) {
	const reportOutputDir = `${import.meta.dirname}/../reports`;
	const dirs = await fsp.readdir(reportOutputDir);

	for (const dir of dirs) {
		const dirPath = `${reportOutputDir}/${dir}`;
		const stats = await fsp.stat(dirPath);
		const mtime = stats.mtimeMs;
		const now = Date.now();

		if (now - mtime > deltaAsMs) {
			await fsp.rm(dirPath, { recursive: true });
		}
	}
}

// Delete stale reports once a day
setInterval(
	async () => {
		const deltaAsMs = deltaToMs({
			days: 30,
		});

		await deleteStaleReports(deltaAsMs);
	},
	deltaToMs({ days: 1 }),
);

const fastify = Fastify({
	logger: true,
}).withTypeProvider<JsonSchemaToTsProvider>();

fastify.register(FastifyStatic, {
	root: path.join(import.meta.dirname, "public"),
	prefix: "/public/",
});

fastify.register(FastifyStatic, {
	root: path.join(import.meta.dirname, "..", "reports"),
	prefix: "/reports/",
	decorateReply: false,
});

fastify.get("/", (req, res) => {
	res.sendFile("index.html");
});

fastify.post(
	"/submit-form",
	{
		schema: {
			body: {
				type: "object",
				properties: {
					testType: { type: "string" },
					linkToTest: { type: "string" },
				},
				required: ["testType", "linkToTest"],
			},
		},
	},
	async function (req, res) {
		const testType = req.body.testType;
		let testURL = req.body.linkToTest;

		if (!/^https?:\/\//.test(testURL)) testURL = "http://" + testURL;
		const url = new URL(testURL);

		// Generate report name
		const reportOwner = `${url.hostname.replace(/\./g, '-')}-${Date.now()}`;
		const reportOutputDir = `${import.meta.dirname}/../reports/${reportOwner}`;
		const testsDir = `${import.meta.dirname}/tests/${testType}`;
		const htmlOutputDirFlag = `PLAYWRIGHT_HTML_OUTPUT_DIR=${reportOutputDir}`;
		const baseTestURLFlag = `BASE_TEST_URL=${testURL}`;

		try {
			const command = `${htmlOutputDirFlag} ${baseTestURLFlag} npx playwright test ${testsDir}`;

			await piscina.run({ command });
		} catch (e) {
			if (e instanceof Error && e.stack) {
				void log(e.stack);
			}
		}

		// display report
		const reportFile = `/reports/${reportOwner}/index.html`;

		res.send({
			redirectUrl: reportFile,
		});
	},
);

try {
	void log(`Server is running: ${HOST}:${PORT}`);
	await fastify.listen({
		host: HOST,
		port: PORT,
	});
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
