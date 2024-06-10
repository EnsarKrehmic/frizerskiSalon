import React from 'react';
import './Footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="footer" id="footer">
        <div className="box-container">
            <div className="box">
                <h3>Pronađite Nas Ovdje</h3>
                <p>
                    Možete nas posjetiti direktno na našoj <Link to="/contact" style={{ color: 'blue', textDecoration: 'underline' }}>lokaciji</Link>.
                </p>
            </div>
            <div className="box">
                <h3>Kontaktirajte Nas</h3>
                <p>+62 225 883</p>
                <p>
                  <button onClick={() => window.location = 'mailto:ensar.krehmic.22@size.ba'} className="link-button">
                    ensar.krehmic.22@size.ba
                  </button>
                  <br></br>
                  <button onClick={() => window.location = 'mailto:kemal.muminovic.22@size.ba'} className="link-button">
                    kemal.muminovic.22@size.ba
                  </button>
                  <br></br>
                  <button onClick={() => window.location = 'mailto:harun.smriko.22@size.ba'} className="link-button">
                    harun.smriko.22@size.ba
                  </button>
                </p>
            </div>
            <div className="box">
                <h3>Lokacija</h3>
                <p>
                  Studentski centar Zenica<br />
                  Crkvice 50, Zenica 72000 <br />
                  Bosna i Hercegovina <br />
                </p>
            </div>
        </div>
        <div className="credit"> Napravljeno od strane <span>studenata Politehničkog fakulteta</span> | Softversko inženjerstvo! </div>
    </section>
  );
}

export default Footer;