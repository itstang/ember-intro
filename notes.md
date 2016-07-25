# Intro to Ember Notes
## Important concepts/Introduction
1. Routes
- Models
  - API calls
  - Ember data
- Components
  - Handlebars
  - Computed properties
- ES6 vs ES5

## Prerequisites
1. Install homebrew:
  `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
2. Install Node/NPM: `brew install node`
3. Install the Ember-cli: `npm install -g ember-cli`
4. Install Bower, a package manager that keeps your front-end dependencies (including jQuery, Ember, and QUnit) up-to-date: `npm install -g bower`
5. Install Watchman: `brew install watchman`

## Hands-on Walkthrough for a Barebones Todo List
1. `$ ember new ember-intro`
- `$ ember g route index`
  * Edit *index.hbs* (add title)
- `$ ember g template application`
  * Edit *application.hbs* (add navigation)
- `$ ember g route todos`
  * Mention *router.js*
  * Edit *todos.hbs* (add title)
    * Add in HTML
  * Edit *routes/todos.js* (create a model instance)
  * Add model data into *todos.hbs*
    * include `<a>` tags
- `$ ember install ember-cli-mirage`
  * Add a route to *mirage/config.js*
  ```javascript
  this.get('/todos', () => {
    return {
      data: [{
        'type': 'todos',
        'id': 1,
        'attributes':   {
          'task': 'Buy milk',
          'is-complete': false
        }
      }]
    };
  });
  ```
- `$ ember g model todo`
  * Create model attributes in *models/todo.js*
  * Find model in *routes/todos.js* from the store
  * Ember magic
    * camelCase to dasherized magic (wtf)
    * `.findAll('todo')` will try to hit **/todos** unless otherwise specified by an adapter
- `$ ember g component todo-list --pod`
  * A dash is required for every component. Something to do with avoiding possible conflictions with HTML elements
  * `--pod` puts files together into one folder instead of split
  * Move the list to *todo-list/template.hbs*
  * Call the component from *todos.hbs* and pass in the model
- `$ ember g component todo-item --pod`
  * Move `<li></li>` from *todos.hbs* to the component *todo-item/template.hbs*
    * Add input component
      `{{input type="checkbox" checked=todo.isComplete class="toggle"}} `
    * `checked=todo.isComplete` automatically toggles the `todo.isComplete` property based on it being checked or not.
  * Modify *todo-list/template.hbs* accordingly to pass in the model data
  * Add action to `<a>` element to toggle completion property
- `$ ember g controller todos`
  * Create main action here `createTodo()`
    * Create Ember record
      ```javascript
      let todo = this.store.createRecord('todo', {
        task: newTask,
        isComplete: false
      });
      ```
    * Save record => Set up post request return in Mirage.
  * Pass action down to the component level (**COMPONENT NO LONGER NEEDS TO DEFINE ACTIONS!**)

## Example ES6 vs ES5 Differences
| ES6 | ES5 |
| --- | --- |
| `model() {}` | `model: function() {}` |
| `this.get('todo', () => {});` | `this.get('todo', function() {});` |
| `let model;` <br />Closure specific (if statement) <br /> Will not be global| `var model;` <br />Non-closure specific <br />Can be global|

## Random Notes
* `ember install ember-cli-mirage` is used for stubbing out data (useful for mocking out api calls)
* Current version of Ember no longer requires bubbling up of actions. Current version has closure actions or "bubble down".
