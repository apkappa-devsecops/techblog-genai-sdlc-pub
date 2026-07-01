# Laboratorio 03 - Spiegazione del Codice e Documentazione

**Difficoltà**: `Base` | **Durata**: `10 min`

## Obiettivo
Capire rapidamente codice non familiare e produrre documentazione tecnica e funzionale.

## File
- `src/LegacyParser.cs`
- `src/LegacyParser.py`
- `src/LegacyParser.ts`
- `src/LegacyParser.js`

Tutti e quattro i file contengono una logica parser equivalente in linguaggi diversi e possono essere usati come punti di partenza alternativi per il laboratorio.

## Passi
1. Apri il file nel linguaggio che preferisci.
2. Chiedi a Copilot una spiegazione end-to-end del flusso.
3. Chiedi una pagina di documentazione tecnica in Markdown.
4. Chiedi un breve riepilogo funzionale per stakeholder non tecnici.

## Prompt

### 1 — Spiegazione del codice
**Tecniche utilizzate:** Role-based · Chain-of-Thought

**🚫 Prompt vago:**
> "Spiegami questo file come se fossi un nuovo membro del team."

**✅ Prompt con tecnica:**
> "Agisci come un senior developer che sta facendo onboarding di un nuovo membro del team. Spiega questo file passo dopo passo:
> 1. Qual è lo scopo generale di questo codice?
> 2. Cosa fa ogni funzione e come si relazionano tra loro?
> 3. Quali sono gli input e gli output di ogni funzione?
> 4. Quali assunzioni fa il codice che un nuovo sviluppatore dovrebbe conoscere?
>
> Mostra il tuo ragionamento per ogni punto prima di dare un riepilogo finale."

> **Osservazione:** Il ruolo focalizza la spiegazione su ciò che è utile per chi non conosce il codice. Il CoT forza Copilot a non saltare i dettagli intermedi, riducendo il rischio che descriva cosa il codice *dovrebbe* fare invece di cosa *fa*.

---

### 2 — Documentazione tecnica
**Tecnica utilizzata:** Meta Prompting

**🚫 Prompt vago:**
> "Genera documentazione tecnica che copra input, output, casi limite e limiti noti."

**✅ Prompt con tecnica:**
> "Genera una pagina di documentazione tecnica per questo file in Markdown. Usa ESATTAMENTE questa struttura:
>
> **Overview** — un paragrafo che descrive lo scopo del modulo
> **Funzioni** — per ogni funzione: firma, parametri (nome, tipo, descrizione), valore di ritorno, eccezioni sollevate
> **Casi Limite** — solo i casi limite che il codice *gestisce effettivamente*, con la riga specifica che li gestisce
> **Limitazioni Note** — comportamenti che il codice NON gestisce, con un esempio concreto di input che produrrebbe un output errato
>
> Non aggiungere sezioni non elencate sopra."

> **Osservazione:** Il Meta Prompting produce un documento con struttura prevedibile e riutilizzabile. La distinzione esplicita tra "casi limite effettivamente gestiti" e "limitazioni note" contrasta il rischio principale di questo lab: che Copilot elenci casi limite generici senza verificarli sul codice.

---

### 3 — Riepilogo funzionale
**Tecnica utilizzata:** Role-based (cambio ruolo)

**🚫 Prompt vago:**
> "Scrivi un breve riepilogo funzionale per stakeholder non tecnici."

**✅ Prompt con tecnica:**
> "Agisci come un business analyst che scrive un riepilogo funzionale per un product manager senza background tecnico. Descrivi:
> - Quale problema di business risolve questo codice
> - Cosa riceve in input, in linguaggio semplice
> - Cosa produce in output, in linguaggio semplice
> - Un esempio concreto di come verrebbe usato nella pratica
>
> Non usare termini tecnici. Se sei costretto a usarne uno, spiegalo tra parentesi."

> **Osservazione:** Il cambio di ruolo da "developer" a "business analyst" sposta completamente il registro linguistico. Il vincolo "niente termini tecnici" evita che il riepilogo sembri curato ma risulti incomprensibile agli stakeholder non tecnici.

## Output Atteso
- Spiegazione completa del codice
- Documento tecnico pronto per wiki
- Riepilogo funzionale riutilizzabile

## Completato Quando
- Casi limite e assunzioni sono coperti
- Il testo e chiaro e azionabile

## Attenzione
- L'AI potrebbe descrivere che cosa il codice dovrebbe fare in teoria e non ciò che fa davvero. Verifica le affermazioni sul sorgente.
- I casi limite possono essere elencati in modo generico (es. "input null") senza verificare se il codice li gestisce realmente.
- I riepiloghi funzionali possono sembrare curati ma contenere imprecisioni: ricontrolla sempre sul codice.






