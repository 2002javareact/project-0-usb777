drop table if exists project0.Reimbursement;

drop table if exists project0."user";

drop table if exists project0."role";

drop table if exists project0.ReimbursementStatus;

drop table if exists project0.reimbursementtype;


CREATE TABLE project0.reimbursementtype (
	typeid serial NOT null primary key,
	"type" text NULL
);



CREATE TABLE project0.ReimbursementStatus 
(
  statusId serial NOT null primary key,
  status text NOT null UNIQUE
)



 CREATE TABLE project0."role"
(

 roleId serial NOT null primary key,
 "role" text NOT null UNIQUE
)  ;
 


/*======================================================================*/


CREATE TABLE project0."user"
(
    userId serial NOT null primary key,
	username text NOT null unique,
	"password" text NOT null,
	firstName text NOT null,
	lastName text NOT null,
	email text NOT null,	
	"role" int not null references role (roleid)
);


CREATE TABLE project0.Reimbursement 
(
  reimbursementId serial NOT null primary key,
  author int not null references "user" (userid),
  amount numeric not null,
  dateSubmitted date not null,
  dateResolved date not null,
  description text not null,
  resolver  int  references "user" (userid),
  status int not null references ReimbursementStatus (statusid ), 
  type int references reimbursementtype (typeid )
);










