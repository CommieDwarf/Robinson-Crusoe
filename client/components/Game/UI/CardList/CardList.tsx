// @flow
import * as React from "react";
import {useLayoutEffect, useRef, useState} from "react";
import styles from "./CardList.module.css";
import {Tabs} from "./Tabs/Tabs";
import Cards from "./Cards/Cards";
import {IItemRenderData, ITEM} from "@shared/types/Game/Equipment/Item";
import {IMysteryCardRenderData} from "@shared/types/Game/MysteryService/MysteryCard";
import {IInventionRenderData} from "@shared/types/Game/InventionService/Invention";

type Props = {
    zIndex: string;
    inventions: IInventionRenderData[];
    mysteryCards: IMysteryCardRenderData[];
    items: IItemRenderData[];
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

    const zIndexClass = props.zIndex.includes("invention")
        ? styles.zIndexIncreased
        : "";


    function handleScroll(event: React.UIEvent<HTMLDivElement>) {
        setScrollTop(event.currentTarget.scrollTop)
    }

    const disabledScrollClass = props.isBeingDragged ? styles.disabledScroll : "";

    return (
        <>
            <Tabs switchTab={switchTab} currentTab={selectedTab}/>
            <div className={`${styles.container} ${zIndexClass} ${disabledScrollClass}`} ref={containerRef}
                 onScroll={handleScroll}>

                <Cards
                    inventions={props.inventions}
                    mysteryCards={props.mysteryCards}
                    items={props.items}
                    tab={selectedTab}
                    isBeingDragged={props.isBeingDragged}
                    zIndex={props.zIndex}
                    scrollTop={scrollTop}
                    containerWidth={containerWidth}
                />

            </div>
        </>

    );
};
