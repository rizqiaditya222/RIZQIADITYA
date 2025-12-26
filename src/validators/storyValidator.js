const Joi = require('joi');

const createStoryValidator = Joi.object({
  location: Joi.string().optional().allow(''),
  caption: Joi.string().trim().min(1).max(500).optional().allow(null, ''),
});

const commentOnStoryValidator = Joi.object({
  comment: Joi.string().required().trim().min(1).max(500),
});

module.exports = {
  createStoryValidator,
  commentOnStoryValidator,
};