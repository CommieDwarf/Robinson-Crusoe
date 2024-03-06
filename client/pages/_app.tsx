import "../styles/globals.css";
import React from "react";
import type {AppProps} from "next/app";
import {Provider} from "react-redux";
import {store} from "../store/store";
import socketClient from "./api/socket";

const socket = socketClient();
export {socket}

export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}


// Piętaszek i karty przygody
//
