# Laboratorio 12 - Analisi Log e Correlazione

**Difficoltà**: `Intermedio` | **Durata**: `15 min`

## Obiettivo
Ricostruire la timeline di un incidente, correlare gli errori tra servizi e proporre regole di alerting per intercettare pattern critici prima che diventino una sequenza di errori a cascata.

## File
- `logs/app.log` — logs di un sistema distribuito con tracce di checkout, pagamenti, ordini e notifiche

## Passi
1. Apri e analizza il file `logs/app.log` per identificare i pattern di errore.
2. Chiedi a Copilot di costruire una timeline di eventi correlando gli eventi per `request_id`.
3. Chiedi di correlare i timeout e gli errori tra i servizi coinvolti e proponi una probabile root cause.
4. Chiedi regole di alerting in pseudocodice per intercettare il pattern prima che diventi critico.
5. Chiedi suggerimenti di implementazione per le regole di alerting.

## Esempi di Prompt

> **Nota:** I 4 prompt formano una catena completa (Prompt Chaining): log → timeline → root cause → alerting → monitoraggio. Ogni prompt usa l'output del precedente come contesto.

**Tecniche utilizzate:** Prompt Chaining · Meta Prompting
- "Riassumi questo log come timeline incidente correlando gli eventi per `request_id`."

**Tecniche utilizzate:** Prompt Chaining · Chain-of-Thought
- "Correla timeout ed errori e proponi una probabile root cause."

**Tecniche utilizzate:** Prompt Chaining · Directional Stimulus
- "Suggerisci regole di alerting per intercettare prima questo pattern sottoforma di pseudocodice e basate sui campi già presenti nei log. Proponi suggerimenti di implementazione."
> **Attenzione:** L'AI potrebbe inventare correlazioni non supportate dai dati (es. request ID non collegati). Verifica che timestamp e request ID siano davvero collegati e che la root cause sia supportata da evidenze nel log.

**Tecniche utilizzate:** Prompt Chaining · Generate Knowledge
- "Proponi metriche e dashboard per monitorare questo pattern in produzione."

## Output Atteso
- Timeline degli eventi correlati per request_id
- Analisi della root cause con evidenze dal log
- Regole di alerting in pseudocodice basate sui campi presenti
- Suggerimenti di implementazione (stack di monitoring, circuit breaker, timeout tuning)

## Completato Quando
- La timeline mostra la sequenza di eventi per ogni request_id
- Le correlazioni sono supportate da timestamp e request ID nel log
- Le regole di alerting catturano il pattern specifico (non generiche come "alert su ogni errore")
- I suggerimenti di implementazione sono concreti e applicabili
