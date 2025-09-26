CREATE EXTENSION IF NOT EXISTS 'pgcrypto';

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL, 
    role TEXT CHECK role IN ('user', 'admin'),
    session_id TEXT 
);


