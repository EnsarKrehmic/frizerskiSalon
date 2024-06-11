import React from 'react';
import aboutImage from '../images/about.jpg'; // Image for the section
import aboutIcon1 from '../images/about-icon-1.png'; // Image for the first icon
import aboutIcon2 from '../images/about-icon-2.png'; // Image for the second icon
import aboutIcon3 from '../images/about-icon-3.png'; // Image for the third icon
import './About.css'; // Import CSS for the component

/**
 * About component displays information about the group of stylists.
 * It includes an image, a title, a description, and three icons with their descriptions.
 *
 * @return {JSX.Element} The About component
 */
function About() {
  return (
    <section className="about" id="about">
      {/* Heading for the section */}
      <h1 className="heading">O nama</h1>
      <div className="row">
        <div className="image">
          {/* Image for the section */}
          <img src={aboutImage} alt="About Us" />
        </div>
        <div className="content">
          {/* Title for the section */}
          <h3 className="title">Mi smo grupa stilista</h3>
          {/* Description for the section */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mauris
            dolor, gravida a varius blandit, auctor eget purus. Phasellus
            scelerisque sapien sit amet mauris laoreet, eget scelerisque nunc
            cursus. Duis ultricies malesuada leo vel aliquet. Curabitur
            rutrum porta dui eget mollis. Nullam lacinia dictum auctor.
          </p>
          <p>
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Orci varius natoque penatibus et magnis
            dis parturient montes.
          </p>
          <div className="icons-container">
            {/* First icon */}
            <div className="icons">
              <img src={aboutIcon1} alt="Profesionalni alati" />
              <h3>Profesionalni alati</h3>
            </div>
            {/* Second icon */}
            <div className="icons">
              <img src={aboutIcon2} alt="Kvalitetni proizvodi" />
              <h3>Kvalitetni proizvodi</h3>
            </div>
            {/* Third icon */}
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