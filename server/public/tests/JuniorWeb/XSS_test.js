function FillTheMainFormXSS(i){
    if (i){
        Scenario('Locate and fill the form with XSS', ({ I }) => {
            I.amOnPage('/');
            I.click('ADD');
            I.seeElement('#product_form');
            I.fillField('#sku', '<h1 id="html_injection">HTML Injection</h1>');
            I.fillField('#name', '<alert>JS Injection</alert>');
            I.fillField('#price', '25');
        });
    }
    else {
        Scenario('Locate and fill the form without XSS', ({ I }) => {
            I.amOnPage('/');
            I.click('ADD');
            I.seeElement('#product_form');
            I.fillField('#sku', 'SKUTest000');
            I.fillField('#name', 'NameTest000');
            I.fillField('#price', '25');
        });
    }
}

function FillTheFurnitureXSS(i){
    if (i){
        Scenario('Add a furtniture with invalid fields', ({ I }) => {
            I.amOnPage('/');
            I.click('ADD');
            I.waitForElement('#productType');
            I.selectOption('#productType','Furniture');
            I.waitForElement('#height');
            I.waitForElement('#width');
            I.waitForElement('#length');
            I.fillField('#height','free');
            I.fillField('#width','-5000');
            I.fillField('#length','2e');
            I.click('Save');
        });
    }
    else {
        Scenario('Add a valid furtniture part', ({ I }) => {
            I.amOnPage('/');
            I.click('ADD');
            I.waitForElement('#productType');
            I.selectOption('#productType','Furniture');
            I.waitForElement('#height');
            I.waitForElement('#width');
            I.waitForElement('#length');
            I.fillField('#height','<h1 id="html_injection">200</h1>');
            I.fillField('#width','200');
            I.fillField('#length','200');
            I.click('Save');
        });
    }
}

function CheckXSSProduct(){
    Scenario("Can not find injection", ({ I }) => {
        I.amOnPage('/');
        I.dontSeeElement('#html_injection');
    });
}

Feature("Add Products with XSS");

// Main form with XSS
FillTheMainFormXSS(true);
FillTheFurnitureXSS(false);

// Furniture form with XSS
FillTheMainFormXSS(false);
FillTheFurnitureXSS(true);

// Check if products exists
CheckXSSProduct();