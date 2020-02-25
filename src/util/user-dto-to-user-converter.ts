import { User } from "../models/User";
import { UserDTO } from "../dtos/UserDTO";
import { Role } from "../models/Role";

export function userDTOToUserConverter(userDTO:UserDTO):User
{
    return new User(
        userDTO.userid,
        userDTO.username,
        userDTO.password,
        userDTO.firstName,
        userDTO.lastName,
        userDTO.email,
        new Role(userDTO.roleId, userDTO.role) 
    )
}