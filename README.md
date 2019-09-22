Backend for Rock-band Online-Radio
==================================

Описание
--------

Creative work. Backend for site of rock band with radio on Express.js с Babel.


API
---

    GET
    ${HOST}/api/songs

Роут который возвращает список песен с метаданными собранным по одноуровневым папкам-альбомам в каталоге /audio

*

    GET
    ${HOST}/test

Тестовый роут

*

Deploy
------

Установка зависимостей npm packages

    $ npm install


Build JSON for songs to be parsed
---------------------------------

    $ npm run build:songs:json


Development
-----------

    $ npm run dev

    http://localhost:8082/

Production
----------

Запуск проекта для продакшена (will automatically start build:songs:json)

    $ npm start

Тесты
-----

Запуск линтера

    $ npm run lint

Запуск тестов

    $ npm run test
