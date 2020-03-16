import { PoolClient } from "pg";
import { connectionPool } from ".";
import { Reimbursement } from "../models/Reimbursement";
import { BadCredentialsError} from '../errors/BadCredentialsError'
import { InternalServerError } from "../errors/InternalServerError";
import { reimbursementDTOToReimbursementConverter } from "../util/reimbursement-dto-to-user-converter";
import { ReimbursementDTO } from "../dtos/ReimbursementDTO";
import { ReimbursementNotFoundError } from "../errors/ReimbursementNotFoundError";



/*
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

*/
/*

// this function gets anf formats all users
export async function daoFindAllUsers():Promise<User[]>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query('SELECT * FROM project0."user" U inner join project0."role" R on U."role" = R.roleid')
        return results.rows.map(userDTOToUserConverter)

    }catch(e){
        throw new InternalServerError()
    } finally {
        client && client.release()
    }

}


*/

export async function daoFindAllReimbursement():Promise<Reimbursement[]>
{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query('SELECT r.reimbursementid, '+ 
        'r.author, u.username, '+
       ' r.amount,'+
       ' r.datesubmitted,'+
       ' r.dateresolved,'+
       ' r.description,'+
       ' r.resolver,'+
       ' r.status, rs.status, '+
       '  r."type", rt."type" '+
        
       ' FROM project0.reimbursement r '+
       ' inner join project0.reimbursementstatus  rs on r.status = rs.statusid '+
       ' inner join project0.reimbursementtype rt on r."type"  = rt.typeid  '+
       ' inner join project0."user" u   on r.author  = u.userid  '+        
       ' order by r.reimbursementid ') 
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
      let result = await client.query('select *  from project0.reimbursement r  where r.status = $1', [status_id])
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


export async function daoUpdateReimbursement(reimbursementUpdate: ReimbursementDTO): Promise<Reimbursement> 
{
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let result = await client.query('select * from project0.reimbursement where reimbursementid = $1', [reimbursementUpdate.reimbursementid])
        let updatedReimbursement = result.rows[0]   //   model Object

        updatedReimbursement.author = reimbursementUpdate.author || updatedReimbursement.author
        updatedReimbursement.amount = reimbursementUpdate.amount || updatedReimbursement.amount
        updatedReimbursement.dateResolved = reimbursementUpdate.dateresolved || updatedReimbursement.dateResolved
        updatedReimbursement.dateSubmitted = reimbursementUpdate.datesubmitted || updatedReimbursement.dateSubmitted
        updatedReimbursement.description = reimbursementUpdate.description || updatedReimbursement.description
        updatedReimbursement.resolver = reimbursementUpdate.resolver || updatedReimbursement.resolver
        updatedReimbursement.status = reimbursementUpdate.status || updatedReimbursement.status
        updatedReimbursement.type = reimbursementUpdate.type || updatedReimbursement.type
        //console.log(  JSON.stringify( updatedReimbursement ) )
        await client.query('update project0.reimbursement set author = $1 , amount = $2 , dateSubmitted = $3, dateResolved = $4, resolver = $5 , status = $6 , "type" = $7 where reimbursementid = $8;',
            [updatedReimbursement.author, updatedReimbursement.amount, updatedReimbursement.dateSubmitted, updatedReimbursement.dateResolved, updatedReimbursement.resolver, updatedReimbursement.status, updatedReimbursement.type, updatedReimbursement.reimbursementid])

        return reimbursementDTOToReimbursementConverter(updatedReimbursement);
    } catch (e) {
        console.log("====Error===="+e )
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}        




//Insert reimb
export async function daoInsertReimbursement(reimbursementInsert: Reimbursement): Promise<Reimbursement>
{
    
    let client: PoolClient
    try {

        client = await connectionPool.connect()
        let result = await client.query('insert into project0.reimbursement (author,amount,dateSubmitted,dateResolved,description,resolver,status,"type")  values  ($1,$2,$3,$4,$5,$6,$7,$8) returning reimbursementId;',
            [reimbursementInsert.author, reimbursementInsert.amount, reimbursementInsert.dateSubmitted, reimbursementInsert.dateResolved, reimbursementInsert.description, reimbursementInsert.resolver, reimbursementInsert.status, reimbursementInsert.type])
        //Because the reimbursementid is added by the DB, this allows us to set the id after the reimbursement
        reimbursementInsert.reimbursementId = result.rows[0].reimbursementid
        return (reimbursementInsert);
    } catch (e) {
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
    
    
    
    
    
    
    
    /*
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let insertedReimbursement : ReimbursementDTO

        insertedReimbursement.reimbursementid = 100
        insertedReimbursement.author = reimbursementInsert.author || insertedReimbursement.author
        insertedReimbursement.amount = reimbursementInsert.amount || insertedReimbursement.amount
        insertedReimbursement.datesubmitted = reimbursementInsert.datesubmitted || insertedReimbursement.datesubmitted
        insertedReimbursement.dateresolved = reimbursementInsert.dateresolved || insertedReimbursement.dateresolved
        insertedReimbursement.description = reimbursementInsert.description || insertedReimbursement.description
        insertedReimbursement.resolver =  reimbursementInsert.resolver || insertedReimbursement.resolver
        insertedReimbursement.status = reimbursementInsert.status || insertedReimbursement.status
        insertedReimbursement.type = reimbursementInsert.type || insertedReimbursement.type
         
        

        console.log("from DAO " + JSON.stringify( insertedReimbursement ) )
       let reimbLastId = await client.query('insert into project0.reimbursement '
        +' (reimbursementid, author,amount,datesubmitted,dateresolved,description,resolver,status,"type" ) '
        +'  values  '+
        +' ($1,      $2,    $3,          $4,           $5,        $6,      $7,      $8,   $9) returning  reimbursementid',
   [101,  insertedReimbursement.author, insertedReimbursement.amount, insertedReimbursement.datesubmitted, insertedReimbursement.dateresolved, insertedReimbursement.description, insertedReimbursement.resolver, insertedReimbursement.status, insertedReimbursement.type])
   insertedReimbursement.reimbursementid = reimbLastId
        return reimbursementDTOToReimbursementConverter(insertedReimbursement);
    } catch (e) {
        console.log("====Error in daoInsertReimbursement===="+e )  
        throw new InternalServerError()
    } finally {
        client && client.release()
    }


    */
}
