# RAG Assistant для информационного ресурса университета

Интеллектуальный ассистент на основе RAG-архитектуры для автоматизации информационно-справочного обслуживания.

## 🚀 Быстрый старт

### Для разработчиков
`ash
# Клонирование репозитория
git clone https://github.com/ВашАккаунт/rag-assistant-university.git
cd rag-assistant-university

# Установка зависимостей
pip install -r backend/requirements.txt
cd frontend && npm install

# Запуск в development режиме
docker-compose up -d
Структура проекта
backend/ - Python FastAPI приложение

frontend/ - React интерфейс

docker/ - конфигурации Docker

docs/ - документация

notebooks/ - эксперименты и исследования

scripts/ - вспомогательные скрипты

# 📋 Требования
Python 3.10+

PostgreSQL 15+ с расширением pgvector

Node.js 18+

Docker & Docker Compose

# 🔧 Развертывание
Подробнее в DEPLOYMENT.md

# 📄 Лицензия
MIT
