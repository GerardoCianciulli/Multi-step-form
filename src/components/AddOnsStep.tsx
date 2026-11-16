import type { Ref } from 'react'
import { ADD_ONS, formatPrice, type AddOnId, type PlanDate } from '../data'
import checkmarkIcon from '../assets/images/icon-checkmark.svg'
import StepHeader from './StepHeader'

type AddOnsStepProps = {
  selectedAddOns: AddOnId[]
  planDateSetAs: PlanDate
  onToggleAddOn: (addOn: AddOnId) => void
  headingRef?: Ref<HTMLHeadingElement>
}

const AddOnsStep = ({ selectedAddOns, planDateSetAs, onToggleAddOn, headingRef }: AddOnsStepProps) => {
  return (
    <section className="step">
      <StepHeader
        title="Pick add-ons"
        description="Add-ons help enhance your gaming experience."
        headingRef={headingRef}
      />

      <fieldset className="add-ons">
        <legend className="visually-hidden">Add-ons</legend>
        {ADD_ONS.map((addOn) => {
          const isChecked = selectedAddOns.includes(addOn.id)
          return (
            <label key={addOn.id} className={`add-on${isChecked ? ' add-on--selected' : ''}`}>
              <input
                className="visually-hidden"
                type="checkbox"
                name="add-ons"
                value={addOn.id}
                checked={isChecked}
                onChange={() => onToggleAddOn(addOn.id)}
              />
              <span className="add-on__checkbox" aria-hidden="true">
                <img src={checkmarkIcon} alt="" width={12} height={9} />
              </span>
              <span className="add-on__details">
                <span className="add-on__name">{addOn.name}</span>
                <span className="add-on__description">{addOn.description}</span>
              </span>
              <span className="add-on__price">{formatPrice(addOn.price[planDateSetAs], planDateSetAs, '+')}</span>
            </label>
          )
        })}
      </fieldset>
    </section>
  )
}

export default AddOnsStep
