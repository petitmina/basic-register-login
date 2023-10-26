const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const corsOptions = {
    methods: 'GET,POST,PUT,DELETE' // 허용할 HTTP 메서드를 지정
};

const app = express();

require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/api', indexRouter);
app.use(cors(corsOptions));
const mongoURI = `mongodb://localhost:27017/register-basic`

mongoose.connect(mongoURI, {useNewUrlParser: true}).then(() => {
    console.log('mongoose connected')
})
.catch((error) => {
    console("DB connect fail", error)
});

app.listen(process.env.PORT || 5002, () => {
    console.log('server on')
})