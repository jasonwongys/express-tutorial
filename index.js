const express = require('express');
const path = require('path');
const moment = require('moment'); //enable date & time 
const logger = require('./middleware/logger');
const app = express();
const exphbs = require('express-handlebars');
const members = require('./Members');


//Init middleware
//app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));



// Members API routes
app.use('/api/members', require('./routes/api/members'));

//Homepage route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
})
);

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));
// app.get(`/`, (req, res) => {
//     //res.send('<h1> Hello World!!!</h1>');

//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
//     //send a index.html to render page
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));