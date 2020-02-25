import Role from './Role';
// a model is just an object for holding data, generally it will reflect data from our database
export default class User {
    username:string
    password:string
    emailAddress:string
    id:number// a unique number for identification
    firstName:string
    lastName:string
    role: Role // their user permissions
    // user - for you can use the service
    // admin - you can ban people or add/remove movies
    constructor(username:string,
        password: string,
        emailAddress: string,
        id: number,
        firstName: string,
        lastName: string,
        role: Role)
        {
            this.username = username
            this.password = password
            this.emailAddress = emailAddress
            this.id = id
            this.firstName = firstName
            this.lastName = lastName
            this.role = role
        }
}