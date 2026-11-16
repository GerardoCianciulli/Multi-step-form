import type { Ref } from 'react'
import { ADD_ONS, PLANS, formatPrice, getTotal, type AddOnId, type PlanDate, type PlanId } from '../data'
import StepHeader from './StepHeader'

type SummaryStepProps = {
  selectedPlan: PlanId
  selectedAddOns: AddOnId[]
  planDateSetAs: PlanDate
  onChangePlan: () => void
  headingRef?: Ref<HTMLHeadingElement>
}

const SummaryStep = ({ selectedPlan, selectedAddOns, planDateSetAs, onChangePlan, headingRef }: SummaryStepProps) => {
  const plan = PLANS.find(({ id }) => id === selectedPlan) ?? PLANS[0]
  const addOns = ADD_ONS.filter(({ id }) => selectedAddOns.includes(id))
  const total = getTotal(plan, addOns, planDateSetAs)
  const isYearly = planDateSetAs === 'yearly'

  return (
    <section className="step">
      <StepHeader
        title="Finishing up"
        description="Double-check everything looks OK before confirming."
        headingRef={headingRef}
      />

      <div className="summary">
        <div className="summary__plan">
          <div>
            <p className="summary__plan-name">
              {plan.name} ({isYearly ? 'Yearly' : 'Monthly'})
            </p>
            <button type="button" className="summary__change" onClick={onChangePlan}>
              Change
            </button>
          </div>
          <p className="summary__plan-price">{formatPrice(plan.price[planDateSetAs], planDateSetAs)}</p>
        </div>

        {addOns.length > 0 && (
          <ul className="summary__add-ons">
            {addOns.map((addOn) => (
              <li key={addOn.id} className="summary__add-on">
                <span>{addOn.name}</span>
                <span className="summary__add-on-price">
                  {formatPrice(addOn.price[planDateSetAs], planDateSetAs, '+')}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="summary__total">
        <span>Total (per {isYearly ? 'year' : 'month'})</span>
        <span className="summary__total-price">{formatPrice(total, planDateSetAs)}</span>
      </p>
    </section>
  )
}

export default SummaryStep
