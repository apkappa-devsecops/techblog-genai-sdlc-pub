# Laboratorio 10 - Analisi Sicurezza

**Difficoltà**: `Intermedio` | **Durata**: `15 min`

## Obiettivo
Individuare vulnerabilità di sicurezza nel codice e proporre fixes pratiche con priorità basata sulla severità.

## Contesto
Ti viene sottoposto un servizio di autenticazione con vulnerabilità intenzionali (crittografia debole, credenziali hardcoded, token predicibili). Il tuo compito è:
1. Eseguire una security review completa e prioritizzata
2. Proporre patch minimali per le issues critiche
3. Produrre una checklist di prevenzione specifica per il codice analizzato

## Files
- `src/AuthService.py` | `src/AuthService.ts` | `src/AuthService.js` | `src/AuthService.cs` — logica di autenticazione

I file contengono una logica equivalente in linguaggi diversi e possono essere usati come punti di partenza alternativi per il laboratorio.

## Passi
1. Apri il file `AuthService` nel linguaggio che preferisci.
2. Chiedi a Copilot una security review completa.
3. Chiedi una patch minima per le issues ad alta severità.
4. Chiedi una checklist di prevenzione per il team, mirata a evitare di reintrodurre le stesse vulnerabilità in futuro.

## Esempi di Prompt

> **Nota:** I prompt 1, 2 e 3 formano una sequenza logica (review → patch → checklist) ma sono indipendenti — possono essere eseguiti singolarmente. Eseguirli nella stessa conversazione produce risultati più coerenti.

### Prompt 1 — Security review
📎 **Contesto da includere:** `src/AuthService.py` (o il linguaggio scelto)

> "Esegui una security review completa di questo codice. Identifica prima le vulnerabilità critiche legate a crittografia debole, autenticazione e gestione credenziali, poi analizza le altre categorie. Per ogni finding indica: (1) tipo di vulnerabilità, (2) impatto, (3) scenario di exploit concreto. Ordina per severità (critica, alta, media, bassa)."

**Tecniche utilizzate:** Role-based (implicito: revisore di sicurezza) · Meta Prompting (struttura imposta all'output per ogni finding) · Directional Stimulus ("identifica prima le vulnerabilità critiche legate a crittografia debole" focalizza l'analisi)

---

### Prompt 2 — Patch minimali
📎 **Contesto da includere:** `src/AuthService.py` (o il linguaggio scelto)

> "Proponi una patch minima per le issue ad alta severità, mostrando il codice prima e dopo la modifica. Per ogni patch proposta, spiega le implicazioni (es. dipendenze aggiuntive, gestione async, breaking changes). Verifica che la fix non introduca nuove vulnerabilità."

**Tecniche utilizzate:** Meta Prompting (formato before/after) · Chain-of-Thought ("spiega le implicazioni" e "verifica che la fix non introduca nuove vulnerabilità") · Reflexion (auto-verifica integrata nel prompt)

---

### Prompt 3 — Checklist di prevenzione
📎 **Contesto da includere:** `src/AuthService.py` (o il linguaggio scelto)

L'obiettivo è produrre regole concrete che il team possa adottare per non reintrodurre le stesse vulnerabilità in futuro.

> "Genera una checklist di prevenzione specifica per questo codice. Per ogni voce della checklist, cita la vulnerabilità specifica trovata in `src/AuthService` che la giustifica. Evita consigli generici non legati ai risultati della security review."

**Tecniche utilizzate:** Generate Knowledge (la review precedente fornisce il contesto) · Directional Stimulus ("cita la vulnerabilità specifica" ancora la checklist ai risultati reali) · Meta Prompting (formato checklist vincolato)

<details>
<summary>🔬 Variante avanzata — Self-Consistency</summary>

**Quando è utile:** quando vuoi distinguere le vulnerabilità reali dai falsi positivi, specialmente su codice più complesso di questo esempio.

> Esegui 4 prompt diversi nella stessa conversazione:
>
> **Prompt A:** "Agisci come penetration tester. Quali input a questo servizio di autenticazione causerebbero un bypass o un comportamento scorretto?"
>
> **Prompt B:** "Agisci come auditor di sicurezza applicativa. Quali standard OWASP e CWE vengono violati da questo codice?"
>
> **Prompt C:** "Scrivi unit test che dimostrino le vulnerabilità di questo codice. Ogni test deve fallire in modo che evidenzi il problema."
>
> **Prompt D:** "Agisci come auditor ISO 27001. Quali controlli dello standard sono violati da questo codice? Per ogni controllo violato, indica la non conformità specifica."
>
> **Sintesi:** "Confronta le quattro analisi. Elenca solo le vulnerabilità confermate da almeno due prospettive. Segnala come fixes in seconda priorità quelle citate una sola volta."

**Tecnica aggiuntiva:** Self-Consistency (Lab 01) — quattro punti di vista differenti riducono i falsi positivi.

</details>

## Output Atteso
- Finding di sicurezza prioritizzati per severità con scenari di exploit
- Patches proposte con codice prima/dopo e analisi delle implicazioni
- Checklist di prevenzione specifica, ancorata ai risultati reali dell'analisi

## Completato Quando
- Ogni finding ha un livello di rischio e una remediation chiara
- Le patches sono implementabili senza introdurre nuove vulnerabilità
- La checklist è specifica e riferita ai risultati reali dell'analisi
