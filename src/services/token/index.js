import jwt from 'jsonwebtoken'

export default {
    createToken: (data, time = 5*60*1000) => {
        return jwt.sign({...data}, process.env.JWT_KEY, { expiresIn: String(time) });
    },
    decodeToken: (token) => {
        try {
            return jwt.verify(token, process.env.JWT_KEY)
        }catch(err) {
            return false
        }
    }
}