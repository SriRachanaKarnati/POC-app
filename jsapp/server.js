const express = require('express');
const mongoose=require('mongoose');
const users=require('./routes/api/users');
const app = express();
const bodyParser=require('body-parser');
var path = require('path');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/users",{useNewUrlParser: true},(error) => {
    if(!error){
        console.log("Success");
    }else{
        console.log("error in connecting")
    }
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'js');
app.get('/' , (req,res) =>res.send('Hello World!'));
app.use('/api/users',users);
//app.use('/api/users', userRoutes);
const PORT= process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
