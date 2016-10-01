/**
 * About_admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        admin_firstname: {type: 'string'},
        admin_lastname: {type: 'string'},
        admin_contactno: {type: 'integer'},
        admin_email: {type: 'string'},
        admin_password: {type: 'string'},
    }
};
