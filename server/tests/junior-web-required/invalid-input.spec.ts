import { expect, test } from "@playwright/test";
import { deleteProducts } from "../../test-helpers/junior-web-common/helpers.js";

test("invalid input handling", async ({ page }) => {
	await deleteProducts(page);

	await page.goto("/", { timeout: 2000 });

	await expect(page.getByText("ADD")).toBeVisible({
		timeout: 10000,
	});

	await page.getByText("ADD").click();

	await expect(page.locator("#product_form")).toBeVisible({ timeout: 10000 });

	await page.locator("#sku").fill("SKUTest000");
	await page.locator("#name").fill("NameTest000");
	await page.locator("#price").fill("25");
	await page.locator("#productType").selectOption("DVD");

	// Locate but do not fill the size field
	await expect(page.locator("#size")).toBeVisible({ timeout: 10000 });

	await page.getByText("Save").click();

	await new Promise((resolve) => setTimeout(resolve, 5000));

	await page.goto("/");

	await expect(page.getByText("NameTest000")).toBeHidden({ timeout: 10000 });
});
