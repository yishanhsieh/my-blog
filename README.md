# instruction Video
[How To Build A Markdown Blog Using Node.js, Express, And MongoDB - Web development simplified](https://www.youtube.com/watch?v=1NrHkjlWVhM&t=3252s)

# install
```
npm in express mongoose ejs
```
```
npm i --save-dev nodemon
```

# markdown post
- 42'07: render markdown post porperly and use slug instead of post ID.
- import libraries as the following code:
```
npm i marked slugify

```
- import marked function in show.ejs:
```
const { marked } = require("marked");
// destructing is needed
```

- 52'21 : convert markdown to HTML. Need to sanitize the HTML, so people can run JavaScript on computers.
- render a html inside a ejs, do the following code:
```
npm i dompurify jsdom 
```
