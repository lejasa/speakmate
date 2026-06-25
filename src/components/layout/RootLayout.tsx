import { Outlet, NavLink } from 'react-router-dom';

const RootLayout = () => (
  <div className="app-shell">
    <header className="app-header">
      <h2>SpeakMate</h2>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/setup">Practice Setup</NavLink>
        <NavLink to="/session">Practice Session</NavLink>
        <NavLink to="/result">Result</NavLink>
      </nav>
    </header>

    <main className="app-content">
      <Outlet />
    </main>
  </div>
);

export default RootLayout;
