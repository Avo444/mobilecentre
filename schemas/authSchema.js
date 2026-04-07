const Joi = require("joi");

const authSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Էլ․ հասցեն պարտադիր է",
        "string.email": "Մուտքագրեք վավեր էլ․ հասցե",
        "any.required": "Էլ․ հասցեն պարտադիր է",
    }),
    password: Joi.string()
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        )
        .required()
        .messages({
            "string.empty": "Գաղտնաբառը պարտադիր է",
            "string.pattern.base":
                "Գաղտնաբառը պետք է ունենա առնվազն 8 նիշ, մեծ և փոքր տառեր, թիվ և սիմվոլ",
            "any.required": "Գաղտնաբառը պարտադիր է",
        }),
    checkPassword: Joi.string()
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        )
        .messages({
            "string.empty": "Գաղտնաբառի կրկնությունը պարտադիր է",
            "string.pattern.base":
                "Գաղտնաբառի կրկնության դաշտում պետք է լրացնել նույն գաղտնաբառը",
        }),
});

module.exports = authSchema;
