function TestHomepage(){
    Scenario('Check homepage basic requirements ', ({ I }) => {
        I.amOnPage('/');
        I.click('MASS DELETE');
        I.click('ADD');
    });
}

function TestAddProductPage(){
    Scenario("Check product page basic requirements", ({ I }) => {
        I.amOnPage('/');
        I.click('ADD');
        I.seeElement('#product_form');
        I.seeElement('#sku');
        I.seeElement('#name');
        I.seeElement('#price');
        I.seeElement('#productType');
    });
}

Feature("Check if test requirements were met");

TestHomepage();
TestAddProductPage();