require('./db');
const express = require('express');
const routes = require('./router/userRouter');
const dotenv = require('dotenv');
const app = express();
const port = 8000;

dotenv.config();
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`connection is live at port ${port}`);
})

