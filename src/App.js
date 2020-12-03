import React from "react";
import "./styles.css";
import Slide from "./Slide";
import Cards from "./Cards";

export default function App() {
  return (
    <div>
      <Slide
        containerClassName="container"
        leftIcon={[<span className="leftIcon">Left</span>]}
        rightIcon={[<span className="rightIcon">Right</span>]}
      >
        <Cards />
      </Slide>
    </div>
  );
}
