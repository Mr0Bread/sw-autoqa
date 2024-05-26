function TestProductPresence() {
    Scenario('Check product presence', ({ I }) => {
        I.amOnPage('/');
        I.waitForElement('a[href="/tech"]', 10);

        I.click('a[href="/tech"]');

        I.waitForElement('[data-testid="product-playstation-5"]', 10);

        I.see('PlayStation 5');
        I.see('$ 844.02');
    });
}

function TestProductToPDP() {
    Scenario('Check product redirect to PDP', ({ I }) => {
        I.amOnPage('/');
        I.waitForElement('a[href="/tech"]', 10);

        I.click('a[href="/tech"]');

        I.waitForElement('[data-testid="product-playstation-5"]', 10);

        I.click('[data-testid="product-playstation-5"]');

        I.waitForText('PlayStation 5', 10);
        I.see('PlayStation 5');
        I.see('$ 844.02');
    });
}

Feature("Product List Page");

TestProductPresence();
TestProductToPDP();
