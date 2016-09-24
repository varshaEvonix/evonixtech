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
      type: 'string',
      required: true
    },
    loan_id  : 
    {
      type: 'integer',
      primaryKey:true
    },
    loan_purpose_name : 
    {
      type: 'string',
      required: true
    },
    loan_amount     : 
    {
      type: 'string',
      required: true
    },
    loan_fafsa_id   : 
    {
      type: 'string',
      required: true
    },
    loan_bankname  : 
    {
      type: 'string',
      required: true
    },
    loan_accountno  : 
    {
      type: 'string',
      required: true
    },
    remittance_account_bank_name  : 
    {
      type: 'string',
      required: true
    },
    remittance_account_bankaccount_no  : 
    {
      type: 'string',
      required: true
    },
    remittance_account_ifsc  : 
    {
      type: 'string',
      required: true
    },
    loan_details_note  : 
    {
      type: 'string',
      required: true
    },
    isActive  : 
    {
      type: 'string',
      required: true
    }
      }

  
 
};