function Settings() {
  return (
    <div className="settings-page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>Settings</h1>

          <p>
            Configure your personal SafeDrive safety preferences.
          </p>
        </div>
      </div>

      {/* SAFETY SETTINGS */}
      <div className="panel settings-panel">

        {/* ACCIDENT ALERTS */}
        <div className="setting-row">

          <div>
            <strong>
              Possible Accident Alerts
            </strong>

            <p>
              Enable notifications when SafeDrive detects
              abnormal vehicle movement.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              defaultChecked
            />

            <span></span>
          </label>

        </div>

        {/* LOCATION TRACKING */}
        <div className="setting-row">

          <div>
            <strong>
              GPS Location Tracking
            </strong>

            <p>
              Allow the SafeDrive device to report the
              vehicle's GPS location.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              defaultChecked
            />

            <span></span>
          </label>

        </div>

        {/* SOUND NOTIFICATIONS */}
        <div className="setting-row">

          <div>
            <strong>
              Sound Notifications
            </strong>

            <p>
              Play a notification sound when a new
              possible-accident alert is received.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              defaultChecked
            />

            <span></span>
          </label>

        </div>

      </div>

      {/* SYSTEM INFORMATION */}
      <div className="panel">

        <div className="panel-header">

          <div>
            <h2>SafeDrive System</h2>

            <p>
              Information about your connected safety system
            </p>
          </div>

        </div>

        <div className="system-overview">

          <div className="system-row">

            <span>
              System
            </span>

            <strong>
              SafeDrive
            </strong>

            <span className="system-status online">
              Active
            </span>

          </div>

          <div className="system-row">

            <span>
              Vehicle
            </span>

            <strong>
              BR-01-AB-4582
            </strong>

            <span className="system-status online">
              Registered
            </span>

          </div>

          <div className="system-row">

            <span>
              Device
            </span>

            <strong>
              SD-ESP32-001
            </strong>

            <span className="system-status online">
              Connected
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;