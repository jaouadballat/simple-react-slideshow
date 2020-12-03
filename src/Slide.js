import React from "react";
import classnames from "classnames";
import "./styles.css";
import { LEFT, RIGHT } from "./constants";

export default class Slide extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.slideRef = React.createRef();

    this.state = {
      translateX: 0,
      currentIndex: 0,
      childElementCount: 0
    };
  }

  componentDidMount() {
    this.setState({
      childElementCount: this.wrapperRef.current.childElementCount
    });

    this.wrapperRef.current.childNodes.forEach((child) => {
      child.style.width = `${this.slideRef.current.clientWidth}px`;
    });
  }

  slideTo(direction) {
    const { translateX, currentIndex, childElementCount } = this.state;
    const elementWidth = this.wrapperRef.current.firstElementChild.clientWidth;

    if (direction === LEFT && currentIndex !== childElementCount - 1)
      this.setState({
        translateX: translateX - elementWidth,
        currentIndex: currentIndex + 1
      });
    else if (direction === RIGHT && currentIndex !== 0)
      this.setState({
        translateX: translateX + elementWidth,
        currentIndex: currentIndex - 1
      });
    else return null;
  }

  render() {
    const { currentIndex, childElementCount } = this.state;
    const { containerClassName, leftIcon, rightIcon } = this.props;
    const rightIconClassName = classnames({
      disabled: currentIndex === 0
    });

    const leftIconClassName = classnames({
      disabled: currentIndex === childElementCount - 1
    });

    return (
      <div
        className={["slide-container", containerClassName].join(" ")}
        ref={this.slideRef}
      >
        <div
          className="wrapper"
          ref={this.wrapperRef}
          style={{
            transform: `translateX(${this.state.translateX}px)`,
            transition: "transform 1s ease-in"
          }}
        >
          {this.props.children}
        </div>

        <div className="controller">
          <div className={leftIconClassName} onClick={() => this.slideTo(LEFT)}>
            {leftIcon}
          </div>

          <div
            className={rightIconClassName}
            onClick={() => this.slideTo(RIGHT)}
          >
            {rightIcon}
          </div>
        </div>
      </div>
    );
  }
}
