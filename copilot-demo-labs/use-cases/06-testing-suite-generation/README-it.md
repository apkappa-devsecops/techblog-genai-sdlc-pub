# Laboratorio 06 - Generazione Suite di Test

**Difficoltà**: `Intermedio` | **Durata**: `40 min`

## Obiettivo
Generare una suite di test che comprenda test unitari, di integrazione, di carico, di sicurezza e di UI.

## Applicativo Web
Un servizio di pagamento minimale costruito con Node.js ed Express. L'utente inserisce email, importo, numero di carta e un coupon opzionale tramite un form HTML. Il server valida la carta, applica l'eventuale sconto, salva ordine e pagamento su un database SQLite e restituisce il risultato. Due endpoint sono esposti: `POST /pay` per elaborare un pagamento e `GET /orders/:id` per recuperare l'ordine associato.

## Eseguire l'App (Opzionale)
1. Installare [Node.js](https://nodejs.org) (v14+).
2. Da questa cartella, eseguire:
   ```bash
   npm install
   npm start
   ```
3. Aprire `http://localhost:3000` nel browser.

## Files
- `src/payment.js` — logica di pagamento (validazione, sconto, elaborazione).
- `src/db.js` — livello di accesso al DB (inserimento/lettura customers, orders, payments).
- `src/server.js` — server Express che espone `POST /pay` e `GET /orders/:id`.
- `src/public/index.html` — form di pagamento minimale (UI).
- `src/schema.sql` — schema DB (customers, orders, payments).

## Passi
1. Aggiungi la cartella `src` come contesto di conversazione con Copilot e chiedi di generare test unitari completi, includendo i casi limite e spiegando come il test gestisce situazioni anomale o input non validi.
2. Fornisci anche `src/schema.sql` come contesto e chiedi degli scenari di integrazione che coprano il flusso di pagamento end-to-end (validazione → persistenza → stati).
3. Chiedi un piano di test per test di carico, sicurezza e UI: quali scenari testare e come misurare se il test passa o fallisce, eventualmente suggerendo il tool/strumento da utilizzare.

## Esempi di Prompt
- "Genera test unitari per i sorgenti del progetto sfruttando il framework Jest, senza eseguirli. Includi i casi limite (importo zero, valori negativi, coupon non valido, carta con lunghezza errata) ed esplicita la gestione di situazioni anomale e input non validi. Prima del codice, produci una tabella riassuntiva (scenario → risultato atteso)."
> **Attenzione:** I test generati dall'AI potrebbero importare moduli inesistenti o usare una sintassi errata del framework. Per evitarlo prova ad aggiungere al prompt un'istruzione del tipo: *Elenca ogni import e dipendenza esterna usata nei test generati. Per ciascuna, conferma se esista nel progetto o se sia un pacchetto realmente installabile.*
- "Sulla base dell'analisi del codice sorgente, proponi test di integrazione per le API REST del progetto sfruttando Jest e Supertest, senza eseguirli. Nei test verifica i flussi principali end-to-end, inclusa la persistenza su DB e la gestione degli errori. Per ogni test indica: scenario, precondizioni, passi, risultato atteso."
> **Attenzione:** I test unitari e di integrazione generati dall'AI potrebbero asserire ciò che il codice fa anziché ciò che dovrebbe fare — passano ma non intercettano bug. Ad esempio, se il codice applica uno sconto anche quando non dovrebbe, il test generato confermerà quel comportamento errato anziché segnalarlo. Per evitarlo prova ad aggiungere al prompt un'istruzione del tipo: *Per ogni test, spiega quale regola di business viene validata. Segnala i test che asseriscono solo il valore di ritorno attuale senza verificarne la corrispondenza con una regola di business.*
- "Sulla base dell'analisi del codice sorgente, crea uno schema strutturato per test di carico, di sicurezza e di UI. Per ogni categoria indica: tool/framework consigliato, almeno 3 scenari concreti con criteri di successo/fallimento misurabili. L'artefatto deve essere un documento pronto per la condivisione con gli sviluppatori." / "Sulla base dell'analisi del codice sorgente, crea uno schema strutturato per test di carico, di sicurezza e di UI. Per ogni categoria indica almeno 3 scenari concreti con criteri di successo/fallimento misurabili. I tools di riferimento sono i seguenti: JMeter per tests di carico, OWASP ZAP per i test di sicurezza, Selenium per i tests della UI. L'artefatto deve essere un documento pronto per la condivisione con gli sviluppatori."
> **Attenzione:** Gli scenari ipotizzati dall'IA per i test di integrazione e di carico possono risultare troppo astratti per essere implementabili. Per evitarlo prova ad aggiungere al prompt un'istruzione del tipo: *Per ogni scenario di test, aggiungi un esempio concreto con prerequisiti, configurazione del tool, dati di input, chiamata specifica a endpoint o funzione, e una soglia misurabile di successo/fallimento.*

## Output Atteso
- File di test unitari eseguibili per il linguaggio scelto
- Elenco strutturato di scenari di integrazione legati allo schema DB
- Elenco di passaggi per i test di carico, di sicurezza e di UI con i tools suggeriti/imposti e criteri misurabili

## Completato Quando
- I test unitari coprono i casi limite (per esempio valori nulli o negativi, coupon assente/non valido, carta troppo corta/lunga)
- I test di integrazione fanno riferimento a tabelle e vincoli dello schema DB indicato
- Ogni categoria di test ha almeno 3 scenari con criteri di successo/fallimento