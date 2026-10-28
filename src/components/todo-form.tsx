import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { todoSchema } from "#/data/todo"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { createTodo } from "#/data/todos-data"
import { useQueryClient } from "@tanstack/react-query"

const formId = "todo-form"

export const TodoForm = () => {
  const form = useForm({
    resolver: zodResolver(todoSchema.pick({ title: true, description: true })),
    defaultValues: {
      title: "",
      description: "",
    },
  })
  const queryClient = useQueryClient()

  const onSubmit = form.handleSubmit(async (data) => {
    await createTodo({ data })
    queryClient.invalidateQueries({ queryKey: ["todos"] })

    setTimeout(() => {
      form.reset()
    }, 0)
  })

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Todo Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id={formId}
          onSubmit={onSubmit}
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${formId}-${field.name}`}>
                    Todo Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`${formId}-${field.name}`}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter the todo title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${formId}-${field.name}`}>
                    Todo Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id={`${formId}-${field.name}`}
                    aria-invalid={fieldState.invalid}
                    placeholder="Just a description of the todo"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button
            type="submit"
            form={formId}
          >
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
