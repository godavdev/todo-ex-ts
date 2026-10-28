import { TodoCard } from "#/components/todo-card"
import { TodoForm } from "#/components/todo-form"
import { listTodos } from "#/data/todos-data"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: Home })

// pagina.com/
function Home() {
  const {
    data: todos,
    isPending,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => listTodos(),
  })

  return (
    <div className="flex flex-col items-center  gap-4 p-4">
      <TodoForm />
      {isPending && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {todos?.map((todo) => (
        <TodoCard
          key={todo.id}
          {...todo}
        />
      ))}
    </div>
  )
}
