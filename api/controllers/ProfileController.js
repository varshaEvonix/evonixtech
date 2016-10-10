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

     Student_details.query('SELECT mf.id, mf.fafsa_values, slc.profile_lock, sd.student_id, sd.student_firstname, sd.student_lastname, DATE_FORMAT(sd.student_birthdate,"%Y-%m-%d") as student_birthdate, sd.student_about_me,sd.student_email, sd.student_contactno, IFNULL(sd.student_ambition,"") student_ambition, sd.student_city,  sd.student_state, sd.student_address, sd.video_link, sd.student_country, sd.zip_code, sd.student_profile_pic_path, IFNULL(ed.student_education_institute, "") student_education_institute, IFNULL(ed.student_education_fieldofstudy, "") student_education_fieldofstudy, ld.loan_id, ld.loan_fafsa_id, IFNULL(ld.loan_bankname, "") loan_bankname, IFNULL(ld.loan_accountno, "") loan_accountno, IFNULL(ld.loan_amount,0) loan_amount, IFNULL(sum(dfd.funded_amount),0) as total_funded from student_login_credentials  slc inner join student_details sd on slc.student_id=sd.student_id left join education ed on ed.student_id=sd.student_id  left join loan_details ld on ld.student_id=sd.student_id and ld.isActive=1 left join donors_funding_details dfd on ld.loan_id=dfd.loan_id left join mst_fafsa mf on mf.id = ld.loan_fafsa_id where slc.student_active = 1 AND sd.student_id = '+req.param("id")+' group by sd.student_id, sd.student_firstname, sd.student_lastname, sd.student_birthdate, sd.student_about_me, sd.student_profile_pic_path, ld.loan_amount', function(err, recordset) {         	

      Student_photographs.query('SELECT * from student_photographs where student_id='+req.param('id'), function(err, photorecord){

        Loan_details.query('SELECT loan_id, student_id, loan_amount, IFNULL(mst_fafsa.fafsa_values,"-") fafsa_values, IFNULL(loan_fafsa_id, "-") loan_fafsa_id, IFNULL(loan_bankname, "-") loan_bankname, IFNULL(loan_accountno, "-") loan_accountno from loan_details left join mst_fafsa on mst_fafsa.id=loan_details.loan_fafsa_id where loan_details.student_id= '+req.param('id')+' AND loan_details.isActive = 0', function(err, loan_l) { 

          Student_details.query('SELECT dfd.donors_name, dfd.donors_comment, dfd.funded_amount, DATE_FORMAT(dfd.funding_date,"%Y-%m-%d") as funding_date FROM  loan_details ld  inner join donors_funding_details dfd on ld.loan_id = dfd.loan_id and ld.isActive = 1 where ld.student_id='+req.param('id'), function(err, donor_l) {   

            Admin_loan_comments.query('SELECT note, DATE_FORMAT(alc.last_updated,"%Y-%m-%d") as last_updated from admin_loan_comments alc inner join loan_details ld on ld.loan_id = alc.loan_id where note_type=2 and student_id='+req.param("id")+' order by last_updated desc', function(err, loan_comments){


              return res.view('./studprofile/studprofile', {

                student_info: recordset,
                pics: photorecord,
                loan_list: loan_l,
                donor_list: donor_l,
                admin_comments: loan_comments

              });
            });

          });

        });

      });
    });

   },


   'stu_dashboard': function(req, res) {

    console.log(req.param('id'));

    Student_details.query('SELECT sd.student_id, sd.student_firstname, sd.student_lastname, DATE_FORMAT(sd.student_birthdate,"%Y-%m-%d") as student_birthdate,  sd.student_profile_pic_path,  IFNULL(ld.loan_amount,0) loan_amount, IFNULL(sum(dfd.funded_amount),0) as total_funded from student_login_credentials  slc inner join student_details sd on slc.student_id=sd.student_id left join loan_details ld on ld.student_id=sd.student_id and ld.isActive=1 left join  donors_funding_details dfd on ld.loan_id=dfd.loan_id  where  sd.student_id = '+req.param("id")+' group by sd.student_id, sd.student_firstname, sd.student_lastname, student_birthdate,  sd.student_profile_pic_path, ld.loan_amount', function(err, recordset) {   


      Student_details.query('SELECT dfd.donors_name, dfd.donors_comment, dfd.funded_amount, DATE_FORMAT(dfd.funding_date,"%Y-%m-%d") as funding_date FROM  loan_details ld  inner join donors_funding_details dfd on ld.loan_id = dfd.loan_id and ld.isActive = 1 where ld.student_id='+req.param('id'), function(err, donor_l) {   


        return res.view('./studash/studash', {

          student_info: recordset,
          donor_l: donor_l

        });

      });

    });
    
  },






     // 'stu_dashboard': function(req, res) {


     //   Student_details.query('SELECT * from student_details where student_details.student_id=1', function(err, recordset) {  

     //    Donors_funding_details.query('SELECT * from donors_funding_details left join loan_details on loan_details.loan_id = student_details.student_id where student_details.student_id=1', function(err, donor_l) {
     //     console.log()
     //     return res.view('./studash/studash', {

     //      answer: recordset,
     //      donor_l: donor_l,

     //    });

     //   });
     //  });


     // },




     upload: function  (req, res) {
      if(req.method === 'POST')

        newFilename = req.file('userPhoto')._files[0].stream.filename;
 
    console.log(newFilename);
    console.log('newFilename');
      req.file('userPhoto').upload({dirname:'../public/index_files/uploads/documents/',saveAs: newFilename}), function onUploadComplete(err, files) {
        
 };
     
     var update = "UPDATE `student_details` SET `student_profile_pic_path`='"+newFilename+"' where student_details.student_id="+req.param('id');
console.log(update);
     Student_details.query(update,function(err,record)
     {
      
    });
    // var file_name = files.filename;
     //console.log(file_name);
     return res.redirect('/personal_edit/'+req.param('id'));
  
    },


    'uploadVideo': function(req, res) {
      console.log('are you there');
      console.log(req.method);
      if(req.method=="POST")
      {
        console.log("this is it");
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
       console.log(temp);
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