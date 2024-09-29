import React, { useEffect, useState } from "react";
import { getCountries } from "../services/api";
import "../styles/CountryList.css";
import { Link } from "react-router-dom";

const CountryList = () => {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		const fetchCountries = async () => {
			const data = await getCountries();
			setCountries(data);
		};

		fetchCountries();
	}, []);

	if (!countries.length) {
		return <div>Loading...</div>; // Espera a que los datos se carguen
	}

	return (
		<div className="country-list">
			<h2>Available Countries</h2>
			<ul>
				{countries.map((country) => (
					<Link to={`/country/${country.countryCode}`}>
						<li key={country.countryCode}>{country.name}</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default CountryList;
