import React from "react";
import { BsStar, BsStarFill } from "react-icons/bs";

export default function Rating(props) {
  return (
    <div>
      {[...Array(5)].map((_, index) =>
        index < props.count ? <BsStarFill /> : <BsStar />
      )}
    </div>
  );
}
