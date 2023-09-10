"use client";
// Apollo Client
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://countries.trevorblades.com/graphql",
	cache: new InMemoryCache(),
});

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
