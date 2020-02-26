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




//Takes in a reimbursement Object and runs an insert statement to add data to the DB
export async function daoInsertReimbursement(newReimb: Reimbursement): Promise<Reimbursement> {
    let client: PoolClient
    try {

        client = await connectionPool.connect()
        let result = await client.query('insert into project0.reimbursement (author,amount,dateSubmitted,dateResolved,description,resolver,status,"type")  values  ($1,$2,$3,$4,$5,$6,$7,$8) returning reimbursementId;',
            [newReimb.author, newReimb.amount, newReimb.dateSubmitted,
                 newReimb.dateResolved, newReimb.description, 
                 newReimb.resolver, newReimb.status, newReimb.type])
       
                 newReimb.reimbursementId = result.rows[0].reimbursementid
        return newReimb
    } catch (e) {
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}


//Update reimb
export async function daoUpdateReimbursement(reimbursementUpdate: any): Promise<Reimbursement> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let result = await client.query('select * from projectzero.reimbursement where reimbursementid = $1', [reimbursementUpdate.reimbursementid])
        let updatedReimbursement = reimbursementDTOToReimbursementConverter(result.rows[0])

        updatedReimbursement.author = reimbursementUpdate.author || updatedReimbursement.author
        updatedReimbursement.amount = reimbursementUpdate.amount || updatedReimbursement.amount
        updatedReimbursement.dateResolved = reimbursementUpdate.dateResolved || updatedReimbursement.dateResolved
        updatedReimbursement.dateSubmitted = reimbursementUpdate.dateSubmitted || updatedReimbursement.dateSubmitted
        updatedReimbursement.description = reimbursementUpdate.description || updatedReimbursement.description
        updatedReimbursement.resolver = reimbursementUpdate.resolver || updatedReimbursement.resolver
        updatedReimbursement.status = reimbursementUpdate.status || updatedReimbursement.status
        updatedReimbursement.type = reimbursementUpdate.type || updatedReimbursement.type

        await client.query('update project0.reimbursement set author = $1 , amount = $2 , dateSubmitted = $3, dateResolved = $4, resolver = $5 , status = $6 , "type" = $7 where reimbursementid = $8;',
            [updatedReimbursement.author, updatedReimbursement.amount, updatedReimbursement.dateSubmitted, updatedReimbursement.dateResolved, updatedReimbursement.resolver, updatedReimbursement.status, updatedReimbursement.type, updatedReimbursement.reimbursementId])

        return updatedReimbursement
    } catch (e) {
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}

