<a href="#"><img width="100%" height="auto" src="https://ptf.unze.ba/wp/wp-content/uploads/2018/02/Logo-PTF018.png"/></a>


<h1 align="center">Web dizajn (IV semestar)</h1>

<br/>
<p align="left">
<a href="https://ptf.unze.ba/"><img alt="PTF UNZE" src="https://img.shields.io/badge/PTF_UNZE-www.ptf.unze.ba/-lightgrey?style=flat-square&logo=google-chrome"></a>
</p>

### Podaci o članovima grupe: 
- 1. član: Ensar Krehmić (C)
- 2. član: Harun Smriko
- 3. član: Kemal Muminović
- 📧 Kontakt: ime.prezime.22@size.ba

### Podaci o asistentima
- 👨‍💻 Asistent: Edin Tabak
- 📧 Kontakt: edin.tabak@unze.ba
- 👨‍💻 Asistent: Narcisa Hadžajlić
- 📧 Kontakt: narcisa.hadzajlic@dl.unze.ba 

### Podaci o predmetu 

- 🔗 Link za Google Classroom:  
<p align="left">
<a href="https://classroom.google.com/u/1/c/NjIyOTU1NzE3MDNa"><img alt="Google Classroom" src="https://img.shields.io/badge/GoogleClassroom-www.classroom.google.com-darkgreen?style=flat-square&logo=google-classroom"></a>
</p>

### Upute za izradu projekta

### Osnovne informacije: 
- Projekti se rade u grupama od po isključivo 3 člana
- Mogu se miješati studenti iz više grupa
- Isključivo iskoristiti obrazac za dokumentaciju koji je priložen
- Rad članova grupe će se ocijeniti pojedinačno (neće članovi nužno imati istu ocjenu)
- Projekat nosi 30% ukupne ocjene predmeta
- Projekat je obavezan za polaganje predmeta
- Tema i razvojni okvir su proizvoljni, samo je važno imati sve elemente koji su navedeni kao zadaci ovog projekta
- Ocjenjuju se: Kvalitet i preglednost koda, kvalitet dokumentacije, inovativnost i kreativnost (web DIZAJN!) te rad prema pravilima

### Zadaci:
Napraviti dinamičku web stranicu gdje ćete obavezno koristiti neki razvojni okvir za razvoj web stranica po želji sa sljedećim komponentama:
- Početna stranica ili landing page sa menijem
- Meni treba imati opcije “o nama”, “prijava” i “kontakt”, a ostale opcije postavite prema temi projekta i po želji
- “Prijava” treba omogućiti registraciju ili prijavu korisnika
- Korisnici trebaju imati ulogu “Admin” ili “Guest”
- Razlike u privilegijama Admin i Guest korisnika primijenite po želji
- Tri forme trebaju postojati (prijava, registracija i kontakt)
- Podaci koji se unose preko formi trebaju biti poslani na neku bazu podataka ili JSON datoteku po želji
- U sklopu kontakt stranice uvrstiti Google Maps

### Projekat nosi 30 bodova i bodovati će se sljedeće:
- Pridržavanje pravila i kvalitetna dokumentacija 10b
- Kvalitet koda i prisutnost svih obaveznih elemenata navedenih gore 15b
- Kreativnost 5b

### Napomena:
Projekti koji nemaju priloženu dokumentaciju ili nisu spremljeni i postavljeni prema uputama neće se uzeti u razmatranje!
<hr>

### O PROJEKTU
Riječ je o web aplikaciji kreiranoj za Frizerski salon.
<hr>

