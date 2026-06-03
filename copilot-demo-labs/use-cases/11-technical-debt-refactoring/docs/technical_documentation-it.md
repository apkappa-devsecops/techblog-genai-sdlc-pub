# Panoramica della Piattaforma di Fatturazione

## Componenti

### API Gateway
- Punto di ingresso per tutte le richieste dei client.
- Instrada le richieste verso il Billing Engine o il Notification Service.
- Gestisce l'autenticazione tramite token JWT.

### Billing Engine
- Calcola le fatture a partire dalle righe d'ordine.
- Applica aliquote fiscali per paese, sconti VIP e saldi a credito.
- Scrive le fatture finalizzate nel DB.
- Pubblica un evento `invoice.created` sulla coda messaggi.

### DB (PostgreSQL)
- Memorizza clienti, fatture, saldi a credito e log di audit.
- Utilizza il row-level locking per gli aggiornamenti dei saldi a credito.

### Notification Service
- Ascolta gli eventi `invoice.created` dalla coda messaggi.
- Invia email di conferma tramite SMTP.
- Ritenta fino a 3 volte con backoff esponenziale in caso di errori transitori.

### Coda Messaggi (RabbitMQ)
- Disaccoppia il Billing Engine dal Notification Service.
- Dead-letter queue per i messaggi che falliscono dopo 3 tentativi.

## Flusso Dati
1. Il client invia POST /invoices con le righe d'ordine e l'ID cliente.
2. L'API Gateway valida il JWT e inoltra al Billing Engine.
3. Il Billing Engine legge il cliente dal DB e calcola la fattura.
4. Il Billing Engine scrive la fattura nel DB e pubblica l'evento.
5. Il Notification Service riceve l'evento e invia l'email.

## Note sul Debito Tecnico
- La gestione dei fallimenti tra Billing Engine e DB non è completamente affrontata.
- La strategia di retry è inconsistente: il Billing Engine non ha logica di retry, il Notification Service ritenta 3 volte.
- Nessun circuit breaker sull'integrazione SMTP.
- La deduzione del saldo a credito e la scrittura della fattura non sono nella stessa transazione DB.
