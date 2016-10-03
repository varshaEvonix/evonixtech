/**
 * Student_photographsController
 *
 * @description :: Server-side logic for managing student_photographs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


     'uploaddocs': function(req, res) {
    
         if(req.method=="POST")
    {
      
        var newFilename = req.file('image1')._files[0].stream.filename;
      req.file('image1').upload({dirname:'../public/index_files/uploads/',saveAs: newFilename}, function onUploadComplete(err, files) {
      
        var file_name='';
        files.forEach(function(files, index){
   file_name=files.filename;
 

   
  
         // var insert = "INSERT INTO `student_photographs` ('student_id','photo_path','isEnabled') VALUES ('','','1')";
var insert = "INSERT INTO `student_photographs` (`student_id`, `photo_path`, `isEnabled`) VALUES ('"+req.param('id')+"', '"+file_name+"', '1')";
          Student_photographs.query(insert,function(err,record)
        {
       
        });
            });
       
        return res.redirect('/viewprofile/'+req.param('id'));
    // var file_name = files.filename;
     //console.log(file_name);
            
     });
    }



        }
     

	
};

