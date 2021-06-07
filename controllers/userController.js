import { User } from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const registerController = async (req, res) => {
    const { lastName, firstName, email, password } = req.body

    try {

        if(!lastName && !firstName && !email && !password) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Values cannot be empty'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            lastName,
            firstName,
            email,
            password: hashedPassword
        })
        const dataRes = await newUser.save()

        delete dataRes._doc.password
        if(dataRes) {
            return res.status(200).json(
                {status: 'Success', 
                message: 'Account created successfully!'
            })
        }
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            status: 'Failed',
            message: 'Opps! Something went wrong'
        })
    }
}

export const loginController = async (req, res) => {
    const { email, password } = req.body

    try {
        if(!email && !password) {
            return res.status(400).json(
                {message: 'Email and password cannot be empty'
            })
        }

        const authUser = await User.findOne({email}) 
        if(!authUser) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Email not correct'
            })
        }

        const isMatch = await bcrypt.compare(password, authUser.password)

        if(isMatch) {
            const payload = {
                id: authUser.id,
                email: authUser.email
            }

            const authToken = await jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 86400
            })

            return res.status(200).json({
                status: 'Success',
                token: `Bearer ${authToken}`
            })
        }

        return res.status(400).json({
            status: 'Failed',
            message: 'Email or password not correct'
          })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: 'Failed',
            err
          })
    }
}

export const verify = async (req, res, next) => {
    const token = req.headers.authorization

    try {
        if(!token) {
           return res.status(401).json({
                auth: false, 
                message: 'No token provided.'
            })
        }
    
        const bearerToken = token.split(' ')[1]
        await jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decode) => {
            if(err) {
                return res.status(500)
                    .json({
                      status: 'Failed', 
                      message: 'Failed to authenticate token'
                  })
              }
        })

        next()
    } catch (err) {
        console.log(err)
    }
}