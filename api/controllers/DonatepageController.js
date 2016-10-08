/**
 * DController
 *
 * @description :: Server-side logic for managing ds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `DController.donatepage()`
   */
  donatepage: function (req, res) {
    res.view('./donatepage/donatepage')
  }
};

