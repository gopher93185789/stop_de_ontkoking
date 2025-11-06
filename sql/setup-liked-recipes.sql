-- Maak de users_liked_recipes tabel aan
CREATE TABLE IF NOT EXISTS users_liked_recipes (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY(user_id, recipe_id)
);

-- Index voor snellere queries
CREATE INDEX IF NOT EXISTS idx_users_liked_recipes_user_id ON users_liked_recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_users_liked_recipes_recipe_id ON users_liked_recipes(recipe_id);

-- RLS (Row Level Security) inschakelen
ALTER TABLE users_liked_recipes ENABLE ROW LEVEL SECURITY;

-- Policy: Gebruikers kunnen hun eigen gelikte recepten zien
CREATE POLICY "Users can view their own liked recipes"
ON users_liked_recipes
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Gebruikers kunnen recepten liken
CREATE POLICY "Users can like recipes"
ON users_liked_recipes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Gebruikers kunnen hun eigen likes verwijderen (unliken)
CREATE POLICY "Users can unlike recipes"
ON users_liked_recipes
FOR DELETE
USING (auth.uid() = user_id);
