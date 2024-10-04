const express = require('express');
const path = require('node:path');
const formRoutes = require('./routes/form');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use('/', formRoutes);

app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});
