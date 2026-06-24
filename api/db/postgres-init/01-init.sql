CREATE TABLE IF NOT EXISTS products (
    id          UUID PRIMARY KEY        DEFAULT gen_random_uuid(),
    created_at  TIMESTAMPTZ    NOT NULL DEFAULT now(),
    modified_at TIMESTAMPTZ,
    deleted_at  TIMESTAMPTZ,
    archived_at TIMESTAMPTZ,
    name        TEXT           NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    stock       INT            NOT NULL DEFAULT 0,
    is_active   BOOLEAN                 DEFAULT TRUE
);

INSERT INTO products (name, price, stock)
VALUES ('Wireless Optical Mouse', 29.99, 150),
       ('Mechanical Keyboard RGB', 89.50, 85),
       ('27-inch 4K IPS Monitor', 349.00, 40),
       ('USB-C Docking Station', 119.99, 120),
       ('Noise Cancelling Headphones', 199.99, 65),
       ('Ergonomic Office Chair', 250.00, 25),
       ('Motorized Standing Desk', 450.00, 15),
       ('1TB NVMe PCIe 4.0 SSD', 85.00, 200),
       ('32GB DDR5 Desktop RAM', 130.00, 110),
       ('Web Camera 1080p 60fps', 59.99, 300),
       ('Portable Bluetooth Speaker', 45.00, 80),
       ('Aluminum Smartphone Stand', 15.50, 500),
       ('100W GaN Wall Charger', 49.99, 250),
       ('2-Meter Braided USB-C Cable', 12.99, 1000),
       ('Extended Gaming Mousepad', 24.90, 180),
       ('Dual-Band Wi-Fi 6 Router', 129.99, 55),
       ('Uninterruptible Power Supply 1500VA', 180.00, 30),
       ('HDMI 2.1 Ultra High Speed Cable', 18.50, 400),
       ('External Hard Drive 4TB USB 3.0', 105.00, 90),
       ('USB Condenser Microphone', 75.00, 45),
       ('Laptop Cooling Pad with Dual Fans', 35.00, 120),
       ('Gigabit Network Switch 8-Port', 28.99, 140),
       ('Server Rack Cabinet 12U Enclosure', 210.00, 10),
       ('High-Performance Thermal Paste', 8.99, 350);


CREATE TABLE IF NOT EXISTS cart_items (
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    modified_at TIMESTAMPTZ,
    deleted_at  TIMESTAMPTZ,
    archived_at TIMESTAMPTZ,
    cart_id     TEXT        NOT NULL,
    product_id  UUID REFERENCES products (id),
    quantity    INT         NOT NULL,
    PRIMARY KEY (cart_id, product_id)
);
