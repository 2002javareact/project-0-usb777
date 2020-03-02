import { BadCredentialsError } from "../errors/BadCredentialsError"

// I give it a variable config input
// it gives me a function
export const authFactory = (roles: string[]) => {
    return (req, res, next) => {
        if (!req.session.user) {
            res.status(401).send('Please Login')
        } else if (roles.includes('Everyone')) {
            next()
        } else {
            let allowed = false
            for (let role of roles) {
                if (req.session.user.role.role === role) {
                    
                    allowed = true
                    next()
                }
            }
            if (!allowed) {
                console.log(req.session.user.role.role);

                throw new BadCredentialsError()
            }
        }
    }
}


// match user id to path param id
export const authCheckId = (req,res,next) => {
    //TODO
    // Allow through automatically, people that aren't users
    
    if(req.session.user.role.role === 'Admin' || req.session.user.role.role === 'Finance-Manager'|| req.session.user.role.role === 'User'){
        next()
    }else if(req.session.user.id === +req.params.id ){
        next()
    } else {
        res.status(401).send('The incoming token has expired')
    }
}