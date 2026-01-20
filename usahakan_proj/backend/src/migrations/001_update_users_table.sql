-- Migration: Update users table structure
-- Date: 2026-01-16
-- Mengubah struktur tabel users yang sudah ada

-- ============================================
-- STEP 1: Buat ENUM type untuk role
-- ============================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'seller', 'buyer');
    END IF;
END$$;

-- ============================================
-- STEP 2: Tambah kolom role baru
-- ============================================
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'buyer';

-- ============================================
-- STEP 3: Migrate data dari is_admin/is_seller ke role
-- ============================================
UPDATE users 
SET role = CASE 
    WHEN is_admin = true THEN 'admin'::user_role
    WHEN is_seller = true THEN 'seller'::user_role
    ELSE 'buyer'::user_role
END;

-- ============================================
-- STEP 4: Rename username -> fullName
-- ============================================
ALTER TABLE users 
RENAME COLUMN username TO "fullName";

-- ============================================
-- STEP 5: Convert is_verified dari varchar ke boolean
-- ============================================
-- Tambah kolom sementara
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS "isVerified_temp" BOOLEAN DEFAULT FALSE;

-- Copy data dengan konversi
UPDATE users 
SET "isVerified_temp" = CASE 
    WHEN is_verified = 'true' OR is_verified = '1' THEN TRUE
    ELSE FALSE
END;

-- Drop kolom lama
ALTER TABLE users DROP COLUMN IF EXISTS is_verified;

-- Rename kolom sementara
ALTER TABLE users 
RENAME COLUMN "isVerified_temp" TO "isVerified";

-- ============================================
-- STEP 6: Hapus kolom lama yang tidak diperlukan
-- ============================================
ALTER TABLE users DROP COLUMN IF EXISTS is_admin;
ALTER TABLE users DROP COLUMN IF EXISTS is_seller;

-- ============================================
-- STEP 7: Buat index untuk performa
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ============================================
-- Verifikasi struktur baru
-- ============================================
-- Jalankan query ini untuk cek hasil:
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users';
