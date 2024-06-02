// Bereiche des Formulars
const formularKleiderspende = document.getElementById("registrierungKleiderspende");
const adressEingabe = document.getElementById("eingabeAdresse");
const kleiderUndSpendenzielAuswahl = document.getElementById("auswahlKleidungKrisengebiet");

// Eingabefelder des Formulars
const vorOrtOption = document.getElementById("vorOrt");
const abholungOption = document.getElementById("abholung");
const vorname = document.getElementById("vorname");
const nachname = document.getElementById("nachname");
const strasseUndNummer = document.getElementById("strasseUndNummer");
const plz = document.getElementById("plz");
const stadt = document.getElementById("stadt");
const artKleidung = document.getElementById("artKleidung");
const artKleidungOptionen = document.getElementById("artKleidungOptionen");
const spendenziel = document.getElementById("spendenziel");

// Definition für gültige Postleitzahlen
const plzRegExp = /^50\d{3}$/;

// Gesamtvalidierungsstatus des Formulars
let istFormularGueltig = true;

// Event-Listener für die Auswahloptionen hinzufügen
vorOrtOption.addEventListener("change", zeigeFormular);
abholungOption.addEventListener("change", zeigeFormular);

function zeigeFormular() {
    const adressEingabefelder = [vorname, nachname, strasseUndNummer, plz, stadt];

    if (abholungOption.checked) {
        adressEingabe.style.display = "block";

        adressEingabefelder.forEach((feld) => {
            feld.setAttribute("required", "required");
        });

        validiereAdresseBeiAenderung();
    } else {
        adressEingabe.style.display = "none";

        adressEingabefelder.forEach((feld) => {
            feld.removeAttribute("required");
        });
    }
    kleiderUndSpendenzielAuswahl.style.display = "block";

    validiereEingabeBeiAenderung(artKleidungOptionen, istArtKleidungGueltig, kleidungFehler);
    validiereEingabeBeiAenderung(spendenziel, istSpendenzielGueltig, spendenzielFehler);
}

function validiereEingabeBeiAenderung(eingabeId, validierungsArgument, fehlermeldung) {
    eingabeId.addEventListener("change", () => {
        validiereEingabe(eingabeId, validierungsArgument, fehlermeldung);
    });
}

function validiereFormularBeimAbsenden() {
    formularKleiderspende.addEventListener("submit", (event) => {
        event.preventDefault();
        istFormularGueltig = true; // Reset der globalen Variable vor jeder Überprüfung

        if (abholungOption.checked) {
            validiereAdresse();
        }

        validiereEingabe(artKleidungOptionen, istArtKleidungGueltig, kleidungFehler);
        validiereEingabe(spendenziel, istSpendenzielGueltig, spendenzielFehler);

        if (istFormularGueltig) {
            speichereFormularDaten();
            formularKleiderspende.reset();
            window.location.href = "abschluss.html";
        }
    });
}

// Hilfsfunktion zur Validierung eines einzelnen Feldes
function validiereEingabe(eingabeId, validierungsArgument, fehlermeldung) {
    const istGueltig = validierungsArgument();
    const error = eingabeId.parentNode.querySelector('span');
    if (!istGueltig) {
        eingabeId.classList.add('invalid');
        eingabeId.classList.remove('valid');
        error.textContent = fehlermeldung;
        istFormularGueltig = false; // Setzen der globalen Variable auf false bei ungültigem Feld
    } else {
        eingabeId.classList.add('valid');
        eingabeId.classList.remove('invalid');
        error.textContent = "";
    }
}

function validiereAdresse() {
    validiereEingabe(vorname, istVornameGueltig, vornameFehler);
    validiereEingabe(nachname, istNachnameGueltig, nachnameFehler);
    validiereEingabe(strasseUndNummer, istStrasseUndNummerGueltig, strasseUndNummerFehler);
    validiereEingabe(plz, istPlzGueltig, plzFehler);
    validiereEingabe(stadt, istStadtGueltig, stadtFehler);
}

function validiereAdresseBeiAenderung() {
    validiereEingabeBeiAenderung(vorname, istVornameGueltig, vornameFehler);
    validiereEingabeBeiAenderung(nachname, istNachnameGueltig, nachnameFehler);
    validiereEingabeBeiAenderung(strasseUndNummer, istStrasseUndNummerGueltig, strasseUndNummerFehler);
    validiereEingabeBeiAenderung(plz, istPlzGueltig, plzFehler);
    validiereEingabeBeiAenderung(stadt, istStadtGueltig, stadtFehler);
}

// Vorgaben für gültige Eingaben
const istVornameGueltig = () => vorname.value !== '';
const istNachnameGueltig = () => nachname.value !== '';
const istStrasseUndNummerGueltig = () => strasseUndNummer.value !== '';
const istPlzGueltig = () => plzRegExp.test(plz.value);
const istStadtGueltig = () => stadt.value !== '';
const istArtKleidungGueltig = () => document.querySelectorAll('#auswahlKleidungKrisengebiet input[type="checkbox"]:checked').length > 0;
const istSpendenzielGueltig = () => spendenziel.value !== '';

// Fehlermeldungen
const vornameFehler = "Bitte geben Sie einen Namen ein.";
const nachnameFehler = "Bitte geben Sie einen Nachnamen ein."
const strasseUndNummerFehler ="Bitte geben Sie Ihre Straße und Ihre Hausnummer ein."
const plzFehler = "Bitte geben Sie eine gültige Postleitzahl im Bereich 50xxx ein.";
const stadtFehler ="Bitte geben Sie Ihren Wohnort ein."
const kleidungFehler = "Bitte wählen Sie mindestens eine Kleidungsart aus.";
const spendenzielFehler = "Bitte wählen Sie einen Ort aus.";


function speichereFormularDaten() {
    const uebergabeKleiderspende = formularKleiderspende.elements["uebergabe"].value;

    let adressDaten = [];
    if (abholungOption.checked) {
        const adressEingabefelder = document.querySelectorAll("#eingabeAdresse input");
        adressEingabefelder.forEach(input => {
            adressDaten.push(input.value);
        });
    } else {
        adressDaten = null; // Setze adressDaten auf null, damit es auf abschluss.html korrekt angezeigt wird
    }

    const kleiderCheckboxen = document.querySelectorAll('input[type="checkbox"]');
    const ausgewaehlteKleider = [];
    kleiderCheckboxen.forEach(checkbox => {
        if (checkbox.checked) {
            ausgewaehlteKleider.push(checkbox.value);
        }
    });

    const spendenziel = document.getElementById("spendenziel").value;

    sessionStorage.setItem("uebergabeKleiderspende", uebergabeKleiderspende);
    sessionStorage.setItem("adressDaten", JSON.stringify(adressDaten));
    sessionStorage.setItem("ausgewaehlteKleider", JSON.stringify(ausgewaehlteKleider));
    sessionStorage.setItem("spendenziel", spendenziel);
}

validiereFormularBeimAbsenden();
