import type { Todo } from "#/data/todo"
import { deleteTodo, toggleTodo } from "#/data/todos-data"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "./ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { ArrowRightIcon, CheckIcon, TrashIcon, XIcon } from "lucide-react"
import { Link } from "@tanstack/react-router"

export const TodoCard = ({ title, description, completed, id }: Todo) => {
  const queryClient = useQueryClient()

  const onToggle = async () => {
    await toggleTodo({ data: { id, completed: !completed } })
    queryClient.invalidateQueries({ queryKey: ["todos"] })
  }

  const onDelete = async () => {
    await deleteTodo({ data: { id } })
    queryClient.invalidateQueries({ queryKey: ["todos"] })
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Button
            onClick={onToggle}
            size="icon-xs"
            variant={completed ? "outline" : "default"}
          >
            {completed ? <XIcon /> : <CheckIcon />}
          </Button>
          <Button
            onClick={onDelete}
            size="icon-xs"
            variant={"destructive"}
          >
            <TrashIcon />
          </Button>
          <Button
            size="icon-xs"

            variant={"link"}
          >
            <Link
              to="/$todoId"
              params={{ todoId: id }}
            >
              <ArrowRightIcon />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
