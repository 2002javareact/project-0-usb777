import { daoFindReimbursementById, daoFindAllReimbursement, daoFindReimbursementByStatusId, daoFindReimbursementByUserId, daoInsertReimbursement, daoUpdateReimbursement } from "../rep_dao/reim-dao";
import { Reimbursement } from "../models/Reimbursement";
import { ReimbursementDTO } from "../dtos/ReimbursementDTO";


// don't need this function - just for testing all reimb
export async function findAllReimbursement():Promise<Reimbursement[]>{
   // I write to a different table, who just sent this request
   // know what time of day, these requests get most sent
   return await daoFindAllReimbursement()
}




// function finding Reimb by id
export async function findReimbursementById(Id:number):Promise<Reimbursement>
{
   return await daoFindReimbursementById(Id)
}



// function finding Reimb by statusid
export async function findReimbursementByStatusId(statusId:number):Promise<Reimbursement>
{
   return await daoFindReimbursementByStatusId(statusId)
}

// function finding Reimb by userid
export async function findReimbursementByUserId(userId:number):Promise<Reimbursement>
{
   return await daoFindReimbursementByUserId(userId)
}


export async function insertReimbursement(newReimbursement:Reimbursement):Promise<Reimbursement>
{
   return await daoInsertReimbursement(newReimbursement)
}

export async function updateReimbursement(reimbursementUpdate:ReimbursementDTO):Promise<Reimbursement>
{
   return await daoUpdateReimbursement(reimbursementUpdate)
}