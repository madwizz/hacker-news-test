# hacker-news-test

### new ui for a hacker news api

### how to start:
- cd hacker-news-test
- npm install
- npm run build
- npm run dev / npm run preview; it will launch locally on http://127.0.0.1:3000/

### Main Page

- [x] Displays the last 100 news in a list sorted by date, with the most recent at the top.
- [x] Each news item includes: title, rating, author's nickname, and publication date.
- [ ]Clicking on a news item takes you to the news page (For this task, I've decided that clicking on the news headline will take you to the page with comments on that news, instead there's a link below the headline).
- [x] The news list should automatically update every minute without user intervention.
- [x] There should be a button on the page to forcibly update the news list.
      
### News Page

- [x] Should contain: a link to the news, news headline, date, author, a counter of the number of comments, and a list of comments in tree form.
- [x] Root comments should be loaded immediately upon entering the page; nested ones should load upon clicking on a root comment.
- [x] There should be a button on the page to forcibly update the comments list.
- [x] There should be a button on the page to return to the news list.
- [x] Technical Requirements

- [x] The application is developed using React.
- [x] Usage of TypeScript.
- [x] Uses the official Hacker News API. (https://github.com/HackerNews/API) Calls to the Hacker News API and data processing from it are made directly from the frontend.
- [x] Routing is done using React Router V6 (https://reactrouter.com/en/main)
- [x] Any UI framework is acceptable (for example, MUI). (https://mui.com/)
- [ ]Pure CSS is also acceptable, the main thing is that it should look nice.
- [x] The application should run at http://localhost:3000 (http://127.0.0.1:3000/)
- [x] Page doesn't reload when navigating through links.
- [x] The source code for the solution should be uploaded from your account on Github (https://github.com/madwizz/hacker-news-test) with a Readme file containing instructions for launching.
