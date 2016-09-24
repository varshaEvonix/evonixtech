/**
 * Admin_loan_comments.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        loan_id: {type: 'integer'},
        note: {type: 'string'},
        note_type: {type: 'integer'},
        note_attachment: {type: 'string'},
        last_updated: {type: 'string'},
        admin_id: {type: 'integer'},
    }
};

