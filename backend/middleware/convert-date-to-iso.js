function convertDateTimeToIso(req, res, next) {
    const datetime = req.body.datetime;

    if (!datetime) {
        return res.status(401).json({ message: 'No datetime'});
    }
    // Convert the vlue to JS Dte object
    const date = new Date(datetime);

    // Convert the dte object to ISO 8601 formt
    const isoDate = date.toISOString();

    req.body.datetime = isoDate;

    next();
}

module.exports = convertDateTimeToIso;