import { steps } from '../data'

type SidebarProps = {
  activeStep: number
}

const Sidebar = ({ activeStep }: SidebarProps) => (
  <aside className="sidebar" aria-label="Form progress">
    <ol className="sidebar__steps">
      {steps.map((step) => {
        const isActive = step.number === activeStep
        return (
          <li
            key={step.number}
            className={`sidebar__step${isActive ? ' sidebar__step--active' : ''}`}
            aria-current={isActive ? 'step' : undefined}
          >
            <span className="sidebar__number" aria-hidden="true">
              {step.number}
            </span>
            <div className="sidebar__text">
              <p className="sidebar__label">Step {step.number}</p>
              <h3 className="sidebar__title">{step.title}</h3>
            </div>
          </li>
        )
      })}
    </ol>
  </aside>
)

export default Sidebar
