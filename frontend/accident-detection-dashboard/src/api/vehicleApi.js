import API_BASE_URL from "./apiConfig";

//get all vechiles
export async function fetchVehicles() {
    const response = await fetch(`${API_BASE_URL}/api/vehicles`);

    if(!response.ok){
        throw new Error("Failed to fetch vehicles");
    }
    const data = await response.json();

    return data.vehicles;
    
}