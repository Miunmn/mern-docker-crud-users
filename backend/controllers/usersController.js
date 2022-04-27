import userService from '../services/userService.js';
import { validationResult } from 'express-validator';
import { matchedData } from 'express-validator';

async function getUsers(req, res, next) {
  try {
      res.json(await userService.getUsers());
  } catch (err) {
    console.log('err', err);
    res.status(err.status).json({ message: err.message });    
  }
}

async function createUser(req, res, next) {

  let body = matchedData(req, { locations: ['body'], includeOptionals: true });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }

  try {
      res.json(await userService.createUser(body));
  } catch (err) {
    console.log('err', err);
    res.status(err.status).json({ message: err.message });    }
}

async function deleteUser(req, res, next) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }
  
  try {
      res.json(await userService.deleteUser(req.query.id));
  } catch (err) {
      console.log('err', err);
      res.status(err.status).json({ message: err.message });
  }
}

async function updateUser(req, res, next){
  
  let body = matchedData(req, { locations: ['body'], includeOptionals: true });

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }

  let id = req.query.id;

  await userService.updateUser(id, body)
  .then(function(result){
    res.json(result);
  })
  .catch(function(err){
    console.log('err', err);
    res.status(err.status).json({ message: err.message });  
  });
}


export {
  getUsers,
  createUser,
  deleteUser,
  updateUser
}