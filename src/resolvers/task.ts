import { Task } from "../entities/Task"
import { MyContext } from "../types"
import { Resolver, Query, Ctx, Int, Mutation, Arg } from "type-graphql"

@Resolver()
export class TaskResolver {
  // Queries all tasks
  @Query(() => [Task])
  async tasks(@Ctx() { em }: MyContext): Promise<Task[]> {
    return em.find(Task, {})
  }

  // Queries a single task by id
  @Query(() => Task, { nullable: true })
  async task(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Task | null> {
    return em.findOne(Task, { id })
  }

  // Creates a task
  @Mutation(() => Task)
  async createTask(
    @Arg("type", () => String) type: string,
    @Arg("location", () => String) location: string,
    @Arg("dueDate", () => Date) dueDate = new Date(),
    @Ctx() { em }: MyContext
  ): Promise<Task> {
    const task = em.create(Task, { type, location, dueDate })
    await em.persistAndFlush(task)
    return task
  }

  // Updates a task
  @Mutation(() => Task, { nullable: true })
  async updateTask(
    @Arg("id", () => Number) id: number,
    @Arg("type", () => String) type: string,
    @Arg("location", () => String) location: string,
    @Arg("dueDate", () => Date) dueDate = new Date(),
    @Ctx() { em }: MyContext
  ): Promise<Task | null> {
    const task = await em.findOne(Task, { id, type, location, dueDate })
    if (!task) {
      return null
    }
    task.type = type
    task.location = location
    task.dueDate = dueDate
    await em.persistAndFlush(task)
    return task
  }

  // Deletes a task
  @Mutation(() => Boolean)
  async deleteTask(
    @Arg("id", () => Number) id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    await em.nativeDelete(Task, { id })
    return true
  }
}
