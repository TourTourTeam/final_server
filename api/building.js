module.exports=function(app,router,database){
    
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

router.get('/map/:map_id',function(req,res,next){
    var database= app.get('database');
    var Map = database.MapModel;
    Map.findOne({map_id : req.params.map_id})
    .exec(function(err,map){
        if(err){
            res.status(500);
            res.json({success:false,err:"!"+err});
        }
        else if(!map){
            res.json({success:false, err:"map not found"});
        }
        else{
            res.json({success:true,data:map});
        }
    });
});
router.get('/map_name/:map_name',function(req,res,next){
    var database= app.get('database');
    var Map = database.MapModel;
    Map.findOne({map_name : req.params.map_name})
    .exec(function(err,map){
        if(err){
            res.status(500);
            res.json({success:false,err:"!"+err});
        }
        else if(!map){
            res.json({success:false, err:"map not found"});
        }
        else{
            res.json({success:true,data:map});
        }
    });
});
};