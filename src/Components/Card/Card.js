import React from "react";
import "./Card.css";

function Card(props) {
  return (
    <div className="myCardDiv">
      <div> {props.children}</div>
    </div>
  );
}

export default Card;
