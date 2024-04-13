const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Маршрут для виведення тексту
app.get('/text', (req, res) => {
  res.send('Привіт! Це текстова сторінка.');
});

// Маршрут для виведення HTML-сторінки
app.get('/html', (req, res) => {
  res.send('<!DOCTYPE html><html><head><title>HTML-сторінка</title></head><body><h1>Привіт! Це HTML-сторінка.</h1></body></html>');
});

// Маршрут для виведення HTML-сторінки з файлу
app.get('/filehtml', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Помилка сервера: не вдалося прочитати файл');
    } else {
      res.send(data);
    }
  });
});

// Обробка всіх інших GET-запитів
app.get('*', (req, res) => {
  res.status(404).send('Помилка 404: Сторінка не знайдена');
});

// Обробка помилок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Помилка сервера!');
});

// Прослуховування порту
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
