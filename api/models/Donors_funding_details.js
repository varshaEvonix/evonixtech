/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema:true,

  attributes  : {
  	donors_id : 
    {
      type: 'string'
    },
    loan_id : 
    {
      type: 'string',
    
    },
    donors_profileimage : 
    {
      type: 'string',
      required: true
    },
    donors_name     : 
    {
      type: 'string',
      required: true
    },
    donor_email   : 
    {
      type: 'string',
      required: true
    },
    donors_comment  : 
    {
      type: 'string',
      required: true
    },
    funded_amount  : 
    {
      type: 'email',
      required: true
    },
    transaction_charge  : 
    {
      type: 'string',
      
    },
    percentage_charge  : 
    {
      type: 'string',
     
    },
    balance_to_transfer  : 
    {
      type: 'string',
    
    },
    amount_to_be_transferred  : 
    {
      type: 'string',
     
    },
    funding_date  : 
    {
      type: 'string',
     
    },
   

  }

  
 
};