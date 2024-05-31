import React from 'react';
import services1 from '../images/services-1.jpg';
import services2 from '../images/services-2.jpg';
import services3 from '../images/services-3.jpg';
import services4 from '../images/services-4.jpg';
import './Services.css';

function Services() {
  return (
    <section className="services" id="services">
      <h1 className="heading">Vrhunske usluge</h1>
      <div className="box-container">
        <div className="box">
          <img src={services1} alt="Oblikovanje kose" />
          <div className="content">
            <h3>Oblikovanje kose</h3>
          </div>
        </div>
        <div className="box">
          <img src={services2} alt="Vjenčane pripreme" />
          <div className="content">
            <h3>Vjenčane pripreme</h3>
          </div>
        </div>
        <div className="box">
          <img src={services3} alt="Muževna frizura" />
          <div className="content">
            <h3>Muževna frizura</h3>
          </div>
        </div>
        <div className="box">
          <img src={services4} alt="Podrezivanje brade" />
          <div className="content">
            <h3>Podrezivanje brade</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;