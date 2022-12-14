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

export default class Scrollbar extends React.Component<Props> {
  position: {
    scrollLeft: number;
    scrollTop: number;
  };

  scrollbarRef: React.RefObject<Scrollbars>;

  constructor(props: Props) {
    super(props);
    this.position = {
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
    if (prevProps.contentScale !== this.props.contentScale) {
      return {
        width: current.getScrollWidth(),
        height: current.getScrollHeight(),
        left: current.getScrollLeft(),
      };
    } else {
      return null;
    }
  }

  componentDidUpdate(
    prevProps: Props,
    prevState: any,
    snapshot: { width: number; height: number; left: number }
  ) {
    if (snapshot) {
      const { current } = this.scrollbarRef;

      if (current) {
        const left =
          current.getScrollLeft() +
          (current.getScrollWidth() - snapshot.width) / 2;
        const top =
          current.getScrollTop() +
          (current.getScrollHeight() - snapshot.height) / 2;
        current.scrollLeft(left);
        current.scrollTop(top);
      }
    }
  }

  handleScroll = (event: React.MouseEvent) => {
    const scrollTop = this.scrollbarRef?.current?.getScrollTop();
    const scrollLeft = this.scrollbarRef?.current?.getScrollLeft();
    if (scrollTop && this.props.setScrollTop) {
      this.props.setScrollTop(scrollTop);
    }
    if (scrollLeft && this.props.setScrollLeft) {
      this.props.setScrollLeft(scrollLeft);
    }
  };

  handleOnScrollFrame = (event: positionValues) => {
    if (this.props.disabled && this.props.scrollbarRef?.current) {
      this.props.scrollbarRef.current.scrollLeft(this.position.scrollLeft);
      this.props.scrollbarRef.current.scrollTop(this.position.scrollTop);
    } else {
      this.position.scrollLeft = event.scrollLeft;
      this.position.scrollTop = event.scrollTop;
    }
  };

  render() {
    const props = this.props;
    return (
      <Scrollbars
        onScrollFrame={this.handleOnScrollFrame}
        onScroll={this.handleScroll}
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
