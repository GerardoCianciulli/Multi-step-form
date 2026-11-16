import type { Ref } from 'react'
import type { PersonalInfo } from '../data'
import StepHeader from './StepHeader'

export type PersonalInfoErrors = Partial<Record<keyof PersonalInfo, string>>

type Field = {
  id: keyof PersonalInfo
  label: string
  type: 'text' | 'email' | 'tel'
  placeholder: string
  autoComplete: string
}

const FIELDS: Field[] = [
  { id: 'name', label: 'Name', type: 'text', placeholder: 'e.g. Stephen King', autoComplete: 'name' },
  {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'e.g. stephenking@lorem.com',
    autoComplete: 'email',
  },
  { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'e.g. +1 234 567 890', autoComplete: 'tel' },
]

type PersonalInfoStepProps = {
  values: PersonalInfo
  errors: PersonalInfoErrors
  onChange: (field: keyof PersonalInfo, value: string) => void
  headingRef?: Ref<HTMLHeadingElement>
}

const PersonalInfoStep = ({ values, errors, onChange, headingRef }: PersonalInfoStepProps) => {
  return (
    <section className="step">
      <StepHeader
        title="Personal info"
        description="Please provide your name, email address, and phone number."
        headingRef={headingRef}
      />

      <div className="fields">
        {FIELDS.map(({ id, label, type, placeholder, autoComplete }) => {
          const error = errors[id]
          const errorId = `${id}-error`
          return (
            <div key={id} className="field">
              <div className="field__row">
                <label className="field__label" htmlFor={id}>
                  {label}
                </label>
                {error && (
                  <span className="field__error" id={errorId}>
                    {error}
                  </span>
                )}
              </div>
              <input
                className={`field__input${error ? ' field__input--invalid' : ''}`}
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                value={values[id]}
                onChange={(event) => onChange(id, event.target.value)}
                required
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default PersonalInfoStep
