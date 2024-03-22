import "../styles/globals.css";
import React from "react";
import type {AppProps} from "next/app";
import {Provider} from "react-redux";
import {store} from "../store/store";

import createSocketClient from "./api/socket";
import {GlobalWrapper} from "./GlobalWrapper";
import {SocketEmitter} from "./api/socketEmitter";

import "../public/fontello-3e0b8b4b/css/fontello.css";
import "../I18n/I18n";
import Head from "next/head";

export const socket = createSocketClient();
export const socketEmitter = new SocketEmitter(socket);

export default function MyApp<Props>({Component, pageProps}: AppProps) {

    return (
        <>
            <Provider store={store}>
                <GlobalWrapper>
                    <Component {...pageProps} />
                </GlobalWrapper>
            </Provider>
        </>

    );
}

