import { Field, useFormikContext, type FieldProps } from 'formik'
import { formatPrice, plans, type FormValues, type PlanDate } from '../data'
import StepHeader from './StepHeader'

/** Monthly / yearly switch. Sets `planDateSetAs`, which drives prices in steps 2–4. */
const BillingToggle = () => (
  <Field name="planDateSetAs">
    {({ field, form }: FieldProps<PlanDate, FormValues>) => {
      const isYearly = field.value === 'yearly'
      const setPlanDate = (next: PlanDate) => form.setFieldValue(field.name, next)

      return (
        <div className="billing-toggle">
          <button
            type="button"
            tabIndex={-1}
            className={`billing-toggle__label${isYearly ? '' : ' billing-toggle__label--active'}`}
            onClick={() => setPlanDate('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={isYearly}
            aria-label="Yearly billing"
            className="billing-toggle__switch"
            onClick={() => setPlanDate(isYearly ? 'monthly' : 'yearly')}
          >
            <span className="billing-toggle__knob" />
          </button>
          <button
            type="button"
            tabIndex={-1}
            className={`billing-toggle__label${isYearly ? ' billing-toggle__label--active' : ''}`}
            onClick={() => setPlanDate('yearly')}
          >
            Yearly
          </button>
        </div>
      )
    }}
  </Field>
)

const SelectPlanStep = () => {
  const { values } = useFormikContext<FormValues>()
  const { planDateSetAs } = values

  return (
    <>
      <StepHeader title="Select your plan" description="You have the option of monthly or yearly billing." />

      <fieldset className="plans">
        <legend className="visually-hidden">Plan</legend>
        {plans.map((plan) => (
          <label key={plan.id} className="plan-card">
            <Field type="radio" name="plan" value={plan.id} className="visually-hidden" />
            <img className="plan-card__icon" src={plan.icon} alt="" width="40" height="40" />
            <span className="plan-card__text">
              <span className="plan-card__name">{plan.name}</span>
              <span className="plan-card__price">{formatPrice(plan.price[planDateSetAs], planDateSetAs)}</span>
              {planDateSetAs === 'yearly' && <span className="plan-card__promo">2 months free</span>}
            </span>
          </label>
        ))}
      </fieldset>

      <BillingToggle />
    </>
  )
}

export default SelectPlanStep
