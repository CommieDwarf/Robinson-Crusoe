import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

interface Props {
  children: JSX.Element | JSX.Element[];
  scrollbarRef?: React.RefObject<Scrollbars>;
  styleModule: {
    readonly [key: string]: string;
}
  contentScale?: number;
  setScrollTop?: Function;
}

export default class Scrollbar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }



  getSnapshotBeforeUpdate(prevProps: Props) {
    const scroll = prevProps.scrollbarRef?.current;
    if (!scroll) {
      return;
    }
    if (prevProps.contentScale !== this.props.contentScale) {
      return {
        width: scroll.getScrollWidth(),
        height: scroll.getScrollHeight(),
        left: scroll.getScrollLeft(),
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
      const current = this.props.scrollbarRef?.current;
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

  handleScroll = () => {
    if (!this.props.setScrollTop) {
      return;
    }
    const scrollTop = this.props.scrollbarRef?.current?.getScrollTop()
    this.props.setScrollTop(scrollTop);
  }

  render() {
    const props = this.props;
    return (
      <Scrollbars
        onScroll={this.handleScroll}
        ref={props.scrollbarRef}
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
