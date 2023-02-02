import Joi from 'joi';
import userInterface from '../interfaces';

const userValidation = (pros: string | null, body: userInterface) => {

    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: pros ? Joi.optional() : Joi.string().min(6).alphanum().required(),
        age: Joi.number().min(18).max(50).required(),
    });

    return schema.validateAsync(body, { abortEarly: false })
}


export default userValidation;