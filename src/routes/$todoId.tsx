import { Button } from "#/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card"
import { deleteTodo, findTodo, toggleTodo } from "#/data/todos-data"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { TrashIcon } from "lucide-react"

export const Route = createFileRoute("/$todoId")({
  component: RouteComponent,
})

function RouteComponent() {
  const { todoId } = Route.useParams()

  const {
    data: todo,
    error,
    isPending,
  } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => findTodo({ data: { id: todoId } }),
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{todo.title}</CardTitle>
        <CardDescription>{todo.description}</CardDescription>
        <CardDescription>{todo.createdAt.toDateString()}</CardDescription>
        <CardDescription>{todo.updatedAt.toDateString()}</CardDescription>
      </CardHeader>
    </Card>
  )
}
