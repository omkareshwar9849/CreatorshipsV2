const mongoose = require('mongoose');
const { Schema } = mongoose;

const FormDataSchema = new Schema({
    businessName: {
        type: String,
    },
    businessLocation: {
        type: String,
    },
    currentRevenue: {
        type: String,
    },
    partnershipGoal: {
        type: String,
    },
    equityOffered: {
        type: String
    },
    industry: {
        type: String,
    },
    website: {
        type: String,
    },
    contactPerson: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    fullName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    location: {
        type: String,
    },
    portfolioURL: {
        type: String,
    },
    socialMediaHandles: {
        type: String,
    },
    skills: {
        type: String,
    },
    previousWorkExperience: {
        type: String,
    },
    preferredIndustries: {
        type: String,
    },
    partnershipGoals: {
        type: String,
    },
    equityDesired: {
        type: String,
    }
}, { timestamps: true }, { collection: 'formData' });

module.exports = mongoose.model('FormData', FormDataSchema);
