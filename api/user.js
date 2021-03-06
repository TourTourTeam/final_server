
module.exports=function(app,router)
{

router.get('/',function(req,res,next){
    var database= app.get('database');
    var User=database.UserModel;
    User.find({})
    .sort({id:1})
    .exec(function(err,user){
        if(err){
            res.status(500);
            res.json({success:false, err:"!"+err});
        }
        else{
            res.json({success:true, data:user})
        }
    });
 });
 
 router.post('/',function(req,res,next){
    var database= app.get('database');
    var User=database.UserModel;
     User.findOne({})
     .sort({id:-1})
     .exec(function(err,user){
         if(err){
             res.status(500);
             res.json({success:false,err:"!"+err});
         }
         else{
             res.locals.lastId = user?user.id:0;
             next();
         }
     });
 },
 function(req,res,next){
    var database= app.get('database');
    var User=database.UserModel;
    console.log(JSON.parse(req.body.data));
     var newUser = new User(JSON.parse(req.body.data));
     //newUser.id=res.locals.lastId+1;
     console.log('before save');
     console.log(newUser);
     newUser.save(function(err,user){
         console.log(err);
         console.log(user);
         if(err){
             res.status(500);
             res.json({success:false, err:"!"+err});
         }
         else{
             console.log("success");
             res.json({success:true, data:user});
         }
     })
 });
 
 router.get('/:id',function(req,res,next){
    var database= app.get('database');
    var User=database.UserModel;
     User.findOne({id:req.params.id})
     .exec(function(err,user){
         if(err){
             res.status(500);
             res.json({success:false, err:"!"+err});
         }
         else if(!user){
             res.json({success:false, err:"user not found"});
         }
         else{
             res.json({success:true, data:user});
         }
     });
 });
 router.post('/delete/:id',
  function(req, res, next){
    var database= app.get('database');
    var User=database.UserModel;
    User.findOneAndRemove({id:req.params.id})
    .exec(function(err, hero){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else if(!hero){
        res.json({success:false, message:"user not found"});
      }
      else {
        res.json({success:true});
      }
    });
  }
);
 router.post('/update/:id',function(req,res,next){
    var database= app.get('database');
    var User=database.UserModel;
    console.log('make object');
    console.log(JSON.parse(req.body.update));
     User.findOneAndUpdate({id:req.params.id}, JSON.parse(req.body.update))
     .exec(function(err,user){
         if(err){
             res.status(500);
             res.json({success:false, err:"!"+err});
         }
         else if(!user){
             res.json({success:false, err:"user not found"});
         }
         else{
             res.json({success:true});
         }
     });
 });

 router.put('/:id',function(req,res,next){
    var database= app.get('database');
    var User=database.UserModel;
    console.log('make object');
    console.log(JSON.parse(req.body));
     User.findOneAndUpdate({id:req.params.id}, JSON.parse(req.body))
     .exec(function(err,user){
         if(err){
             res.status(500);
             res.json({success:false, err:"!"+err});
         }
         else if(!user){
             res.json({success:false, err:"user not found"});
         }
         else{
             res.json({success:true});
         }
     });
 });
};