



module.exports = 
{
	sendEmail: function(req, res) {

		// sails.hooks.email.send(template, data, options, cb)
		sails.hooks.email.send(
		  "testEmail",
		  {
		    recipientName: "Steve",
		    senderName: "yamasnax",
		    senderEmail: "subhash.jain456@gmail.com"
		  },
		  {
		    from: "subhash.jain456@gmail.com",
		    to: "saurabh@evonix.co",
		    subject: "SailsJS email test"
		  },
		  function(err) {console.log(err || "Email is sent");}
		)		
		
		return res.send('Email Test');
	}
};