import React from 'react';
import './Footer.css';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="footer" id="footer">
        <div className="box-container">
            <div className="box">
            <h3>Pronađite Nas Ovdje</h3>
                <p>
                    Možete nas posetiti direktno na našoj <Link to="/contact" style={{ color: 'blue', textDecoration: 'underline' }}>lokaciji</Link>.
                </p>
            </div>
            <div className="box">
                <h3>Kontaktirajte Nas</h3>
                <p>+62 225 883</p>
                <a href="#" className="link">krehmiicjr@gmail.com</a>
            </div>
            <div className="box">
                <h3>Lokacija</h3>
                <p>
                  Hase Bega Huseinovića bb <br></br>
                  Nemila <br></br>
                  Bosna i Hercegovina <br></br>
                </p>
            </div>
        </div>
        <div className="credit"> Napravljeno od strane <span>studenata Politehničkog fakulteta</span> | Softversko inženjerstvo! </div>
    </section>
  );
}

export default Footer;