const Bank = require('../models/Bank');

exports.getDetails = async (req, res) => {
    try {
        const bankDetails = await Bank.findOne({});
        res.status(200).json(bankDetails);
    } catch(err) {
        res.status(500).json(err);
    }
}