import { createRootRoute, Outlet } from "@tanstack/react-router";
import SideNav from "../components/sidenav";
import BreadCrumbs from "../components/breadcrumbs";

const NavItems = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Invoices",
    to: "/invoices",
  },
];

export const Route = createRootRoute({
  component: () => {
    return (
      <div style={{ display: "flex" }}>
        <SideNav navItems={NavItems} />
        <div style={{ flex: 1, padding: "1rem" }}>
          <BreadCrumbs />
          <Outlet />
        </div>
      </div>
    );
  },
});
