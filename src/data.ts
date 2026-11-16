import arcadeIcon from './assets/images/icon-arcade.svg'
import advancedIcon from './assets/images/icon-advanced.svg'
import proIcon from './assets/images/icon-pro.svg'

export type PlanDate = 'monthly' | 'yearly'

export type PlanId = 'arcade' | 'advanced' | 'pro'

export type AddOnId = 'online-service' | 'larger-storage' | 'customizable-profile'

export type Price = Record<PlanDate, number>

export type Plan = {
  id: PlanId
  name: string
  icon: string
  price: Price
}

export type AddOn = {
  id: AddOnId
  name: string
  description: string
  price: Price
}

export type PersonalInfo = {
  name: string
  email: string
  phone: string
}

export const STEPS = ['Your info', 'Select plan', 'Add-ons', 'Summary'] as const

export const PLANS: Plan[] = [
  { id: 'arcade', name: 'Arcade', icon: arcadeIcon, price: { monthly: 9, yearly: 90 } },
  { id: 'advanced', name: 'Advanced', icon: advancedIcon, price: { monthly: 12, yearly: 120 } },
  { id: 'pro', name: 'Pro', icon: proIcon, price: { monthly: 15, yearly: 150 } },
]

export const ADD_ONS: AddOn[] = [
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

/** Formats a price for the current billing period, e.g. "$9/mo", "+$20/yr". */
export function formatPrice(amount: number, planDateSetAs: PlanDate, sign = '') {
  return `${sign}$${amount}/${planDateSetAs === 'monthly' ? 'mo' : 'yr'}`
}

/** Plan price plus every selected add-on, for the current billing period. */
export function getTotal(plan: Plan, addOns: AddOn[], planDateSetAs: PlanDate) {
  return addOns.reduce((sum, addOn) => sum + addOn.price[planDateSetAs], plan.price[planDateSetAs])
}
