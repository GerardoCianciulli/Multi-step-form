import { STEPS } from '../data'

type SidebarProps = {
  activeStep: number
}

const Sidebar = ({ activeStep }: SidebarProps) => {
  return (
    <aside className="sidebar">
      <ol className="sidebar__steps">
        {STEPS.map((title, index) => {
          const isActive = index === activeStep
          return (
            <li
              key={title}
              className={`sidebar__step${isActive ? ' sidebar__step--active' : ''}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="sidebar__number">{index + 1}</span>
              <div className="sidebar__info">
                <span className="sidebar__label">Step {index + 1}</span>
                <h3 className="sidebar__title">{title}</h3>
              </div>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}

export default Sidebar
