"use client";

import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import axios from "axios";

import * as cheerio from "cheerio";

// Styles
import styles from "./index.module.css";
import Image from "next/image";

interface Country {
	code: string;
	name: string;
	emoji: string;
}

interface CountriesData {
	countries: Country[];
}

interface Flag {
	name: string;
	image: string;
}

const GET_ALL_COUNTRIES = gql`
	query GetAllCountries {
		countries {
			name
			native
			capital
			emoji
			currency
			languages {
				code
				name
			}
		}
	}
`;

function SearchCountries() {
	// States
	const [countryName, setCountryName] = useState<string>("");
	const [groupCount, setGroupCount] = useState<number>(0);
	const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
	const { loading, error, data } = useQuery<CountriesData>(GET_ALL_COUNTRIES);

	// Handlers
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		switch (e.target.name) {
			case "countryName":
				setCountryName(e.target.value);
				break;
			case "groupCount":
				setGroupCount(parseInt(e.target.value));
				break;
		}
	};

	const handleItemClick = (country: Country) => {
		const foundCountry = selectedCountries.filter(
			(item) => item.name === country.name
		);
		if (foundCountry.length > 0) {
			const filteredCountries = selectedCountries.filter(
				(item) => item.name !== country.name
			);
			setSelectedCountries(filteredCountries);
		} else {
			setSelectedCountries([...selectedCountries, country]);
		}
	};

	const filterCountries = (
		countries: Country[],
		searchQuery: string
	): Country[] => {
		if (searchQuery.length > 0) {
			const filteredCountries = countries
				.filter((country) =>
					country.name.toLowerCase().includes(searchQuery.toLowerCase())
				)
				.slice(0, groupCount || countries.length);
			return filteredCountries;
		}

		return countries;
	};

	const filteredCountries = filterCountries(data?.countries || [], countryName);

	useEffect(() => {
		if (!loading && data) {
			// Otomatik olarak 10. ülkeyi veya sonuncuyu seç
			const countries = data.countries || [];
			const lastIndex = Math.min(9, countries.length - 1);
			handleItemClick(countries[lastIndex]);
		}
	}, [data, loading]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :</p>;

	return (
		<div className="search-countries">
			<div className="container">
				<h1 className={styles.title}>Junior Frontend Assignment</h1>

				<div className={styles.filters}>
					{/* ÜLKE ADI */}
					<div className={styles.formInput}>
						<label htmlFor="countryName">Ülke adı</label>
						<input
							type="text"
							name="countryName"
							className={styles.input}
							placeholder="Ülke adı girin (örn. Turkey)"
							value={countryName}
							onChange={handleInputChange}
						/>
					</div>
					{/* GRUP SAYISI */}
					<div className={styles.formInput}>
						<label htmlFor="countryName">Grup Sayısı</label>
						<input
							type="number"
							min={0}
							name="groupCount"
							className={styles.input}
							placeholder="Grup sayısı girin (örn. 3)"
							value={groupCount}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<ul className={styles.countryList}>
					{filteredCountries?.map((country) => (
						<li
							className={[
								styles.countryListItem,
								selectedCountries.find((item) => item.name === country.name) &&
									styles.selected,
							].join(" ")}
							key={country.name}
							onClick={() => handleItemClick(country)}>
							{country.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default SearchCountries;
