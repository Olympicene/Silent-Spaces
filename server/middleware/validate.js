import { validationResult } from "express-validator";

const Validate = (req, res, next) => {
    console.log("validating")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = {};
        errors.array().map((err) => (error[err.param] = err.msg));
        return res.status(422).json({ error });
    }
    next();
};
export default Validate;