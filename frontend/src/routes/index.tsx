import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
	console.log("here")

    if (!context.auth.loggedIn) {
      throw redirect({ to: '/login' })
    }
	
    throw redirect({ to: '/app/facturas' })
  },
})

function RouteComponent() {
  return null
}
