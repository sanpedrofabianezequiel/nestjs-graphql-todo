import { Injectable } from '@nestjs/common';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
    private todo : Todo[] = [
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
    
    findAll () : Todo[] {
        return this.todo;
    }

    findOne(id: number) : Todo {
        const todo = this.todo.find(todo => todo.id === id);
        if (!todo) throw new Error('Todo not found');
        return todo;
    }
}
