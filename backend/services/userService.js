import User from "../models/user.js";
import mongoose from "mongoose";

async function getUsers(){

  return new Promise( function (resolve, reject) {
    var query = User.find({});
    query.exec(function(err, users) {
        if (err){
          let error = new Error('Error while fetching users')
          error.status = 500;
          return reject(error);
        }
        return resolve(users);
     });
  });

}
// createUser
async function createUser(newUserData){
  return new Promise( function (resolve, reject) {
    User.create(newUserData, function(err, usr) {
      if (err){
        let error = new Error('Error while creating user')
        error.status = 500;
        return reject(error);
      }
      return resolve(usr);
    });
  });

}

async function deleteUser(user_id){
  return new Promise( function (resolve, reject) {
    user_id = mongoose.Types.ObjectId(user_id);

    User.exists({ _id: user_id }, function(err, exists) {
      if(err){
        let error = new Error('Error while creating user')
        error.status = 500;
        return reject(error);
      }
      if(!exists){
        let error = new Error('User not found')
        error.status = 400;
        return reject(error);
      }
    });

    User.findOneAndRemove({ _id: user_id }, function(err, usr) {
      if (err){
        return reject({message : 'Error while deleting user'});
      }
      return resolve(usr);
    });
  });
}

async function updateUser(user_id, updateData){
  return new Promise( function (resolve, reject) {
    user_id = mongoose.Types.ObjectId(user_id);
    const updateId = {_id: user_id};

    User.exists(updateId, function(err, exists) {
      if(err){
        console.log('err', err);
        let error = new Error('Error while updating user')
        error.status = 500;
        return reject(error);
      }       

      if(!exists){
        let error = new Error('User not found')
        error.status = 400;
        return reject(error);
      }

      delete updateData._id;

      Object.keys(updateData).forEach((k) =>{ 
        if(updateData[k] === undefined) delete updateData[k]}
      );

      User.findByIdAndUpdate(updateId, {$set: updateData}, function(err, usr) {
        if (err){
          console.log("err", err);
          let error = new Error('Error while updating user')
          error.status = 500;
          return reject(error);
        }
        return resolve(updateData);
      });
    });
  });

}

export default {
  getUsers,
  createUser,
  deleteUser,
  updateUser
}