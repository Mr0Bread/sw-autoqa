const { execSync } = require('child_process');
const path = require('node:path');
const express = require('express');
const { renderFile } = require('ejs');
const fsp = require('fs').promises;

const app = express();

const PORT = 8080;
const HOST = '0.0.0.0';

async function log(message){
  const logDir = `${__dirname}/var/log`;
  // create log dir if not exists
  await fsp.mkdir(logDir, { recursive: true });

  const logFile = `${__dirname}/var/log/log.txt`;
  // log to file
  await fsp.appendFile(logFile, `[${new Date().toISOString()}]: ${message}\n`);
}

function makeFileName(length) {
  let result           = '';
  let characters       = 'abcdefghi';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

process.on('uncaughtException', (err, origin) => {
  console.log(err);
});

process.on('SIGTERM', (err, origin) => {
  server.close();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.engine('html', renderFile);

app.post('/submit-form', function (req, res) {
  const testType = req.body.testType;
  let testURL = req.body.linkToTest;

  if (!/^https?:\/\//.test(testURL)) testURL = 'http://'+testURL;

  // Generate report name
  const reportName = (makeFileName(2));

  // Run codecept test
  try {
    const command = `npx codeceptjs run --config ${__dirname}/../codecept.conf.js --override '{ "tests": "${__dirname}/public/tests/${testType}/*_test.js", "helpers": {"WebDriver": {"url": "${testURL}" }}, "mocha": { "reporterOptions": { "reportFilename": "${reportName}" }}}' --reporter mochawesome`;

    execSync(command);
  }

  catch(e){
    // We log errors but we also get exception
    // in case of tests failure
    console.log(e);
    void log(e);
  }

  // Redirect to report
  res.redirect(`/open?testName=${reportName}`);
});

app.get('/open', function(req, res){
  let file = `${__dirname}/public/output/${req.query.testName}.html`;
  res.render(file);
});

console.log(`Server is running: ${HOST}:${PORT}`);
app.listen(PORT, HOST);
