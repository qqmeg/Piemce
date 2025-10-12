# Makefile для создания и активации виртуального окружения Python

pyvenv:
	@echo "Создание виртуального окружения..."
	python3 -m venv venv
	@echo "\nВиртуальное окружение создано. Для активации выполните:"
	@echo "make activate"

activate:
	@echo "Активация виртуального окружения..."
	@source venv/bin/activate && \
	echo "Окружение активировано. Текущий Python: $$(which python3)" || \
	echo "Ошибка: виртуальное окружение не найдено. Сначала выполните 'make pyvenv'"

.PHONY: pyvenv activate
