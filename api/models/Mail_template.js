/**
 * Faq.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        template_name: {
            type: 'string',
        },
        subject: {
            type: 'string',
        },
        content: {type: 'text',
        },
        created_date: {type: 'timestamp',
        }
    },
};
