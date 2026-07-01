# Laboratorio 09 - Analisi Debito Tecnico e Refactoring

**Difficoltà**: `Intermedio` | **Durata**: `20 min`

## Obiettivo
Analizzare il debito tecnico di un sistema esistente, proporre refactoring per risolverlo e valutare rischi e impatto delle modifiche.

## Contesto
Hai ereditato un sistema di fatturazione distribuito con debito tecnico noto e documentato. Il team precedente ha identificato dei problemi architetturali ma non ha avuto tempo di risolverli. Il tuo compito è:
1. Analizzare ogni voce del debito tecnico e capire l'impatto sul sistema
2. Proporre dei refactoring concreti per risolvere i problemi
3. Valutare rischi, breaking changes e priorità di intervento

## Files
- `docs/technical_documentation-it.md` — overview architetturale con sezione di debito tecnico
- `src/billing-engine.py` | `src/billing-engine.ts` | `src/billing-engine.js` | `src/billing-engine.cs` — logica di calcolo fatture

I file `billing-engine` contengono una logica equivalente in linguaggi diversi e possono essere usati come punti di partenza alternativi per il laboratorio.

## Passi
1. Leggi il file `docs/technical_documentation-it.md`, in particolare la sezione sul debito tecnico.
2. Apri il file `billing-engine` nel linguaggio che preferisci.
3. Per ogni voce di debito tecnico, chiedi a Copilot di analizzare l'impatto sul sistema (quali scenari di failure può causare? quali dati possono diventare inconsistenti?).
4. Chiedi di proporre un refactoring concreto per risolvere il problema più critico.
5. Chiedi di valutare rischi, breaking changes e effort stimato per ogni fix proposta.
6. Chiedi una roadmap di intervento prioritizzata.

## Esempi di Prompt

> **Nota:** I prompt 1, 2 e 3 sono indipendenti tra loro — possono essere eseguiti in qualsiasi ordine. Il prompt 4 è anch'esso indipendente, ma produce risultati più accurati se eseguito nella stessa conversazione dopo gli altri, perché sfrutta il contesto delle analisi e soluzioni già discusse.

### Prompt 1 — Analisi di impatto
📎 **Contesto da includere:** `docs/technical_documentation-it.md`

> "Analizza la sezione sul debito tecnico in `docs/technical_documentation-it.md`. Per ogni voce, spiega: (1) quale scenario di failure può causare, (2) quale impatto ha sugli utenti finali, (3) quali dati possono diventare inconsistenti. Per ogni scenario di failure, mostra un esempio concreto con dati di input e stato finale inconsistente. Usa i componenti e flussi descritti in `docs/technical_documentation-it.md`. Ordina per severità."

**Tecniche utilizzate:** Meta Prompting (struttura numerata imposta all'output) · Chain-of-Thought (ragionamento esplicito scenario → impatto → inconsistenza) · Generate Knowledge (il documento tecnico fornisce il contesto di dominio prima dell'analisi)

---

### Prompt 2 — Refactoring con gestione errori
📎 **Contesto da includere:** `docs/technical_documentation-it.md` + `src/billing-engine.py` (o il linguaggio scelto)

> "Considera questo debito tecnico: 'La deduzione del saldo a credito e la scrittura della fattura non sono nella stessa transazione DB'. Proponi un refactoring del codice in `src/billing-engine.py` per risolvere questo problema. Mostra il codice prima e dopo la modifica. Nella soluzione proposta, gestisci esplicitamente: (1) rollback in caso di errore, (2) retry logic, (3) logging per troubleshooting. Spiega il motivo di ogni scelta."

