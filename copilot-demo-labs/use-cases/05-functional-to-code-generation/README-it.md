# Laboratorio 05 - Da Requisiti a Codice

**Difficoltà**: `Intermedio` | **Durata**: `20 min`

## Obiettivo
Disegnare delle APIs a partire da una user story, poi implementarle e testarle sfruttando dei criteri di accettazione.

## File
- `specs/user_story.md`

> **Nota:** In questo laboratorio genererai il codice nel linguaggio che preferisci. I prompt seguenti usano Python come esempio, ma sentiti libero di adattarli a qualsiasi linguaggio.

## Passi
1. Apri e leggi la user story in `specs/user_story.md` per capire i requisiti.
2. Chiedi a Copilot di generare lo scheletro del servizio (classi, metodi, tipi) a partire dalla user story, con metodi placeholder e commenti TODO.
3. Chiedi a Copilot di analizzare la user story e verificare se il design della API nel codice in bozza copra tutti i requisiti.
4. Chiedi a Copilot di implementare i metodi TODO nel file sorgente.
5. Chiedi a Copilot di generare test di accettazione riferiti ai criteri della user story.

## Esempi di Prompt
- "Leggi la user story in `specs/user_story.md` e genera lo scheletro di un servizio Python in `src/todo_service.py`: definisci classi, tipi/enum, e metodi pubblici con firma completa. Non implementare la logica: ogni metodo deve contenere solo un commento TODO che descrive cosa fare e una eccezione di metodo non implementato."
> **Attenzione:** L'AI potrebbe aggiungere funzionalità non menzionate nella user story (scope creep). Per evitarlo prova ad aggiungere al prompt un'istruzione del tipo: *Elenca ogni metodo pubblico che hai generato e cita l'esatto criterio di accettazione da `specs/user_story.md` che lo giustifica. Segnala qualsiasi metodo che non abbia un criterio corrispondente.*
- "Analizza questa user story e verifica se il design API nel mio codice copra tutti i requisiti."
- "Implementa i metodi TODO nel file selezionato."
> **Attenzione:** I criteri di accettazione potrebbero non essere del tutto coperti nell'implementazione. Per evitarlo prova ad aggiungere al prompt un'istruzione del tipo: *Per ogni criterio di accettazione in `specs/user_story.md`, mostra le specifiche righe di codice che lo soddisfano. Segnala qualsiasi criterio non ancora implementato.*
- "Genera test di accettazione riferiti ai criteri della user story."
> **Attenzione:** I test generati potrebbero testare solo l'implementazione invece dei requisiti e quindi passare anche se il codice è sbagliato. Per evitarlo prova ad aggiungere al prompt un'istruzione del tipo: *Rivedi i test generati e identifica qualsiasi test che passerebbe ancora se il corrispondente criterio di accettazione venisse a mancare. Suggerisci una correzione per ciascuno.*

## Output Atteso
- Scheletro del servizio con classi, tipi e metodi placeholder
- Validazione del design delle APIs
- Implementazione dei metodi
- Test di accettazione

## Completato Quando
- Esiste una percorso chiaro che porta dal requisito al codice