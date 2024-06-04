import "../styles/globals.css";
import React, {useEffect} from "react";
import type {AppProps} from "next/app";
import {Provider} from "react-redux";
import {socket, store} from "../store/store";

import {GlobalWrapper} from "./GlobalWrapper";

import "../public/fontello-3e0b8b4b/css/fontello.css";
import "../I18n/I18n";


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

