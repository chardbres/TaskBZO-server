import { Task } from '../entities/Task'
import { MyContext } from '../types'
import { Resolver, Query, Ctx, Int, Mutation, Arg } from 'type-graphql'

@Resolver()
export class TaskResolver {
    // Queries all tasks
    @Query(() => [Task])
    async tasks(@Ctx() {em}: MyContext): Promise<Task []> {
        return em.find(Task, {})
    }

    // Queries a single task by id
    @Query(() => Task, {nullable: true})
    async task(
        @Arg('id', () => Int) id: number,
        @Ctx() {em}: MyContext): Promise<Task | null> {
        return em.findOne(Task, { id })
    }

    // Creates a task
    @Mutation(() => Task)
    async createTask(
        @Arg('type') type: string,
        @Arg('location') location: string,
        @Arg('dueDate', () => Date) dueDate = new Date(),
        @Ctx() {em}: MyContext): Promise<Task> {
            const task = em.create(Task, {type, location, dueDate})
            await em.persistAndFlush(task)
            return task
    }
}