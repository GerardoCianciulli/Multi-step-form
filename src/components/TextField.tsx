import { ErrorMessage, Field, useField, useFormikContext } from 'formik'
import type { ChangeEvent, InputHTMLAttributes } from 'react'
import type { FormValues } from '../data'

type TextFieldProps = {
  name: keyof Pick<FormValues, 'name' | 'email' | 'phone'>
  label: string
  /** Optional formatter applied to the value on every keystroke. */
  format?: (value: string) => string
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'type' | 'placeholder' | 'autoComplete' | 'inputMode'>

const TextField = ({ name, label, format, ...inputProps }: TextFieldProps) => {
  const [, meta] = useField(name)
  const { setFieldValue } = useFormikContext<FormValues>()
  const hasError = Boolean(meta.touched && meta.error)
  const errorId = `${name}-error`

  const handleChange = format
    ? (event: ChangeEvent<HTMLInputElement>) => setFieldValue(name, format(event.target.value))
    : undefined

  return (
    <div className={`field${hasError ? ' field--error' : ''}`}>
      <div className="field__top">
        <label className="field__label" htmlFor={name}>
          {label}
        </label>
        <ErrorMessage name={name}>
          {(message) => (
            <span className="field__error" id={errorId}>
              {message}
            </span>
          )}
        </ErrorMessage>
      </div>
      <Field
        className="field__input"
        id={name}
        name={name}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        {...(handleChange ? { onChange: handleChange } : {})}
        {...inputProps}
      />
    </div>
  )
}

export default TextField
