
module.exports.routes = {
    //saurabh
    '/': 'Student_detailsController.homepage_view',
    '/studentlogin': 'StudentloginController.studentlogin',
    '/user': 'Student_detailsController.stulogin',
    '/personal': 'PersonalController.insertpersonal',
    '/education': 'EducationController.inserteducation',
    '/loan': 'LoanController.insertloan',
    '/allprofile': 'Student_detailsController.allprofiles',
    '/single_profile/:id': 'Student_detailsController.singleprofile',
    //'/viewprofile':'ProfileController.mypro',
    '/viewprofile/:id': 'ProfileController.mypro',
    '/upload_dp/:id': 'ProfileController.upload',
    '/studash/:id': 'ProfileController.stu_dashboard',
    '/upload_media/:id': 'ProfileController.uploadmedia',
    '/upload_images/:id': 'Student_photographsController.uploaddocs',
    '/user_docs/:student_id/:loan_id': 'Loan_editController.uploaddocs',
    '/upload_file': 'Loan_editController.uploadfile',
    '/personal_edit/:id': 'Personal_editController.editpersonal',
    '/personal_edit_submit/:id': 'Personal_editController.editpersonalsubmit',
    '/education_edit/:id': 'Education_editController.editeducation',
    '/education_edit_submit/:id': 'Education_editController.editeducationsubmit',
    '/loan_edit/:student_id/:loan_id': 'Loan_editController.editloan',
    '/addloan/:id': 'Loan_editController.addloan',
    '/media_edit/:id': 'Personal_editController.editmedia',
    '/loan_edit_submit/:student_id/:loan_id': 'Loan_editController.editloansubmit',
    '/remove_doc/:student_id/:loan_id/:loan_document_id': 'Loan_editController.removedoc',
    '/addloan_submit/:id': 'Loan_editController.addloansubmit',
    '/search_student': 'Student_detailsController.stu_search',
    '/email': 'EmailController.sendEmail',
    '/student/login': 'Student_authController.student_login',
    '/student/process': 'Student_authController.student_process',
    '/student/logout': 'Student_authController.student_logout',
    '/donatepage': 'DonatepageController.donatepage',

    '/activation_link/:id': 'Student_detailsController.activate_student',
    '/thankyou': 'ThankyouController.thankyou',
    '/remove_image/:student_id/:photo_id': 'ProfileController.removeimage',
    '/add_loan_education/:student_id': 'Loan_editController.add_loan_education',
    '/uploadimage': 'ProfileController.upload_image',
//   -------------------- varsha-------------------------------------------------------
    '/admin_dash': 'Admin_dashController.admin_dash',
    '/admin/viewdetails/:id': 'Admin_dashController.viewdetails',
    '/admin/aboutus': 'Static_pageController.get_about_us',
    '/admin/editaboutus': 'Static_pageController.edit_about_us',
    '/admin/abterms': 'Static_pageController.get_terms_and_cond',
    '/admin/editabterms': 'Static_pageController.edit_terms_and_cond',
    '/admin/faq': 'Static_pageController.get_faq',
    '/admin/editfaq/:id': 'Static_pageController.editfaq',
    '/admin/privacypolicy': 'Static_pageController.privacypolicy',
    '/admin/editprivacypolicy': 'Static_pageController.editprivacypolicy',
    '/updateprivacypolicy': 'Static_pageController.updateprivacypolicy',
    '/addfaq': 'Static_pageController.addfaq',
    '/get_category': 'Static_pageController.get_category',
    '/admin/allstudents/:id': 'Admin_dashController.get_student',
    '/admin/activestudent/:id': 'Admin_dashController.activestudent',
    '/admin/inactivestudent/:id': 'Admin_dashController.inactivestudent',
    '/admin/lockedstudent/:id': 'Admin_dashController.lockedstudent',
    '/upload_file': 'Admin_dashController.upload_file',
            //'/upload_file': 'Admin_dashController.upload_file',
            '/add_notes': 'Admin_dashController.add_notes',
    'post /updateaboutus': 'Static_pageController.updateaboutus',
    'post /updateterms': 'Static_pageController.updateterms',
    'post /updatefaq': 'Static_pageController.updatefaq',
    '/admin/login': 'AuthController.login',
    '/admin/logout': 'AuthController.logout',
    '/admin/process': 'AuthController.process',
    '/admin/studlockedprofile/:id': 'Admin_dashController.studlockedprofile',
    '/admin/update_student_profile': 'Admin_dashController.update_student_profile',
    '/donorpage/:id': 'DonorController.donorpage',
    '/paymentpage': 'DonorController.paymentpage',
    '/checkout': 'DonorController.checkout',
    '/subscribe': 'DonorController.subscribe',
    '/thankyoupage': 'DonorController.thankyoupage',
    '/change_status': 'Admin_dashController.change_status',
    '/admin/donors/:id': 'Admin_dashController.donors_listing',
    '/admin/mailtemplate': 'MailTemplateController.mailtemplate',
    '/admin/editmailtemplate/:id': 'MailTemplateController.editmailtemplate',
    '/admin/edit_mail_template': 'MailTemplateController.edit_mail_template',
    '/termsandconditions': 'FrontendController.termsandconditions',
    '/aboutus': 'FrontendController.aboutus',
    '/faq': 'FrontendController.fetch_faq',
    '/privacypolicy': 'FrontendController.privacypolicy',
};
