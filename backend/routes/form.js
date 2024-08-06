const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const FormData = require('../models/FormData');
const { body, validationResult } = require('express-validator');

// Route 1: Get all form data using : GET "/api/form/all". Login required
router.get('/all', fetchuser, async (req, res) => {
    try {
        const forms = await FormData.find({ user: req.user.id });
        res.json(forms);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error occurred");
    }
});

// Route 2: Submit form data using : POST "/api/form/submit". Login required
router.post('/submit', fetchuser, [
    body('email', 'Enter a valid email').isEmail(),
    body('type', 'type is required').notEmpty(),
], async (req, res) => {
    try {
        // If errors are present, return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
         // Create new FormData with the entire req.body and add the user id
         const formData = new FormData({
            ...req.body,
            user: req.user.id
        });

        const savedFormData = await formData.save();
        res.json(savedFormData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error occurred");
    }
});

// Route 3: Update form data using : PUT "/api/form/update/:id". Login required
router.put('/update/:id', fetchuser, [
    body('businessName', 'Business Name is required').notEmpty(),
    body('industry', 'Industry is required').notEmpty(),
    body('website', 'Website is required').notEmpty(),
    body('contactPerson', 'Contact Person is required').notEmpty(),
    body('email', 'Enter a valid email').isEmail(),
    body('phone', 'Phone number is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
], async (req, res) => {
    try {
        const { businessName, industry, website, contactPerson, email, phone, description } = req.body;
        // If errors are present, return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Find the form to be updated and update it
        let form = await FormData.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ msg: "Form not found" });
        }
        
        // Allow update only if user owns this form
        if (form.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        form = await FormData.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(form);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error occurred");
    }
});

// Route 4: Delete form data using : DELETE "/api/form/delete/:id". Login required
router.delete('/delete/:id', fetchuser, async (req, res) => {
    try {
        // Find the form to be deleted and delete it
        let form = await FormData.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ msg: "Form not found" });
        }
        
        // Allow deletion only if user owns this form
        if (form.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        await FormData.findByIdAndRemove(req.params.id);
        res.json({ msg: "Form data has been deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error occurred");
    }
});

router.get('/getCreators', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const forms = await FormData.find({ type: 'creator' })
            .sort({ createdAt: -1 }) // Sort by creation date in descending order
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await FormData.countDocuments({ type: 'creator' });

        res.json({
            forms,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occurred");
    }
});

 

// Route 6: Get all form data where type = 'business' using : GET "/api/form/getBusiness". Login required
router.get('/getBusiness', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const forms = await FormData.find({ type: 'business' })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await FormData.countDocuments({ type: 'business' });
        res.json({
            forms,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error occurred");
    }
});


module.exports = router;
