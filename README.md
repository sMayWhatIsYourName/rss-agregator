![134875029-2ca1ebc7-7feb-44f3-a56d-0ee29ffaac7d64](https://user-images.githubusercontent.com/84579087/164723061-7ea9b03e-6a03-4a66-bb04-7ebbc3b7e65d.png)


# JavaScript Проект - «RSS агрегатор»
## Описание
RSS – специализированный формат, предназначенный для описания лент новостей, анонсов статей и других материалов. Это наиболее простой способ для сайтов (обычно, блогов) дать возможность пользователям подписываться на изменения. Для этого используются специальные сервисы, называемые RSS-агрегаторами. Эти сервисы умеют опрашивать RSS-ленты сайтов на наличие новых постов и показывают их в удобном виде, отмечая прочитанное и так далее.

Rss Reader – сервис для агрегации RSS-потоков, с помощью которых удобно читать разнообразные источники, например, блоги. Он позволяет добавлять неограниченное количество RSS-лент, сам их обновляет и добавляет новые записи в общий поток.

## Установка

```sh
make install
```

## Запуск локального сервера

```sh
make start
```

## В ходе выполнения проекта я:
- Ознакомился с MVC паттерном.
- Использовал библиотеку для валидации форм "YUP".
- Использовал библиотеку интерациализации "i18next".
- Использовал библиотеку "Bootstrap".
- Использовал препроцессор SCSS.
- Использовал для проверки кода линтер ESLint.
- Реализовал веб-приложение на чистом JS.
- Реализовал проверку RSS API каждые 5 секунд для автообновления ленты.

## Hexlet tests and linter status:
[![Actions Status](https://github.com/temasemyonov678gh/frontend-project-lvl3/workflows/hexlet-check/badge.svg)](https://github.com/temasemyonov678gh/frontend-project-lvl3/actions)
[![Linter test](https://github.com/sMayWhatIsYourName2020/rss-agregator/actions/workflows/node.js.yml/badge.svg)](https://github.com/sMayWhatIsYourName2020/rss-agregator/actions/workflows/node.js.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/7aa360f25890529d7a1f/maintainability)](https://codeclimate.com/github/temasemyonov678gh/frontend-project-lvl3/maintainability)

#### Проверить работоспособность можно вставив эти ссылки в поле ввода:
http://lorem-rss.herokuapp.com/feed?unit=second&interval=10

https://www.sport.ru/rssfeeds/basketball.rss

https://habr.com/ru/rss/all/all/?fl=ru

## Ссылка на проект:
[Vercel](https://rss-agregator-beta.vercel.app/)