document.addEventListener("DOMContentLoaded", function () {
    const ausgabeElement = document.getElementById("ausgabe");

    // Auslesen der Daten vom Session Storage
    let spendenziel = sessionStorage.getItem("spendenziel");
    let abgabeKleider = sessionStorage.getItem("uebergabeKleiderspende");
    let ausgewaehlteKleider = JSON.parse(sessionStorage.getItem("ausgewaehlteKleider"));
    let adressDaten = JSON.parse(sessionStorage.getItem("adressDaten"));

    //Aufbereiten als String + Prüfen, dass er nicht leer ist, sonst wird Fehler angezeigt macht code robuster
    let kleiderString = ausgewaehlteKleider ? ausgewaehlteKleider.join(", ") : "";

     // Überprüfen, ob Daten vorhanden sind
    if (!spendenziel && !abgabeKleider && !ausgewaehlteKleider && !adressDaten) {
        ausgabeElement.innerHTML = ""; // Leert das Element, wenn keine relevanten Daten vorhanden sind
        return; // Beendet die Funktion, wenn keine relevanten Daten vorhanden sind
    }

    // Aktuelles Datum
    let aktuellesDatum = new Date();
    let formatiertesDatum = aktuellesDatum.toLocaleDateString("de-DE");
    let aktuelleUhrzeit = aktuellesDatum.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    if (adressDaten === null) {
        ausgabeElement.innerHTML = `
            <p><strong>Abgabe:</strong> ${abgabeKleider}</p>
            <p><strong>Spendenziel:</strong> ${spendenziel}</p>
            <p><strong>Art der Kleider:</strong> ${kleiderString}</p>
            <p><strong>Registriert am:</strong> ${formatiertesDatum} um ${aktuelleUhrzeit} Uhr</p>
        `;
    } else {
        ausgabeElement.innerHTML = `
            <p><strong>Abgabe:</strong> ${abgabeKleider}</p>
            <p><strong>Adresse:</strong></p>
            <p>${adressDaten[0]} ${adressDaten[1]}</p>
            <p>${adressDaten[2]}</p>
            <p>${adressDaten[3]} ${adressDaten[4]}</p>
            <p><strong>Spendenziel:</strong> ${spendenziel}</p>
            <p><strong>Art der Kleider:</strong> ${kleiderString}</p>
            <p><strong>Registriert am:</strong> ${formatiertesDatum} um ${aktuelleUhrzeit} Uhr</p>
        `;
    }

    sessionStorage.clear();
});
