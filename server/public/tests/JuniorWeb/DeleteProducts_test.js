function FindCustomProducts(){
    Scenario('Check all the Products checkboxes and delete products', ({ I }) => {
        I.amOnPage('/');
        I.seeElement('.delete-checkbox');
        I.executeScript(function(){
            checkboxes = document.getElementsByClassName('delete-checkbox');

            for (i=0; i<checkboxes.length;i++){
                checkboxes[i].checked=true;
            }
        });
        I.click("MASS DELETE");
    });

    Scenario('Check any existing products', ({ I }) => {
        I.amOnPage('/');
        I.waitForInvisible('.delete-checkbox');
    });
}

Feature("Delete all products");
FindCustomProducts();
