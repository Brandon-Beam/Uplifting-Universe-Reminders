INSERT INTO users (user_name, message, phone, password)
VALUES ('Brandon Beam', 'Words cant express how proud I am', '(111)111-1111', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');


INSERT INTO tasks (user_id, task_name, priority, date_time)
VALUES (1, 'clean', FALSE, '2/27/2023, 1:24:26 PM'), 
(1, 'shower', TRUE, '2023-02-27 10:00:00'), 
(1, 'work', TRUE, '2023-02-27 13:00:00'), 
(1, 'feed cats', TRUE, '2023-02-27 10:30:00'), 
(1, 'cat litter', TRUE, '2023-02-27 14:00:00'), 
(1, 'eat', TRUE, '2023-02-27 15:00:00'),
(1, 'get groceries', TRUE, '2023-02-27 14:00:00'),
(1, 'call bank', TRUE, '2023-02-27 14:00:00'),
(1, 'pickup mail', TRUE, '2023-02-27 14:30:00'),
(1, 'work out', TRUE, '2023-02-27 12:00:00');
