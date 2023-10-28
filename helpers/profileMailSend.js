const jwt = require('jsonwebtoken');
const sendEmails = require('./init-gmail');
const profileModel = require('../models/createProfileModel');
const logger = require('./winston');
const config = require('../config/host-config');

const { JWT_ACTIVE_KEY } = process.env;

const sendActivationLink = async (req, res, next, email, id) => {
    try {
        const user = await profileModel.findOne({ where: { id } });
        if (!user) {
            const errors = [
                {
                    msg: 'Unable to send Your Application on email. profile Model does not exist.',
                },
            ];
            return res.render('create_your_profile', { errors });
        }

        const secretKey = JWT_ACTIVE_KEY; // Generate a new secret key
        const token = jwt.sign({ email: user.email, id: user.id }, secretKey, {
            expiresIn: '2h',
        });

        let emailBodyText = `<p>Hi,</p>

        <p  style="margin: 0; padding: 0;"> Thank you for expressing your interest in working for Dinshaws. We appreciate your enthusiasm and look forward to the possibility of having you join our team.</p>
        
        <p  style="margin: 0; padding: 0;"> We are always on the lookout for talented individuals who are passionate about their work and share our values. Your interest in our company has not gone unnoticed, and we will definitely keep your profile in mind if a suitable opportunity arises in the future.</p>
        
        <p  style="margin: 0; padding: 0;">  In the meantime, please feel free to visit our website or follow us on social media to stay updated on any job openings or company news. If you have any further questions regarding the work culture at Dinshaws, please feel free to write to us. </p>
        
        <p >  Thank you again for your interest in Dinshaws, and we hope to have the opportunity to connect with you in the future.</p>
        
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
        const emailOptions = {
            to: user.email,
            cc: '',
            bcc: '',
            replyTo: config.REPLY_TO,
            subject: 'Your application for job at Dinshaws',
            text: emailBodyText,
        };

        sendEmails(emailOptions);

        const InternalEmailOptions = {
            to: config.CAREER_EMAIL,
            cc: '',
            subject: `Dinshaws - job application received - ${user.email}`,
            text: `An Application for job at Dinshaws is received from ${user.email}.<br>
                Please check the details of the applicant on the admin panel.<br><br>
                
                Regards,<br>
                IT Support Team,<br>
                Dinshaw's Dairy Foods Pvt. Ltd.<br>`,
        };

        sendEmails(InternalEmailOptions);

        user.activation_key = token;
        const savedprofileModel = await user.save();
        logger.info(`Application  Email sent to: ${savedprofileModel.email}`);
        return {
            success: true,
            message: 'Application email send successfully.',
        };
    } catch (error) {
        logger.error(error);
        console.log('error in activation ' + error.message);
        throw error;
    }
};

module.exports = sendActivationLink;
