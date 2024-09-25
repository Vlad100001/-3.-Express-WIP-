// Урок 3. Модули и фреймворк Express (WIP)
// Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

// — На каждой странице реализован счетчик просмотров
// — Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
// — Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
// — Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.



// Подсказка:
// Вы можете сохранять файл в формате JOSN,
// где в объекте ключом будет являться URL страницы, а значением количество просмотров страницы

// Формат сдачи работы:
// — Ссылка на гитхаб/гитлаб
// — Файл с кодом.

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const jsonPath = path.join(__dirname, 'count.json');
const count = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

app.get('/', (reg, res) => {
    count.home++;
    res.send(`<h1>Добро пожаловать!</h1><a href="/about">To about</a><p> ${count.home} просмотров</p>`);

    fs.writeFileSync(jsonPath, JSON.stringify(count));

})
app.get('/about', (reg, res) => {
    count.about++;
    res.send(`<h1>Добро пожаловать на about!</h1><a href="/">Home</a><p>${count.about} просмотров</p>`);
    fs.writeFileSync(jsonPath, JSON.stringify(count));
})
app.listen(3000)