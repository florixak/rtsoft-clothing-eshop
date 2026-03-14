import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/checkout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/-$locale/checkout/"!</div>
}
