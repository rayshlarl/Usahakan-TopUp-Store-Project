-- Migration: Convert user_db.id from BigInt to Int
-- Step-by-step untuk avoid constraint issues

-- 1. Drop FK constraint dari orders.user_id ke user_db.id
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;

-- 2. Alter orders.user_id dari BigInt ke Int
ALTER TABLE orders ALTER COLUMN user_id TYPE INTEGER USING user_id::INTEGER;

-- 3. Drop PK constraint dari user_db
ALTER TABLE user_db DROP CONSTRAINT IF EXISTS user_pkey;

-- 4. Alter user_db.id dari BigInt ke Int
ALTER TABLE user_db ALTER COLUMN id TYPE INTEGER USING id::INTEGER;

-- 5. Recreate PK constraint
ALTER TABLE user_db ADD CONSTRAINT user_pkey PRIMARY KEY (id);

-- 6. Recreate sequence (reset ke serial-like behavior)
-- Buat sequence baru jika belum ada
CREATE SEQUENCE IF NOT EXISTS user_db_id_seq;

-- Set ke nilai max id + 1
SELECT setval('user_db_id_seq', COALESCE((SELECT MAX(id) FROM user_db), 0) + 1, false);

-- Attach sequence ke column
ALTER TABLE user_db ALTER COLUMN id SET DEFAULT nextval('user_db_id_seq');

-- 7. Recreate FK constraint
ALTER TABLE orders ADD CONSTRAINT orders_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES user_db(id) ON DELETE SET NULL;

-- Done!
