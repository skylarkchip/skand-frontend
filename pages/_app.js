import { ApolloProvider } from "@apollo/client";
import client from "@/client";
import "@/styles/globals.css";

import "@/lib/server";

// Redux
import { Provider } from "react-redux";
import store from "@/redux";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}
