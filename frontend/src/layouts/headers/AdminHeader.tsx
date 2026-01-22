import { adminRoutes } from '../../constants/routes'
import logo from '../../assets/images/logos/react-logo.png'
import ThemeToggle from '../../components/common/ThemeToggle'

const AdminHeader = () => {
  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <a className='navbar-brand' href='#'>
          <img src={logo} alt='logo' height={30} width={30} />
        </a>
        <div className='d-flex align-items-center'>
          <ul className='list-unstyled d-flex align-items-center gap-3 mb-0 me-3'>
            {adminRoutes.map((route) => (
              <li key={route} className='text-capitalize'>
                {route}
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default AdminHeader