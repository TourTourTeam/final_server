var Schema = {};

Schema.createSchema = function(mongoose) {
var parttimeSchema = mongoose.Schema({
    id: {type: String, required: true, unique: true},
    user_id : { type: String, required:true, 'default':''},
    building_id:{type:String, required:true},
    pay:{type:String,min:0},
    start_time:{type:Date,required:true},
    finish_time:{type:Date,required:true},
});
console.log('parttimeSchema 정의함.');
return parttimeSchema;
};

module.exports = Schema;

