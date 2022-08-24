const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static('public'));

// // Use apiRoutes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

const test = require('./Develop/db/db.json');

app.get('/api/test1', (req, res) => {
    res.send('hello!');
});

app.get('/api/test', (req, res) => {
    res.json(test);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
