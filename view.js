class View {

    constructor() {

        // The root element
        this.app = this.getElement('#root');

        // The title of the app
        this.container = this.createElement('div');
        this.container2 = this.createElement('div');
        this.container3 = this.createElement('div');
        this.container4 = this.createElement('div');

        this.title = this.createElement('h1');
        this.title.className = 'mainTitle';
        this.title.textContent = 'DO';

        this.title2 = this.createElement('h1');
        this.title2.className = 'mainTitle';
        this.title2.textContent = 'DECIDE';

        this.title3 = this.createElement('h1');
        this.title3.className = 'mainTitle';
        this.title3.textContent = 'DELEGATE';

        this.title4 = this.createElement('h1');
        this.title4.className = 'mainTitle';
        this.title4.textContent = 'DELETE';

        // The form with a [type="text"] input and a submit button
        this.form = this.createElement('form');
        this.form2 = this.createElement('form');
        this.form3 = this.createElement('form');
        this.form4 = this.createElement('form');

        this.input = this.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Do it now.';
        this.input.name = 'todo';

        this.input2 = this.createElement('input');
        this.input2.type = 'text';
        this.input2.placeholder = 'Schedule a time to do it';
        this.input2.name = 'todo';

        this.input3 = this.createElement('input');
        this.input3.type = 'text';
        this.input3.placeholder = 'Who can do it for you?';
        this.input3.name = 'todo';

        this.input4 = this.createElement('input');
        this.input4.type = 'text';
        this.input4.placeholder = 'Eliminate it';
        this.input4.name = 'todo';

        this.submitButton = this.createElement('button');
        this.submitButton.textContent = 'Create';

        this.submitButton2 = this.createElement('button');
        this.submitButton2.textContent = 'Create';

        this.submitButton3 = this.createElement('button');
        this.submitButton3.textContent = 'Create';

        this.submitButton4 = this.createElement('button');
        this.submitButton4.textContent = 'Create';

        // The visual representation of the todo list
        this.todoList = this.createElement('ul', 'todo-list');
        this.todoList2 = this.createElement('ul', 'todo-list');
        this.todoList3 = this.createElement('ul', 'todo-list');
        this.todoList4 = this.createElement('ul', 'todo-list');

        // Append the input and submit button to the form
        this.form.append(this.input, this.submitButton);
        this.form2.append(this.input2, this.submitButton2);
        this.form3.append(this.input3, this.submitButton3);
        this.form4.append(this.input4, this.submitButton4);

        this.container.append(this.title, this.form, this.todoList)
        this.container2.append(this.title2, this.form2, this.todoList2)
        this.container3.append(this.title3, this.form3, this.todoList3)
        this.container4.append(this.title4, this.form4, this.todoList4)

        // Append the title, form, and todo list to the app
        this.app.append(this.container, this.container2, this.container3, this.container4 );
        

        //Editing the text
        this._temporaryTodoText;
        this._initLocalListeners();
    }

    /* Editing text logic */

    //Updating temporary state
    _initLocalListeners() {
        this.todoList.addEventListener('input', event => {
            if (event.target.className === 'editable') {
                this._temporaryTodoText = event.target.innerText;
            }
        })

        this.todoList2.addEventListener('input', event => {
            if (event.target.className === 'editable') {
                this._temporaryTodoText = event.target.innerText;
            }
        })
    }

    //Send the completed value to the model
    bindEditTodo(handler) {
        this.todoList.addEventListener('focusout', event => {
            if (this._temporaryTodoText) {
                const id = parseInt(event.target.parentElement.id);

                handler(id, this._temporaryTodoText);
                this._temporaryTodoText = ''
            }
        })

        this.todoList2.addEventListener('focusout', event => {
            if (this._temporaryTodoText) {
                const id = parseInt(event.target.parentElement.id);

                handler(id, this._temporaryTodoText);
                this._temporaryTodoText = ''
            }
        })
    }

    // Create an element with an optional CSS class
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);

        return element;
    }

    // Retrieve an element from the DOM
    getElement(selector) {
        const element = document.querySelector(selector);

        return element;
    }

    /* The getter and resetter of the input for manipulationg with values of "todo" array in Model */
    /* Underscores in the method names signify that they're local and cannot be used outside the class */

    get _todoText() {
        return this.input.value;
    }

    _resetInput() {
        this.input.value = '';
    }


    /* The displayTodos method will create the ul and lis that the todo list consists of, and display them. 
    Every time a todo is changed, added, or removed, the displayTodos method will be called again with the todos from the model,
    resetting the list and redisplaying them. This will keep the view in sync with the model state. */
    displayTodos(todos) {
        //Delete all nodes
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }

        while (this.todoList2.firstChild) {
            this.todoList2.removeChild(this.todoList2.firstChild);
        }

        while (this.todoList3.firstChild) {
            this.todoList3.removeChild(this.todoList3.firstChild);
        }

        while (this.todoList3.firstChild) {
            this.todoList3.removeChild(this.todoList3.firstChild);
        }

        //Showing default message
        if (todos.length === 0) {
            const p = this.createElement('p');
            p.textContent = 'Nothing to do! Add a task?';
            this.todoList.append(p)
        }   else {
            // Create todo items nodes for each todo in state
            todos.forEach(todo => {
                const li = this.createElement('li');
                li.id = todo.id;

                //Each todo item will have a checkbox you can toggle
                const checkbox = this.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.complete;

                //The todo items text will be in a contenteditable span
                const span = this.createElement('span');
                span.contentEditable = true;
                span.classList.add('editable');

                //If the todo is complete, it will havre a strikethrough
                if (todo.complete) {
                    const strike = this.createElement('s');
                    strike.textContent = todo.text;
                    span.append(strike);
                } else {
                    span.textContent = todo.text;
                }

                //The todos will also have a delete button
                const deleteButton = this.createElement('button', 'delete');
                deleteButton.textContent = 'Delete';
                li.append(checkbox, span, deleteButton);

                //Append nodes to the todo list
                this.todoList.append(li);
            })
        }
        if (todos.length === 0) {
            const p = this.createElement('p');
            p.textContent = 'Nothing to do! Add a task?';
            this.todoList2.append(p)
        }   else {
            // Create todo items nodes for each todo in state
            todos.forEach(todo => {
                const li = this.createElement('li');
                li.id = todo.id;

                //Each todo item will have a checkbox you can toggle
                const checkbox = this.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.complete;

                //The todo items text will be in a contenteditable span
                const span = this.createElement('span');
                span.contentEditable = true;
                span.classList.add('editable');

                //If the todo is complete, it will havre a strikethrough
                if (todo.complete) {
                    const strike = this.createElement('s');
                    strike.textContent = todo.text;
                    span.append(strike);
                } else {
                    span.textContent = todo.text;
                }

                //The todos will also have a delete button
                const deleteButton = this.createElement('button', 'delete');
                deleteButton.textContent = 'Delete';
                li.append(checkbox, span, deleteButton);

                //Append nodes to the todo list
                this.todoList2.append(li);
            })
        }
        if (todos.length === 0) {
            const p = this.createElement('p');
            p.textContent = 'Nothing to do! Add a task?';
            this.todoList3.append(p)
        }   else {
            // Create todo items nodes for each todo in state
            todos.forEach(todo => {
                const li = this.createElement('li');
                li.id = todo.id;

                //Each todo item will have a checkbox you can toggle
                const checkbox = this.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.complete;

                //The todo items text will be in a contenteditable span
                const span = this.createElement('span');
                span.contentEditable = true;
                span.classList.add('editable');

                //If the todo is complete, it will havre a strikethrough
                if (todo.complete) {
                    const strike = this.createElement('s');
                    strike.textContent = todo.text;
                    span.append(strike);
                } else {
                    span.textContent = todo.text;
                }

                //The todos will also have a delete button
                const deleteButton = this.createElement('button', 'delete');
                deleteButton.textContent = 'Delete';
                li.append(checkbox, span, deleteButton);

                //Append nodes to the todo list
                this.todoList3.append(li);
            })
        }
        if (todos.length === 0) {
            const p = this.createElement('p');
            p.textContent = 'Nothing to do! Add a task?';
            this.todoList4.append(p)
        }   else {
            // Create todo items nodes for each todo in state
            todos.forEach(todo => {
                const li = this.createElement('li');
                li.id = todo.id;

                //Each todo item will have a checkbox you can toggle
                const checkbox = this.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.complete;

                //The todo items text will be in a contenteditable span
                const span = this.createElement('span');
                span.contentEditable = true;
                span.classList.add('editable');

                //If the todo is complete, it will havre a strikethrough
                if (todo.complete) {
                    const strike = this.createElement('s');
                    strike.textContent = todo.text;
                    span.append(strike);
                } else {
                    span.textContent = todo.text;
                }

                //The todos will also have a delete button
                const deleteButton = this.createElement('button', 'delete');
                deleteButton.textContent = 'Delete';
                li.append(checkbox, span, deleteButton);

                //Append nodes to the todo list
                this.todoList4.append(li);
            })
        }
    }

    bindAddTodo (handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();

            if (this._todoText) {
                handler(this._todoText);
                this._resetInput();
            }
        });        
    }

    bindDeleteTodo (handler) {
        this.todoList.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.id);

                handler(id);
            }
        })
    }

    bindToggleTodo(handler) {
        this.todoList.addEventListener('change', event => {
            if (event.target.type === 'checkbox') {
                const id = parseInt(event.target.parentElement.id);

                handler(id);
            }
        })
    }
    

}