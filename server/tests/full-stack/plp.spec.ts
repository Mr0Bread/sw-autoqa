import { expect, test } from "@playwright/test";

test("has products", async ({ page }) => {
	await page.goto("/");

	await expect(page.locator('a[href="/tech"]')).toBeVisible({ timeout: 10000 });

	await page.locator('a[href="/tech"]').click();

	await expect(
		page.locator('[data-testid="product-playstation-5"]'),
	).toBeVisible({ timeout: 10000 });
	await expect(page.getByText("PlayStation 5")).toBeVisible({ timeout: 10000 });
	await expect(page.getByText("844.02", { exact: false })).toBeVisible({
		timeout: 10000,
	});
});

test("product can redirect to PDP", async ({ page }) => {
	await page.goto("/");

	await expect(page.locator('a[href="/tech"]')).toBeVisible({ timeout: 10000 });

	await page.locator('a[href="/tech"]').click();

	await expect(
		page.locator('[data-testid="product-playstation-5"]'),
	).toBeVisible({ timeout: 10000 });

	await page.locator('[data-testid="product-playstation-5"]').click();

	await expect(page.getByText("PlayStation 5", { exact: true })).toBeVisible({ timeout: 10000 });
	await expect(page.getByText("844.02", { exact: false })).toBeVisible({
		timeout: 10000,
	});
});
