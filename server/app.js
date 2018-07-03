const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const questionRouter = require('./routes/questions');
const answerRouter = require('./routes/answers');
const userDb = process.env.USERDB;
const passwordDb = process.env.PASSWORDDB;
const port = process.env.PORT || 3000;
const url = `mongodb://${userDb}:${passwordDb}@ds125381.mlab.com:25381/hacktivoverflow-db`;
const cors = require('cors');

const app = express();
mongoose.connect(url, function(){
    console.log('connect to monggose')
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',indexRouter);
app.use('/users',userRouter);
app.use('/questions',questionRouter);
app.use('/answers', answerRouter);

app.listen(port, function(){
    console.log(`server listen on port ${port}`);
});