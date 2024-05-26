function TestCart() {
    Scenario('Check cart', ({ I }) => {
        I.amOnPage('/');
        I.waitForElement('a[href="/tech"]', 10);

        I.click('a[href="/tech"]');

        I.waitForElement('[data-testid="product-playstation-5"]', 10);

        I.click('[data-testid="product-playstation-5"]');

        I.waitForText('PlayStation 5', 10);

        I.waitForElement('[data-testid="product-attribute-color"]', 10);
        I.waitForElement('[data-testid="product-attribute-capacity"]', 10);

        I.waitForText('ADD TO CART', 10);

        I.waitForElement('[data-testid="add-to-cart"][disabled]', 10);

        I.click('[data-testid="product-attribute-color-Green"]');
        I.click('[data-testid="product-attribute-capacity-512G"]');

        I.waitForElement('[data-testid="add-to-cart"]:not(:disabled)', 10);

        I.click('[data-testid="add-to-cart"]');
        I.wait(1);

        I.waitForElement('[data-testid="cart-count-bubble"]', 10);
        I.see('1', { css: '[data-testid="cart-count-bubble"]' });

        I.click('[data-testid="cart-btn"]');

        I.waitForElement('[data-testid="cart-overlay"]', 10);

        I.waitForText('1 item', 10);

        I.waitForText('PlayStation 5', 10);
        I.waitForText('$ 844.02', 10);

        I.waitForElement('[data-testid="cart-item-attribute-color"]', 10);
        I.waitForElement('[data-testid="cart-item-attribute-color-Green-selected"]', 10);
        I.waitForElement('[data-testid="cart-item-attribute-capacity"]', 10);
        I.waitForElement('[data-testid="cart-item-attribute-capacity-512G-selected"]', 10);

        I.waitForElement('[data-testid="cart-item-amount-increase"]', 10);
        I.click('[data-testid="cart-item-amount-increase"]');

        I.waitForElement('[data-testid="cart-item-amount"]', 10);
        I.see('2', { css: '[data-testid="cart-item-amount"]' });

        I.waitForElement('[data-testid="cart-item-amount-decrease"]', 10);
        I.click('[data-testid="cart-item-amount-decrease"]');

        I.see('1', { css: '[data-testid="cart-item-amount"]' });

        I.waitForElement('[data-testid="cart-total"]', 10);

        I.see('844.02', { css: '[data-testid="cart-total"]' });

        I.waitForElement('[data-testid="place-order-btn"]', 10);

        I.click('[data-testid="cart-item-amount-decrease"]');

        I.waitForText('0 items', 10);
    });
}

Feature("Cart");

TestCart();
