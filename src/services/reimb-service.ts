import { daoFindAllReimbursement, daoFindReimbursementByStatusId, daoFindReimbursementByUserId } from "../rep_dao/reim-dao";
import { Reimbursement } from "../models/Reimbursement";
import { ReimbursementDTO } from "../dtos/ReimbursementDTO";


// don't need this function - just for testing all reimb
export async function findAllReimbursement():Promise<Reimbursement[]>{
   // I write to a different table, who just sent this request
   // know what time of day, these requests get most sent
   return await daoFindAllReimbursement()
}

/*
export async function saveOneUser(newUser:UserDTO):Promise<User>{
   return await daoSaveOneUser(newUser)
}
*/

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