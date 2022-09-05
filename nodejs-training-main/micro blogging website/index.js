require('./db/connection');
const express = require('express');
const userRouters = require('./routes/userRoutes');
const blogRouters = require('./routes/blogRoutes');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 8000;

dotenv.config();
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(userRouters);
app.use(blogRouters);

app.listen(port, () => {
    console.log(`connection is live at port ${port}`);
})