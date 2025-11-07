-- Fix missende owner_name en owner_avatar voor bestaande recepten
-- Voer dit uit in Supabase SQL Editor

-- Update alle recepten met owner info uit auth.users
UPDATE recipes
SET
  owner_name = u.raw_user_meta_data->>'name',
  owner_avatar = u.raw_user_meta_data->>'avatar_url'
FROM auth.users u
WHERE recipes.owner_id = u.id
  AND (recipes.owner_name IS NULL OR recipes.owner_name = '');

-- Verifieer dat het gelukt is
SELECT 
  id, 
  name, 
  owner_id, 
  owner_name, 
  owner_avatar 
FROM recipes 
LIMIT 10;
