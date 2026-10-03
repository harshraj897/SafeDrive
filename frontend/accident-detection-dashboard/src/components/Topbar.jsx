
import {
  Bell,
  Search,
  UserCircle,
} from "lucide-react";
function Topbar() {
  return (
    <header className="topbar">
      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search vehicles, accidents..."
        />
      </div>
      <div className="topbar-right">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <div className="profile">
          <UserCircle size={36} />
          <div>
            <strong>Administrator</strong>
            <span>System Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Topbar;