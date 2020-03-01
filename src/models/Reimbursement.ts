export class Reimbursement 
{
  reimbursementId: number // primary key
	author: number  // foreign key -> User, not null
	amount: number// not null
  dateSubmitted: string // not null
  dateResolved: string // not null
    description: string // not null
    resolver: number // foreign key -> User
    status: number // foreign ey -> ReimbursementStatus, not null
    type: number // foreign key -> ReimbursementType


constructor(reimbursementId: number, author: number,amount: number,dateSubmitted: string ,
             dateResolved: string, description: string, resolver: number, 
             status: number , type: number )
{
    this.reimbursementId =  reimbursementId
    this.author          =           author
    this.amount          =           amount
    this.dateSubmitted   =    dateSubmitted
    this.dateResolved    =     dateResolved
    this.description     =       description
    this.resolver        =         resolver 
    this.status          =           status
    this.type            =             type



}



}