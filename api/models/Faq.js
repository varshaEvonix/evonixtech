/**
 * Faq.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        description: {type: 'string',
            required: true
        },
        category: {type: 'string',
            required: true
        }
    },
    validation_messages: {
        name: {
            required: 'Name is required',
        }
    }
};
