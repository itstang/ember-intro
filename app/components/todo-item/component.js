import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleTodo() {
      console.log(this);
      this.toggleProperty('todo.isComplete');
    }
  }
});
