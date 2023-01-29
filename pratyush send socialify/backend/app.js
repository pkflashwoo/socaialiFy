const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     origin : true,
//     credentials : true
// }));

app.use(cors({
    origin :true,
    credentials :true
}))

//Route Importing
// Posts
const posts = require('./routes/postRoute');
app.use('/socialify', posts);

//User Profile
const users = require('./routes/userRoute');
app.use('/socialify', users);


// Middleware for Errors
app.use(errorMiddleware);


module.exports = app;