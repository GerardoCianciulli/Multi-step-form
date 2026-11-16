type StepHeaderProps = {
  title: string
  description: string
}

const StepHeader = ({ title, description }: StepHeaderProps) => (
  <header className="step-header">
    <h2 className="step-header__title" tabIndex={-1}>
      {title}
    </h2>
    <p className="step-header__description">{description}</p>
  </header>
)

export default StepHeader
