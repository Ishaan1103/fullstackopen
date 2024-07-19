import logger from './logger.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
const requestLogger = (req,res,next)=>{
    logger.info('Method: ',req.method)
    logger.info('Path: ',req.path)
    logger.info('Body: ',req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req,res)=>{
    res.status(404).send({error: 'unknown endpoint'})
}
const errorHandler = (error,req,res,next)=>{
    logger.error(error.message)
    if(error.name === 'CastError'){
        return res.status(400).send({error: 'malformatted id'})
    }
    else if(error.name === 'ValidationError'){
        return res.status(400).json({error:error.message})
    }
    else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    else if (error.message === 'Invalid Password Created') {
        return res.status(400).json({ error: error.message });
    }
    else if (error.name ===  'JsonWebTokenError') {
        return res.status(401).json({ error: 'token invalid' })
    }
    next(error)
}
const tokenExtractor = (req,res,next)=>{
        const authorization =req.get('authorization')
        if(authorization && authorization.startsWith('Bearer ')){
            req.token = authorization.replace('Bearer ','')
        }
        else{
            req.token = null
        }
        next()
    } 

    const userExtractor = async (req, res, next) => {
        const token = req.token;
        if (!token) {
            return res.status(401).json({ error: 'Token missing or invalid' });
        }
        try {
            const decodedToken = await jwt.verify(token, process.env.SECRET);
            if (!decodedToken.id) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            const user = await User.findById(decodedToken.id);
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            req.user = user;
            next();
        } catch (exception) {
            next(exception);
        }
    };
    
export default { unknownEndpoint, errorHandler, requestLogger, tokenExtractor, userExtractor }