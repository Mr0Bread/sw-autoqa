# AutoQA
Prototype of AutoQA feature using CodeceptJS framework.

## File Structure
Application is isolated in docker configuration, which might be found in project root.

### BE
Server BE might be found in server/server.js file (sorry, I'm bad in app architecture)

### FE
FE is located in server/public/assets/ dir.

To compile scss use gulp command:
```bash
gulp sass
```

To add custom JS you might use new file or use existing app.js (bad practise).


## Add new test
Application supports multiple tests types. Prototype has only 1 - JuniorWeb.

To create new one:

1. Go to server/public/tests/
2. Create new folder
3. Put your testing scenarios there
4. Open index.html file
5. Find form select part and remove "disabled" attribute from
6. Add new option in form

## Edit existing tests
If you want to edit existing test behavior, please go to server/public/tests/{ NAME_OF_TEST } and see through all the scenarios.
To create new testing scenario just add new .js file in appropriate location.