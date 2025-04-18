import { Link, useRouterState } from "@tanstack/react-router";

function BreadCrumbs() {
  const router = useRouterState();
  const location = router.location.pathname.split("/");
  const pathnames = location.filter((path) => path !== "");

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <li key={path} className="text-gray-500">
              {path}
            </li>
          ) : (
            <li key={path}>
              <Link to={routeTo}>{path}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BreadCrumbs;
