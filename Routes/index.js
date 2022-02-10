const express=require('express');
const router=express.Router();
const Controller=require('../controller/translateController');
//if url has product  
router.post('/',Controller.home);

module.exports=router;