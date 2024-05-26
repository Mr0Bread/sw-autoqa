function TestCategoryLinks() {
    Scenario('Check category links', ({ I }) => {
        I.amOnPage('/');

        I.waitForElement('a[href="/all"]', 10);
        I.waitForElement('a[href="/clothes"]', 10);
        I.waitForElement('a[href="/tech"]', 10);

        I.waitForElement('[data-testid="active-category-link"]', 10);

        I.click('a[href="/clothes"]');

        I.waitForElement('a[href="/clothes"][data-testid="active-category-link"]', 10);
    });
}

function TestCartButton() {
    Scenario('Check cart button', ({ I }) => {
        I.amOnPage('/');
        I.waitForElement('[data-testid="cart-btn"]', 10);

        I.dontSeeElement('[data-testid="cart-overlay"]');

        I.click('[data-testid="cart-btn"]');

        I.waitForElement('[data-testid="cart-overlay"]', 10);
        I.seeElement('[data-testid="cart-overlay"]');

        I.click('[data-testid="cart-btn"]');

        I.dontSeeElement('[data-testid="cart-overlay"]');
    });
}


Feature("Validate Header");

TestCategoryLinks();
TestCartButton();
