"use strict";
import mongoose, {PassportLocalSchema} from 'mongoose';
const Schema = mongoose.Schema;   //alias
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema : any =  new Schema(
    {
        DisplayName: String,
        EmailAddress: String,
        Username : String,
        Created : {
            type : Date,
            default : Date.now()
        },
        Updated: {
            type : Date,
            default: Date.now()
        }
    },
    {
        collection: "users"
    }
);

UserSchema.plugin(passportLocalMongoose);


const Model = mongoose.model("User", UserSchema);

export default Model;

