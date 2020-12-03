import React from "react";

export default function Cards() {
  const cards = [1, 2, 3, 4];
  return (
    <>
      {cards.map((card, index) => (
        <div key={index} id={`img${card}`} className="img"></div>
      ))}
    </>
  );
}
