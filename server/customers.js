const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const DataSchema =new Schema (
	{
		name:String,
		password:String,
	        group:String,
		products:Array,
		message:String
	},
	{timestamps:true});
module.exports=mongoose.model('massagecustomers',DataSchema);
