import * as express from 'express'
import { Reimbursement } from '../models/Reimbursement'
import {  authFactory, authCheckId } from '../middleware/auth-midleware'
import { findReimbursementByStatusId, findReimbursementByUserId, insertReimbursement, updateReimbursement } from '../services/reimb-service'
import { ReimbursementDTO } from '../dtos/ReimbursementDTO'

import { InternalServerError } from '../errors/InternalServerError'



export const reimbRouter = express.Router()

//Get reimbursements by statusId
reimbRouter.get('/status/:statusId', authFactory(['Admin', 'Finance-Manager']), async (req, res) => 
{    /**Super important part about roles */
     console.log("Role is " + req.session.user.role.role )
    
     const id = +req.params.statusId
    if (isNaN(id)) 
    {
        res.sendStatus(400)
    } else 
    {
        try 
        {
            let status = await findReimbursementByStatusId(id)
            res.json(status)
        } catch (e) {
            res.status(e.status).send(e.message)
        }
    }
})

//Get reimbursements by userId
reimbRouter.get('/author/userId/:userId', authFactory(['Admin','Finance-Manager','User']), authCheckId, async (req, res) => 
{
    console.log("Role is " + req.session.user.role.role )
    console.log("UserId is " + req.session.user.userId )

    const id = +req.params.userId
    if (isNaN(id)) {
        res.sendStatus(400)
    } else 
    {

        switch (req.session.user.role.role) {


            case 'Admin': {
                            //
                            try {
                                let status = await findReimbursementByUserId(id)
                                res.json(status)
                                } 
                                catch (e)
                                 {
                                   res.status(e.status).send(e.message)
                                 }
                              break;
                            }
           case 'Finance-Manager': 
                          {
                            //
                            try {
                                let status = await findReimbursementByUserId(id)
                                res.json(status)
                                } 
                                catch (e)
                                 {
                                   res.status(e.status).send(e.message)
                                 }
                             break;
                           }
            case 'User': 
                          {
                              if (id ==req.session.user.userId)
                              { //
                                try {
                                    let status = await findReimbursementByUserId(id)
                                    res.json(status)
                                    } 
                                    catch (e)
                                     {
                                       res.status(e.status).send(e.message)
                                     }
                              }
                              else 
                              {
                               res.status(400).send('You can see info about current Reimbursement. But if you want it, give beer to Admin or me:) ')
                              }

                              break;
                           } 
                           
                           default://should probably be last, 
                           break;

           } // switch



        
    } //else
})

//add new Reimbursement
reimbRouter.post('', authFactory(['Admin', 'Finance-Manager', 'User']), async (req, res) =>
 {
    console.log("Role is " + req.session.user.role.role )
    console.log("USERid is " + req.session.user.userId )

    let { reimbursementId,author, amount, dateSubmitted,
        dateResolved, description, resolver,
        status, type } = req.body


        if (!author || !dateSubmitted || !dateResolved || !description || !resolver || !status)
         {
          if (amount && description && type) {
            try 
             {
                // reimbursement Id = 0
                let reimbursement = await insertReimbursement(new Reimbursement(0, req.session.user.userId, amount, new Date().toLocaleDateString() , '1970/01/01', description, null, 1, type))
                res.json(reimbursement).sendStatus(201)
              } catch (e) 
               {
                throw new InternalServerError()
                }

            }
            else  
            {
                res.status(400).send('Please include all fields for Reimbursement')
            }

        } //   if (!author || !dateSubmitted || !dateResolved || !description || !resolver || !status)
        // all fields included
        else if (author && amount && dateSubmitted && dateResolved && description && resolver && status && type)
        {
              
    
        try 
        {
            let reimb:Reimbursement = new Reimbursement(
                0, 
                req.session.user.userId,
                amount,
                dateSubmitted, // 
                dateResolved,   //
                description,
                resolver,   //  null
                status,     
                type);
    
                console.log("router reimbDTO = " + JSON.stringify( reimb ) )

            let reimbursement = await insertReimbursement(reimb)
            res.json(reimbursement).sendStatus(201)
        } catch (e) 
           {
            console.log("===errored==="+e)
            throw new InternalServerError()          
           }  //catch
   
        }
        
        
        else {
            res.status(400).send('Please include all fields for Reimbursement')
        }


})



//Patch request, that only admins and finance-managers can call. passes in information to be update for reimbursements
reimbRouter.patch('', authFactory(['Admin', 'Finance-Manager']), async (req, res) => {
    let { reimbursementId, author, amount, dateSubmitted,
        dateResolved, description, resolver,
        status, type } = req.body

        console.log("reimbursementId = "+ reimbursementId);
        console.log("author = "+ author);
        console.log("amount = "+ amount);
        console.log("dateSubmitted = "+ dateSubmitted);
        console.log("dateResolved = "+ dateResolved);
        console.log("description = "+ description);
        console.log("resolver = "+ resolver);
        console.log("status = "+ status);
        console.log("type = "+ type);

    if (reimbursementId && (author || amount || dateSubmitted || dateResolved || description || resolver || status || type))
     { 
        let reimbDTO:ReimbursementDTO = new ReimbursementDTO(
            reimbursementId ,
            author,
            amount ,
            dateSubmitted ,
            dateResolved ,
            description,
            resolver,
            status ,
            type);
     try {
        let reimbursement = await updateReimbursement(reimbDTO)
        res.json(reimbursement)
     }  
     catch(e) 
     {  console.log("===Router error ==="+e)}
     }
      else 
      {      
        if (!reimbursementId) 
        {
            res.status(400).send('Please include Reimbursement Id')
        }
         else
             {
              res.status(400).send('Please include atleast one field to update')    
             }    
      }
})

