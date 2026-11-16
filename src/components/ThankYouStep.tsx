import iconThankYou from '../assets/images/icon-thank-you.svg'

const ThankYouStep = () => (
  <div className="thank-you">
    <img className="thank-you__icon" src={iconThankYou} alt="" width="80" height="80" />
    <h2 className="thank-you__title" tabIndex={-1}>
      Thank you!
    </h2>
    <p className="thank-you__text">
      Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need
      support, please feel free to email us at support@loremgaming.com.
    </p>
  </div>
)

export default ThankYouStep
