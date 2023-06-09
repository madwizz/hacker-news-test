# hacker-news-test

### new ui for a hacker news api

### how to start:
- cd hacker-news-test
- npm install
- npm run build
- npm run dev / npm run preview; it will launch locally on http://127.0.0.1:3000/


Главная страница
- [x] Показывает последние 100 новостей в виде списка, отсортированного по дате, самые свежие сверху
- [x] Каждая новость содержит: название, рейтинг, ник автора, дату публикации
- [ ] По клику на новость происходит переход на страницу новости (В данном задании я решил что клик по заголовку новости будет отправлять на страницу с комментариями к этой новости, взамен этого добавлена ссылка под заголовком)
- [x] Список новостей должен автоматически обновляться раз в минуту без участия пользователя
- [x] На странице должна быть кнопка для принудительного обновления списка новостей

Страница новости
- [x] Должна содержать: ссылку на новость, заголовок новости, дату, автора, счётчик количества комментариев, список комментариев в виде дерева
- [x] Корневые комментарии подгружаются сразу же при входе на страницу, вложенные - по клику на корневой
- [x] На странице должна быть кнопка для принудительного обновления списка комментариев
- [x] На странице должна быть кнопка для возврата к списку новостей


Технические требования
- [x] Приложение разработано с использованием React 
- [x] Использование TypeScript
- [x] Использован официальный API Hacker News. (https://github.com/HackerNews/API) Вызовы Hacker News API и обработка данных от него производятся напрямую с фронтенда
- [x] Роутинг выполнен с использованием React Router V6 (https://reactrouter.com/en/main)
- [x] Фреймворк UI любой на ваше усмотрение (как пример MUI). (https://mui.com/)
- [ ] Можно и на чистом css, главное, чтобы было красиво
- [x] Приложение должно запускаться по адресу localhost:3000 (http://127.0.0.1:3000/)
- [x] При переходах по ссылкам страница не перезагружается
- [x] Исходный код решения должен быть выложен с вашего аккаунта на Github (https://github.com/madwizz/hacker-news-test) с Readme файлом с инструкцией по запуску
