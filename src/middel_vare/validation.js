const Joi = require('joi');
const { pick } = require("../helper/pick");


const validation = (schema) => (req, res, next) => {

    try {
        // console.log(req);
        // console.log(Object.keys(schema));

        const objs = pick(req, Object.keys(schema))
        console.log(objs);

        
        const { error, value } = Joi.compile(schema)
            .prefs({
                abortEarly: false
            })
            .validate(objs);

        // console.log(error, value);

        if (error) {
            const errMsg = error.details.map((v) => v.message).join(", ")

            return(next(new Error("validation error: "+ errMsg)))
            
        }
        Object.assign(req, value)
        console.log(value);
        next();
        
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    validation
}