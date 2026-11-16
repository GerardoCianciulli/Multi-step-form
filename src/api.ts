import { getOrderSummary, type FormValues, type PlanDate } from './data'

/**
 * json-server base URL. In development it defaults to the local json-server
 * (`npm run server`). Set VITE_API_URL to point a production build at a hosted API.
 */
export const API_URL: string | undefined =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:3000' : undefined)

export type NewMember = {
  name: string
  email: string
  phone: string
  plan: string
  planDateSetAs: PlanDate
  planPrice: number
  addOns: { name: string; price: number }[]
  total: number
  createdAt: string
}

export function toNewMember(values: FormValues): NewMember {
  const summary = getOrderSummary(values)

  return {
    name: values.name.trim().replace(/\s+/g, ' '),
    email: values.email.trim(),
    phone: values.phone.trim(),
    plan: summary.plan?.name ?? '',
    planDateSetAs: values.planDateSetAs,
    planPrice: summary.planPrice,
    addOns: summary.addOns.map((a) => ({ name: a.name, price: a.price[values.planDateSetAs] })),
    total: summary.total,
    createdAt: new Date().toISOString(),
  }
}

/** POSTs a new member to the json-server `members` collection (see db.json). */
export async function postMember(member: NewMember) {
  const response = await fetch(`${API_URL}/members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(member),
  })

  if (!response.ok) {
    throw new Error(`Could not save member (status ${response.status})`)
  }

  return (await response.json()) as NewMember & { id: string }
}
