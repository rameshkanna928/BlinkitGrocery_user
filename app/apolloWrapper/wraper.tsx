"use client"
import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  ApolloNextAppProvider,

} from "@apollo/experimental-nextjs-app-support/ssr";

const createApolloClient = () => {
    return new ApolloClient({
      uri: "http://192.168.7.68:5000/graphql",
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache', // You can set your preferred fetch policy here
        },
        query: {
          fetchPolicy: 'no-cache', // You can set your preferred fetch policy here
        },
      },
    });
  };
// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={createApolloClient}>
      {children}
    </ApolloNextAppProvider>
  );
}


