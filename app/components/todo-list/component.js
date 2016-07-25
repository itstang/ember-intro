import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createTodo(newTask) {
      this.set('newTask', '');
      this.attrs.createTodo(newTask);
    }
  },
  openTasks: Ember.computed('todos.@each.isComplete', function() {
    let todos = this.get('todos');
    return todos.filterBy('isComplete', false).get('length');
  })
});
