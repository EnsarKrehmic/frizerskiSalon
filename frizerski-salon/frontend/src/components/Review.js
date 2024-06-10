import React from 'react';
import pic1 from '../images/review-1.png';
import pic2 from '../images/review-2.png';
import pic3 from '../images/review-3.png';
import './Review.css';

function Review() {
  return (
    <section className="review" id="review">
      <h1 className="heading">Recenzije</h1>
      <div className="box-container">
        
        <div className="box">
          <img src={pic2} alt="Client 2" />
          <h3>Ronaldo</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className="box">
          <img src={pic1} alt="Client 1" />
          <h3>Messi</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className="box">
          <img src={pic3} alt="Client 3" />
          <h3>Ronaldo</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </section>
  );
}

export default Review;