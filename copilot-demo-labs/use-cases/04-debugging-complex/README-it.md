# Laboratorio 04 - Debugging Complesso

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
- "Trova bug logici in questo codice con esempi riproducibili."
- "Correggili senza cambiare la firma pubblica della funzione."
- "Genera test unitari che coprano sconti e scenari VIP."

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






