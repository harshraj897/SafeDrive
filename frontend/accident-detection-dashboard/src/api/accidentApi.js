import API_BASE_URL from "./apiConfig";

// Get all accidents
export async function fetchAccidents() {
  const response = await fetch(`${API_BASE_URL}/api/accidents`);

  if (!response.ok) {
    throw new Error("Failed to fetch accidents");
  }

  const data = await response.json();
  return data.accidents;
}

// Create a new accident
export async function createAccident(accident) {
  const response = await fetch(`${API_BASE_URL}/api/accidents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accident),
  });

  if (!response.ok) {
    throw new Error("Failed to create accident");
  }

  return await response.json();
}