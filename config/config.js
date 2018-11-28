module.exports = {
	server_port: 3000,
	db_url: 'mongodb://root:root@ec2-3-17-30-224.us-east-2.compute.amazonaws.com:27017/tour',
	db_schemas: [
		{file:'./user_schema', collection:'users', schemaName:'UserSchema', modelName:'UserModel'},
		{file:'./building_schema', collection:'building', schemaName:'BuildingSchema', modelName:'BuildingModel'},
		{file:'./map_schema', collection:'map', schemaName:'MapSchema', modelName:'MapModel'},
		{file:'./parttime_schema', collection:'parttime', schemaName:'ParttimeSchema', modelName:'ParttimeModel'}
	]
}
