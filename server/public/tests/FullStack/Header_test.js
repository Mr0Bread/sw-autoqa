// function TestHomepage(){
//     Scenario('Check homepage basic requirements ', ({ I }) => {
//         I.amOnPage('/');
//         I.click('MASS DELETE');
//         I.click('ADD');
//     });
// }
//
// function TestAddProductPage(){
//     Scenario("Check product page basic requirements", ({ I }) => {
//         I.amOnPage('/');
//         I.click('ADD');
//         I.seeElement('#product_form');
//         I.seeElement('#sku');
//         I.seeElement('#name');
//         I.seeElement('#price');
//         I.seeElement('#productType');
//     });
// }

function TestCategoryLinks() {
    Scenario('Check category links', ({ I }) => {
        I.amOnPage('/');



        I.waitForElement('a[href="/all"]', 2);
        I.waitForElement('a[href="/clothes"]', 2);
        I.waitForElement('a[href="/tech"]', 2);
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
    });
}


Feature("Validate Header");

TestCategoryLinks();
TestCartButton();
