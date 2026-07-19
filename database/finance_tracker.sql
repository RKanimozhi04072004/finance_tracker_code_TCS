CREATE DATABASE finance_tracker;
USE finance_tracker;


CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    type ENUM('INCOME','EXPENSE') NOT NULL,
    category VARCHAR(50) NOT NULL,
    transaction_date DATE NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_transaction_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


CREATE TABLE budgets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    monthly_limit DECIMAL(10,2) NOT NULL,
    month VARCHAR(20) NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_budget_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


INSERT INTO users(name, email, password)
VALUES
('Kani', 'kani@gmail.com', '123456');


INSERT INTO transactions(title, amount, type, category, transaction_date, user_id)
VALUES
('Salary', 50000, 'INCOME', 'Salary', '2026-07-01', 1),
('Groceries', 2500, 'EXPENSE', 'Food', '2026-07-02', 1),
('Internet Bill', 1000, 'EXPENSE', 'Bills', '2026-07-03', 1),
('Freelancing', 8000, 'INCOME', 'Freelance', '2026-07-04', 1);


INSERT INTO budgets(category, monthly_limit, month, user_id)
VALUES
('Food', 10000, 'July', 1),
('Bills', 5000, 'July', 1);