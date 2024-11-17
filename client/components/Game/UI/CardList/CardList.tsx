// @flow
import * as React from "react";
import {useLayoutEffect, useRef, useState} from "react";
import styles from "./CardList.module.css";
import {Tabs} from "./Tabs/Tabs";
import Cards from "./Cards/Cards";

type Props = {
    topLayerElement: string;
    isBeingDragged: boolean;
};

export type Tab = "inventions" | "mysteryCards" | "items";

export const CardList = (props: Props) => {
    const [scrollTop, setScrollTop] = useState(0);
    const [selectedTab, setSelectedTab] = useState<Tab>("inventions");
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);


    useLayoutEffect(() => {
        if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth)
    }, [])

    function switchTab(tab: Tab) {
        if (selectedTab !== tab) {
            setSelectedTab(tab);
        }
    }


    function handleScroll(event: React.UIEvent<HTMLDivElement>) {
        setScrollTop(event.currentTarget.scrollTop)
    }

    const topLayer = props.topLayerElement.includes("invention") ||
        props.topLayerElement.includes("mystery");

    return (
        <>
            <Tabs switchTab={switchTab} currentTab={selectedTab}/>
            <div className={`${styles.container}
                 ${topLayer && styles.zIndexIncreased}
                 ${props.isBeingDragged && styles.disabledScroll} tour-cards`
            }
                 ref={containerRef}
                 onScroll={handleScroll}>

                <Cards
                    tab={selectedTab}
                    isBeingDragged={props.isBeingDragged}
                    topLayerElement={props.topLayerElement}
                    topLayer={topLayer}
                    scrollTop={scrollTop}
                    containerWidth={containerWidth}
                />

            </div>
        </>

    );
};
