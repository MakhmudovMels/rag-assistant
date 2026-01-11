-- Создание расширения для векторного поиска
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Таблица пользователей (синхронизируется с LDAP)
CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
internal_id VARCHAR(50) UNIQUE NOT NULL,
role VARCHAR(20) NOT NULL DEFAULT 'guest',
faculty VARCHAR(100),
sync_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Таблица документов
CREATE TABLE documents (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
title TEXT NOT NULL,
source_url TEXT UNIQUE,
upload_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
type VARCHAR(50),
access_role VARCHAR(20) DEFAULT 'public',
faculty VARCHAR(100),
status VARCHAR(20) DEFAULT 'active'
);

-- Таблица фрагментов документов
CREATE TABLE document_chunks (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
chunk_index INTEGER NOT NULL,
raw_text TEXT NOT NULL,
metadata JSONB DEFAULT '{}'::jsonb,
created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Таблица векторных эмбеддингов
CREATE TABLE document_embeddings (
chunk_id UUID PRIMARY KEY REFERENCES document_chunks(id) ON DELETE CASCADE,
embedding_vector VECTOR(768) NOT NULL,
model_version VARCHAR(32) NOT NULL
);

-- Создание индекса для быстрого поиска
CREATE INDEX ON document_embeddings USING hnsw (embedding_vector vector_cosine_ops);
