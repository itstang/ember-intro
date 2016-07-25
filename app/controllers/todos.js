import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createTodo(newTask) {
      console.log(newTask);
      let todo = this.store.createRecord('todo', {
        task: newTask,
        isComplete: false
      });

      todo.save();
    }
  }
});
