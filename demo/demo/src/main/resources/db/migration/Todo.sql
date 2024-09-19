CREATE TABLE Todo
(
    id int(11) SERIAL PRIMARY KEY AUTO_INCREMENT,
    user_id varchar(255) NOT NULL,
    content varchar(2550),
    due_date date NOT NULL,
    created_at timestamp(10) CURRENT_TIMESTAMP,
    updated_at timestamp(10) CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);