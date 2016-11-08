/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,
    attributes: {
        stripe_currency:
                {
                    type: 'string'
                },
        live_publishable_key:
                {
                    type: 'string',
                },
        live_secret_key:
                {
                    type: 'string',
                },
        test_publishable_key:
                {
                    type: 'string',
                },
        test_secret_key:
                {
                    type: 'string',
                },
        enable_stripe:
                {
                    type: 'int',
                },
        enable_stripe_connect:
                {
                    type: 'int',
                },
        updated_date:
                {
                    type: 'string',
                }
    }



};