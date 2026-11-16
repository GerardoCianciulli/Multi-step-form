import { useFormikContext } from 'formik'
import { formatPrice, getOrderSummary, type FormValues } from '../data'
import StepHeader from './StepHeader'

type SummaryStepProps = {
  onChangePlan: () => void
}

const SummaryStep = ({ onChangePlan }: SummaryStepProps) => {
  const { values } = useFormikContext<FormValues>()
  const { planDateSetAs } = values
  const { plan, planPrice, addOns, total } = getOrderSummary(values)
  const periodLabel = planDateSetAs === 'monthly' ? 'Monthly' : 'Yearly'

  return (
    <>
      <StepHeader title="Finishing up" description="Double-check everything looks OK before confirming." />

      <div className="summary">
        <div className="summary__plan">
          <div>
            <p className="summary__plan-name">
              {plan?.name} ({periodLabel})
            </p>
            <button type="button" className="summary__change" onClick={onChangePlan}>
              Change
            </button>
          </div>
          <p className="summary__plan-price">{formatPrice(planPrice, planDateSetAs)}</p>
        </div>

        {addOns.length > 0 && (
          <ul className="summary__add-ons">
            {addOns.map((addOn) => (
              <li key={addOn.id} className="summary__add-on">
                <span>{addOn.name}</span>
                <span className="summary__add-on-price">
                  {formatPrice(addOn.price[planDateSetAs], planDateSetAs, true)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="summary__total">
        <span>Total (per {planDateSetAs === 'monthly' ? 'month' : 'year'})</span>
        <span className="summary__total-price">{formatPrice(total, planDateSetAs)}</span>
      </p>
    </>
  )
}

export default SummaryStep
