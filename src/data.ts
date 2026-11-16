import iconArcade from './assets/images/icon-arcade.svg'
import iconAdvanced from './assets/images/icon-advanced.svg'
import iconPro from './assets/images/icon-pro.svg'

export type PlanDate = 'monthly' | 'yearly'
export type PlanId = 'arcade' | 'advanced' | 'pro'
export type AddOnId = 'online-service' | 'larger-storage' | 'customizable-profile'

type Pricing = Record<PlanDate, number>

export type Plan = {
  id: PlanId
  name: string
  icon: string
  price: Pricing
}

export type AddOn = {
  id: AddOnId
  name: string
  description: string
  price: Pricing
}

export type FormValues = {
  name: string
  email: string
  phone: string
  plan: PlanId | ''
  planDateSetAs: PlanDate
  addOns: AddOnId[]
}

export const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  plan: '',
  planDateSetAs: 'monthly',
  addOns: [],
}

export const steps = [
  { number: 1, title: 'Your info' },
  { number: 2, title: 'Select plan' },
  { number: 3, title: 'Add-ons' },
  { number: 4, title: 'Summary' },
] as const

export const plans: Plan[] = [
  { id: 'arcade', name: 'Arcade', icon: iconArcade, price: { monthly: 9, yearly: 90 } },
  { id: 'advanced', name: 'Advanced', icon: iconAdvanced, price: { monthly: 12, yearly: 120 } },
  { id: 'pro', name: 'Pro', icon: iconPro, price: { monthly: 15, yearly: 150 } },
]

export const addOns: AddOn[] = [
  {
    id: 'online-service',
    name: 'Online service',
    description: 'Access to multiplayer games',
    price: { monthly: 1, yearly: 10 },
  },
  {
    id: 'larger-storage',
    name: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    price: { monthly: 2, yearly: 20 },
  },
  {
    id: 'customizable-profile',
    name: 'Customizable profile',
    description: 'Custom theme on your profile',
    price: { monthly: 2, yearly: 20 },
  },
]

/** e.g. formatPrice(9, 'monthly') → "$9/mo", formatPrice(10, 'yearly', true) → "+$10/yr" */
export function formatPrice(amount: number, planDateSetAs: PlanDate, withPlus = false) {
  const period = planDateSetAs === 'monthly' ? 'mo' : 'yr'
  return `${withPlus ? '+' : ''}$${amount}/${period}`
}

/** Resolves the selected plan and add-ons, with prices for the chosen billing period. */
export function getOrderSummary(values: FormValues) {
  const plan = plans.find((p) => p.id === values.plan)
  const selectedAddOns = addOns.filter((a) => values.addOns.includes(a.id))
  const planPrice = plan ? plan.price[values.planDateSetAs] : 0
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price[values.planDateSetAs], 0)

  return {
    plan,
    planPrice,
    addOns: selectedAddOns,
    total: planPrice + addOnsTotal,
  }
}
