/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,
    attributes: {
        student_firstname:
                {
                    type: 'string',
                    required: true
                },
        student_id:
                {
                    type: 'integer',
                    primaryKey: true
                },
        student_lastname:
                {
                    type: 'string',
                    required: true
                },
        student_contactno:
                {
                    type: 'string',
                    required: true
                },
        student_email:
                {
                    type: 'email',
                    required: true
                },
        student_address:
                {
                    type: 'string',
                    required: true
                },
        student_city:
                {
                    type: 'string',
                    required: true
                },
        student_state:
                {
                    type: 'string',
                    required: true
                },
        student_country:
                {
                    type: 'string',
                    required: true
                },
        student_birthdate:
                {
                    type: 'string',
                    required: true
                },
        student_about_me:
                {
                    type: 'text',
                    required: true
                },
        student_ambition:
                {
                    type: 'text',
                    required: true
                },
        student_profile_pic_path:
                {
                    type: 'string',
                    required: true
                },
    }



};