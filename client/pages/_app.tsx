import "../styles/globals.css";
import React, {useEffect} from "react";
import type {AppProps} from "next/app";
import {Provider} from "react-redux";
import {store} from "../store/store";

import createSocketClient from "./api/socket";
import {GlobalWrapper} from "./GlobalWrapper";
import {SocketEmitter} from "./api/socketEmitter";

export const socket = createSocketClient();
export const socketEmitter = new SocketEmitter(socket);
export default function MyApp<Props>({Component, pageProps}: AppProps) {


    return (
        <Provider store={store}>
            <GlobalWrapper>
                <Component {...pageProps} />
            </GlobalWrapper>
        </Provider>
    );
}

