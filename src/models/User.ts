import { Role } from "./Role";

export  class User 
{ userid: number;
  username: string;
  password: string;  
  firstName: string;
  lastName: string;
  email: string;
  role: Role; // classn Object
  constructor(userid:number, username:string,password: string, firstName:string,lastName:string,email:string,role:Role)
  { this.userid  = userid;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
  } //constructor
}