const sendResponse = (
    res,
    data,
    statusCode = 200,
    extension = "application/json",
) => {
    res.set({
        "Content-Type": extension,
    });
    res.status(statusCode);
    res.json(data);
};

module.exports = sendResponse;
