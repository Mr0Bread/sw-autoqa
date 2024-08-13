import { expect, test } from "@playwright/test";

test("has cart overlay working", async ({ page }) => {
	await page.goto("/");

	await expect(page.locator('a[href="/tech"]')).toBeVisible({ timeout: 10000 });

	await page.locator('a[href="/tech"]').click();

	await expect(
		page.locator('[data-testid="product-iphone-12-pro"]'),
	).toBeVisible({ timeout: 10000 });
	await expect(page.getByText("iPhone 12 Pro")).toBeVisible({ timeout: 10000 });

	await page.locator('[data-testid="product-iphone-12-pro"]').click();

	await expect(page.getByText("iPhone 12 Pro")).toBeVisible({ timeout: 10000 });

	const colorLocator = page
		.locator('[data-testid="product-attribute-color-#44FF03"]')
		.or(page.locator('[data-testid="product-attribute-color-Green"]'))
		.first();

	await expect(colorLocator).toBeVisible({ timeout: 10000 });

	const capacityLocator = page
		.locator('[data-testid="product-attribute-capacity-512G"]')
		.first();

	await expect(capacityLocator).toBeVisible({ timeout: 10000 });

	await colorLocator.click();
	await capacityLocator.click();

	await expect(page.getByText("ADD TO CART")).toBeVisible({ timeout: 10000 });

	await page.getByText("ADD TO CART").click();

	await expect(
		page.locator('[data-testid="cart-overlay"]'),
		"Expected cart overlay to open automatically once product is added",
	).toBeVisible({ timeout: 10000 });
});
