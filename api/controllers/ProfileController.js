  /**
   * ProfileController
   *
   * @description :: Server-side logic for managing profiles
   * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
   */

  module.exports = {
  	'studprofile': function(req, res){
    	res.view();
    },

       

         'mypro': function(req, res) {

             Student_details.query('SELECT * from student_details left join education on education.student_id=student_details.student_id where student_details.student_id='+req.param('id'), function(err, recordset) {         	
            	
                Student_photographs.query('SELECT * from student_photographs where student_id='+req.param('id'), function(err, photorecord){
            	
                    Loan_details.query('SELECT * from loan_details left join mst_fafsa on mst_fafsa.id=loan_details.loan_fafsa_id where loan_details.student_id= '+req.param('id')+' AND loan_details.isActive = 0', function(err, loan_l) { 

                        Loan_details.query('SELECT * from loan_details left join mst_fafsa on mst_fafsa.id=loan_details.loan_fafsa_id where loan_details.student_id= '+req.param('id')+' AND loan_details.isActive = 1', function(err, loan_act) { 
                         
              return res.view('./studprofile/studprofile', {

          answer: recordset,
          pics: photorecord,
          loan_list: loan_l,
          loan_activated: loan_act,
  
        });
               });

                        });

        });

            });
           
        },


         upload: function  (req, res) {
    if(req.method === 'POST')
      
    var userpic = req.param('userPhoto');

var newFilename = req.file('userPhoto')._files[0].stream.filename;

    req.file('userPhoto').upload({dirname:'../public/index_files/uploads/',saveAs: newFilename},function(err,files){
    
      maxBytes: 10000000;

       //sails.log.debug('file is :: ', +files);
     //if (err) return res.serverError(err); 
  var file_name='';
    files.forEach(function(files, index){
   file_name=files.filename;
     });
 
    var update = "UPDATE `student_details` SET `student_profile_pic_path`='"+file_name+"' where student_details.student_id="+req.param('id');

    Student_details.query(update,function(err,record)
        {
    
          return res.ok();
        });

            return res.redirect('/viewprofile/'+req.param('id'));
     });
   },


     'uploadVideo': function(req, res) {

         if(req.method=="POST")
      {
  
        var video_link = req.param("video_link");
        var temp=[];
       var image1 = req.file('image1');
      var image2 = req.file('image2');
     

      if((image1._files).length > 0){
       var image1 = req.file('image1')._files[0].stream.filename; 
       temp.push(image1);
      }
       if((image2._files).length > 0){
       var image2 = req.file('image2')._files[0].stream.filename; 
       temp.push(image2);
      }
       if((image3._files).length > 0){
       var image3 = req.file('image')._files[0].stream.filename; 
       temp.push(image3);
      }
     
      /*  var image4 = req.file('image4');
      var image4_f = req.file('image4')._files[0].stream.filename;
        var image5 = req.file('image5');
      var image5_f = req.file('image5')._files[0].stream.filename;*/
      //  var image6 = req.file('image6');
     // var image6_f = req.file('image6')._files[0].stream.filename;
        
  /*console.log('temp section');
     var temp=[];

  //if variable is not empty
  if(image1_f!='undefined'){
     
  temp.push(image1_f);
  }
  if(image2_f!='undefined'){
    
  temp.push(image2_f);
  }
   if(image3!='undefined'){
    
  temp.push(image3_f);
  }
  console.log('temp');
  console.log(temp);*/
/*
  if(image3_f!='undefined'){
     
  temp.push(image3_f);
  }
  if(image4_f!='undefined'){
    
  temp.push(image4_f);
  }
  if(image5_f!='undefined'){
     
  temp.push(image5_f);
  }
  if(image6_f!='undefined'){
    
  temp.push(image6_f);
  }*/

// console.log('temp')
// console.log(temp);
//       console.log(video_link);
//       console.log('video_link');
           
//       var update ="";
//       var update_photo ="";
    
//         update = "UPDATE `student_details` SET `student_video_path`='"+video_link+"' WHERE `student_id`=1";
       
    
//       console.log(update);
//       Student_details.query(update,function(err,record)
//       {
//         temp.forEach(function(value, index){
//            update_photo = "UPDATE `student_photographs` SET `photo_path`='"+value+"' WHERE `student_id`=1";
//          Student_photographs.query(update_photo,function(err,record)
//       {
//         console.log('hi');
//         console.log(record);
         
//       });

// });
//         return res.redirect('/viewprofile/1');
       
//            });
//     }else {
//       console.log('Else part');
//     }

}
        },


  };

  // select * from user left join personal on user.id=personal.user_id left join education on education.user_id=user.id left join loan on loan.user_id=user.id where personal.user_id=1 AND education.user_id=1 AND loan.user_id=1;