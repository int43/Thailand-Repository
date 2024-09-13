CREATE TABLE users
(
    user_id int(11) SERIAL PRIMARY KEY AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);