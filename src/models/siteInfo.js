const mongoose = require('mongoose');

const siteInfoSchema = new mongoose.Schema({
    infoType: { 
        type: String, 
        required: true,
        unique: true 
    },
    address: {
        street: { type: String, required: true },
        street2: { type: String }, // For apartment, suite, etc. (optional)
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true }
    },
    phoneNumber: {
        type: String,
        required: true
    },
    customerServiceEmail: {
        type: String,
        required: true
    },
    salesEmail: {
        type: String,
        required: true
    },
    content: String // Optional field for additional content
});

const SiteInfo = mongoose.model('SiteInfo', siteInfoSchema);

module.exports = SiteInfo;

