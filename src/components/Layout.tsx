import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="route-container">
      <Header />
      <Outlet />
    </div>
  );
}
