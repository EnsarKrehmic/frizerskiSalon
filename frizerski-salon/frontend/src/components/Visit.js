import React from 'react';
import './Visit.css';

function Visit() {
  return (
    <section className="visit" id="visit">
        <h1 className="headingtermin"> Zakažite Termin </h1>
        <div className="row">
            <form action="">
                <h3>Zakažite Vaš Termin Danas</h3>
                <div className="inputBox">
                    <input type="text" placeholder="Vaše Ime"/>
                </div>
                <div className="inputBox">
                    <input type="email" placeholder="Vaš E-mail"/>
                </div>
                <div className="inputBox">
                    <input type="text" placeholder="Predmet"/>
                </div>
                <div className="inputBox">
                    <input type="text" placeholder="Poruka"/>
                </div>
                <input type="submit" value="POŠALJI" className="btn"/>
            </form>
        </div>
    </section>
  );
}

export default Visit;