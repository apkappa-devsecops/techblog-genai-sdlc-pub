# Laboratorio 02 - Refactoring e Performance

**Difficoltà**: `Intermedio` | **Durata**: `15 min`

## Obiettivo
Migliorare leggibilità e performance senza cambiare il comportamento.

## File
- `src/ReportProcessor.cs`
- `src/ReportProcessor.py`
- `src/ReportProcessor.ts`
- `src/ReportProcessor.js`

I files contengono una logica equivalente di elaborazione report in linguaggi diversi e possono essere usati come punti di partenza alternativi per il laboratorio.

## Passi
1. Apri il file nel linguaggio che preferisci e chiedi a Copilot di identificare anomalie nel codice e colli di bottiglia.
2. Chiedi una patch di refactoring minima.
3. Chiedi ottimizzazioni per input di grandi dimensioni.
4. Chiedi un piano di test di regressione.

## Prompt
- "Rifattorizza questo codice per migliorare la leggibilità senza cambiare il comportamento. Spiega il perché di ogni eventuale modifica."
- "Ottimizza per volumi elevati e spiega la complessità prima e dopo."
- "Proponi 5 test di regressione per validare il refactoring."

## Output Atteso
- Patch di refactoring
- Miglioramento prestazionale con spiegazione
- Breve piano di test

## Completato Quando
- Il codice è piu pulito
- Non sono state introdotte regressioni evidenti

## Attenzione
- Il refactoring potrebbe cambiare il comportamento (es. rounding diverso, gestione null diversa). Controlla bene le differenze.
- Le affermazioni sulla complessità "Big-O" possono essere sbagliate: a volte l'AI dice "O(n)" senza verificare cicli annidati.
- I test proposti potrebbero non coprire completamente i casi critici che il refactoring doveva preservare.






