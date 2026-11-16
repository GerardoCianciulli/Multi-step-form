import type { Ref } from 'react'

type StepHeaderProps = {
  title: string
  description: string
  headingRef?: Ref<HTMLHeadingElement>
}

const StepHeader = ({ title, description, headingRef }: StepHeaderProps) => {
  return (
    <header className="step__header">
      <h2 className="step__title" ref={headingRef} tabIndex={-1}>
        {title}
      </h2>
      <p className="step__description">{description}</p>
    </header>
  )
}

export default StepHeader
