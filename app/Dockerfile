FROM python:3.9

RUN pip install fastapi[all] celery[redis]

WORKDIR /src

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["daphne", "app.asgi:application"]

EXPOSE 8080