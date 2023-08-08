/*Model is storing and modifying data*/

class Model {

    constructor() {
        //The state of the model, an array of to do objects, prepolulated with some data
        this.todos = [];        

        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    }

    _commit(todos) {
        this.onToDoListChanged(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    /*The methods of Model class */

    addTodo(todoText) {
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: todoText,
            complete: false
        }

        this.todos.push(todo);
        this.onToDoListChanged(this.todos);

        this._commit(this.todos);
        
    }

    //Map through all todos, and replace the text of the todo with the specified id
    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? { id: todo.id, text: updatedText, complete: todo.complete } : todo,
        );
        this.onToDoListChanged(this.todos);

        this._commit(this.todos);

    }


    //Filter a todo out of the array by id
    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.onToDoListChanged(this.todos);
        
        this._commit(this.todos);

    }

    //Flip the complete boolean on the specified todo
    toggleTodo(id) {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete } : todo,
        )
        this.onToDoListChanged(this.todos);

        this._commit(this.todos);

    }

    //This method is bound to onTodoListChanged() in the Controller
    bindTodoListChanged(callback) {
        this.onToDoListChanged = callback;
    }
    

}