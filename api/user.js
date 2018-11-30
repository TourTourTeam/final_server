
module.exports=function(app,router,database)
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
     var newUser = new User(req.body.data);
     newUser.id=res.locals.lastId+1;
     newUser.save(function(err,user){
         if(err){
             res.status(500);
             res.json({success:false, err:"!"+err});
         }
         else{
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
 
 router.put('/:id',function(req,res,next){
    var database= app.get('database');
    var User=database.UserModel;
     User.findOneAndUpdate({id:req.params.id}, req.body)
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