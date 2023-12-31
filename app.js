const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//IMPORT ROUTES
const userRoutes = require('./routes/user');

//CONNECT DATABASE
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('DB Connected'))
.catch((err)=> console.log(err));

//MIDDLEWARE    
app.use(morgan('dev'));
app.use(bodyParser.json());


//ROUTES MIDDLEWARE
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(port);
})