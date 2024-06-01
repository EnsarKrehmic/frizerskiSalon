import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <section className="footer" id="footer">
        <div className="box-container">
            <div className="box">
                <h3> Pronađite Nas Ovdje </h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, voluptatem.</p>
                <div className="share">
                    <a href="#" className="fab fa-facebook-f"></a>
                    <a href="#" className="fab fa-twitter"></a>
                    <a href="#" className="fab fa-instagram"></a>
                    <a href="#" className="fab fa-linkedin"></a>
                </div>
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