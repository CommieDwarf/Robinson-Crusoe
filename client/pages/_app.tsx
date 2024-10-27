import "../styles/globals.css";
import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";

import { GlobalWrapper } from "../components/GlobalWrapper";

import "../public/fontello/css/fontello.css";
import "../I18n/I18n";
import "react-toastify/dist/ReactToastify.css";
import { InfoBadge } from "../components/InfoBadge/InfoBadge";
import { Bounce, ToastContainer } from "react-toastify";
import RouteGuard from "../components/RouteGuard/RouteGuard";

export default function App<Props>({ Component, pageProps }: AppProps) {
	
	return (
		<>
			<Provider store={store}>
				<GlobalWrapper>
					<RouteGuard>

						<Component {...pageProps} />
					</RouteGuard>
					<ToastContainer
							position="bottom-left"
							autoClose={1500}
							hideProgressBar
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover={false}
							transition={Bounce}
							theme={"colored"}
						/>
						<InfoBadge />
				</GlobalWrapper>
			</Provider>
		</>
	);
}
