import { Role } from "./Role";

export  class User 
{ userId: number;
  username: string;
  password: string;  
  firstname: string;
  lastname: string;
  email: string;
  role: Role; // classn Object
  constructor(userId:number, username:string,password: string, firstname:string,lastname:string,email:string,role:Role)
  { this.userId  = userId;
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
  } //constructor
}