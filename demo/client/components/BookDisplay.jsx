import React, { Component } from 'react';

const BookDisplay = props => {
  const {data} = props;

  return (
    <article className="bookDisplay">
      <div className="bookImgContainer">
        <img className="bookImg" src={data.image}></img>
      </div>
      <ul className="bookLabel">
        <li className="bookDetail"><strong>{data.title}</strong></li>
        <li className="bookDetail"><em>{data.subtitle}</em></li>
        <li className="bookDetail">Category: {data.category}</li>
        <li className="bookDetail">Price: {data.price}</li>
      </ul>
    </article>
  );
};

export default BookDisplay;