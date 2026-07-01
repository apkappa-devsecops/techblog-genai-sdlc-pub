# Laboratorio 05 - Debugging Complesso

**Difficoltà**: `Intermedio` | **Durata**: `15 min`

## Obiettivo
Trovare bug logici e prevenire regressioni.

## File
- `src/order_pricing.py`
- `src/order_pricing.ts`
- `src/order_pricing.js`
- `src/order_pricing.cs`

I files contengono una logica equivalente di pricing in linguaggi diversi e possono essere usati come punti di partenza alternativi per il laboratorio.

## Passi
1. Leggi il comportamento atteso descritto nei commenti.
2. Chiedi a Copilot di trovare bug logici con esempi.
3. Chiedi una fix che mantenga invariata la firma pubblica.
4. Chiedi test sui casi limite.

## Prompt

### 1 — Trova i bug logici
**Tecniche utilizzate:** Chain-of-Thought · Few-shot

**🚫 Prompt vago:**
> "Trova bug logici in questo codice con esempi riproducibili."

**✅ Prompt con tecnica:**
> "Analizza la logica di questo codice passo dopo passo. Per ogni bug trovato, fornisci un esempio riproducibile seguendo questo schema:
>
> - Input: `compute_total(100, is_vip=False, coupon_percent=0.2)`
> - Risultato attuale: `80.0`
> - Risultato atteso: `80.0`
> - Bug: nessuno in questo caso
>
> Usa lo stesso schema per ogni bug che trovi. Distingui tra sintomo (es. 'totale errato') e root cause (es. 'il fallback ignora sconti validi')."

> **Osservazione:** Il Few-shot fornisce il formato esatto dell'esempio riproducibile, evitando che Copilot descriva i bug in modo narrativo senza dimostrarli. La distinzione esplicita sintomo/root cause contrasta il rischio principale: che Copilot identifichi il sintomo senza trovare la causa reale.

---

### 2 — Correggi senza cambiare la firma pubblica
**Tecnica utilizzata:** Reflexion

**🚫 Prompt vago:**
> "Correggili senza cambiare la firma pubblica della funzione."

**✅ Prompt con tecnica:**

**Fase 1 — Genera la fix:**
> "Correggi i bug trovati senza cambiare la firma pubblica di `compute_total`."

**Fase 2 — Auto-revisione:**
> "Ora rivedi criticamente la fix che hai appena proposto:
> 1. La firma `compute_total(amount, is_vip, coupon_percent)` è rimasta invariata?
> 2. Il significato di ogni parametro è preservato?
> 3. Ci sono casi limite in cui la fix produce un risultato diverso dal codice originale su input validi?
> 4. La fix potrebbe introdurre nuovi bug?
>
> Se trovi problemi, proponi una versione corretta."

> **Osservazione:** La fase di auto-revisione forza Copilot a controllare esplicitamente il contratto pubblico e i casi limite, riducendo il rischio che una fix apparentemente corretta rompa comportamenti validi o modifichi silenziosamente la semantica dei parametri.

---

### 3 — Genera test sui casi limite
**Tecnica utilizzata:** Generate Knowledge

**🚫 Prompt vago:**
> "Genera test unitari che coprano sconti e scenari VIP."

**✅ Prompt con tecnica:**
> "Prima elenca tutte le combinazioni di input rilevanti per `compute_total`: valori limite di `coupon_percent` (0, 1, >1), combinazioni con `is_vip`, valori estremi di `amount` (0, negativo, molto grande).
>
> Poi, per ogni combinazione elencata, genera un test unitario che verifichi il comportamento corretto. Ogni test deve fallire con il codice originale buggy e passare con il codice corretto."

> **Osservazione:** Il Generate Knowledge forza Copilot a costruire prima la mappa dei casi rilevanti, poi a scrivere i test. Questo evita che i test coprano solo gli scenari tipici (VIP con sconto standard) ignorando i casi limite che erano alla base dei bug.

## Output Atteso
- Elenco difetti con spiegazioni
- Patch correttiva
- Test unitari

## Completato Quando
- I bug sono verificati e coperti da test

## Attenzione
- L'AI può identificare i sintomi ma non la root cause (es. "totale errato" senza trovare il bug divisione-vs-percentuale).
- Le fix proposte possono modificare accidentalmente il contratto API pubblico.
- Assicurati che i test coprano casi limite e possibili bug, non solo scenari tipici.






