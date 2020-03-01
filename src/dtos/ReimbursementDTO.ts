
export class ReimbursementDTO{
    reimbursementid: number // primary key
	author: number  // foreign key -> User, not null
	amount: number// not null
    datesubmitted: string
    dateresolved: string
    description: string // not null
    resolver: number // foreign key -> User
    status: number // foreign ey -> ReimbursementStatus, not null
    type: number // foreign key -> ReimbursementType
    constructor
    ( 
        reimbursementid: number, 
        author: number,
        amount: number,
        datesubmitted: string,
        dateresolved: string,
        description: string,
        resolver: number,
        status: number,
        type: number
     )
    {
        this.reimbursementid = reimbursementid
        this.author = author
        this.amount = amount
        this.datesubmitted = datesubmitted
        this.dateresolved= dateresolved
      
        this.description = description
        this.resolver = resolver
        this.status = status
        this.type = type
    }
  }