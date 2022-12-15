import React from "react";
import { positionValues, Scrollbars } from "react-custom-scrollbars";

interface Props {
  children: JSX.Element | JSX.Element[];
  styleModule: {
    readonly [key: string]: string;
  };
  scrollbarRef?: React.RefObject<Scrollbars>;
  contentScale?: number;
  setScrollTop?: (value: number) => void;
  setScrollLeft?: (value: number) => void;
  disabled?: boolean;
}

interface State {
  scrollLeft: number;
  scrollTop: number;
}

export default class Scrollbar extends React.Component<Props, State> {
  scrollbarRef: React.RefObject<Scrollbars>;

  constructor(props: Props) {
    super(props);
    this.state = {
      scrollLeft: 0,
      scrollTop: 0,
    };
    this.scrollbarRef = props.scrollbarRef
      ? props.scrollbarRef
      : React.createRef<Scrollbars>();
  }

  getSnapshotBeforeUpdate(prevProps: Props) {
    const { current } = this.scrollbarRef;
    if (!current) {
      return null;
    }
    // in case of contentScale change
    if (prevProps.contentScale !== this.props.contentScale) {
      return {
        width: current.getScrollWidth(),
        height: current.getScrollHeight(),
      };
    } else {
      return null;
    }
  }

  componentDidUpdate(
    prevProps: Props,
    prevState: State,
    snapshot: { width: number; height: number }
  ) {
    if (this.props.setScrollLeft) {
      this.props.setScrollLeft(this.state.scrollLeft);
    }
    if (this.props.setScrollTop) {
      this.props.setScrollTop(this.state.scrollTop);
    }

    // in case of contentScale change
    if (snapshot) {
      const { current } = this.scrollbarRef;
      if (!current) {
        return;
      }
      const scrollLeft =
        current.getScrollLeft() +
        (current.getScrollWidth() - snapshot.width) / 2;
      const scrollTop =
        current.getScrollTop() +
        (current.getScrollHeight() - snapshot.height) / 2;
      current.scrollLeft(scrollLeft);
      current.scrollTop(scrollTop);
      this.setState(() => {
        return {
          scrollLeft,
          scrollTop,
        };
      });
    }
  }

  handleOnScrollFrame = (event: positionValues) => {
    const current = this.props.scrollbarRef?.current;
    if (!current) {
      return;
    }
    if (this.props.disabled) {
      current.scrollLeft(this.state.scrollLeft);
      current.scrollTop(this.state.scrollTop);
    } else {
      this.setState(() => {
        return {
          scrollLeft: event.scrollLeft,
          scrollTop: event.scrollTop,
        };
      });
    }
  };

  render() {
    const props = this.props;
    return (
      <Scrollbars
        onScrollFrame={this.handleOnScrollFrame}
        ref={this.scrollbarRef}
        className={props.styleModule.scrollbar}
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

// SCROLLBAR STYLES TEMPLATE

// .scrollbar {
//   width: 100%;
//   height: 100%;
//
// }
//
// .trackHorizontal {
//   height: 15px !important;
//   width: 100%;
//   bottom: 0;
//   background: transparent;
// }
//
// .thumbHorizontal {
//   background-image: url("../../../../public/interface/map/board.jpg");
//   background-size: cover;
//   border-radius: 5px;
//   border: 1px solid black;
//   z-index: 999 !important;
// }
//
// .trackVertical {
//   width: 15px !important;
//   height: 100%;
//   right: 0;
//   background: transparent;
// }
//
// .thumbVertical {
//   background-image: url("../../../../public/interface/map/boardVert.jpg");
//   background-size: cover;
//   border-radius: 5px;
//   border: 1px solid black;
//   z-index: 999 !important;
// }
