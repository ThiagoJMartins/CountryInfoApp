import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL; // URL del backend

// Función para obtener la lista de países
export const getCountries = async () => {
	try {
		const response = await axios.get(API_BASE_URL);
		console.log(response);

		return response.data;
	} catch (error) {
		console.error("Error fetching countries:", error);
		return [];
	}
};

// Función para obtener la información de un país
export const getCountryInfo = async (code) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/${code}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching country info:", error);
		return null;
	}
};
