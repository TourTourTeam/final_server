module.exports=function(app,router,database){

    router.get('/map_name/:map_name',function(req,res,next){
        var database= app.get('database');
        var Building = database.BuildingModel;
       Building.find({map_name : req.params.map_name})
       .sort({id:1})
       .exec(function(err,building){
           if(err){
               res.status(500);
               res.json({success:false, err:"!"+err});
           }
           else{
               res.json({success:true, data:building})
           }
       });
    });
    router.post('/update/:id',function(req,res,next){
        var database= app.get('database');
        var Building = database.BuildingModel;
        console.log(JSON.parse(req.body.update));
         Building.findOneAndUpdate({_id:req.params.id}, JSON.parse(req.body.update))
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

router.post('/delete/:id',function(req, res, next){
    var database= app.get('database');
    var Building = database.BuildingModel;
    Building.findOneAndRemove({_id:req.params.id})
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
    var Building = database.BuildingModel;
   Building.find({})
   .sort({id:1})
   .exec(function(err,building){
       if(err){
           res.status(500);
           res.json({success:false, err:"!"+err});
       }
       else{
           res.json({success:true, data:building})
       }
   });
});

router.post('/',function(req,res,next){
    var database= app.get('database');
    var Building = database.BuildingModel;
    Building.findOne({})
    .sort({id:-1})
    .exec(function(err,building){
        if(err){
            res.status(500);
            res.json({success:false,err:"!"+err});
        }
        else{
            res.locals.lastId = building?building.id:0;
            next();
        }
    });
},
function(req,res,next){
    var database= app.get('database');
    var Building = database.BuildingModel;
    var newBuilding = new Building(req.body);
    newBuilding.id=res.locals.lastId+1;
    newBuilding.save(function(err,building){
        if(err){
            res.status(500);
            res.json({success:false, err:"!"+err});
        }
        else{
            res.json({success:true, data:building});
        }
    })
});

router.get('/:id',function(req,res,next){
    var database= app.get('database');
    var Building = database.BuildingModel;
    Building.findOne({_id:req.params.id})
    .exec(function(err,building){
        if(err){
            res.status(500);
            res.json({success:false, err:"!"+err});
        }
        else if(!building){
            res.json({success:false, err:"building not found"});
        }
        else{
            res.json({success:true, data:building});
        }
    });
});

router.put('/:id',function(req,res,next){
    var database= app.get('database');
    var Building = database.BuildingModel;
    Building.findOneAndUpdate({_id:req.params.id}, req.body)
    .exec(function(err,building){
        if(err){
            res.status(500);
            res.json({success:false, err:"!"+err});
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