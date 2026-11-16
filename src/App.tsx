import { Form, Formik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { API_URL, postMember, toNewMember } from './api'
import AddOnsStep from './components/AddOnsStep'
import PersonalInfoStep from './components/PersonalInfoStep'
import SelectPlanStep from './components/SelectPlanStep'
import Sidebar from './components/Sidebar'
import SummaryStep from './components/SummaryStep'
import ThankYouStep from './components/ThankYouStep'
import { initialValues, type FormValues } from './data'
import { personalInfoSchema } from './validation'
import './App.css'

type Step = 1 | 2 | 3 | 4 | 5

const App = () => {
  const [step, setStep] = useState<Step>(1)
  const [saveError, setSaveError] = useState<string | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  // Move focus to the new step's heading so keyboard and screen reader users land on it.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    bodyRef.current?.querySelector<HTMLHeadingElement>('h2')?.focus()
  }, [step])

  const goTo = (next: Step) => {
    setSaveError(null)
    setStep(next)
  }

  const handleSubmit = async (values: FormValues) => {
    switch (step) {
      case 1:
        goTo(2)
        break
      case 2:
        if (!values.plan) {
          window.alert('Please select a plan before continuing.')
          return
        }
        goTo(3)
        break
      case 3:
        goTo(4)
        break
      case 4:
        try {
          if (API_URL) {
            await postMember(toNewMember(values))
          } else {
            console.info('No API configured (VITE_API_URL); skipping save.')
          }
          goTo(5)
        } catch (error) {
          console.error(error)
          setSaveError("Sorry, we couldn't save your subscription. Please try again.")
        }
        break
    }
  }

  return (
    <main className="page">
      <h1 className="visually-hidden">Multi-step form</h1>

      <div className="card">
        <Sidebar activeStep={Math.min(step, 4)} />

        <Formik
          initialValues={initialValues}
          validationSchema={step === 1 ? personalInfoSchema : undefined}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={`form${step === 5 ? ' form--complete' : ''}`} noValidate>
              <div className="form__body" ref={bodyRef}>
                {step === 1 && <PersonalInfoStep />}
                {step === 2 && <SelectPlanStep />}
                {step === 3 && <AddOnsStep />}
                {step === 4 && <SummaryStep onChangePlan={() => goTo(2)} />}
                {step === 5 && <ThankYouStep />}

                {saveError && (
                  <p className="form__error" role="alert">
                    {saveError}
                  </p>
                )}
              </div>

              {step < 5 && (
                <div className="form__footer">
                  {step > 1 && (
                    <button type="button" className="btn btn--back" onClick={() => goTo((step - 1) as Step)}>
                      Go Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button key="next" type="submit" className="btn btn--next">
                      Next Step
                    </button>
                  ) : (
                    <button key="confirm" type="submit" className="btn btn--confirm" disabled={isSubmitting}>
                      Confirm
                    </button>
                  )}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </main>
  )
}

export default App
