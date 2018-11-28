var Schema = {};

Schema.createSchema = function(mongoose) {
var buildingSchema = mongoose.Schema({
    id: {type: String, required: true},
    owner_id:{type:String},
    pos:{x:Number,y:Number,z:Number},
    price:{cur:{type:Number,min:0},
            sale:{type:Number,min:0}
    },
    //upgrade
    area:{type:Number},
    part_time_job:{number:Number, money:Number},
    prefabName:{type:String},
});

console.log('bildingSchema 정의함.');
return buildingSchema;
};

module.exports = Schema;