-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE DATABASE "any_budget_can"

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
"trans_date" TIMESTAMP, 
"name" VARCHAR(255)
);

CREATE TABLE "plan" ( 
"id" SERIAL PRIMARY KEY, 
"user_id" INT REFERENCES "user",
"name" VARCHAR(255),
"end_date" TIMESTAMP, 
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




