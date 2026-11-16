import { formatPhone } from '../validation'
import StepHeader from './StepHeader'
import TextField from './TextField'

const PersonalInfoStep = () => (
  <>
    <StepHeader
      title="Personal info"
      description="Please provide your name, email address, and phone number."
    />
    <div className="fields">
      <TextField name="name" label="Name" placeholder="e.g. Stephen King" autoComplete="name" />
      <TextField
        name="email"
        label="Email Address"
        type="email"
        placeholder="e.g. stephenking@lorem.com"
        autoComplete="email"
      />
      <TextField
        name="phone"
        label="Phone Number"
        type="tel"
        inputMode="tel"
        placeholder="e.g. +1 234 567 890"
        autoComplete="tel"
        format={formatPhone}
      />
    </div>
  </>
)

export default PersonalInfoStep
