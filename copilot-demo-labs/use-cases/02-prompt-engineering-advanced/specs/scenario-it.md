# Scenario: API di Gestione Ordini

Un piccolo backend e-commerce con tre moduli interconnessi.

## Moduli
1. **Inventory** — gestisce i livelli di stock dei prodotti
2. **Order** — crea ordini, valida lo stock, calcola i totali
3. **Notification** — invia la conferma dell'ordine (stub)

## Regole di Business
- Un ordine non può essere effettuato se un articolo è esaurito.
- Il totale dell'ordine deve includere la tassa (22%) applicata dopo lo sconto.
- Le notifiche devono includere ID ordine, totale e lista articoli.

## Problemi Noti
- Gli sconti superiori al 100% non vengono rifiutati (validazione del limite superiore mancante).
- La tassa viene applicata prima dello sconto anziché dopo.
- Il modulo di notifica non viene mai chiamato dopo la creazione dell'ordine.

## Il Tuo Compito
Usa le tecniche di prompt engineering di questo lab per:
1. Chiedere a Copilot di analizzare i tre moduli insieme e trovare i bug.
2. Raffinare iterativamente i tuoi prompt per ottenere fixes migliori.
3. Costruire una cheatsheet di prompts per task comuni del SDLC basandoti su ciò che ha funzionato.
