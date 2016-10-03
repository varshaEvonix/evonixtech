/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema:true,

  attributes  : {
  	loan_document_id : 
    {
      type: 'string'
    },
   document_name: 
    {
      type: 'string',
      required: true
    },
   document_path  : 
    {
      type: 'string',
      required: true
    },
    loan_id     : 
    {
      type: 'string',
    },
    isPublic     : 
    {
      type: 'string',
    }
  }

  
 
};