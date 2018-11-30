
module.exports=function(app,router,database){


router.post('/delete/:id',function(req, res, next){
    User.findOneAndRemove({_id:req.params.id})
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
router.get('/',function(req,res,next){
    var database= app.get('database');
    var Map = database.MapModel;
    Map.find({})
    .sort({id:1})
    .exec(function(err,map){
        if(err){
            res.status(500);
            res.json({success:false, err:"!"+err});
        }
        else{
            res.json({success:true, data:map})
        }
    });
 });
 
 router.post('/',function(req,res,next){
    var database= app.get('database');
    var Map = database.MapModel;
     Map.findOne({})
     .sort({id:-1})
     .exec(function(err,map){
         if(err){
             res.status(500);
             res.json({success:false,err:"!"+err});
         }
         else{
             res.locals.lastId = map?map.id:0;
             next();
         }
     });
 },
 function(req,res,next){
     var database = app.get('database');
     var Map = database.MapModel;
     var newMap = new Map(req.body);
     newMap.id=res.locals.lastId+1;
     newMap.save(function(err,map){
         if(err){
             res.status(500);
             res.json({success:false, err:"!"+err});
         }
         else{
             res.json({success:true, data:map});
         }
     })
 });
 
 router.get('/:id',function(req,res,next){
    var database= app.get('database');
    var Map = database.MapModel;
     Map.findOne({_id:req.params.id})
     .exec(function(err,map){
         if(err){
             res.status(500);
             res.json({success:false, err:"!"+err});
         }
         else if(!map){
             res.json({success:false, err:"map not found"});
         }
         else{
             res.json({success:true, data:map});
         }
     });
 });
 
 router.put('/:id',function(req,res,next){
    var database= app.get('database');
    var Map = database.MapModel;
     Map.findOneAndUpdate({_id:req.params.id}, req.body)
     .exec(function(err,map){
         if(err){
             res.status(500);
             res.json({success:false, err:"!"+err});
         }
         else if(!map){
             res.json({success:false, err:"map not found"});
         }
         else{
             res.json({success:true});
         }
     });
 });

};