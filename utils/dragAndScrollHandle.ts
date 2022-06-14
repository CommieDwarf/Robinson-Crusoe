import React, { MouseEvent as ReactMouseEvent, ReactEventHandler } from "react";

import { Scrollbars } from "react-custom-scrollbars";

// export default class DragAndScroll {
//   scrollbar: React.RefObject<Scrollbars>;
//   container: React.RefObject<HTMLDivElement>;
//   pos: { top: number; left: number; x: number; y: number };
//   constructor(
//     scrollbar: React.RefObject<Scrollbars>,
//     container: React.RefObject<HTMLDivElement>
//   ) {
//     this.pos = { top: 0, left: 0, x: 0, y: 0 };
//     this.scrollbar = scrollbar;
//     this.container = container;
//   }

//   handleMouseDown = (event: React.MouseEvent) => {
//     if (!this.scrollbar.current || !this.container.current) {
//       return;
//     }
//     event.preventDefault();
//     this.pos = {
//       // The current scroll
//       left: this.scrollbar.current?.getScrollLeft(),
//       top: this.scrollbar.current?.getScrollTop(),
//       // Get the current mouse position
//       x: event.clientX,
//       y: event.clientY,
//     };

//     this.container.current.addEventListener("mousemove", this.mouseMoveHandler);
//     this.container.current.addEventListener("mouseup", this.mouseUpHandler);
//     this.container.current.style.cursor = "grabbing";
//     this.container.current.style.userSelect = "none";
//   };

//   private mouseMoveHandler = (e: MouseEvent) => {
//     // How far the mouse has been moved
//     const dx = e.clientX - this.pos.x;
//     const dy = e.clientY - this.pos.y;

//     // Scroll the element
//     this.scrollbar.current?.scrollTop(this.pos.top - dy);
//     this.scrollbar.current?.scrollLeft(this.pos.left - dx);
//   };

//   private mouseUpHandler = () => {
//     if (!this.container.current) {
//       return;
//     }

//     this.container.current.removeEventListener(
//       "mousemove",
//       this.mouseMoveHandler
//     );
//     this.container.current.removeEventListener("mouseup", this.mouseUpHandler);

//     this.container.current.style.cursor = "grab";
//     this.container.current.style.removeProperty("user-select");
//   };
// }

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
    if (!scrollbar.current || !container.current) {
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
