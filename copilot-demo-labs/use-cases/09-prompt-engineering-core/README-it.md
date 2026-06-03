# Laboratorio 09 — Prompt Engineering: Tecniche Fondamentali

**Difficoltà**: `Base` | **Durata**: `50 min`

## Obiettivo
Padroneggiare 9 tecniche base di prompting per un'interazione efficace con Copilot.

**Perché fa la differenza?**
Un prompt debole porta a una code-review superficiale. Un buon prompt riesce trovare bugs *prima* che questi arrivino in produzione. Questo laboratorio mostra come ottenere risposte precise e le confronta con i risultati di domande generiche. 

**Tecniche di Prompting trattate:** Zero-shot · Few-shot · Role-based · Chain-of-Thought (CoT) · Meta Prompting · Self-Consistency · Generate Knowledge · Prompt Chaining · Anti-pattern Recognition
>**Riferimento:** [Prompting Guide — Techniques](https://www.promptingguide.ai/techniques)

## File
- `src/shopping_cart.py` | `src/shopping_cart.ts` | `src/shopping_cart.js` | `src/ShoppingCart.cs`

I quattro files sorgente sono equivalenti in termini di logica, per seguire il laboratorio scegline uno.

## Passi

> **Nota:** Ogni step è indipendente. Parti sempre dal codice originale, non da quello modificato negli step precedenti.

### 1 — Tecnica dello Zero-Shot Prompting nella Review del Codice: Prompt Vago e un Prompt più Specifico
Esegui il prompt vago zero-shot sul codice, poi quello specifico.

**🚫 Prompt vago:**
> "Fai una review di questo codice."

**✅ Prompt specifico zero-shot:**
> "Rivedi questa classe ShoppingCart agendo come un senior developer. Concentrati sulla validazione degli input, sui casi limite (prezzi negativi, quantità zero, sconto > 100%) e sulle convenzioni di denominazione. Elenca i problemi per gravità."

> **Osservazione:** Il prompt più specifico produce una revisione più strutturata e azionabile, mentre quello vago offre una overview generica. Essere specifici obbliga Copilot ad assumere il ruolo indicato di "Revisore Senior" e a concentrarsi sui tasks indicati.

### 2 — Tecnica dello Zero-Shot Prompting nel Refactoring del Codice: Prompt Vago e un Prompt più Specifico
Esegui il prompt vago zero-shot sul codice, poi quello specifico che include i vincoli.

**🚫 Prompt vago:**
> "Fai refactoring di questo codice."

**✅ Prompt specifico:**
> "Fai refactoring del metodo total() per estrarre il calcolo dello sconto in una funzione pura separata. Mantieni la retrocompatibilità. Spiega ogni modifica."

> **Osservazione:** Il prompt specifico estrae i calcoli in modo pulito, mentre quello vago si limita a riordinare e rinominare le variabili.

### 3 — Tecnica del Few-shot Prompting e Confronto con la Tecnica dello Zero-Shot Prompting
Esegui il prompt zero-shot sul codice, poi il prompt few-shot contenente l'esempio del pattern di validazione desiderato.

**🚫 Senza esempio (zero-shot):**
> "Aggiungi la validazione al metodo add."

**✅ Con esempio (few-shot):**
> "Aggiungi la validazione al metodo add. Come riferimento, ecco il pattern da usare:
> - Se name è vuoto, lancia ValueError('Name is required')
> - Se price < 0, lancia ValueError('Price must be non-negative')
> Segui lo stesso pattern per la validazione della variabile qty."

> **Osservazione:** Il prompt few-shot permette a Copilot di usare lo stile di error-handling predefinito invece di proporne uno generico. Mostra a Copilot ciò che vuoi ottenere tramite esempi, non limitarti a spiegarlo a parole.

### 4 — Tecnica del Role-based Prompting
Chiedi a Copilot di analizzare lo stesso codice come **security auditor**, poi di nuovo come **performance engineer**.

**🔒 Ruolo (security):**
> "Agisci come un revisore di sicurezza che fa review a questo codice prima del deploy in produzione. Identifica qualsiasi input che potrebbe causare un comportamento imprevisto, una corruzione dei dati o un errore di calcolo finanziario."

**🚀 Ruolo (performance):**
> "Agisci come performance engineer. Analizza questa classe ShoppingCart cercando colli di bottiglia, iterazioni non necessarie e inefficienze di memoria. Suggerisci ottimizzazioni."

> **Osservazione:** Nota come il focus cambi completamente dalle vulnerabilità degli input ai colli di bottiglia della memoria.

### 5 — Tecnica del Chain-of-Thought Prompting
Poni una domanda diretta e confronta la risposta con quella di un prompt che impone un ragionamento passo-passo (CoT).

**🚫 Prompt diretto:**
> "Il metodo total() è corretto?"

**✅ Prompt CoT:**
> "Analizza il metodo total() passo dopo passo:
> 1. Cosa calcola per prima cosa?
> 2. Quando viene applicato lo sconto? La formula di calcolo è corretta?
> 3. Cosa succede nei casi limite: sconto = 0, sconto = 100, sconto > 100?
> 4. L'arrotondamento è corretto?
> Mostra il tuo ragionamento per ogni passaggio prima di dare una risposta finale."

> **Osservazione:** CoT forza l'IA a "mostrare come ragiona", analizzando aspetti che il prompt diretto può ignorare.

### 6 — Tecnica del Meta Prompting
Corredare il quesito posto a Copilot della struttura da seguire per produrre la risposta.

**🚫 Prompt basato solo sul contenuto:**
> "Trova bug in questo codice e risolvili."

**✅ Prompt basato sulla struttura (meta):**
> "Analizza il mio codice e per ogni problema trovato, rispondi usando ESATTAMENTE questa struttura:
>
> **Categoria del problema** (validazione | logica | sicurezza | performance)
> **Location:** nome del metodo e riga
> **Problema:** descrizione del problema
> **Impatto:** cosa potrebbe andare storto in produzione
> **Fix:** proposta di correzione del codice
>
> Riporta tutti i problemi solo usando questo formato."

> **Osservazione:** La risposta aderisce alla struttura richiesta. Un output standardizzato e predicibile potrebbe teoricamente essere l'input di una pipeline di CI/CD, abilitando un automatismo.

### 7 — Tecnica della Self-Consistency
Porre la stessa domanda a Copilot in tre modi diversi e trovare le intersezioni nelle risposte.

**📝 Prompt A:**
> "Che bug ha questo codice?"

**📝 Prompt B:**
> "Se uso questo codice con gli edge cases (prezzi negativi, sconto = 150%, quantità = 0, nome vuoto), cosa non funziona?"

**📝 Prompt C:**
> "Scrivi degli unit test che fallirebbero con questa implementazione. Concentrati sui casi limite."

**🔍 Poi confronta (Prompt D):**
> "Confronta le tre analisi appena fatte. Quali problemi sono comparsi in tutte e tre? Quelli sono i bug confermati. Quali sono apparsi solo in una?"

> **Osservazione:** I problemi segnalati in tutti e tre gli output sono bug sicuri. I problemi trovati solo in uno potrebbero essere allucinazioni.

### 8 — Tecnica del Generate Knowledge Prompting
Consiste nel far generare all'IA il contesto teorico *prima* di farle analizzare il codice. Invece di farle cercare subito i bug, chiedi a Copilot di elencare teoricamente quali sarebbero le regole ideali per un carrello e-commerce perfetto (es: lo sconto non può superare 100%, i prezzi non possono essere negativi, ecc.). Una volta generata questa "lista di controllo", fagli valutare il codice misurandolo contro le regole che ha appena scritto.

**🧠 Step 1 (Conoscenza):**
> "Elenca le regole di business che un carrello della spesa pronto per la produzione dovrebbe rispettare: validazione degli input, regole di prezzo, vincoli sugli sconti, casi limite e requisiti di accuratezza finanziaria."

**🔍 Step 2 (Grounded analysis):**
> "Ora confronta l'implementazione di ShoppingCart attuale con le regole elencate. Per ogni regola, indica se è rispettata, parzialmente rispettata o mancante. Fornisci la soluzione per ogni regola mancante."

> **Osservazione:** L'IA intercetta lacune che sarebbero sfuggite con una semplice code-review. Il Generate Knowledge serve a stimolare il focus dell'IA sullo specifico dominio, trasformando una controllo astratto in una checklist completa di verifica.

### 9 — Tecnica del Prompt Chaining
Esegui i 4 prompt in sequenza, passando di volta in volta l'output dello step precedente come prompt dello step successivo.

**🔗 Prompt 1:**
> "Elenca tutti i metodi pubblici nel mio codice, i loro parametri e tipi di ritorno."

**🔗 Prompt 2:**
> "Per ogni metodo elencato sopra, identifica se manca la validazione dell'input. Sii specifico su quali controlli mancano."

**🔗 Prompt 3:**
> "Genera il codice di validazione per tutti i problemi trovati nel passaggio precedente. Mantieni invariate le firme dei metodi esistenti."

**🔗 Prompt 4:**
> "Scrivi degli unit test per la logica di validazione aggiunta nel passaggio precedente. Copri sia gli input validi che quelli non validi."

> **Osservazione:** I task complessi diventano semplici quando spezzettati. L'intera filiera (analisi -> patch -> Unit Testing) funziona in pochi click.

### 10 — Tecnica di Anti-pattern Recognition Prompting
Eseguire il prompt sulla "gestione generica degli errori", poi il prompt che mira alle validazioni specifiche.

**☠️ Prompt pericoloso:**
> "Aggiungi la gestione degli errori a tutti i metodi."

**🛡️ Prompt più sicuro:**
> "Implementa una validazione logica rigorosa e immediata sui parametri in ingresso. Se un input non è valido (es. quantità negative, sconti > 100%), solleva immediatamente un'eccezione descrittiva e blocca l'operazione. Tassativo: NON usare blocchi di cattura generici (come try-catch o try-except) per ignorare o silenziare le eccezioni logiche."

> **Osservazione:** Chiedere a Copilot semplicemente di "evitare crash" lo può guidare verso un pericoloo anti-pattern (il cosiddetto *Pokemon Exception Handling*), portandolo ad inserire blocchi `catch` / `except` vuoti ovunque. Questo può nascondere potenziali bug. Un prompt sicuro invece impone un approccio a *Tolleranza Zero* (o Blocco Immediato): un'anomalia deve sollevare un errore evidente e bloccare il flusso, per essere analizzata correttamente.

## Attenzione
- I prompt vaghi possono comunque produrre un buon output su codice semplice — la differenza diventa evidente su logica complessa.
- I prompt role-based possono portare Copilot a concentrarsi troppo su un'area (es. sicurezza) ignorando le altre.
- Gli esempi few-shot potrebbero influenzare troppo l'output — Copilot potrebbe copiare il pattern anche dove non si applica.
- I prompt CoT possono produrre output verboso — è atteso e fa parte del valore aggiunto del ragionamento.
- La self-consistency funziona meglio quando i tre prompt sono genuinamente diversi per "angolazione di lettura" del problema, non parafrasi della stessa richiesta.

## Recap — Combinare le Tecniche 🧩
Le tecniche viste finora diventano ancora più potenti quando vengono combinate in un singolo prompt o in una sequenza. Ecco 3 esempi pratici.

---

### Esempio 1: Role-based + Chain-of-Thought + Meta Prompting
Un audit di sicurezza strutturato con ragionamento esplicito.

> "Agisci come un **security auditor** senior. Analizza la classe ShoppingCart passo dopo passo:
> 1. Quali input dell'utente non sono validati?
> 2. Quali valori limite possono causare comportamenti imprevisti?
> 3. Quali calcoli finanziari possono produrre risultati errati?
>
> Per ogni problema trovato, rispondi usando questa struttura:
> **Severità:** (critica | alta | media | bassa)
> **Location:** metodo e riga
> **Problema:** descrizione
> **Exploit:** come un utente malintenzionato potrebbe sfruttarlo
> **Fix:** codice correttivo"

**Perché funziona:** Il ruolo focalizza l'analisi sulla sicurezza, il CoT forza un ragionamento sistematico, il meta prompting garantisce un output uniforme e azionabile.

---

### Esempio 2: Generate Knowledge + Prompt Chaining + Few-shot
Una validazione completa guidata dalle regole di dominio.

> **Prompt 1:** "Elenca le regole di business che un carrello e-commerce pronto per la produzione deve rispettare (validazione input, vincoli prezzi, limiti sconti, accuratezza finanziaria)."
>
> **Prompt 2:** "Confronta il codice di ShoppingCart con le regole appena elencate. Per ogni regola mancante, genera il codice di validazione seguendo questo pattern:
> - Se `price < 0`, lancia `ValueError('Price must be non-negative')`
> - Se `discount > 100`, lancia `ValueError('Discount cannot exceed 100%')`
> Applica lo stesso stile a tutte le validazioni mancanti."

**Perché funziona:** Il Generate Knowledge crea la checklist di riferimento, il chaining collega analisi e implementazione, il few-shot standardizza lo stile del codice generato.

---

### Esempio 3: Self-Consistency + Role-based + Anti-pattern Recognition
Approccio "multi-prospettiva" per separare i bugs reali da eventuali falsi positivi.

> **Prompt A (ruolo di collaudatore):** "Agisci come collaudatore del software. Se scrivessi dei test per questa classe (inclusi casi limite come prezzi negativi, sconti oltre 100%, quantità zero), quali test fallirebbero? Per ognuno, spiega perché."
>
> **Prompt B (ruolo di attaccante):** "Agisci come un penetration tester. Quali input causerebbero un comportamento scorretto o un calcolo errato?"
>
> **Prompt C (anti-pattern):** "Identifica gli anti-pattern presenti nel codice (es. gestione generica degli errori, validazione assente). Per ognuno, spiega il rischio concreto in produzione."
>
> **Prompt D (sintesi):** "Confronta le tre analisi precedenti. Elenca solo i problemi confermati da almeno due prospettive. Ignora i problemi citati una sola volta."

**Perché funziona:** Tre angolazioni diverse riducono le allucinazioni. La sintesi finale filtra il rumore e produce una lista di bug ad alta confidenza.

## Output Atteso
- Differenza visibile di qualità tra prompt vaghi e specifici
- Prompt CoT che portano alla luce bug che nei prompt diretti potrebbero non essere segnalati
- Il meta prompting che produce output strutturato e coerente
- Self-consistency che rivela problemi confermati vs. falsi positivi
- Generate Knowledge che cattura violazioni di regole che nei prompt diretti potrebbero non essere segnalate
- Prompt chaining che produce una soluzione completa dalla validazione ai test
- Anti-pattern recognition che mostra come la gestione generica degli errori nasconda bug
- Le combinazioni di tecniche producono risultati superiori rispetto alle singole tecniche usate in isolamento

## Completato Quando
- Hai eseguito entrambi i prompt per ogni coppia e confrontato gli output.
- Hai provato almeno uno dei 3 esempi di combinazione e osservato la differenza rispetto a una singola tecnica.