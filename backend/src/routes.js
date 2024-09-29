const express = require("express");
const axios = require("axios");

const router = express.Router();

// Endpoint to get the complete list of countries
router.get("/countries", async (req, res) => {
	try {
		const response = await axios.get(process.env.COUNTRIES);
		res.json(response.data);
	} catch (error) {
		console.error("Error fetching available countries:", error);
		res.status(500).json({ message: "Error fetching available countries" });
	}
});

// Endpoint to get the detailed information of a country
router.get("/countries/:countryCode", async (req, res) => {
	const { countryCode } = req.params;
	try {
		// Get the bordering countries of the given country
		const countryInfoResponse = await axios.get(
			`${process.env.COUNTRY}/${countryCode}`
		);

		// Get the population of the given country
		const populationResponse = await axios.post(process.env.POPULATION, {
			country: countryInfoResponse.data.commonName,
		});

		// Get the URL of the flag of the given country
		const flagResponse = await axios.post(process.env.FLAG, {
			country: countryInfoResponse.data.commonName,
		});

		res.json({
			borders: countryInfoResponse.data.borders,
			population: populationResponse.data.data.populationCounts,
			flag: flagResponse.data.data.flag,
		});
	} catch (error) {
		console.error("Error fetching country info:", error);
		res.status(500).json({ message: "Error fetching country info" });
	}
});

module.exports = router;
