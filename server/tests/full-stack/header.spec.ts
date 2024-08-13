import { expect, test } from "@playwright/test";

test("has category links", async ({ page }) => {
	await page.goto("/");

	await expect(page.locator('a[href="/all"]')).toBeVisible({ timeout: 10000 });
	await expect(page.locator('a[href="/clothes"]')).toBeVisible({
		timeout: 10000,
	});
	await expect(page.locator('a[href="/tech"]')).toBeVisible({ timeout: 10000 });

	await expect(
		page.locator('[data-testid="active-category-link"]'),
	).toBeVisible({ timeout: 10000 });

	await page.locator('a[href="/clothes"]').click();

	await expect(
		page.locator('a[href="/clothes"][data-testid="active-category-link"]'),
	).toBeVisible({ timeout: 10000 });
});

test("has cart button", async ({ page }) => {
	await page.goto("/");
	await expect(page.locator('[data-testid="cart-btn"]')).toBeVisible({
		timeout: 10000,
	});

	await expect(page.locator('[data-testid="cart-overlay"]')).toBeHidden({
		timeout: 10000,
	});

	await page.locator('[data-testid="cart-btn"]').click();

	await expect(page.locator('[data-testid="cart-overlay"]')).toBeVisible({
		timeout: 10000,
	});

	await page.locator('[data-testid="cart-btn"]').click();

	await expect(page.locator('[data-testid="cart-overlay"]')).toBeHidden({
		timeout: 10000,
	});
});
