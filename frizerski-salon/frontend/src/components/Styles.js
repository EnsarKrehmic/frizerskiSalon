import React from 'react';
import style1 from '../images/style-1.jpg'
import style2 from '../images/style-2.jpg'
import style3 from '../images/style-3.jpg'
import style4 from '../images/style-4.jpg'
import './Styles.css';

function Styles() {
  return (
    <section className="styles" id="styles">
      <h1 className="heading">Izaberite Vaš stil</h1>
      <div className="box-container">
        <div className="box">
          <div className="image">
            <img src={style1} alt="Vjenčana frizura" />
          </div>
          <div className="content">
            <h3 className="title">Vjenčana frizura</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="box">
          <div className="image">
            <img src={style2} alt="Večernja frizura" />
          </div>
          <div className="content">
            <h3 className="title">Večernja frizura</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="box">
          <div className="image">
            <img src={style3} alt="Frizura za zabavu" />
          </div>
          <div className="content">
            <h3 className="title">Frizura za zabavu</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="box">
          <div className="image">
            <img src={style4} alt="Poslovna frizura" />
          </div>
          <div className="content">
            <h3 className="title">Poslovna frizura</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Styles;