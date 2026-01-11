from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from sqlalchemy.orm import Session

from backend.src.database import engine, SessionLocal
from backend.src.routes import chat, admin, auth
from backend.src.config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan events for the application."""
    # Startup
    print("Starting RAG Assistant API...")
    # Инициализация подключений к БД, Redis и т.д.
    yield
    # Shutdown
    print("Shutting down RAG Assistant API...")

app = FastAPI(
    title="University RAG Assistant API",
    description="Intelligent assistant for university information resource",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Включение роутеров
app.include_router(auth.router, prefix="/auth", tags=["authentication"])
app.include_router(chat.router, prefix="/api/v1/chat", tags=["chat"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["administration"])

@app.get("/")
async def root():
    return {"message": "University RAG Assistant API", "status": "healthy"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
