import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountryList from "./components/CountryList";
import CountryInfo from "./components/CountryInfo";
import "./styles/App.css";

const App = () => {
	return (
		<Router>
			<div className="container">
				<h1>Country Info App</h1>
				<Routes>
					<Route path="/" element={<CountryList />} />
					<Route path="/country/:countryCode" element={<CountryInfo />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
