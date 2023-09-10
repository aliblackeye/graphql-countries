// Import Styles
import styles from "./page.module.css";
import SearchCountries from "@components/SearchCountries";

export default function Home() {
	return (
		<main className={styles.home}>
			<SearchCountries />
		</main>
	);
}
