import * as express from 'express'
import { User } from '../models/User'
import {  authFactory, authCheckId } from '../middleware/auth-midleware'
import { findAllUsers, updateOneUser, findUserById } from '../services/user-service'
import { UserDTO } from '../dtos/UserDTO'


export const userRouter = express.Router()
// this will work almost exactly like it does with userRouter up in index


//generally a get request to the root of a path
//will give you every single one of those resources
userRouter.get('', [authFactory(['Admin', 'Finance-Manager']),  async (req,res)=>{
    //get all of our users
    //format them to json
    //use the response obj to send them back
    let users:User[] = await findAllUsers(); 
    res.json(users)// this will format the object into json and send it back
    
}])

// in express we can add a path variable by using a colon in the path
// this will add it to the request object and the colon makes it match anything
userRouter.get('/:id', authFactory(['Admin', 'User', 'Finance-Manager']), authCheckId, async (req,res)=>{
    const id = +req.params.id// the plus sign is to type coerce into a number
    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        try{
            let user = await findUserById(id)
            res.json(user)
        }catch(e){
            res.status(e.status).send(e.message)
        }
      
        
    }
})



// generally in rest convention
// a post request to the root of a resource will make one new of that resource
userRouter.patch('', authFactory(['Admin']), async (req,res)=>
{
    let { userid, username, password,  firstname, lastname,   email, role } = req.body// this will be where the data the sent me is
    // the downside is this is by default just a string of json, not a js object
    console.log(JSON.stringify(req.body))
    // {"userid":3,"username":"user256","password":"password","firstname":"Helga","lastname":"Yorming777","email":"hyorg@gmail.com","role":{"roleid":2,"role":"User"}}
   /*
    console.log("role_id ====" + role.roleid); 
    console.log("role_id ====" + role.role); 
   */
    if(username && password && email && userid && firstname && lastname && role.roleid && role.role)
    {

    let uDTO:UserDTO = new UserDTO(userid,username,password,firstname,lastname,email,role.roleid,role.role)
    

    let newUser = await updateOneUser(uDTO)
    res.status(201).json(newUser);

    console.log(JSON.stringify( newUser ) )
} 
else {
    res.status(400).send('Please include all user fields')
   
    // for setting a status and a body
     }
})

