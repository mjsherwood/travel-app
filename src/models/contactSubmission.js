const mongoose = require('mongoose');

const contactSubmissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    comment: String,
    submittedAt: { type: Date, default: Date.now }
});

const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);

module.exports = ContactSubmission;
