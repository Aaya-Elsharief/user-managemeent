import Joi from 'joi';
import userInterface from '../interfaces';



const validation = (role:string , pros: string | null, body: userInterface) => {
    role === 'admin'? adminValidation(body) : userValidation(pros, body)
}




const baseSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
});


const userValidation = (pros: string | null, body: userInterface) => {
    const schema = baseSchema.concat(
        Joi.object({
            password: pros ? Joi.optional() : Joi.string().min(6).alphanum().required(),
            age: Joi.number().min(18).max(50).required(),
        }))
    return schema.validateAsync(body, { abortEarly: false })
}


const adminValidation = (body: userInterface) => {
    delete body.age;
    const schema = baseSchema.concat(
        Joi.object({
            password: Joi.string().min(6).alphanum().required(),
        }))
    return schema.validateAsync(body, { abortEarly: false })
}


export {
    validation
};