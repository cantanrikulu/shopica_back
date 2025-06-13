const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campaignSchema = new Schema(
  {
    title: { type: String, required: true }, 
    description: { type: String },           
    image: { type: String },                
    buttonText: { type: String },            
    link: { type: String },                  
    startDate: { type: Date },               
    endDate: { type: Date },                 
    isActive: { type: Boolean, default: true }, 
  },
  { timestamps: true, autoIndex: true, minimize: true }
);

const Campaign = mongoose.model("Campaign", campaignSchema, "campaigns");

module.exports = Campaign;
