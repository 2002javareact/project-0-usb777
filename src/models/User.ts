import { Role } from "./Role";

export  class User 
{ userid: number;
  username: string;
  password: string;  
  firstname: string;
  lastname: string;
  email: string;
  role: Role; // classn Object
  constructor(userid:number, username:string,password: string, firstname:string,lastname:string,email:string,role:Role)
  { this.userid  = userid;
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
  } //constructor
}