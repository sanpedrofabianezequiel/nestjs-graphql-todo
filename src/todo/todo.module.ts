import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

@Module({
    imports: [],
    controllers: [],
    providers: [TodoResolver, TodoService],

})
export class TodoModule {}
