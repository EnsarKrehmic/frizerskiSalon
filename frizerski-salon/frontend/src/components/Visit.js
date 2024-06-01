import React from 'react';
import './Visit.css';

function Visit() {
  return (
    <section class="visit" id="visit">
        <h1 class="headingtermin"> Zakažite Termin </h1>
        <div class="row">
            <form action="">
                <h3>Zakažite Vaš Termin Danas</h3>
                <div class="inputBox">
                    <input type="text" placeholder="Vaše Ime"/>
                </div>
                <div class="inputBox">
                    <input type="email" placeholder="Vaš E-mail"/>
                </div>
                <div class="inputBox">
                    <input type="text" placeholder="Predmet"/>
                </div>
                <div class="inputBox">
                    <input type="text" placeholder="Poruka"/>
                </div>
                <input type="submit" value="POŠALJI" class="btn"/>
            </form>
            <div class="image">
                <img src="images/contact.png" alt=""/>
            </div>
        </div>
    </section>
  );
}

export default Visit;