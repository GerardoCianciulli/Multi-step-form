import type { PlanDate } from './data'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

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

/** Saves a new member's form data to the json-server `members` collection. */
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
