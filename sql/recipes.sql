CREATE EXTENSION IF NOT EXISTS 'pgcrypto';


-- TODO: finish this table
CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES(users.id) ON DELETE CASCADE,

    name TEXT NOT NULL,
    description TEXT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);