const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http')

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Redirect to posts
app.get('/', (req, res) => {
  res.redirect('/posts');
});

// List all posts
app.get('/posts', (req, res) => {
  var data ='';

  http.get('http://jsonplaceholder.typicode.com/posts', (resp) => {
  console.log(resp)  
  // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data).explanation);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  })

  console.log(data);
   res.render('posts.ejs', {posts: data})
});

// Show the search form
app.get('/search', (req, res) => {
  res.render('search.ejs', { post: '' });
});

// Find all comments for post
app.post('/search', (req, res) => { });
