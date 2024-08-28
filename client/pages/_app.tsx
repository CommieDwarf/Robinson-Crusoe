import "../styles/globals.css";
import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";

import { GlobalWrapper } from "./GlobalWrapper";

import "../public/fontello-3e0b8b4b/css/fontello.css";
import "../public/fontello3/css/fontello.css";
import "../I18n/I18n";
import 'react-toastify/dist/ReactToastify.css'
import { InfoBadge } from "../components/InfoBadge/InfoBadge";
import { Bounce, ToastContainer } from "react-toastify";

export default function MyApp<Props>({ Component, pageProps }: AppProps) {
	return (
		<>
			<Provider store={store}>
				<GlobalWrapper>
					<ToastContainer
						position="bottom-left"
						autoClose={1000}
						hideProgressBar
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover={false}
						transition={Bounce}
                        theme="dark"
					/>
					<InfoBadge />
					<Component {...pageProps} />
				</GlobalWrapper>
			</Provider>
		</>
	);
}
