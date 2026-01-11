.PHONY: help install run build test clean

help:
    @echo "Доступные команды:"
    @echo "  make install    - Установить все зависимости"
    @echo "  make run        - Запустить проект (Docker Compose)"
    @echo "  make build      - Собрать проект для production"
    @echo "  make test       - Запустить тесты"
    @echo "  make clean      - Очистить временные файлы"

install:
    docker-compose build

run:
    docker-compose up

run-detached:
    docker-compose up -d

stop:
    docker-compose down

logs:
    docker-compose logs -f

test:
    docker-compose exec backend pytest

clean:
    docker-compose down -v
    rm -rf __pycache__ *.pyc
