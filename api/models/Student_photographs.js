/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema:true,

  attributes  : {
  	photo_id : 
    {
      type: 'string'
    },
   student_id : 
    {
      type: 'string',
      required: true
    },
   photo_path  : 
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