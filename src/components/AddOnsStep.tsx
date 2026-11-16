import { Field, useFormikContext } from 'formik'
import { addOns, formatPrice, type FormValues } from '../data'
import StepHeader from './StepHeader'

const AddOnsStep = () => {
  const { values } = useFormikContext<FormValues>()
  const { planDateSetAs } = values

  return (
    <>
      <StepHeader title="Pick add-ons" description="Add-ons help enhance your gaming experience." />

      <fieldset className="add-ons">
        <legend className="visually-hidden">Add-ons</legend>
        {addOns.map((addOn) => (
          <label key={addOn.id} className="add-on">
            <Field type="checkbox" name="addOns" value={addOn.id} className="visually-hidden" />
            <span className="add-on__checkbox" aria-hidden="true" />
            <span className="add-on__text">
              <span className="add-on__name">{addOn.name}</span>
              <span className="add-on__description">{addOn.description}</span>
            </span>
            <span className="add-on__price">{formatPrice(addOn.price[planDateSetAs], planDateSetAs, true)}</span>
          </label>
        ))}
      </fieldset>
    </>
  )
}

export default AddOnsStep
