import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/proveedores')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/proveedores"!</div>
}
