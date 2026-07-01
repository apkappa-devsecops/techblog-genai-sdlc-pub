# Laboratorio 06 - Refactoring e Performance

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

### 1 — Refactoring per leggibilità
**Tecnica utilizzata:** Role-based

**🚫 Prompt vago:**
> "Rifattorizza questo codice per migliorare la leggibilità senza cambiare il comportamento. Spiega il perché di ogni eventuale modifica."

**✅ Prompt con tecnica:**
> "Agisci come un senior developer che fa code review prima di un merge. Identifica i problemi di leggibilità in questo codice e proponi una patch minima per risolverli. Per ogni modifica spiega cosa migliora e perché. Non aggiungere funzionalità non presenti e non cambiare la firma di `run_lab_variant`."

> **Osservazione:** Il ruolo di "reviewer prima del merge" focalizza Copilot su modifiche conservative e giustificate, riducendo il rischio che ristrutturi l'architettura invece di migliorare solo la leggibilità.

---

### 2 — Ottimizzazione per volumi elevati
**Tecnica utilizzata:** Chain-of-Thought

**🚫 Prompt vago:**
> "Ottimizza per volumi elevati e spiega la complessità prima e dopo."

**✅ Prompt con tecnica:**
> "Analizza le performance di questo codice passo dopo passo:
> 1. Qual è la complessità¹ attuale? Identifica ogni ciclo e spiega se è O(n), O(n²) o altro
> 2. Quali sono i colli di bottiglia con input di grandi dimensioni (es. migliaia di ordini con molti item)?
> 3. Proponi un'ottimizzazione concreta e calcola la nuova complessità
> 4. Verifica che l'ottimizzazione non cambi il risultato finale
>
> Mostra il ragionamento per ogni punto prima di proporre il codice."

> **Osservazione:** Il CoT forza Copilot a dimostrare la complessità¹ analizzando i cicli effettivi invece di dichiararla genericamente. Il punto 4 esplicito contrasta il rischio che l'ottimizzazione cambi silenziosamente il comportamento.

---

### 3 — Piano di test di regressione
**Tecnica utilizzata:** Self-Consistency

**🚫 Prompt vago:**
> "Proponi 5 test di regressione per validare il refactoring."

**✅ Prompt con tecnica:**

**📝 Prompt A:**
> "Sei l'autore del refactoring. Quali test scriveresti per dimostrare che il comportamento non è cambiato?"

**📝 Prompt B:**
> "Sei il QA che deve approvare il merge. Quali scenari vorresti vedere coperti prima di dare il via libera?"

**📝 Prompt C:**
> "Sei un developer che usa `run_lab_variant` in produzione. Quali input ti preoccuperebbero di più dopo un refactoring?"

**🔍 Prompt D:**
> "Confronta i tre elenchi. Quali scenari compaiono in tutti e tre? Quelli sono i test di regressione essenziali. Genera il codice per ciascuno."

> **Osservazione:** Le tre prospettive producono angolazioni diverse — chi ha scritto il codice tende a coprire i casi tipici, il QA i casi limite, chi lo usa in produzione i casi di input anomali. L'intersezione produce i test più robusti.

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

## Nota
> ¹ **Complessità computazionale (notazione Big-O):** misura come cresce il tempo di esecuzione al crescere della dimensione dell'input. O(n) significa che il tempo cresce linearmente con il numero di elementi; O(n²) significa che raddoppiare l'input quadruplica il tempo. In questo lab, due cicli annidati su `orders` e `items` producono O(n×m) dove n è il numero di ordini e m il numero medio di item per ordine.






