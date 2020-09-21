const express = require('express');
const cors = require('cors');
const router=express.Router();
router.all('*',cors());
const User=require('../../models/User');
const _id=require('../../models/User');
//const UserSchema=require('../../models/User');
const bcrypt=require('bcryptjs');

/*router.get('/team', (req,res) => {
    try{
const username=req.body.username;
    User.find({username}).then(user =>{
        if(user){
       return res.json({username});
        }
    })
                            
                    
                                
    }catch (err) {
        console.log(err.message);
        res.status(500).send('server error')
 }} );*/
//router.get('/test', (req,res) => res.json({msg:"Users works"}));
//userRoutes.route('/users').get(function(req,res){
   /* router.get('/team',(req,res) =>{
    User.find({username:req.body.username}).then(user=>{
        if(!user){
            console.log("cannot fetch records");
        }else{
            return res.json(username);

        }
    
        
    });
});*/

router.get('/team', async(req, res) => {
    try {
           const username = await User.find({});
          res.json(username);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error')
    }
  });
router.post('/register',(req,res)=>{
User.findOne({username:req.body.username}).then(user =>{
    if(user){
        return res.status(400).json({username: 'username already exists'})
    }else{
        const newUser = new User({
            username:req.body.username,
            password:req.body.password,
            date:req.body.date,
            description:req.body.description,
            amount:req.body.amount
        });
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;
                newUser.password=hash;
                newUser.save().then(user =>res.json(user))
                .catch(err=>console.log(err));
            });
        });
    }
});
});
router.post('/login',(req,res)=>{
const username=req.body.username;
const password=req.body.password;
User.findOne({username})
    .then(user =>{
        if(!user){
            return res.status(404).json({username:'username not found'});
        }
        bcrypt.compare(password,user.password).then(isMatch=>{
            if(isMatch){
                res.json({msg:'Success'});
            }
            else{
                return res.status(400).json({password:'Password incorrect'});
            }
        
    });

});
});
router.get('/users/:userId', async(req, res) => {
    try {
        console.log('userId is:' +req.params.userId);
           const user = await User.find({_id: req.params.userId});
          res.json(user);
          
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error')
    }
  });


module.exports=router;