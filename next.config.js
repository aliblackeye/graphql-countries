/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "www.worldometers.info",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "www.countryflagicons.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "countryflagicons.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
