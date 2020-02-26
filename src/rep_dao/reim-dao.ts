import { PoolClient } from "pg";
import { connectionPool } from ".";
import { Reimbursement } from "../models/Reimbursement";
import { BadCredentialsError} from '../errors/BadCredentialsError'
import { InternalServerError } from "../errors/InternalServerError";
import { reimbursementDTOToReimbursementConverter } from "../util/reimbursement-dto-to-user-converter";
import { ReimbursementDTO } from "../dtos/ReimbursementDTO";
import { ReimbursementNotFoundError } from "../errors/ReimbursementNotFoundError";




// this function gets all reimbs
export async function daoFindAllReimbursement():Promise<Reimbursement[]>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query('select r.reimbursementid , r.author, u.username , r.amount ,r.datesubmitted ,'
        +' r.dateresolved , r.description , r.resolver, '
        +' r.status, rstatus.status, r."type", rtype."type" '
        +' from project0.reimbursement r '
        +' join project0."user" u  on r.author = u.userid '
        +' join project0.reimbursementstatus rstatus on rstatus.statusid = r.status '
        +' join project0.reimbursementtype rtype on rtype.typeid = r."type" ') ;

         return results.rows.map(reimbursementDTOToReimbursementConverter)

    }catch(e){
        throw new InternalServerError()
    } finally {
        client && client.release()
    }

}


// get Reimb by StatusID
export async function daoFindReimbursementByStatusId(status_id:number):Promise<Reimbursement>
{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
      let result = await client.query('select *  from project0.reimbursement r  inner join project0.reimbursementstatus rstatus on r.status  = rstatus.statusid where r.status = $1', [status_id])
        if(result.rowCount === 0)
        {
            throw new Error('Reimbursement Not Found')
        }
       
        return result.rows.map(reimbursementDTOToReimbursementConverter);
    }catch(e){
        // id DNE
        //need if for that
        if(e.message ==='Reimbursement Not Found')
        {
            throw new ReimbursementNotFoundError()
        }
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}



// get Reimb by Athor UserID
export async function daoFindReimbursementByUserId(user_id:number):Promise<Reimbursement>
{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
      let result = await client.query('select *  from project0.reimbursement r '
      + ' inner join project0.reimbursementstatus rstatus on r.status  = rstatus.statusid '
      +' inner join project0."user" u on r.author = u.userid '
      +' where u.userid = $1', [user_id])

        if(result.rowCount === 0)
        {
            throw new Error('Reimbursement Not Found')
        }
       
        return result.rows.map(reimbursementDTOToReimbursementConverter);
    }catch(e){
        // id DNE
        //need if for that
        if(e.message ==='Reimbursement Not Found')
        {
            throw new ReimbursementNotFoundError()
        }
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}

