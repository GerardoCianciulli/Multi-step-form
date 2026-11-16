import type { Ref } from 'react'
import { PLANS, formatPrice, type PlanDate, type PlanId } from '../data'
import StepHeader from './StepHeader'

type SelectPlanStepProps = {
  selectedPlan: PlanId | null
  planDateSetAs: PlanDate
  onSelectPlan: (plan: PlanId) => void
  onChangePlanDate: (planDate: PlanDate) => void
  headingRef?: Ref<HTMLHeadingElement>
}

const SelectPlanStep = ({
  selectedPlan,
  planDateSetAs,
  onSelectPlan,
  onChangePlanDate,
  headingRef,
}: SelectPlanStepProps) => {
  const isYearly = planDateSetAs === 'yearly'

  return (
    <section className="step">
      <StepHeader
        title="Select your plan"
        description="You have the option of monthly or yearly billing."
        headingRef={headingRef}
      />

      <fieldset className="plans">
        <legend className="visually-hidden">Plan</legend>
        {PLANS.map((plan) => {
          const isSelected = plan.id === selectedPlan
          return (
            <label key={plan.id} className={`plan${isSelected ? ' plan--selected' : ''}`}>
              <input
                className="visually-hidden"
                type="radio"
                name="plan"
                value={plan.id}
                checked={isSelected}
                onChange={() => onSelectPlan(plan.id)}
              />
              <img className="plan__icon" src={plan.icon} alt="" width={40} height={40} />
              <span className="plan__details">
                <span className="plan__name">{plan.name}</span>
                <span className="plan__price">{formatPrice(plan.price[planDateSetAs], planDateSetAs)}</span>
                {isYearly && <span className="plan__bonus">2 months free</span>}
              </span>
            </label>
          )
        })}
      </fieldset>

      <div className="billing-toggle">
        <button
          type="button"
          className={`billing-toggle__label${!isYearly ? ' billing-toggle__label--active' : ''}`}
          onClick={() => onChangePlanDate('monthly')}
          aria-pressed={!isYearly}
        >
          Monthly
        </button>
        <button
          type="button"
          role="switch"
          className="billing-toggle__switch"
          aria-checked={isYearly}
          aria-label="Yearly billing"
          onClick={() => onChangePlanDate(isYearly ? 'monthly' : 'yearly')}
        >
          <span className="billing-toggle__knob" />
        </button>
        <button
          type="button"
          className={`billing-toggle__label${isYearly ? ' billing-toggle__label--active' : ''}`}
          onClick={() => onChangePlanDate('yearly')}
          aria-pressed={isYearly}
        >
          Yearly
        </button>
      </div>
    </section>
  )
}

export default SelectPlanStep
