# Laboratorio 11 - Policy e Compliance

**Difficolta**: `Intermedio` | **Durata**: `15 min`

## Obiettivo
Verificare la compliance del codice rispetto a una policy di sicurezza locale.

## Files
- `policy/security-policy.md`
- `src/api.js`
- `src/api.py`
- `src/api.ts`
- `src/api.cs`

I file `api` contengono una logica equivalente intenzionalmente non conforme alla policy e possono essere usati come punti di partenza alternativi per il laboratorio.

## Passi
1. Apri il file policy e il file API.
2. Chiedi a Copilot di trovare violazioni citando regole specifiche della policy.
3. Chiedi una patch conforme e una PR checklist.

## Esempi di Prompt

**Tecniche utilizzate:** Directional Stimulus · Meta Prompting (istruzione aggiuntiva)
- "Verifica questo file rispetto alla policy di sicurezza indicata ed elenca le violazioni."
> **Attenzione:** L'AI potrebbe segnalare issues non direttamente legate alla policy, o perdere violazioni chiaramente indicate. Per evitarlo prova ad aggiungere al prompt un'istruzione del tipo: *Per ogni violazione rilevata, cita l'esatta sezione della policy in `policy/security-policy.md` che viene violata. Segnala qualsiasi issue che non abbia un riferimento diretto nella policy.*

**Tecniche utilizzate:** Directional Stimulus (istruzione aggiuntiva) · Prompt Chaining
- "Proponi una patch conforme e spiega ogni modifica."
> **Attenzione:** Le patch di remediation possono risolvere l'occorrenza individuata ma non il pattern sottostante (es. parametrizzare una query ma non un'altra). Per evitarlo prova ad aggiungere al prompt un'istruzione del tipo: *Analizza l'intero file e identifica tutti i punti in cui si ripete lo stesso pattern di violazione. Assicurati che la patch risolva tutte le occorrenze.*

**Tecniche utilizzate:** Meta Prompting · Generate Knowledge
- "Genera un PR template per github sottoforma di checklist per la compliance."
> **Attenzione:** Le checklist possono mischiare regole reali di policy con consigli generici aggiunti dall'AI. Per evitarlo prova ad aggiungere al prompt un'istruzione del tipo: *Per ogni voce della checklist, indica se deriva da una regola esplicita in `policy/security-policy.md` (citando la sezione) o se è un suggerimento aggiuntivo dell'AI. Separa le due categorie.*

## Output Atteso
- Mappatura violazione-regola
- Patch di remediation

## Completato Quando
- La remediation è chiara e verificabile






