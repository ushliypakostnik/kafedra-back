Backend for Rock-band Online-Radio
==================================

Описание
--------

Creative work. Backend for site of rock band with radio on Express.js с Babel.


API
---

    GET
    ${HOST}/test

Тестовый роут

*

Deploy
------

Установка зависимостей npm packages

    $ npm install


Build JSON for songs to be parsed (it'll be later automated):
-------------------------------------------------------------

$ npm run build:songs:json


Development
-----------

    $ npm start

    http://localhost:8082/

Production
----------

Запуск проекта для продакшена

    $ npm run prod

Тесты
-----

Запуск линтера

    $ npm run lint

Запуск тестов

    $ npm run test
