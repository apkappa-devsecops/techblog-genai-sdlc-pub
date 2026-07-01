# Laboratorio 04 - Debugging Semplice

**Difficoltà**: `Base` | **Durata**: `10 min`

## Obiettivo
Trovare e correggere errori evidenti (sintassi o runtime immediato).

## File
- `src/config_loader.py`
- `src/config_loader.ts`
- `src/config_loader.js`
- `src/config_loader.cs`

I files contengono una logica equivalente di caricamento configurazione in linguaggi diversi e possono essere usati come punti di partenza alternativi per il laboratorio.

## Passi
1. Apri il file nel linguaggio che preferisci.
2. Chiedi a Copilot di trovare bug evidenti e suggerire una correzione minima.
3. Chiedi 3 controlli rapidi per validare la correzione.

## Prompt

### 1 — Trova e correggi i bug
**Tecnica utilizzata:** Chain-of-Thought

**🚫 Prompt vago:**
> "Trova i bug in questo file e correggili, motivando la correzione applicata."

**✅ Prompt con tecnica:**
> "Analizza questo file passo dopo passo per trovare i bug:
> 1. Leggi ogni riga e identifica qualsiasi errore sintattico o di runtime
> 2. Per ogni bug trovato: indica la riga esatta, spiega perché causa un errore e qual è l'effetto a runtime
> 3. Proponi una patch minima che corregga solo il bug senza ristrutturare il codice
>
> Non modificare nulla che non sia direttamente collegato al bug."

> **Osservazione:** Il CoT forza Copilot a ragionare riga per riga invece di riscrivere il codice. Il vincolo "patch minima" e "non modificare nulla che non sia collegato al bug" contrasta il rischio principale: che Copilot ristrutturi il codice invece di correggere il typo.

---

### 2 — Valida la correzione
**Tecnica utilizzata:** Meta Prompting

**🚫 Prompt vago:**
> "Dammi una patch minima e 3 controlli rapidi di validazione."

**✅ Prompt con tecnica:**
> "Genera 3 controlli di validazione per verificare che la correzione sia corretta. Per ogni controllo usa ESATTAMENTE questa struttura:
>
> **Input:** il valore o la condizione da testare
> **Azione:** cosa eseguire
> **Risultato atteso:** il valore esatto che ci si aspetta
> **Risultato senza la fix:** cosa sarebbe successo prima della correzione
>
> I controlli devono essere specifici e verificabili, non generici come 'verifica che funzioni'."

> **Osservazione:** Il Meta Prompting trasforma i controlli da vaghi a assertion verificabili. La colonna "risultato senza la fix" forza Copilot a dimostrare che il controllo avrebbe effettivamente fallito prima della correzione, evitando checklist inutili.

## Output Atteso
- Correzione mirata
- Checklist rapida di verifica

## Completato Quando
- Il file gira senza errori bloccanti

## Attenzione
- L'AI potrebbe correggere la cosa sbagliata, per esempio ristrutturare il codice invece di correggere il vero typo.
- I controlli di validazione potrebbero essere troppo vaghi ("verifica che funzioni") invece di assert specifici.






