const express = require('express');
const PORT = 3000;
const app = express();

/* JSON body parse*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/hello', (req, res, next) => {
console.info('/hello call success ');
res.send('Welcome to Firebase Cloud Functions');
});

app.listen(PORT, () => {
console.info('Server is running on PORT:', PORT);
});
module.exports = app;