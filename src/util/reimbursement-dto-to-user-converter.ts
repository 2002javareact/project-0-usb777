import { ReimbursementDTO } from "../dtos/ReimbursementDTO";
import { Reimbursement } from "../models/Reimbursement";


export function reimbursementDTOToReimbursementConverter(reimbursementDTO:ReimbursementDTO):Reimbursement{
    return new Reimbursement(
        reimbursementDTO.reimbursementid,
        reimbursementDTO.author,
        reimbursementDTO.amount,
        reimbursementDTO.datesubmitted,
        reimbursementDTO.dateresolved,
        reimbursementDTO.description,
        reimbursementDTO.resolver,
        reimbursementDTO.status,
        reimbursementDTO.type
    )
}