const Joi = require('joi');

const pattern ='^[a-zA-Z0-9]{3,30}$';
module.exports = {
    validateBody: (schema) => {
        return (req, resp, next) => {
            console.log(req.body)
            const { value, error } = Joi.validate(req.body, schema, {
              abortEarly: false,
            });
            console.log("error",error)
            console.log("value",value)
            if (error) {
              let err_msg = {};
              for (let counter in error.details) {
                let k = error.details[counter].context.key;
                let val = error.details[counter].message;
                err_msg[k] = val;
              }
              let return_err = { status: 2, errors: err_msg };
              return resp.status(400).json({ return_err });
            }
      
            if (!req.value) {
              // console.log(req.value);
              req.value = {};
            }
            req.value["body"] = value;
            // console.log(req.value);
            next();
          };
    },
    schemas: {
        registerSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().regex(RegExp(pattern)).min(6).max(8)
           
        })
    }
}