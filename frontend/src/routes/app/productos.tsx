import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/productos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/productos"!</div>
}
