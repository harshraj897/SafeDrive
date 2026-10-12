import API_BASE_URL from "./apiConfig";
export async function fetchContacts() {
  const response = await fetch(`${API_BASE_URL}/api/contacts`);
  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }
  const data = await response.json();
  return data.contacts;
}
export async function createContact(contact) {
  const response = await fetch(`${API_BASE_URL}/api/contacts`, {
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