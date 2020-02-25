export const admin = 'Admin'
export const user = 'User'
export const financeManager = 'Finance-manager'


export  class Role
{
    roleId: number // primary key
    role: string // not null, unique

constructor(roleId: number, role: string )
{
    this.roleId = roleId
    this.role = role

}


  }