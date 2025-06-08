import { UI_TOUR_STEP_ID } from "../../../../types/UITour/UI_TOUR_STEP_ID";
import { TFunction } from "i18next";
import { Trans } from "react-i18next";

// function getStepContent(id: UI_TOUR_STEP_ID, t: TFunction) {
//   const key = `UITour.steps.${id}.content`;
//
//   const components = {};
//
//   switch (id) {
//   }
//
//   return <Trans i18nKey={key} />;
// }

//             <span>
//                 Każda runda składa się z <strong>6 faz.</strong>, które są
//         rozpatrywane w kolejności przedstawionej na tej liście.
//     </span>
// ),
// data: {
//     id: UI_TOUR_STEP_ID.PHASE_LIST,
//         toolTipStyle: {
//         maxWidth: "40vw",
//     },
//     getUpdateUIStateHandle: createUIHandlerGetter(
//         (states) => states.scenarioOpen || !states.phaseListOpen,
//         (dispatch) => dispatch(UIStateUpdated(["scenarioOpen", false]))
//     ),
// },
// spotlightPadding: 30,
// },
// {
//     target: ".tour-morale",
//         title: "Morale",
//     content: (
//     <span>
//         Ten panel przedstawia aktualny poziom <em>morali</em> (
//     {insertIconsIntoText("$morale-arrow$")}) oraz powiązaną z nim
//     ilość otrzymywanej bądź traconej <em>determinacji</em> (
//     {insertIconsIntoText("$determination$")}). Jest ona wymagana do
//     posługiwania się umiejętnościami postaci.
// </span>
// ),
//     spotlightClicks: false,
//         data: {
//     id: UI_TOUR_STEP_ID.MORALE,
//         getUpdateUIStateHandle: (
//         dispatch,
//         uiStates,
//         delay = defaultDelay
//     ) => {
//         return [
//             delay,
//             () => {
//                 if (uiStates.phaseListOpen) {
//                     dispatch(UIStateUpdated(["phaseListOpen", false]));
//                 }
//             },
//         ];
//     },
// },
// },
// {
//     target: ".tour-map",
//         title: "Mapa",
//     content: (
//     <span>
//         Mapa wyspy składa się z sześciokątnych kafelków, z których każdy
//     reprezentuje inny fragment terenu. Tutaj możesz przeciągać
//     pionki w celu zbierania surowców i/lub eksploracji.
// <ul>
// <li>
//     <strong>Przybliżanie i oddalanie</strong> – aby
//     dostosować widok mapy, używaj kółka myszy lub przycisków
// 						„+” i „-”.
//     </li>
//     <li>
//     <strong>Przesuwanie mapy</strong> – aby zobaczyć inne
//     części wyspy, przytrzymaj lewy przycisk myszy i
//     przeciągnij mapę w wybranym kierunku.
// </li>
// </ul>
// </span>
// ),
//     placement: "right",
//         data: {
//     id: UI_TOUR_STEP_ID.MAP,
//         toolTipStyle: {
//         maxWidth: "50vw",
//             backgroundColor: "blue",
//     },
//     getUpdateUIStateHandle: createUIHandlerGetter(
//         (uiStates) => uiStates.scenarioOpen,
//         (dispatch) => dispatch(UIStateUpdated(["scenarioOpen", false]))
//     ),
// },
//
//     spotlightClicks: true,
// },
// {
//     target: ".tour-resources",
//         title: "Surowce",
//     content: (
//     <span>
//         Tutaj możesz śledzić należące do Twojej drużyny surowce. Są one
//     podzielone na 2 kategorie.
// <ul>
// <li>
//     <strong>Surowce przyszłe</strong> (na górze) - surowce
//     które zdobyliście w aktualnej Fazie Akcji, ale ich
//     jeszcze nie macie. Przechodzą one do{" "}
//     <strong>posiadanych surowców</strong> po rozpatrzeniu
//     wszystkich akcji.
// </li>
// <li>
// <strong>Surowce posiadane</strong> (na dole) - są w
//     waszym posiadaniu i możecie ich używać.
// </li>
// </ul>
// </span>
// ),
//     data: {
//         toolTipStyle: {
//             maxWidth: "50vw",
//         },
//         id: UI_TOUR_STEP_ID.RESOURCES,
//     },
//     placement: "bottom",
// },
// {
//     target: ".tour-constructions",
//         title: "Konstrukcje i broń",
//     content: (
//     <span>
//         Aby przetrwać na bezludnej wyspie, musicie zadbać o odpowiednie
//     schronienie oraz broń. Ich budowa wymaga określonej ilości
//     jednego z surowców widocznych przy danej konstrukcji. Jeśli
//     posiadasz oba rodzaje wymaganych surowców, możesz wybrać,
//     którego chcesz użyć, klikając na jego ikonę.
// <ul>
// <li>
//     <strong>Schronienie</strong> (
//     {insertIconsIntoText("$shelter$")}) - chroni graczy
//     podczas snu, co sprawia, że nie otrzymują obrażeń za
//     spanie pod gołym niebem. Można zbudować tylko 1 poziom.
// </li>
// <li>
// <strong>Dach</strong> ({insertIconsIntoText("$roof$")})
// - chroni graczy i zasoby przed warunkami
//     atmosferycznymi.
//     </li>
//     <li>
//     <strong>Palisada</strong> (
//     {insertIconsIntoText("$palisade$")}) - chroni graczy
//     przed dzikimi zwierzętami.
//
