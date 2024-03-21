-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" ( 
"id" SERIAL PRIMARY KEY, 
"name" VARCHAR(100),
"username" VARCHAR(50), 
"password" VARCHAR(255) 
);

CREATE TABLE "category" ( 
"id" SERIAL PRIMARY KEY, 
"name" VARCHAR(32)
);

CREATE TABLE "income" ( 
"id" SERIAL PRIMARY KEY, 
"monthly_amount" NUMERIC(10,2)
);

CREATE TABLE "transaction" ( 
"id" SERIAL PRIMARY KEY,
"user_id" INT REFERENCES "user", 
"category_id" INT REFERENCES "category", 
"amount" NUMERIC(10,2), 
"trans_date" DATE, 
"name" VARCHAR(255)
);

CREATE TABLE "plan" ( 
"id" SERIAL PRIMARY KEY, 
"user_id" INT REFERENCES "user",
"name" VARCHAR(255),
"target_date" DATE, 
"priority" INT,
"budget_goal" NUMERIC(10,2),
"active" BOOLEAN
);

CREATE TABLE "expenses" ( 
"id" SERIAL PRIMARY KEY,
"user_id" INT REFERENCES "user",
"category_id" INT REFERENCES "category",
"name" VARCHAR(255), 
"amount" NUMERIC(10,2) 
);

CREATE TABLE "category_limit" ( 
"id" SERIAL PRIMARY KEY,
"user_id" INT REFERENCES "user",
"category_id" INT REFERENCES "category",
"amount_limit" NUMERIC(10,2) 
);

INSERT INTO "category" ("name")
VALUES 
('Housing'),
('Transportation'),
('Utilities'),
('Groceries'),
('Insurance'),
('Education'),
('Travel'),
('Gifts & Donations'),
('Healthcare'),
('Debt Payments'),
('Entertainment'),
('Personal Care'),
('Clothing and Accessories'),
('Savings and Investments'),
('Dining out');

SELECT "transaction"."id", "transaction"."name", "transaction"."amount", 
"transaction"."trans_date", "transaction"."category_id", "category"."name" AS "category_name"
FROM "transaction"
JOIN "category" ON "transaction"."category_id" = "category"."id";

SELECT "transaction"."id", "transaction"."name", "transaction"."amount", 
"transaction"."trans_date", "transaction"."category_id", "category"."name" AS "category_name"
FROM "transaction"
JOIN "category" ON "transaction"."category_id" = "category"."id"
ORDER BY "transaction".trans_date ASC;

UPDATE "transaction" 
SET 
  "name" = 'Updated Name', 
  "amount" = '100.00', 
  "category_id" = '2', 
  "trans_date" = '2024-03-16'
WHERE 
  "id" = '1';
  
UPDATE "transaction" 
SET  
  "amount" = '111.00'
WHERE 
  "id" = '1';

SELECT * FROM "transaction";

SELECT "category"."id", "category"."name", SUM("expenses"."amount") AS "expenses_total" FROM "category"
JOIN "expenses" ON "expenses"."category_id" = "category"."id"
GROUP BY "category"."id", "category"."name";

SELECT "category"."id", "category"."name", SUM("expenses"."amount") AS "expenses_total" FROM "category"
JOIN "expenses" ON "expenses"."category_id" = "category"."id"
GROUP BY "category"."id", "category"."name";

SELECT "category"."id", "category"."name", SUM("transaction"."amount") AS "transaction_total" FROM "category"
JOIN "transaction" ON "transaction"."category_id" = "category"."id"
GROUP BY "category"."id", "category"."name";
    
SELECT "category"."id", "category"."name", 
COALESCE((
SELECT SUM("amount") 
FROM "expenses" 
WHERE "category_id" = "category"."id"), 0)
+
COALESCE((
SELECT SUM("amount") 
FROM "transaction" 
WHERE "category_id" = "category"."id"
), 0) AS "combined_total"
FROM "category"
ORDER BY "category"."id";
ORDER BY "combined_total" DESC;