
class Controller {
    constructor(model, view) {

        this.model = model;
        this.view = view;

        //Display initial todos
        this.onToDoListChanged(this.model.todos);

        //Binding Controller and View methods
        this.view.bindAddTodo(this.handleAddTodo);
        this.view.bindDeleteTodo(this.handleDeleteTodo);
        this.view.bindToggleTodo(this.handleToggleTodo);
        this.model.bindTodoListChanged(this.onToDoListChanged);
        this.view.bindEditTodo(this.handleEditTodo);
    }

    //This method is bound to the bindTodoListChanged() in the Model
    onToDoListChanged = todos => {
        this.view.displayTodos(todos);
    }

    // Handlers for the events in the controller.
    handleAddTodo = (todoText) => {
        this.model.addTodo(todoText);
    }

    handleEditTodo = (id, todoText) => {
        this.model.editTodo(id, todoText);
    }

    handleDeleteTodo = (id) => {
        this.model.deleteTodo(id);
    }

    handleToggleTodo = (id) => {
        this.model.toggleTodo(id);
    }

    
}

const app = new Controller(new Model(), new View());


