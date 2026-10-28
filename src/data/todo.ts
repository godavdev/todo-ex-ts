import { z } from "zod"

export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export const todoSchema = z.object({
  id: z.uuid(),
  title: z.string().min(3, "Title is required"),
  description: z.string().optional(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
