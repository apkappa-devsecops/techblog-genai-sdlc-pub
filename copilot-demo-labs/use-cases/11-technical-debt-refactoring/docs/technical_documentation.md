# Billing Platform Overview

## Components

### API Gateway
- Entry point for all client requests.
- Routes requests to the Billing Engine or the Notification Service.
- Handles authentication via JWT tokens.

### Billing Engine
- Computes invoices from order line items.
- Applies per-country tax rates, VIP discounts, and credit balances.
- Writes finalized invoices to the DB.
- Publishes an `invoice.created` event to the message queue.

### DB (PostgreSQL)
- Stores customers, invoices, credit balances, and audit logs.
- Uses row-level locking for credit balance updates.

### Notification Service
- Listens for `invoice.created` events from the message queue.
- Sends confirmation emails via SMTP.
- Retries up to 3 times with exponential backoff on transient failures.

### Message Queue (RabbitMQ)
- Decouples the Billing Engine from the Notification Service.
- Dead-letter queue for messages that fail after 3 retries.

## Data Flow
1. Client sends POST /invoices with order lines and customer ID.
2. API Gateway validates the JWT and forwards to the Billing Engine.
3. Billing Engine reads the customer from the DB and computes the invoice.
4. Billing Engine writes the invoice to the DB and publishes the event.
5. Notification Service picks up the event and sends the email.

## Notes on Technical Debt
- Failure handling between Billing Engine and DB is not fully addressed.
- Retry strategy is inconsistent: Billing Engine has no retry logic, Notification Service retries 3 times.
- No circuit breaker on the SMTP integration.
- Credit balance deduction and invoice write are not in the same DB transaction.
