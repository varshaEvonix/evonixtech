/**
 * About_admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        name: {type: 'string'},
        about_us: {type: 'longtext'},
        video_link: {type: 'string'},
    }
};
