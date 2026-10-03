const API_URL = "http://localhost:5000/api/vechiles";

//get all vechiles
export async function fetchVehicles() {
    const response = await fetch(API_URL);

    if(!response.ok){
        throw new Error("Failed to fetch vehicles");
    }
    const data = await response.json();

    return data.vehicles;
    
}