import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ toggleSidebar }) => (
  <div className="nav-links">
    {links.map((link) => {
      const { id, path, text, icon } = link;
      return (
        <NavLink
          to={path}
          key={id}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={toggleSidebar}
        >
          <span className="icon">{icon}</span>
          {text}
        </NavLink>
      );
    })}
  </div>
);

export default NavLinks;