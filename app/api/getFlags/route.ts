import axios from "axios";
import cheerio from "cheerio";
import { NextResponse } from "next/server";

const url = "https://countryflagicons.com/";

const getHTML = async () => {
	const { data: html } = await axios.get(url);
	return html;
};

const countryFlags: any = [];

const getCountryFlags = async () => {
	await getHTML().then((res) => {
		const $ = cheerio.load(res);

		$(".col-md-2.col-sm-4.col-6").each((i, el) => {
			const image = $(el).find("img").attr("src");
			const name = $(el)
				.find("p")
				.text()
				.trim()
				.replace(/\s\s+/g, " ")
				.split(" ")[1] as string;

			const newData = {
				image: `${url}${image}`,
				name,
			};

			countryFlags.push(newData);
		});
	});

    return countryFlags;
};

export async function GET(req: Request) {

    const data =  await getCountryFlags();

	return NextResponse.json(
		{
			message: "Hello World",
			data,
		},
		{ status: 200 }
	);
}
