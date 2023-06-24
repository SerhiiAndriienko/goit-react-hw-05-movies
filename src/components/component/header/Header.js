import { NavLink, Outlet } from 'react-router-dom';

export default function Header() {
  const handleActiveStyle = ({ isActive }) => {
    return { color: isActive ? 'red' : 'black', marginRight: 20 };
  };
  return (
    <header>
      <nav>
        <NavLink to="/" style={handleActiveStyle}>
          Home
        </NavLink>
        <NavLink to="/movies" style={handleActiveStyle}>
          Movies
        </NavLink>
      </nav>
      <Outlet></Outlet>
    </header>
  );
}
