CREATE TABLE example_user
(
    id   SERIAL PRIMARY KEY,
    user_id varchar(80) NOT NULL,
    password varchar(80) NOT NULL
);