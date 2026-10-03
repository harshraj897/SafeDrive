function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="stat-card">

      <div className="stat-card-content">
        <span className="stat-card-title">
          {title}
        </span>

        <strong className="stat-card-value">
          {value}
        </strong>

        <span className="stat-card-subtitle">
          {subtitle}
        </span>
      </div>

      <div className="stat-card-icon">
        {icon}
      </div>

    </div>
  );
}

export default StatCard;