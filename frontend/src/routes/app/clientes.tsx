import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/clientes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/clientes"!</div>
}
