FROM python:3.8

WORKDIR /src

COPY requirements.txt .
RUN python -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

RUN python manage.py migrate
CMD ["daphne", "app.asgi:application", "-b", "0.0.0.0", "-p", "8000"]