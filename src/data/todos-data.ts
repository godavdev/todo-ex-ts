import { createServerFn } from "@tanstack/react-start"
import { todoSchema, type Todo } from "./todo"
import { prisma } from "#/lib/prisma"

export const createTodo = createServerFn()
  .validator(todoSchema.pick({ title: true, description: true }))
  .handler(async ({ data: { title, description } }) => {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
      },
    })
    return todo as Todo
  })

export const toggleTodo = createServerFn()
  .validator(todoSchema.pick({ id: true, completed: true }))
  .handler(async ({ data: { id, completed } }) => {
    const todo = await prisma.todo.update({
      where: { id },
      data: { completed },
    })
    return todo as Todo
  })

export const deleteTodo = createServerFn()
  .validator(todoSchema.pick({ id: true }))
  .handler(async ({ data: { id } }) => {
    const todo = await prisma.todo.delete({
      where: { id },
    })
    return todo as Todo
  })

export const listTodos = createServerFn({ method: "GET" }).handler(async () => {
  const todos = await prisma.todo.findMany()
  return todos as Todo[]
})

export const findTodo = createServerFn({ method: "GET" })
  .validator(todoSchema.pick({ id: true }))
  .handler(async ({ data: { id } }) => {
    const todo = await prisma.todo.findUniqueOrThrow({
      where: { id },
    })
    return todo as Todo
  })
