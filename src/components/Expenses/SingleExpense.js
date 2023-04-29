import React from "react";

const SingleExpense = (props) => {
  return (
    <div>
      <li>
        <i>
          {props.description}-{props.amount}-{props.category}
        </i>
      </li>
    </div>
  );
};

export default SingleExpense;