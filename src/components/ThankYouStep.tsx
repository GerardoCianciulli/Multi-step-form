import type { Ref } from 'react'
import thankYouIcon from '../assets/images/icon-thank-you.svg'

type ThankYouStepProps = {
  headingRef?: Ref<HTMLHeadingElement>
}

const ThankYouStep = ({ headingRef }: ThankYouStepProps) => {
  return (
    <section className="step step--thank-you">
      <img className="thank-you__icon" src={thankYouIcon} alt="" width={80} height={80} />
      <h2 className="step__title" ref={headingRef} tabIndex={-1}>
        Thank you!
      </h2>
      <p className="step__description">
        Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support,
        please feel free to email us at support@loremgaming.com.
      </p>
    </section>
  )
}

export default ThankYouStep
