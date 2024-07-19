CREATE TABLE example_order
(
    id   SERIAL PRIMARY KEY,
    item_id int NOT NULL,
    name varchar(80) NOT NULL,
    amount int NOT NULL,
    order_status varchar(20) NOT NULL,
    order_date date NOT NULL
);