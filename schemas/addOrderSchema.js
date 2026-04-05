const Joi = require("joi");

const addOrderSchema = Joi.object({
    name: Joi.string().min(3).max(12).required().messages({
        "string.base": "Անունը պետք է լինի տեքստ",
        "string.empty": "Անունը պարտադիր է",
        "string.min": "Անունը պետք է պարունակի առնվազն 3 տառ",
        "string.max": "Անունը չի կարող լինել 12 տառից երկար",
        "any.required": "Անունը պարտադիր է",
    }),
    phone: Joi.string()
        .pattern(/^[0-9+() -]{6,}$/)
        .required()
        .messages({
            "string.base": "Հեռախոսահամարը պետք է լինի տեքստ",
            "string.empty": "Հեռախոսահամարը պարտադիր է",
            "string.pattern.base": "Սխալ հեռախոսահամար",
            "any.required": "Հեռախոսահամարը պարտադիր է",
        }),
    country: Joi.string().required().messages({
        "string.base": "Սխալ քաղաք",
        "string.empty": "Տարածաշրջանը պարտադիր է",
        "any.required": "Տարածաշրջանը պարտադիր է",
    }),
    notes: Joi.string(),
    cartID: Joi.string().required().messages({
        "string.base": "Քարտի համարը պետք է լինի տեքստ",
        "string.empty": "Քարտի համարը պարտադիր է",
        "any.required": "Քարտի համարը պարտադիր է",
    }),
});

module.exports = addOrderSchema;
