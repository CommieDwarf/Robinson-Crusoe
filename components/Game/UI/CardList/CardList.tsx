// @flow
import * as React from "react";
import styles from "./CardList.module.css";
import {IInventionRenderData} from "../../../../interfaces/InventionService/Invention";
import {useState} from "react";
import {Tabs} from "./Tabs/Tabs";
import Cards from "./Cards/Cards";
import {IMysteryCardRenderData} from "../../../../interfaces/MysteryService/MysteryCard";

type Props = {
    zIndex: string;
    inventions: IInventionRenderData[];
    mysteryCards: IMysteryCardRenderData[];
    isBeingDragged: boolean;
};

export type Tab = "inventions" | "treasures";

export const CardList = (props: Props) => {
    const [scrollTop, setScrollTop] = useState(0);
    const [zoomed, setZoomed] = useState(false);
    const [selectedTab, setSelectedTab] = useState<Tab>("inventions");


    function switchTab(tab: Tab) {
        if (selectedTab !== tab) {
            setSelectedTab(tab);
            setZoomed(false);
        }
    }

    const zIndexClass = props.zIndex.includes("invention")
        ? styles.zIndexIncreased
        : "";

    function toggleZoom() {
        setZoomed((state) => !state);
    }

    function handleScroll(event: React.UIEvent<HTMLDivElement>) {
        setScrollTop(event.currentTarget.scrollTop)
    }

    const disabledScrollClass = props.isBeingDragged ? styles.disabledScroll : "";

    return (
        <>
            <Tabs switchTab={switchTab} currentTab={selectedTab}/>
            <div className={`${styles.container} ${zIndexClass} ${disabledScrollClass}`} onScroll={handleScroll}>

                <Cards
                    inventions={props.inventions}
                    mysteryCards={props.mysteryCards}
                    tab={selectedTab}
                    isBeingDragged={props.isBeingDragged}
                    zIndex={props.zIndex}
                    scrollTop={scrollTop}
                    toggleZoom={toggleZoom}
                />

            </div>
        </>

    );
};
