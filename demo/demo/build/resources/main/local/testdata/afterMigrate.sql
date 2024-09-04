DELETE FROM todo;
DELETE FROM users;

INSERT INTO users (user_id, password) VALUES ('user1', 'password1');
INSERT INTO todo (user_id, Content, due_date, created_at, updated_at)
VALUES
(user1, 'task 1', '2024-01-01', '2022-01-01', '2023-01-01')
,(user2, 'task 2', '2024-01-01', '2022-02-02', '2023-01-01')
;
