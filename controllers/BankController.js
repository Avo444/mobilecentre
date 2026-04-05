const { sendResponse } = require("../helper");

class BankController {
    async getAllBanks(req, res) {
        try {
            const banks = await req.app.locals.services.bank.getAllBanks();
            sendResponse(res, banks);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    }

    async getAparik(req, res) {
        try {
            const aparik =
                await req.app.locals.services.bank.getAparik(req.body);

            sendResponse(res, aparik);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    }
}
module.exports = BankController;
