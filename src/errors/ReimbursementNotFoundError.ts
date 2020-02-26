import { HttpError } from "./HttpError";


export class ReimbursementNotFoundError extends HttpError {
    constructor(){
        super('Reimbursement Not Found 404 Error', 404)
    }
}