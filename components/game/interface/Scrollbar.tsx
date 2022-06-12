import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

interface Props {
  children: JSX.Element | JSX.Element[];
  scrollbarRef: React.RefObject<Scrollbars>;
  styleModule: {
    readonly [key: string]: string;
  };
}

export default class Scrollbar extends React.Component {
  props: Props;
  constructor(props: Props) {
    super(props);
    this.props = props;
  }
  render() {
    const props = this.props;
    return (
      <Scrollbars
        ref={props.scrollbarRef}
        className={props.styleModule.Scrollbar}
        universal={true}
        hideTracksWhenNotNeeded={true}
        renderTrackHorizontal={(pr) => (
          <div {...pr} className={props.styleModule.trackHorizontal} />
        )}
        renderThumbHorizontal={(pr) => (
          <div {...pr} className={props.styleModule.thumbHorizontal} />
        )}
        renderTrackVertical={(pr) => (
          <div {...pr} className={props.styleModule.trackVertical} />
        )}
        renderThumbVertical={(pr) => (
          <div {...pr} className={props.styleModule.thumbVertical} />
        )}
      >
        {props.children}
      </Scrollbars>
    );
  }
}
