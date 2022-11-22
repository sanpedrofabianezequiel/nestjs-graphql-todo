import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'This is a todo' })
export class AggregationsType {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  completed: number;

  @Field(() => Int,{deprecationReason:'This field is deprecated'})
  pending: number;
}
