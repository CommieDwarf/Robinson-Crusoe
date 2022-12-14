// import React from "react";
//
// export function getMouseDownHandle(container: React.RefObject<HTMLDivElement>) {
//   const { current } = container;
//   let pos = {
//     mouseX: 0,
//     mouseY: 0,
//     containerX: current?.offsetLeft,
//     containerY: current?.offsetTop,
//   };
//
//   function mouseMoveHandler(event: MouseEvent) {
//     console.log(current);
//     if (!current) {
//       return;
//     }
//     const mouseXToDivBorder = pos.mouseX - current.offsetLeft;
//     const mouseYToDivBorder = pos.mouseY - current.offsetTop;
//
//     const mouseDiffX = event.offsetX - mouseXToDivBorder;
//     const mouseDiffY = event.offsetY - mouseYToDivBorder;
//     const left = mouseDiffX + pos.containerX;
//     const top = mouseDiffY + pos.containerY;
//
//     if (left >= 0) {
//       current.style.left = left + "px";
//     }
//   }
//
//   current.style.top = top + "px";
//
//   function mouseUpHandler(event: MouseEvent) {
//     console.log("REMOVE");
//     document.removeEventListener("mouseup", mouseUpHandler);
//     container.current?.removeEventListener("mousemove", mouseMoveHandler);
//   }
//
//   return function (event: MouseEvent) {
//     if (!container.current) {
//       return;
//     }
//     event.preventDefault();
//     const target = event.target as HTMLDivElement;
//     const rect = current?.getBoundingClientRect();
//
//     document.body.append(current);
//     pos = {
//       mouseX: event.pageX,
//       mouseY: event.pageY,
//       containerX: rect.left,
//       containerY: rect.top + 2, // 2 * 1px broder;
//     };
//
//     container.current.addEventListener("mousemove", mouseMoveHandler);
//     document.addEventListener("mouseup", mouseUpHandler);
//     container.current.addEventListener("mouseleave", mouseUpHandler);
//   };
// }
