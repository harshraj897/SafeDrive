import { useEffect, useState } from "react";
import {
  UserRound,
  Phone,
  Users,
  ShieldCheck,
  Plus,
  X,
} from "lucide-react";

import {
  fetchContacts,
  createContact,
} from "../api/contactApi";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    relationship: "",
    priority: "Secondary",
    status: "Active",
  });

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (error) {
      console.error("Failed to load contacts:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await createContact(formData);

      setFormData({
        name: "",
        phone: "",
        relationship: "",
        priority: "Secondary",
        status: "Active",
      });

      setShowForm(false);

      await loadContacts();

    } catch (error) {
      console.error("Failed to create contact:", error);
      alert("Failed to add emergency contact.");
    }
  }

  return (
    <div className="contacts-page">

      {/* PAGE HEADER */}
      <div className="page-header">

        <div>
          <h1>Emergency Contacts</h1>

          <p>
            People who can be notified by your SafeDrive system
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Add Contact
        </button>

      </div>

      {/* ADD CONTACT FORM */}
      {showForm && (

        <div className="panel contact-form-panel">

          <div className="panel-header">

            <div>
              <h2>Add Emergency Contact</h2>

              <p>
                Add someone who can receive a SafeDrive alert
              </p>
            </div>

            <button
              className="close-button"
              onClick={() => setShowForm(false)}
            >
              <X size={20} />
            </button>

          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            {/* NAME */}
            <div className="form-group">

              <label>Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter contact name"
                required
              />

            </div>

            {/* PHONE */}
            <div className="form-group">

              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />

            </div>

            {/* RELATIONSHIP */}
            <div className="form-group">

              <label>Relationship</label>

              <input
                type="text"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                placeholder="Example: Parent"
              />

            </div>

            {/* PRIORITY */}
            <div className="form-group">

              <label>Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Primary">
                  Primary
                </option>

                <option value="Secondary">
                  Secondary
                </option>
              </select>

            </div>

            {/* FORM ACTIONS */}
            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                Add Contact
              </button>

            </div>

          </form>

        </div>

      )}

      {/* EMERGENCY CONTACTS */}
      <div className="panel">

        <div className="panel-header">

          <div>

            <h2>My Emergency Contacts</h2>

            <p>
              {contacts.length} contact
              {contacts.length !== 1 ? "s" : ""} configured
              for SafeDrive alerts
            </p>

          </div>

        </div>

        {loading ? (

          <div className="loading-message">
            Loading emergency contacts...
          </div>

        ) : contacts.length === 0 ? (

          <div className="empty-state">

            <ShieldCheck size={30} />

            <p>
              No emergency contacts added yet.
            </p>

            <span>
              Add a trusted contact to receive SafeDrive
              possible-accident alerts.
            </span>

          </div>

        ) : (

          <div className="contacts-grid">

            {contacts.map((contact) => (

              <div
                className="contact-card"
                key={contact.id}
              >

                {/* CARD HEADER */}
                <div className="contact-card-header">

                  <div className="contact-icon">
                    <UserRound size={22} />
                  </div>

                  <span
                    className={`contact-status ${
                      contact.status
                        ? contact.status.toLowerCase()
                        : "inactive"
                    }`}
                  >
                    {contact.status || "Inactive"}
                  </span>

                </div>

                {/* CONTACT NAME */}
                <h3>
                  {contact.name}
                </h3>

                {/* CONTACT DETAILS */}
                <div className="contact-details">

                  <div>
                    <Phone size={15} />

                    <span>
                      {contact.phone}
                    </span>
                  </div>

                  <div>
                    <Users size={15} />

                    <span>
                      {contact.relationship ||
                        "Relationship not specified"}
                    </span>
                  </div>

                  <div>
                    <ShieldCheck size={15} />

                    <span>
                      {contact.priority} Priority
                    </span>
                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Contacts;