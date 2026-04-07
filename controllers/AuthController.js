const { sendResponse } = require("../helper");

class AuthController {
    async register(req, res) {
        try {
            const data = await req.app.locals.services.users.register(
                res.locals.body,
            );
            sendResponse(res, data);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    }
    async login(req, res) {
        try {
            const data = await req.app.locals.services.users.login(
                res.locals.body,
            );
            sendResponse(res, data);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    }
}

module.exports = AuthController;
