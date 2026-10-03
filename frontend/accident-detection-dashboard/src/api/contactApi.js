const API_URL = "http://localhost:5000/api/contacts";
export async function fetchContacts() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }
  const data = await response.json();
  return data.contacts;
}
export async function createContact(contact) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  if (!response.ok) {
    throw new Error("Failed to create contact");
  }
  return await response.json();
}