**Tecniche utilizzate:** Directional Stimulus (citazione esatta della voce di debito per focalizzare l'analisi) · Meta Prompting (struttura before/after + 3 vincoli numerati) · Chain-of-Thought ("spiega il motivo di ogni scelta")

<details>
<summary>🔬 Variante avanzata — Tree of Thoughts</summary>

**Quando è utile:** quando il problema ha più soluzioni architetturali valide (transazione unica, saga pattern, eventual consistency) e vuoi confrontarle prima di scegliere.

> "Considera questo debito tecnico: 'La deduzione del saldo a credito e la scrittura della fattura non sono nella stessa transazione DB'. Proponi 3 approcci diversi per risolvere il problema:
>
> **A) Transazione unica** — wrappa deduzione credito e scrittura fattura nella stessa transazione DB.
> **B) Saga pattern** — usa eventi compensativi per gestire il rollback.
> **C) Eventual consistency** — scrivi la fattura e riconcilia il credito in modo asincrono.
>
> Per ogni approccio: (1) mostra l'implementazione nel codice, (2) elenca pro e contro, (3) valuta rischio di inconsistenza dati e complessità operativa. Poi raccomanda l'approccio migliore per questo sistema e giustifica la scelta."

**Tecnica aggiuntiva:** Tree of Thoughts (Lab 02) — esplora alternative prima di convergere su una soluzione.

</details>

---

### Prompt 3 — Circuit breaker
📎 **Contesto da includere:** `docs/technical_documentation-it.md` + `src/billing-engine.py` (o il linguaggio scelto)

> "Considera questo debito tecnico: 'Nessun circuit breaker sull'integrazione SMTP'. Proponi una soluzione implementativa con le librerie/pattern specifici del linguaggio. Includi: configurazione, gestione fallback, metriche da monitorare. La soluzione deve essere implementabile con le librerie standard del linguaggio scelto e deve integrarsi con l'architettura descritta in `docs/technical_documentation-it.md`."

**Tecniche utilizzate:** Directional Stimulus (citazione esatta della voce di debito) · Generate Knowledge (vincolo di integrazione con l'architettura documentata) · Meta Prompting (output strutturato: configurazione, fallback, metriche)

---

### Prompt 4 — Roadmap prioritizzata
📎 **Contesto da includere:** `docs/technical_documentation-it.md` + `src/billing-engine.py` (o il linguaggio scelto)

> "Per ogni voce di debito tecnico, valuta e scrivi in un documento di analisi: (1) effort stimato (ore/giorni), (2) rischio di breaking changes, (3) impatto su performance, (4) dipendenze da risolvere prima. Per ogni stima, elenca le attività concrete necessarie: modifica codice, test unitari, test integrazione, migration dati, deploy, rollback plan. Giustifica la stima. Crea una roadmap di intervento prioritizzata."

**Tecniche utilizzate:** Meta Prompting (struttura a 4 dimensioni + formato attività concrete) · Chain-of-Thought ("giustifica la stima" forza il ragionamento esplicito) · Prompt Chaining (questo prompt chiude la catena: analisi → refactoring → valutazione → roadmap)

<details>
<summary>🔬 Variante avanzata — Reflexion</summary>

**Quando è utile:** quando vuoi validare la roadmap prodotta, specialmente le stime di effort che l'IA tende a sottovalutare.

> Dopo aver ottenuto la roadmap, aggiungi nella stessa conversazione:
>
> "Ora rivedi criticamente la roadmap che hai appena prodotto:
> 1. Le stime di effort sono realistiche per un team di 2-3 sviluppatori?
> 2. Ci sono dipendenze nascoste tra gli interventi che non hai considerato?
> 3. Quale intervento potrebbe richiedere più tempo del previsto e perché?
> 4. La sequenza proposta minimizza il rischio di regressioni?
>
> Se trovi problemi, correggi la roadmap."

**Tecnica aggiuntiva:** Reflexion (Lab 02) — l'IA critica il proprio output e lo migliora autonomamente.

</details>

## Output Atteso
- Analisi di impatto per ogni voce di debito tecnico con scenari di failure concreti
- Refactoring proposti per i problemi più critici
- Valutazione rischi, effort e breaking changes per ogni fix
- Roadmap di intervento prioritizzata

## Completato Quando
- Ogni voce di debito tecnico ha un'analisi di impatto, proposta di implementazione per la remedation con relativa stima
- La roadmap è realistica e tiene conto di dipendenze tra interventi