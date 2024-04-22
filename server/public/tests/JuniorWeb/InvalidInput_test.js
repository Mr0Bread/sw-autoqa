function FillTheFurniture(){
    Scenario('Add a furtniture with invalid inputs', ({ I }) => {
        I.amOnPage('/');
        I.click('ADD');
        I.seeElement('#product_form');
        I.fillField('#sku', 'InvalidInput');
        I.fillField('#name', 'InvalidName22');
        I.fillField('#price', 'E');
        I.selectOption('#productType','Book');
        I.fillField('#weight','E');
        I.click('Save');
    });
}

function CheckTheProduct(){
    Scenario("Can not find invalid product", ({ I }) => {
        I.amOnPage('/');
        I.dontSeeElement("Invalid_Input");
    });
}

Feature("Add Product with Invalid Input");

// Add Furniture
FillTheFurniture();

// Check product
CheckTheProduct();