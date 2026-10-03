import {
  LayoutDashboard,
  Car,
  TriangleAlert,
  Map,
  Users,
  Settings,
  ShieldCheck,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "My SafeDrive",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "My Accident History",
    path: "/accidents",
    icon: TriangleAlert,
  },
  {
    name: "My Vehicle",
    path: "/vehicles",
    icon: Car,
  },
  {
    name: "My Vehicle Location",
    path: "/map",
    icon: Map,
  },
  {
    name: "Emergency Contacts",
    path: "/contacts",
    icon: Users,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="logo">

        <div className="logo-icon">
          <ShieldCheck size={23} />
        </div>

        <div>
          <h2>SafeDrive</h2>
          <span>Personal Vehicle Safety</span>
        </div>

      </div>

      {/* MENU */}
      <div className="menu">

        <p className="menu-title">
          MY SAFEDRIVE
        </p>

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "menu-item active"
                  : "menu-item"
              }
            >

              <Icon size={19} />

              <span>
                {item.name}
              </span>

            </NavLink>
          );
        })}

        {/* SETTINGS */}
        <p className="menu-title settings-title">
          SYSTEM
        </p>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "menu-item active"
              : "menu-item"
          }
        >

          <Settings size={19} />

          <span>
            Settings
          </span>

        </NavLink>

      </div>

      {/* SYSTEM STATUS */}
      <div className="system-status">

        <div className="status-dot"></div>

        <div>
          <strong>
            System Online
          </strong>

          <span>
            SafeDrive services operational
          </span>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;