import { type Page, expect } from "@playwright/test";

export async function deleteProducts(page: Page) {
	await page.goto("/");

	const isProductPresent = await page
		.locator('input[type="checkbox"]')
		.isVisible({ timeout: 5000 });

	if (!isProductPresent) {
		return;
	}

	const checkboxes = await page.locator('input[type="checkbox"]').all();

	if (checkboxes.length === 0) {
		return;
	}

	for (const checkbox of checkboxes) {
		await checkbox.check();
	}

	await page.getByText("MASS DELETE").click();

	await expect(page.locator('input[type="checkbox"]').first()).toBeHidden({
		timeout: 10000,
	});
}
