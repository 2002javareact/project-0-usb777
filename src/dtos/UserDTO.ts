
export class UserDTO{
  userid: number
  username: string
  password:  string
  firstName: string
  lastName: string
  email: string
  roleId: number
  role: string
  constructor( userid: number,username:string,password: string,
     firstName:string,lastName:string,email:string,roleId:number,role:string)
  { this.userid = userid       //1
    this.username = username;  //2
    this.password = password;  //3
    this.firstName = firstName;//4
    this.lastName = lastName;  //5
    this.email = email;        //6
    this.roleId = roleId;      //7
    this.role = role;          //8
  }
}