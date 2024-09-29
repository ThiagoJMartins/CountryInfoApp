import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryInfo } from "../services/api";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import "../styles/CountryInfo.css";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const CountryInfo = () => {
	const { countryCode } = useParams();
	const [countryInfo, setCountryInfo] = useState(null);

	useEffect(() => {
		const fetchCountryInfo = async () => {
			try {
				const data = await getCountryInfo(countryCode);
				console.log(data);
				setCountryInfo(data);
			} catch (error) {
				console.error("Error fetching country info:", error);
			}
		};

		fetchCountryInfo();
	}, [countryCode]);

	if (!countryInfo) {
		return <div>Loading...</div>;
	}

	const populationData = countryInfo.population.map((entry) => entry.value);
	const years = countryInfo.population.map((entry) => entry.year);

	const chartData = {
		labels: years,
		datasets: [
			{
				label: `Population of ${countryCode}`,
				data: populationData,
				fill: false,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				tension: 0.1,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: `Population Growth of ${countryCode}`,
			},
		},
	};

	return (
		<div className="country-info">
			<h2>{countryCode} Information</h2>
			<img src={countryInfo.flag} alt={`${countryCode} flag`} width="150" />
			<h3>Bordering Countries</h3>
			<ul>
				{Array.isArray(countryInfo.borders) ? (
					countryInfo.borders.map((borderCountry) => (
						<li key={borderCountry.countryCode}>{borderCountry.commonName}</li>
					))
				) : (
					<li>No borders available</li>
				)}
			</ul>
			<h3>Population Over Time</h3>
			<Line data={chartData} options={chartOptions} />
		</div>
	);
};

export default CountryInfo;
