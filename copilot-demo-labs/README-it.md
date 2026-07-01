# Copilot Use Cases Demo Labs

Laboratori pratici per testare GitHub Copilot su casi d'uso realistici.

## A Chi Si Rivolge
- Sviluppatori di manutenzione back/front
- Sviluppatori di evolutive back/front
- Sviluppatori IaC / DevOps
- Analisti funzionali

## Obiettivo
Consentire ai team di provare Copilot su esempi realistici con un flusso guidato e ripetibile.

## Cosa Contiene
- Una cartella `use-cases/` con un laboratorio per ogni sottocartella.
- Ogni laboratorio include i sorgenti + un file con le istruzioni passo-passo.
- Alcuni laboratori includono logica eseguibile equivalente in C#, Python, TypeScript e JavaScript.
- Altri laboratori sono guidati da un artefatto canonico come user story, policy, log, Terraform o configurazione MCP.
- Ogni README di laboratorio elenca esplicitamente i file che sono punti di partenza equivalenti e indica quando i file in `src/` sono solo placeholder.

## Prerequisiti

| Categoria | Componente | Obbligatorieta | Versione minima richiesta | Note |
| --- | --- | --- | --- | --- |
| Editor (opzione 1) | VS Code | Obbligatorio (se usi VS Code) | Ultima versione stabile | Copilot Chat evolve in lockstep con VS Code; per Ask/Edit/Agent e consigliato restare aggiornati. |
| Estensione VS Code | GitHub Copilot Chat | Obbligatoria | Ultima versione stabile compatibile con l'IDE | Estensione principale richiesta per funzionalita Copilot nei lab (chat, edit, agent, suggerimenti). |
| Estensione VS Code | GitHub Copilot | Non richiesta (deprecata) | N/D | In VS Code risulta deprecata: usare GitHub Copilot Chat. |
| Editor (opzione 2) | Visual Studio 2022 | Opzionale (alternativa a VS Code) | 17.10+ | Soglia pratica per esperienza Copilot completa documentata in VS 2022. |
| Estensione Visual Studio | GitHub Copilot (Visual Studio) | Obbligatoria se usi Visual Studio | Ultima versione stabile compatibile con Visual Studio 2022 | Necessaria per funzionalita Copilot in Visual Studio. |
| Runtime | Node.js | Consigliato | 18+ | Per eseguire file TypeScript/JavaScript. |
| Runtime | Python | Consigliato | 3.10+ | Per eseguire varianti Python disponibili in alcuni lab. |
| SDK | .NET SDK | Consigliato | 8+ | Per compilare file C#. |
| CLI | Terraform | Consigliato | Ultima versione stabile | Per laboratori IaC. |

### Setup
1. Clona questo repository e apri la cartella `copilot-demo-labs` nel tuo IDE.
2. Verifica che Copilot sia attivo: apri un file qualsiasi, inizia a digitare e controlla i suggerimenti inline.
3. Verifica che Copilot Chat sia attivo: in VS Code apri il pannello Chat (Ctrl+Shift+I / Cmd+Shift+I). In Visual Studio apri View > GitHub Copilot Chat.
4. Scegli un caso d'uso e segui il README del laboratorio.

> **Nota**: non è necessario compilare o eseguire i file sorgente. I laboratori sono progettati per l'interazione con Copilot: lettura, spiegazione e trasformazione del codice. Installa gli SDK dei linguaggi solo se vuoi verificare l'output di Copilot.

## Funzionalita Copilot Testate
- Completamento codice (suggerimenti inline)
- Copilot Chat (modalita Ask / Edit / Agent)
- Refactoring guidato
- Generazione test
- Generazione documentazione
- Revisione sicurezza e controlli di policy
- Qualità dei prompt in italiano

## Mappa Laboratori

| # | Laboratorio | Difficoltà | Durata |
|---|-------------|------------|--------|
| 01 | [Prompt Engineering Core](use-cases/01-prompt-engineering-core/) | Base | 50 min |
| 02 | [Prompt Engineering Advanced](use-cases/02-prompt-engineering-advanced/) | Intermedio | 50 min |
| 03 | [Spiegazione Codice e Documentazione](use-cases/03-code-explanation-docs/) | Base | 10 min |
| 04 | [Debugging Semplice](use-cases/04-debugging-simple/) | Base | 10 min |
| 05 | [Debugging Complesso](use-cases/05-debugging-complex/) | Intermedio | 15 min |
| 06 | [Refactoring e Performance](use-cases/06-refactoring-performance/) | Intermedio | 15 min |
| 07 | [Generazione Suite di Test](use-cases/07-testing-suite-generation/) | Intermedio | 40 min |
| 08 | [Da Requisiti a Codice](use-cases/08-functional-to-code-generation/) | Intermedio | 20 min |
| 09 | [Analisi Debito Tecnico e Refactoring](use-cases/09-technical-debt-refactoring/) | Intermedio | 20 min |
| 10 | [Analisi Sicurezza](use-cases/10-security-analysis/) | Intermedio | 15 min |
| 11 | [Policy e Compliance](use-cases/11-policy-compliance/) | Intermedio | 15 min |
| 12 | [Analisi Log e Correlazione](use-cases/12-log-analysis-correlation/) | Intermedio | 15 min |