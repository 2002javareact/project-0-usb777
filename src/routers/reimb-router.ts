import * as express from 'express'
import { Reimbursement } from '../models/Reimbursement'
import {  authFactory, authCheckId } from '../middleware/auth-midleware'
import { findReimbursementByStatusId, findReimbursementByUserId, insertReimbursement, updateReimbursement } from '../services/reimb-service'
import { ReimbursementDTO } from '../dtos/ReimbursementDTO'

import { InternalServerError } from '../errors/InternalServerError'



export const reimbRouter = express.Router()

//Get reimbursements by statusId
reimbRouter.get('/status/:statusId', authFactory(['Admin', 'Finance-Manager']), async (req, res) => {
    const id = +req.params.statusId
    if (isNaN(id)) {
        res.sendStatus(400)
    } else {
        try {
            let status = await findReimbursementByStatusId(id)
            res.json(status)
        } catch (e) {
            res.status(e.status).send(e.message)
        }
    }
})

//Get reimbursements by userId
reimbRouter.get('/author/userId/:userId', authFactory(['Admin','Finance-Manager','User']), authCheckId, async (req, res) => {
    const id = +req.params.userId
    if (isNaN(id)) {
        res.sendStatus(400)
    } else {
        try {
            let status = await findReimbursementByUserId(id)
            res.json(status)
        } catch (e) {
            res.status(e.status).send(e.message)
        }
    }
})

//add new Reimbursement

reimbRouter.post('', authFactory(['Admin', 'Finance-Manager', 'User']), async (req, res) => {
    let { reimbursementId,author, amount, datesubmitted,
        dateresolved, description, resolver,
        status, type } = req.body

    if (amount && description && type) {
        try {
            let reimbDTO:ReimbursementDTO = new ReimbursementDTO(
                0, 
                req.session.user.userId,
                amount,
                datesubmitted, // ?
                dateresolved,   //?
                description,
                resolver,   //  null
                status,     
                type);
    
                console.log(JSON.stringify( reimbDTO ) )

            let reimbursement = await insertReimbursement(reimbDTO)
            res.json(reimbursement).sendStatus(201)
        } catch (e) {
            throw new InternalServerError()
        }
    } else {
        res.status(400).send('Please include all fields for Reimbursement')
    }
})



//Patch request, that only admins and finance-managers can call. passes in information to be update for reimbursements
reimbRouter.patch('', authFactory(['Admin', 'Finance-Manager', 'User']), async (req, res) => {
    let { reimbursementid, author, amount, datesubmitted,
        dateresolved, description, resolver,
        status, type } = req.body

    if (reimbursementid && (author || amount || datesubmitted || dateresolved || description || resolver || status || type)) {
        let reimbursement = await updateReimbursement(req.body)
        res.json(reimbursement)
    } else {
        if (!reimbursementid) {
            res.status(400).send('Please include Reimbursement Id')
        }else{
            res.status(400).send('Please include atleast one field to update')    
        }    
    }
})

