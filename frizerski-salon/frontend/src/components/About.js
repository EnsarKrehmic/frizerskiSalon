import React from 'react';
import aboutImage from '../images/about.jpg';
import aboutIcon1 from '../images/about-icon-1.png';
import aboutIcon2 from '../images/about-icon-2.png';
import aboutIcon3 from '../images/about-icon-3.png';
import './About.css';

function About() {
  return (
    <section className="about" id="about">
      <h1 className="heading">O nama</h1>
      <div className="row">
        <div className="image">
          <img src={aboutImage} alt="About Us" />
        </div>
        <div className="content">
          <h3 className="title">Mi smo grupa stilista</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mauris dolor, gravida a varius blandit, auctor eget purus. Phasellus scelerisque sapien sit amet mauris laoreet, eget scelerisque nunc cursus. Duis ultricies malesuada leo vel aliquet. Curabitur rutrum porta dui eget mollis. Nullam lacinia dictum auctor.</p>
          <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes.</p>
          <div className="icons-container">
            <div className="icons">
              <img src={aboutIcon1} alt="Profesionalni alati" />
              <h3>Profesionalni alati</h3>
            </div>
            <div className="icons">
              <img src={aboutIcon2} alt="Kvalitetni proizvodi" />
              <h3>Kvalitetni proizvodi</h3>
            </div>
            <div className="icons">
              <img src={aboutIcon3} alt="Pranje kose" />
              <h3>Pranje kose</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;