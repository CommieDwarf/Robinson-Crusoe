import "../styles/globals.css";
import React from "react";
import type {AppProps} from "next/app";
import {Provider} from "react-redux";
import {store} from "../store/store";
import socketClient from "./api/socket";
import i18next from "../I18n/I18n";

const socket = socketClient();
export {socket}

export default function MyApp({Component, pageProps}: AppProps) {
    const d = i18next
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}


// Piętaszek i karty przygody
//
