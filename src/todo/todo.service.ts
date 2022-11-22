import { Injectable } from '@nestjs/common';
import { StatusArgs } from './args/status.args';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
    private todos : Todo[] = [
        {
            id: 1,
            description: 'Learn GraphQL',
            done: false
        },
        {
            id: 2,
            description: 'Learn Nest',
            done: false
        },
    ]

    get completedTodos() : number {
        return this.todos.length;
    }
    
    findAll (statusArgs:StatusArgs) : Todo[] {
        const {status} = statusArgs;
        if(status !== undefined) return this.todos.filter(todo => todo.done === status);
        return this.todos;
    }

    findOne(id: number) : Todo {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) throw new Error('Todo not found');
        return todo;
    }

    create(createTodoInput) : Todo {
        const todo =  new Todo();
        todo.description = createTodoInput.description;
        todo.id = this.todos.length + 1;
        todo.done = false;
        this.todos.push(todo);
        return todo;
    }

    update(updateTodoInput) : Todo {
        const {id,description,done} = updateTodoInput;
        const todoToUpdate =  this.findOne(id);
        if(description) todoToUpdate.description = description;
        if(done !== undefined) todoToUpdate.done = done;
        this.todos = this.todos.map(todo => todo.id === id ? todo : todo);
        return todoToUpdate;
    }

    deleteTodo(id: number): boolean {
        const todo = this.findOne(id);
        this.todos = this.todos.filter(todo => todo.id !== id);
        return true;
    }
}
