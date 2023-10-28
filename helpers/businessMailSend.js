const jwt = require('jsonwebtoken');
const sendEmails = require('./init-gmail');
const businessEnquiry = require('../models/businessEnquiryModel');
const logger = require('./winston');
const e = require('connect-flash');
const { JWT_ACTIVE_KEY } = process.env;
const config = require('../config/host-config');

const sendActivationLink = async (req, res, email, purpose, id) => {
    try {
        const user = await businessEnquiry.findOne({ where: { id } });
        if (!user) {
            const errors = [
                {
                    msg: 'Unable to send Your Application on email. business Enquiry does not exist.',
                },
            ];
            return res.render('businessEnquiry', { errors });
        }

        const secretKey = JWT_ACTIVE_KEY; // Generate a new secret key
        const token = jwt.sign({ email: user.email, id: user.id }, secretKey, {
            expiresIn: '2h',
        });
        console.log('Purpose:', purpose, typeof purpose);
        let emailSubject = 'Your email is received.';
        let emailBodyText = '<p> Thank you for your email.</p>';
        if (purpose === '1') {
            emailSubject = 'Your Feedback/Suggestion is received.';
            emailBodyText = `<p> Dear Sir, </p> </br>
                      
                    <p  style="margin: 0; padding: 0;">We thank you for your feeback/suggestion. </p>
                    <p  style="margin: 0; padding: 0;">  Our executives will review it soon and we will revert soon.</p> 
                    <p>  Please bear with us till then.</p> 
                      
                    <p style="margin: 0; padding: 0;">Regards, </p>
                    <p style="margin: 0; padding: 0 0 6px 0;">Dinshaw's Customer Delight Team </p>
                    <hr style="margin: 0; padding:0; border: 1.7px solid #854382; width: auto">
                    <p style="margin: 0; padding: 6px 0 0 0;"><i class="fa-solid fa-location-dot"></i>Dinshaw's Building, Gittikhadan, Nagpur 440013</p>
                    <p style="margin: 0; padding: 0;"><i class="fa-solid fa-globe"></i>www.dinshaws.co.in</p>
                    <p style="margin: 0; padding: 0;"><i class="fa-solid fa-phone"></i>1800-120-9999</p>
                    <img
                     src="https://ci3.googleusercontent.com/mail-sig/AIorK4yILfOv_VM_GUZhQLDIyGpOBSn2zXs2utk4dHLu1vLrg16dFVw0t-j7jLk8YT4ElmVhleYsIOU"
                     width="563" height="101" style="margin-right:0px" class="CToWUd a6T" data-bit="iit" tabindex="0">
                    <h4 style="margin: 0; padding: 0; color:rgb(166,77,121);"" >Belief in Excellence I Belief in Joy & Happiness I Belief in
                     Safety & Sustainability</h4>
                    <p style="margin: 0; padding: 0; text-align: justify; color:#979393 !important;"><small>This message contains confidential information and is
                     intended only for the
                     intended recipients. If you are not an intended recipient you should not disseminate, distribute or copy this
                     email. Please notify us immediately by email if you have received this email by mistake and delete this email
                     from your system. Email transmission cannot be guaranteed to be secure or error-free as information could be
                     intercepted, corrupted, lost, destroyed, arrive late or incomplete, or contain viruses. Therefore, we do not
                     accept liability for any errors or omissions in the contents of this message, which arise as a result of email
                     transmission. If verification is required please request a hard-copy version.</small></p>`;
        } else if (purpose === '2') {
            emailSubject = ' Your Trade Enquiry is received.';
            emailBodyText = `<p> Hi, </p> <br>

            <p  style="margin: 0; padding: 0;">  Thank you for expressing your interest in working for Dinshaws. We appreciate your enthusiasm and look forward to the possibility of having business association with you.  Our team will contact you soon. </p> 
                  
            <p  style="margin: 0; padding: 0;">  In the meantime, please feel free to visit our website or follow us on social media. If you have any further questions regarding the work culture at Dinshaws, please feel free to write to us.  </p>

         <p> Thank you again for your interest in Dinshaws. </p>
         
         <p style="margin: 0; padding: 0;">Regards, </p>
         <p style="margin: 0; padding: 0 0 6px 0;">Dinshaw's Customer Delight Team </p>
         <hr style="margin: 0; padding:0; border: 1.7px solid #854382; width: auto">
         <p style="margin: 0; padding: 6px 0 0 0;"><i class="fa-solid fa-location-dot"></i>Dinshaw's Building, Gittikhadan, Nagpur 440013</p>
         <p style="margin: 0; padding: 0;"><i class="fa-solid fa-globe"></i>www.dinshaws.co.in</p>
         <p style="margin: 0; padding: 0;"><i class="fa-solid fa-phone"></i>1800-120-9999</p>
         <img 
          src="https://ci3.googleusercontent.com/mail-sig/AIorK4yILfOv_VM_GUZhQLDIyGpOBSn2zXs2utk4dHLu1vLrg16dFVw0t-j7jLk8YT4ElmVhleYsIOU"
          width="563" height="101" style="margin-right:0px" class="CToWUd a6T" data-bit="iit" tabindex="0">
         <h4 style="margin: 0; padding: 0; color:rgb(166,77,121);" >Belief in Excellence I Belief in Joy & Happiness I Belief in
          Safety & Sustainability</h4>
         <p style="margin: 0; padding: 0; text-align: justify; color:#979393 !important;"><small>This message contains confidential information and is
          intended only for the
          intended recipients. If you are not an intended recipient you should not disseminate, distribute or copy this
          email. Please notify us immediately by email if you have received this email by mistake and delete this email
          from your system. Email transmission cannot be guaranteed to be secure or error-free as information could be
          intercepted, corrupted, lost, destroyed, arrive late or incomplete, or contain viruses. Therefore, we do not
          accept liability for any errors or omissions in the contents of this message, which arise as a result of email
          transmission. If verification is required please request a hard-copy version.</small></p>`;
        }
        const emailOptions = {
            to: user.email,
            cc: '',
            bcc: '',
            replyTo: config.REPLY_TO,
            subject: emailSubject,
            text: emailBodyText,
        };
        sendEmails(emailOptions);

        if (purpose === '1') {
            emailPurpose = 'Feedback/Suggestion';
        } else if (purpose === '2') {
            emailPurpose = 'Trade Enquiry';
        }
        const InternalEmailOptions = {
            to: config.FEEDBACK_EMAIL,
            subject: `Dinshaws - ${emailPurpose} - ${user.name}`,
            text: `

               Name: ${user.name}<br>
               Email: ${user.email}<br>
               Mobile: ${user.mobile}<br>
               Purpose: ${emailPurpose}<br>
               Location: ${user.location}<br>
               Message: ${user.message}<br><br> 

              
               `,
        };
        sendEmails(InternalEmailOptions);

        user.activation_key = token;
        const savedbusinessEnquiry = await user.save();
        logger.info(
            `Application  Email sent to: ${savedbusinessEnquiry.email}`
        );
        return {
            success: true,
            message: 'Application  email send successfully.',
        };
    } catch (error) {
        logger.error(error);
        console.log('error in activation ' + error.message);
        throw error;
    }
};

module.exports = sendActivationLink;
