/**
 * PersonalController
 *
 * @description :: Server-side logic for managing personals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'personal': function(req, res){
  	res.view();
  },

  'insertpersonal':function(req,res){
  
		if(req.method=="POST")
		{
		
			var name = req.param("name");
			var age = req.param("age1");
			var city =req.param("city");
			var about =req.param("about");
			var address =req.param("address");
			var email =req.param("email");
			var occupation =req.param("occupation");
			
			var insert ="";
			try {
				insert = " INSERT INTO `personal` (`name`, `age`, `city`, `about`, `address`, `email`, `occupation`, `createdAt`, `updatedAt`) VALUES ('"+name+"', '"+age+"', '"+city+"', '"+about+"', '"+address+"','"+email+"','"+occupation+"', NULL, NULL);";
				
				throw "thrown message";
			
			}
			catch (e) {
			
			}
		
			Personal.query(insert,function(err,record)
			{
				if(err)
				{
				
				}
				else
				{
				
					res.redirect('../personal_view/personal_view');
				}
			});
		}
	},


  'editpersonal': function(req, res) {

        User.query('SELECT * from user left join personal on user.id=personal.user_id left join education on education.user_id=user.id left join loan on loan.user_id=user.id where user.id=1', function(err, recordset) {         	

        	return res.view('./personal_edit/personal_edit', {

      answer: recordset

    });

        });
        
    }


};

