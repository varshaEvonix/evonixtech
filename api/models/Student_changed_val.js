/**
 * About_admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        student_master_field_id: {type: 'integer'},
        student_prev_value: {type: 'string'},
        student_changed_value: {type: 'string'},
        student_changed_time: {type: 'string'},
        admin_changed_time: {type: 'string'},
        admin_approval: {type: 'string'},
        is_new_change: {type: 'string'},
        student_id: {type: 'integer'},
    }
};
