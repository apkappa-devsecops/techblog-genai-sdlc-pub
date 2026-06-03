# Laboratorio 10 — Prompt Engineering: Tecniche Avanzate

**Difficoltà**: `Intermedio` | **Durata**: `50 min`

## Obiettivo
Estendere il Lab 09 con 7 tecniche avanzate per esplorare alternative, far auto-correggere l'IA e automatizzare la generazione dei prompt.

**Tecniche trattate:** Tree of Thoughts (ToT) · Directional Stimulus · Reflexion · ReAct · Active Prompt · ART (Automatic Reasoning and Tool-use) · Automatic Prompt Engineer (APE)
>**Riferimento:** [Prompting Guide — Techniques](https://www.promptingguide.ai/techniques)

## File
- `specs/scenario.md` — regole di business e problemi noti
- `src/order_management.py` | `src/order_management.ts` | `src/order_management.js` | `src/OrderManagement.cs`

I quattro file sorgente contengono la stessa logica di gestione ordini (Inventory, Notification, Order) e contengono dei bug intenzionali. Leggi prima lo scenario, poi scegli un file.

## Passi

> **Nota:** Ogni step è indipendente. Parti sempre dal codice originale, non da quello modificato negli step precedenti.

### 1 — Tecnica del Tree of Thoughts (ToT) Prompting
Chiedi a Copilot di considerare più approcci di soluzione per il bug tassa/sconto prima di sceglierne uno. Confronta la qualità dell'approccio scelto rispetto a un prompt diretto "correggi questo".

**🚫 Prompt diretto:**
> "Correggi il bug del calcolo tassa/sconto nel metodo place()."

**✅ Prompt ToT:**
> "Devo correggere il bug del calcolo tassa/sconto nel metodo place(). Considera tre approcci diversi:
>
> **A) Fix in-place** — correggi l'ordine aritmetico nel metodo esistente.
> **B) Estrai un PriceCalculator** — sposta il calcolo in una classe/funzione separata con responsabilità chiare.
> **C) Pattern pipeline** — modella il calcolo come sequenza di trasformazioni (subtotale → sconto → tassa → totale).
>
> Per ogni approccio:
> 1. Descrivi l'implementazione
> 2. Elenca pro e contro
> 3. Stima la complessità e il rischio di introdurre nuovi bug
>
> Poi raccomanda l'approccio migliore e implementalo."

> **Osservazione:** Il modello valuta i compromessi quando gli si chiede di confrontare più opzioni. Con un prompt diretto, propone il primo approccio che gli viene in mente senza considerare alternative.

### 2 — Tecnica del Directional Stimulus Prompting
Confronta un prompt di review generico con uno che include un suggerimento strategico che punta Copilot verso il bug nell'ordine aritmetico.

**🚫 Senza stimolo direzionale:**
> "Fai review della classe Order e trova i bug."

**✅ Con stimolo direzionale:**
> "Fai review della classe Order. Presta particolare attenzione all'ordine delle operazioni aritmetiche nel metodo place() — sospetto che il calcolo finanziario possa applicare tassa e sconto nella sequenza sbagliata."

> **Osservazione:** Il prompt non guidato può concentrarsi su problemi superficiali (null check mancanti). Il prompt guidato punta immediatamente al bug aritmetico più sottile. Attenzione: se il suggerimento punta nella direzione sbagliata, l'analisi seguirà quella direzione errata.

### 3 — Tecnica della Reflexion
Chiedi a Copilot di correggere i bug, poi chiedigli immediatamente di criticare la propria correzione. Osserva se l'auto-revisione cattura casi limite che il fix iniziale ha mancato.

**🔗 Fase 1 — Genera il fix:**
> "Correggi tutti i bug nel metodo place() basandoti sulle regole di business in scenario-it.md."

**🔗 Fase 2 — Auto-revisione:**
> "Ora rivedi criticamente la tua stessa correzione:
> 1. Gestisce tutti i casi limite? (ordine vuoto, sconto = 0, sconto = 100%, prezzi negativi)
> 2. Rispetta TUTTE le regole di business di scenario.md?
> 3. La notifica viene chiamata con dati completi (ID ordine, totale, lista articoli)?
> 4. Questa correzione potrebbe introdurre nuovi bug?
>
> Se trovi problemi, fornisci una versione corretta."

> **Osservazione:** La fase di auto-revisione quasi sempre cattura almeno un caso limite che il fix iniziale ha mancato. Qui è l'IA stessa a criticarsi, non l'utente a guidarla.

### 4 — Tecnica del ReAct (Reasoning + Acting)
Chiedi a Copilot di fare debug usando un ciclo strutturato Pensiero → Azione → Osservazione. Confronta la profondità dell'analisi con un prompt diretto "trova i bug".

**🚫 Prompt diretto:**
> "Trova tutti i bug nel codice di gestione ordini."

**✅ Prompt ReAct:**
> "Fai debug del sistema di gestione ordini passo dopo passo usando questo approccio strutturato. Per ogni passo:
>
> **PENSIERO:** Cosa sospetti possa essere sbagliato? Perché?
> **AZIONE:** Quale parte specifica del codice esaminerai?
> **OSSERVAZIONE:** Cosa hai trovato in quel codice?
>
> Ripeti questo ciclo finché non hai trovato tutti i bug. Poi riassumi le scoperte e fornisci i fix.
>
> Inizia con PENSIERO 1."

