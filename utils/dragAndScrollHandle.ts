import React, { MouseEvent as ReactMouseEvent, ReactEventHandler } from "react";
import pawnStyles from "../components/game/interface/Pawn.module.css";

import { Scrollbars } from "react-custom-scrollbars";

// set handler to container component

export default function getMouseDownHandle(
  scrollbar: React.RefObject<Scrollbars>,
  container: React.RefObject<HTMLDivElement>
) {
  let pos = { top: 0, left: 0, x: 0, y: 0 };

  function mouseMoveHandler(e: MouseEvent) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    scrollbar.current?.scrollTop(pos.top - dy);
    scrollbar.current?.scrollLeft(pos.left - dx);
  }

  function mouseUpHandler() {
    if (!container.current) {
      return;
    }

    container.current.removeEventListener("mousemove", mouseMoveHandler);
    container.current.removeEventListener("mouseup", mouseUpHandler);

    container.current.style.cursor = "grab";
    container.current.style.removeProperty("user-select");
  }

  return function (event: React.MouseEvent) {
    const target = event.target as HTMLDivElement;
    const pawn = target.closest("." + pawnStyles.container);
    if (!scrollbar.current || !container.current || pawn) {
      return;
    }

    event.preventDefault();
    pos = {
      // The current scroll
      left: scrollbar.current?.getScrollLeft(),
      top: scrollbar.current?.getScrollTop(),
      // Get the current mouse position
      x: event.clientX,
      y: event.clientY,
    };

    container.current.addEventListener("mousemove", mouseMoveHandler);
    container.current.addEventListener("mouseup", mouseUpHandler);
    container.current.style.cursor = "grabbing";
    container.current.style.userSelect = "none";
  };
}
