var express = require('express');
const app = express();
const morgan = require('morgan');
const blogapp = require('./routes/blogapp')
const users = require('./routes/users');
const likeDislike = require('./routes/like_Dislike')

require('dotenv').config();

app.use(express.json());
app.use(morgan('dev'))
app.use('/user',users)
app.use('/blog',blogapp)
app.use('/likeDislike',likeDislike)

const PORT = process.env.DB_PORT || 2022


app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
});