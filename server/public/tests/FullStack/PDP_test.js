function TestProductDetails() {
    Scenario('Check product details', ({ I }) => {
        I.amOnPage('/');
        I.waitForElement('a[href="/tech"]', 10);

        I.click('a[href="/tech"]');

        I.waitForElement('[data-testid="product-playstation-5"]', 10);

        I.click('[data-testid="product-playstation-5"]');

        I.waitForText('PlayStation 5', 10);
        I.see('PlayStation 5');
        I.see('$ 844.02');

        I.waitForElement('[data-testid="product-attribute-color"]', 10);
        I.waitForElement('[data-testid="product-attribute-capacity"]', 10);

        I.waitForElement('[data-testid="product-gallery"]', 10);
        I.waitForElement('[data-testid="product-description"]', 10);

        I.waitForText('ADD TO CART', 10);

        I.waitForElement('[data-testid="add-to-cart"][disabled]', 10);

        I.click('[data-testid="product-attribute-color-#44FF03"]');
        I.click('[data-testid="product-attribute-capacity-512G"]');

        I.waitForElement('[data-testid="add-to-cart"]:not(:disabled)', 10);
    });
}

function TestAddToCart() {
    Scenario('Add to cart', ({ I }) => {
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
        I.click('[data-testid="cart-btn"]');

        I.waitForElement('[data-testid="cart-overlay"]', 10);

        I.waitForText('1 item', 10);
    });
}

Feature("Product Details Page");

TestProductDetails();
TestAddToCart();
