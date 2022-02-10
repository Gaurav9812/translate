const express=require('express');
const mongoose=require('mongoose');
const port =8000 ;
const app=express();
const db=require('./config/mongoose');
const Routes=require('./Routes/index');

//to read form data
app.use(express.urlencoded());

//routes
app.use('/',Routes);

module.exports =app.listen(port,function(err)
{
    if(err)
    {
        console.log(`error in setting up server`);
        return ;
    }
    console.log(`server is running on port :${port}`);
});