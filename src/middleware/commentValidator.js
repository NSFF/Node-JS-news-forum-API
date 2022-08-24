const { body, validationResult } = require('express-validator')

exports.commentValidation = [  
    body('content')
        .exists()
        .isLength({min: 1, max:10000}).withMessage('content length must be a minimum of 1 and a maximum of 10.000'),
    body('post_id')
        .exists()
        .isNumeric().withMessage('post_id Must be a number'),
    body('user_id')
        .exists()
        .isNumeric().withMessage('user_id Must be a number'),
    (req, res, next) => {
        // Validation errors
        var errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]

exports.commentUpdateValidation = [  
    body('content')
        .exists()
        .isLength({min: 1, max:10000}).withMessage('content length must be a minimum of 1 and a maximum of 10.000'),
    (req, res, next) => {
        // Validation errors
        var errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]