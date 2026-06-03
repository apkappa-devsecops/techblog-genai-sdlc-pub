-- Database schema: defines the customers, orders, and payments tables
-- with constraints (unique email, positive amounts, status enums).

CREATE TABLE customers (
    id          INTEGER PRIMARY KEY,
    email       VARCHAR(255) NOT NULL UNIQUE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id              INTEGER PRIMARY KEY,
    customer_id     INTEGER NOT NULL REFERENCES customers(id),
    total           DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    coupon_code     VARCHAR(32),
    discount_total  DECIMAL(10,2),
    status          VARCHAR(20) NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','paid','failed','refunded')),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
    id              INTEGER PRIMARY KEY,
    order_id        INTEGER NOT NULL REFERENCES orders(id),
    card_last_four  CHAR(4) NOT NULL,
    amount          DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    status          VARCHAR(20) NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','authorized','captured','declined')),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