### Opis stranice
Web stranica predstavlja interaktivnu platformu za frizerski salon koja nudi optimalan spektar funkcionalnosti takvih da korisniku pruže ugodno iskustvo na njoj. U nastavku ćemo nabrojati ključne aspekte stranice:
1. Landing page - Prelijepo urađen Landing page koji privlači i drži pažnju gosta sa atraktivnim dizajnom i relevatnim informacijama. U headeru se nalaze jasno definisane sekcije koje predstavljaju podatke o nama, našim uslugama, stilovima koji postoje, cijenama, recenzijama te kontakt informacijama.
2. Login i registracija - Forma logina i registracije koja nudi mogućnost prijave na našu platformu. Interfejs je kreiran tako da bude jednostavan za upotrebu, omogućavajući gostima da veoma brzo kreiraju nove, ili pristupe starim profilima.
3. Profil korisnika - U izradi...
4. Admin Panel - Administratori imaju veliki izbor opcija nakon što se prijave na svoj profil. Ove opcije im omogućavaju upravljanje korisnicima, radnicima i terminima (nije završeno). Admin može da deaktivira i ukloni profil korisnika i radnika. Pored toga mogu da gledaju, dodaju i ažuriraju informacije o korisnicima i radnicima te da gledaju statistiku i izvještaje (nije završeno).
5. Kontakt - Forma kontakta omogućava korisnicima veoma jednostavno i brzo stupanje u kontakt sa serverom putem slanja poruka. Nakon popunjavanja forme, korisnik prima potvrdu o uspješnom slanju poruke. (nije uspješno povezan kod)
6. Responzivni dizajn - Stranica je optimizovana za sve uređaje što omogućava jednako iskustvo na svim uređajima.
7. Sigurnost i privatnost - Nešto ovako nastojimo osigurati implementirajući sigurnosne mehanizme poput SSL enkripcije za zaštitu osjetljivih podataka te u što većem procentu pridržavanjem najvećih standarda u obradi podataka.
<hr> 

### Korištene tehnologije
1. FRONTEND
- React.js: Framework programskog jezika Javascript korišten za izgradnju korisničke strane aplikacije.
- Bootstrap: Biblioteka alata za stilizaciju - Cascading Styles Sheets (CSS) korišten za brzo i jednostavno stiliziranje dijelove aplikacije.
- Moment.js: Biblioteka Moment.js integrisana zbog manipulacije datumima i vremenima na korisničkoj strani aplikacije.
2. BACKEND:
- Node.js: Serverski okvir baziran na programskom jeziku Javascript korišten za izgradnju backend dijela aplikacije.
- Nodemon: Korištena je opcija Nodemon koji omogućuje automatsko ponovno pokretanje servera nakon svake promjene u izvornom kodu.
- bcrypt: Biblioteku bcrypt korištena za pohranjivanje lozinki kako bismo osigurali sigurnost korisničkih podataka.
- Cors: Middleware korišten za rukovanje CORS zahtjeva, preciznije zbog upravljanja komunikacijom između React.js aplikacije i backend servera u različitim domenama.
- kie i session Parses: Middleware softver korišten za upravljanje sesijom i kolačićima u aplikaciji.
3. BAZA PODATAKA:
- Express.js: Kao glavni okvir za izgradnju našeg servera. To je omogućilo da brzo i jednostavno definiramo rute, upravljamo zahtjevima i sesijama.
- MySQL: Kao baza podataka, uz pomoć MySQL2 klijenta za Node.js. To je omogućilo pohranjivanje i održavanje podataka.
<hr>

### Konfiguracija
1. Unutar MySQL Workbencha otvoriti SQL server te pokrenuti skriptu 'hairdresser.sql'. (Execute)
2. Unutar fajla .env prilagoditi podatke svom SQL serveru.
3. Kroz Command Prompt ili Terminal doći do direktorijuma 'backend' te kucati sljedeće komande jednu za drugom:
- npm init (Enter sve dok se ne vratite na direktorij)
- npm i
- npm start
4. Na isti način doći do direktorijuma 'frontend' te kucati iste komande jednu za drugom:
- npm init (Enter sve dok se ne vratite na direktorij)
- npm i
- npm start
<p>Svi ostali potrebni podaci se nalaze ili u hairdresser.sql ili u fajlovima dostupnim na samom projektu.</p>
