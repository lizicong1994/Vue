const app = new Vue({
  el: '#app',
  data: {
    title: 'TO-DO Tasks',
    newTodo: '',
    newDue: '',
    newStatus: '',
    project: '',
    todos: [],
    index: -1,
    selectedCategory: "All"
  },
  methods: {
    addTodo() {
      this.todos.push({
        title: this.newTodo,
        due: this.newDue,
        status: this.newStatus,
        project: this.project,
        done: false
      });
      this.newTodo = '';
      this.newDue = '';
      this.newStatus = '';
      this.project = '';
      if(this.index === -1){this.index = -1;}
      else{
        this.todos.splice(this.index, 1);
        this.index = -1;
      }
    },
    removeTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos.splice(todoIndex, 1);
    },
    editTodo(todo) {
      this.newTodo = todo.title;
      this.newDue = todo.due;
      this.newStatus = todo.status;
      this.project = todo.project;
      this.done = todo.done;
      this.index = this.todos.indexOf(todo);

    },
  },
  computed: {
		filteredTask: function() {
			var app = this;
			var category = app.selectedCategory;

			if(category === "All") {
				return app.todos;
			} else {
				if(category === "true"){
          return app.todos.filter(function(todo){
            return todo.done === true;
          })
        }else{
          return app.todos.filter(function(todo){
            return todo.done === false;
          })
        }
			}
		}
	},

  mounted() {
    if (localStorage.getItem('todos')) this.todos = JSON.parse(localStorage.getItem('todos'));
  },
  watch: {
    todos: {
      handler() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
      },
      deep: true,
    },
  },

});
