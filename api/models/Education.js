/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema:true,

  attributes  : {
  	student_id : 
    {
      type: 'string'
    },
    student_education_institute : 
    {
      type: 'string',
      required: true
    },
    student_education_fieldofstudy  : 
    {
      type: 'string',
      required: true
    },
    isEnabled     : 
    {
      type: 'string',
    }
  }

  
 
};