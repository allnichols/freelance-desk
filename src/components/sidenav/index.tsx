import { NavLink } from "react-router";
import styles from "./sidenav.module.css";

type NavItem = {
  title: string;
  to: string;
};

const SideNav = ({ navItems }: { navItems: NavItem[] }) => {
  return (
    <nav className={styles.sidenav}>
      <ul className={styles.sidenavList}>
        {navItems.map((item, index) => (
          <li key={index} className={styles.sidenavItem}>
            <NavLink to={item.to} className={styles.sidenavLink}>
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
