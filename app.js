const express = require('express');
const projects = require('./data.json').projects;

const app = express();


app.set('view engine', 'pug');
app.use('/static', express.static('public'));
app.use('/images', express.static('images'));

app.get('/', (req, res) =>{
    res.render('index', {projects: projects});
});

app.get('/about', (req, res) =>{
    res.render('about');
});

app.get('/project/:id', (req, res) =>{
    res.render('project', {project: projects[req.params.id]});
});

app.use((req, res, next)=>{
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    res.locals.error = err;
    res.render('error');
});

app.listen(3000, ()=>{
    console.log("App is listining to port 3000")
})