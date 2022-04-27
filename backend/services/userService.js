import User from "../models/user.js";

async function getUsers(){

  return new Promise( function (resolve, reject) {
    var query = User.find({});
    query.exec(function(err, users) {
        if (err){
          console.log(err)
          return reject({message : 'Error while fetching users'});
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
        console.log(err)
        return reject({message : 'Error while creating user'});
      }
      return resolve(usr);
    });
  });

}

async function deleteUser(user_id){
  return new Promise( function (resolve, reject) {
    const deleteId = {_id: user_id};
    User.findOneAndRemove(deleteId, function(err, usr) {
      if (err){
        console.log(err)
        return reject({message : 'Error while deleting user'});
      }
      return resolve(usr);
    });
  });
}

async function updateUser(id, updateData){
  return new Promise( function (resolve, reject) {
    let user_id = id;

    delete updateData._id;
    
    const updateId = {_id: user_id};
  
    Object.keys(updateData).forEach((k) =>{ 
      if(updateData[k] === undefined || updateData[k] === '' ) delete updateData[k]}
    );

    User.findByIdAndUpdate(updateId, {$set: updateData}, function(err, usr) {
      if (err){
        console.log(err)
        return reject({message : 'Error while updating user'});
      }
      return resolve(updateData);
    });
  });

}

export default {
  getUsers,
  createUser,
  deleteUser,
  updateUser
}