> **Osservazione:** Il formato ReAct è verboso ma produce un log di debug tracciabile. Ogni scoperta è ancorata a un'osservazione specifica sul codice. Il prompt diretto può elencare bug senza mostrare come sono stati trovati.

### 5 — Tecnica dell'Active Prompt
Fornisci a Copilot esempi annotati con il tuo grado di incertezza, così che l'IA si concentri sulle aree dove hai più dubbi.

**🚫 Prompt generico:**
> "Trova i problemi nel metodo place()."

**✅ Prompt Active:**
> "Analizza il metodo place(). Ti fornisco le mie annotazioni su cosa mi sembra corretto e cosa no:
>
> - ✅ SICURO: il controllo stock funziona correttamente
> - ❓ INCERTO: l'ordine di applicazione tassa/sconto — non so se sia giusto
> - ❓ INCERTO: la notifica — non sono sicuro che venga chiamata
> - ✅ SICURO: la struttura dati dell'ordine è corretta
>
> Concentrati SOLO sugli elementi marcati come INCERTO. Per ognuno, dimmi se il mio dubbio è fondato e perché."

> **Osservazione:** Annotare l'incertezza guida l'IA verso le aree che contano davvero, evitando analisi ridondanti su parti già verificate. È particolarmente utile su codebase grandi dove non si vuole una review completa ma mirata.

### 6 — Tecnica ART (Automatic Reasoning and Tool-use)
Chiedi a Copilot di combinare un ragionamento passo-passo con l'uso esplicito di "strumenti" (funzioni, comandi, query) per risolvere il problema.

**🚫 Prompt senza struttura tool-use:**
> "Il calcolo del totale è sbagliato. Correggilo."

**✅ Prompt ART:**
> "Risolvi il bug nel calcolo del totale ordine usando questo approccio strutturato. Per ogni passo, alterna ragionamento e uso di strumenti:
>
> **RAGIONAMENTO:** Qual è la regola di business? (subtotale → sconto → tassa)
> **STRUMENTO [calcolo]:** Calcola il risultato atteso per un ordine da 100.00 con sconto 10% e tassa 22%.
> **RAGIONAMENTO:** Cosa produce invece il codice attuale?
> **STRUMENTO [trace]:** Esegui mentalmente il metodo place() con gli stessi valori e mostra ogni passaggio intermedio.
> **RAGIONAMENTO:** Dove divergono i due risultati?
> **STRUMENTO [fix]:** Scrivi il codice corretto.
>
> Segui esattamente questa sequenza."

> **Osservazione:** ART rende esplicito *quando* l'IA ragiona e *quando* usa uno strumento (calcolo, trace, generazione codice). Questo produce risposte più affidabili perché ogni conclusione è ancorata a un'azione verificabile.

### 7 — Tecnica dell'Automatic Prompt Engineer (APE)
Invece di scrivere tu il prompt perfetto, chiedi a Copilot di generare il prompt migliore per un dato obiettivo. Poi usa quel prompt generato.

**🔗 Fase 1 — Genera il prompt:**
> "Il mio obiettivo è trovare tutti i bug finanziari nel metodo place() di questo codice. Genera 3 prompt diversi che potrei usare per ottenere la migliore analisi possibile da un assistente IA. Per ogni prompt, spiega perché dovrebbe funzionare bene."

**🔗 Fase 2 — Usa il prompt migliore:**
> Copia il prompt che ti sembra più efficace tra i 3 generati e usalo in una nuova conversazione.

**🔗 Fase 3 — Confronta:**
> Confronta il risultato ottenuto con il prompt generato dall'IA rispetto a un tuo prompt scritto manualmente.

> **Osservazione:** L'IA spesso genera prompt più strutturati e completi di quelli che scriveremmo noi, perché "conosce" i pattern che producono le risposte migliori. APE è utile quando non sai da dove partire o vuoi ottimizzare un prompt esistente.

## Attenzione
- Tree of Thoughts funziona meglio quando chiedi 3+ approcci; con solo 2, il modello potrebbe non confrontare genuinamente.
- Directional Stimulus può introdurre bias — se il tuo suggerimento è sbagliato, l'analisi lo sarà pure.
- Reflexion può produrre auto-critica superficiale se il prompt non richiede specificità.
- ReAct è verboso by design — il valore sta nella traccia di ragionamento.
- Active Prompt richiede che tu abbia già un'idea parziale del codice — non funziona se parti da zero.
- ART può produrre "strumenti finti" — assicurati che i calcoli intermedi siano verificabili.
- APE può generare prompt troppo complessi — scegli quello più chiaro, non il più lungo.

## Output Atteso
- Tree of Thoughts che produce un confronto ragionato di almeno 3 strategie di fix
- Directional Stimulus che trova il bug tassa/sconto più velocemente del prompt non guidato
- Reflexion che cattura almeno un caso limite mancato dal fix iniziale
- ReAct che produce un log di debug tracciabile con ragionamento chiaro
- Active Prompt che focalizza l'analisi solo sulle aree di incertezza
- ART che produce una catena ragionamento-strumento verificabile passo passo
- APE che genera un prompt più efficace di quello scritto manualmente

## Completato Quando
- Hai provato tutte e 7 le tecniche e hai intuito quando ciascuna è più utile