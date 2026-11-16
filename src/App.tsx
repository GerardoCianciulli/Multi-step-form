import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  ADD_ONS,
  PLANS,
  STEPS,
  getTotal,
  type AddOnId,
  type PersonalInfo,
  type PlanDate,
  type PlanId,
} from './data'
import { postMember } from './api'
import Sidebar from './components/Sidebar'
import PersonalInfoStep, { type PersonalInfoErrors } from './components/PersonalInfoStep'
import SelectPlanStep from './components/SelectPlanStep'
import AddOnsStep from './components/AddOnsStep'
import SummaryStep from './components/SummaryStep'
import ThankYouStep from './components/ThankYouStep'
import './App.css'

const LAST_STEP = STEPS.length - 1
const THANK_YOU_STEP = STEPS.length

const REQUIRED_MESSAGE = 'This field is required'
const PLAN_REQUIRED_MESSAGE = 'Please select a plan before continuing.'

function validatePersonalInfo(values: PersonalInfo): PersonalInfoErrors {
  const errors: PersonalInfoErrors = {}
  for (const field of Object.keys(values) as (keyof PersonalInfo)[]) {
    if (!values[field].trim()) errors[field] = REQUIRED_MESSAGE
  }
  return errors
}

function App() {
  const [step, setStep] = useState(0)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState<PersonalInfoErrors>({})
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null)
  const [planDateSetAs, setPlanDateSetAs] = useState<PlanDate>('monthly')
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnId[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Move focus to the new step's heading so screen reader users hear where they are.
  const headingRef = useRef<HTMLHeadingElement>(null)
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [step])

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo((current) => ({ ...current, [field]: value }))
    if (errors[field] && value.trim()) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  const handleToggleAddOn = (addOn: AddOnId) => {
    setSelectedAddOns((current) =>
      current.includes(addOn) ? current.filter((id) => id !== addOn) : [...current, addOn],
    )
  }

  const submitMember = async (planId: PlanId) => {
    const plan = PLANS.find(({ id }) => id === planId)!
    const addOns = ADD_ONS.filter(({ id }) => selectedAddOns.includes(id))

    setIsSubmitting(true)
    try {
      await postMember({
        ...personalInfo,
        plan: plan.name,
        planDateSetAs,
        planPrice: plan.price[planDateSetAs],
        addOns: addOns.map((addOn) => ({ name: addOn.name, price: addOn.price[planDateSetAs] })),
        total: getTotal(plan, addOns, planDateSetAs),
        createdAt: new Date().toISOString(),
      })
    } catch (error) {
      // json-server only runs locally, so the hosted demo still reaches the thank-you screen.
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
    setStep(THANK_YOU_STEP)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    if (step === 0) {
      const nextErrors = validatePersonalInfo(personalInfo)
      setErrors(nextErrors)
      const firstInvalid = (Object.keys(nextErrors) as (keyof PersonalInfo)[])[0]
      if (firstInvalid) {
        document.getElementById(firstInvalid)?.focus()
        return
      }
    }

    if (step === 1 && !selectedPlan) {
      window.alert(PLAN_REQUIRED_MESSAGE)
      return
    }

    if (step === LAST_STEP && selectedPlan) {
      void submitMember(selectedPlan)
      return
    }

    setStep((current) => Math.min(current + 1, LAST_STEP))
  }

  const goBack = () => setStep((current) => Math.max(current - 1, 0))

  const isThankYou = step === THANK_YOU_STEP

  return (
    <main className="app">
      <h1 className="visually-hidden">Multi-step subscription form</h1>

      <div className="card">
        <Sidebar activeStep={Math.min(step, LAST_STEP)} />

        <form className="card__content" onSubmit={handleSubmit} noValidate>
          {step === 0 && (
            <PersonalInfoStep
              values={personalInfo}
              errors={errors}
              onChange={handlePersonalInfoChange}
              headingRef={headingRef}
            />
          )}
          {step === 1 && (
            <SelectPlanStep
              selectedPlan={selectedPlan}
              planDateSetAs={planDateSetAs}
              onSelectPlan={setSelectedPlan}
              onChangePlanDate={setPlanDateSetAs}
              headingRef={headingRef}
            />
          )}
          {step === 2 && (
            <AddOnsStep
              selectedAddOns={selectedAddOns}
              planDateSetAs={planDateSetAs}
              onToggleAddOn={handleToggleAddOn}
              headingRef={headingRef}
            />
          )}
          {step === 3 && selectedPlan && (
            <SummaryStep
              selectedPlan={selectedPlan}
              selectedAddOns={selectedAddOns}
              planDateSetAs={planDateSetAs}
              onChangePlan={() => setStep(1)}
              headingRef={headingRef}
            />
          )}
          {isThankYou && <ThankYouStep headingRef={headingRef} />}

          {!isThankYou && (
            <footer className="form-nav">
              {step > 0 && (
                <button type="button" className="button button--back" onClick={goBack}>
                  Go Back
                </button>
              )}
              {step === LAST_STEP ? (
                <button type="submit" className="button button--confirm" disabled={isSubmitting}>
                  Confirm
                </button>
              ) : (
                <button type="submit" className="button button--next">
                  Next Step
                </button>
              )}
            </footer>
          )}
        </form>
      </div>
    </main>
  )
}

export default App
