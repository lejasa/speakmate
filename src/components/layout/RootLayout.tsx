import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: '⌂' },
  { to: '/setup', label: 'Speak', icon: '🗣' },
  { to: '/history', label: 'History', icon: '📁' },
];

const RootLayout = () => (
  <div className="app-shell">
    <main className="app-content">
      <Outlet />
    </main>

    <nav className="bottom-nav" aria-label="Bottom navigation">
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `bottom-nav-link${isActive ? ' active' : ''}`
          }
        >
          <span className="nav-icon" aria-hidden="true">
            {icon}
          </span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  </div>
);

export default RootLayout;
