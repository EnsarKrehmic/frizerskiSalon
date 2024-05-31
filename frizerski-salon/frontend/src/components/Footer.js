import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <section class="footer" id="footer">
        <div class="box-container">
            <div class="box">
                <h3> Pronađite Nas Ovdje </h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, voluptatem.</p>
                <div class="share">
                    <a href="#" class="fab fa-facebook-f"></a>
                    <a href="#" class="fab fa-twitter"></a>
                    <a href="#" class="fab fa-instagram"></a>
                    <a href="#" class="fab fa-linkedin"></a>
                </div>
            </div>
            <div class="box">
                <h3>Kontaktirajte Nas</h3>
                <p>+62 225 883</p>
                <a href="#" class="link">krehmiicjr@gmail.com</a>
            </div>
            <div class="box">
                <h3>Lokacija</h3>
                <p>
                  Hase Bega Huseinovića bb <br></br>
                  Nemila <br></br>
                  Bosna i Hercegovina <br></br>
                </p>
            </div>
        </div>
        <div class="credit"> Napravljeno od strane <span>studenata Politehničkog fakulteta</span> | Softversko inženjerstvo! </div>
    </section>
  );
}

export default Footer;