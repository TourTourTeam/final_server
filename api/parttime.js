
module.exports=function(app,router,database){
    
router.get('/',function(req,res,next){
    var database= app.get('database');
    var Parttime = database.ParttimeModel;
   Parttime.find({})
   .sort({id:1})
   .exec(function(err,parttime){
       if(err){
           res.status(500);
           res.json({success:false, err:"!"+err});
       }
       else{
           res.json({success:true, data:parttime})
       }
   });
});

router.post('/',function(req,res,next){
    var database= app.get('database');
    var Parttime = database.ParttimeModel;
    Parttime.findOne({})
    .sort({id:-1})
    .exec(function(err,parttime){
        if(err){
            res.status(500);
            res.json({success:false,err:"!"+err});
        }
        else{
            res.locals.lastId = parttime?parttime.id:0;
            next();
        }
    });
},
function(req,res,next){
    var database= app.get('database');
    var Parttime = database.ParttimeModel;
    var newParttime = new Parttime(req.body);
    newParttime.id=res.locals.lastId+1;
    newParttime.save(function(err,parttime){
        if(err){
            res.status(500);
            res.json({success:false, err:"!"+err});
        }
        else{
            res.json({success:true, data:parttime});
        }
    })
});

router.get('/:id',function(req,res,next){
    var database= app.get('database');
    var Parttime = database.ParttimeModel;
    Parttime.findOne({_id:req.params.id})
    .exec(function(err,parttime){
        if(err){
            res.status(500);
            res.json({success:false, err:"!"+err});
        }
        else if(!parttime){
            res.json({success:false, err:"part time not found"});
        }
        else{
            res.json({success:true, data:parttime});
        }
    });
});

router.put('/:id',function(req,res,next){
    var database= app.get('database');
    var Parttime = database.ParttimeModel;
    Parttime.findOneAndUpdate({_id:req.params.id}, req.body)
    .exec(function(err,parttime){
        if(err){
            res.status(500);
            res.json({success:false, err:"!"+err});
        }
        else if(!parttime){
            res.json({success:false, err:"part time not found"});
        }
        else{
            res.json({success:true, data:parttime});
        }
    });
});

router.get('/building/:building_id',function(req,res,next){
    var database= app.get('database');
    var Building = database.BuildingModel;
    Building.findOne({building_id : req.params.building_id})
    .exec(function(err,building){
        if(err){
            res.status(500);
            res.json({success:false,err:"!"+err});
        }
        else if(!building){
            res.json({success:false, err:"building not found"});
        }
        else{
            res.json({success:true,data:building});
        }
    });
});
router.post('/delete/:id',
  function(req, res, next){
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

router.get('/user/:user_id',function(req,res,next){
    var database= app.get('database');
    var Building = database.BuildingModel;
    Building.findOne({user_id : req.params.user_id})
    .exec(function(err,building){
        if(err){
            res.status(500);
            res.json({success:false,err:"!"+err});
        }
        else if(!building){
            res.json({success:false, err:"building not found"});
        }
        else{
            res.json({success:true,data:building});
        }
    });
});

};