import { Reimbursement } from "../models/Reimbursement";
import { ReimbursementDTO } from "../dtos/ReimbursementDTO";


export function reimbursementDTOToReimbursementConverter(ReimbursementDTO:ReimbursementDTO):Reimbursement
{
    return new Reimbursement(
        ReimbursementDTO.reimbursementId,    //1
        ReimbursementDTO.author,             //2
        ReimbursementDTO.amount,             //3 
        ReimbursementDTO.dateSubmitted,      //4
        ReimbursementDTO.dateResolved,       //5
        ReimbursementDTO.description,        //6
        ReimbursementDTO.resolver,           //7
        ReimbursementDTO.status,             //8
        ReimbursementDTO.type                //9
    )
}