import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StatusArgs } from './args/status.args';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { AggregationsType } from './types/aggregations.type';

@Resolver(()=>Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}
  @Query(() => [Todo], { name: 'todos' })
  findAll(
    @Args() status: StatusArgs,
  ): Todo[] {
    return this.todoService.findAll(status );
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }
  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Boolean, { name: 'deleteTodo' })
  deleteTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.deleteTodo(id);
  }

  @Query(()=>Int,{name:'completedTodos'})
  completedTodos():number{
    return this.todoService.completedTodos;
  }

  @Query(()=> AggregationsType) 
  aggregations():AggregationsType{
    return {
      total: this.todoService.completedTodos,
      completed: this.todoService.completedTodos,
      pending: this.todoService.completedTodos,
    }
  }
}
