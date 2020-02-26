
export class UserDTO{
  userid: number
  username: string
  password:  string
  firstname: string
  lastname: string
  email: string
  roleid: number
  role: string
  constructor( userid: number,username:string,password: string,
     firstname:string,lastname:string,email:string,roleid:number,role:string)
  { this.userid = userid       //1
    this.username = username;  //2
    this.password = password;  //3
    this.firstname = firstname;//4
    this.lastname = lastname;  //5
    this.email = email;        //6
    this.roleid = roleid;      //7
    this.role = role;          //8
  }
}