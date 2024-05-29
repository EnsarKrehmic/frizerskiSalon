import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us">
            <h1>O nama</h1>
            <section className="mission-vision">
                <h2>Naša misija</h2>
                <p>Naša misija je pružiti vrhunske usluge šišanja i stilizovanja kose, uz korištenje najkvalitetnijih proizvoda i najnovijih tehnika. Težimo stvaranju prijatnog ambijenta u kojem se naši klijenti osećaju opušteno i zadovoljno.</p>

                <h2>Naša vizija</h2>
                <p>Naša vizija je postati vodeći frizerski salon u regionu, poznat po izvanrednoj usluzi i talentovanom timu frizera. Želimo da inspirišemo i osnažimo naše klijente da se osećaju i izgledaju najbolje.</p>
            </section>

            <section className="team">
                <h2>Naš tim</h2>
                <div className="team-member">
                    <h3>Ensar Krehmić</h3>
                    <p>Ensar je talentovani frizer sa preko 10 godina iskustva u industriji. Specijalizovan je za moderne tehnike šišanja i bojenja kose.</p>
                </div>
                <div className="team-member">
                    <h3>Kemal Muminović</h3>
                    <p>Kemal je stručnjak za muška šišanja i brijanje. Njegova pažnja prema detaljima i posvećenost zadovoljstvu klijenata čine ga nezamenjivim članom našeg tima.</p>
                </div>
                <div className="team-member">
                    <h3>Harun Smriko</h3>
                    <p>Harun je kreativan stilista koji voli eksperimentisati sa različitim stilovima i bojama. Njegova strast prema friziranju je očigledna u svakom njegovom radu.</p>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;