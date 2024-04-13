const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        // host : "smtp.gmail",
        // port : 465, // This is alternate approach to use nodemailer without passing App_Password(from your account) in pass.
        service : process.env.SMTP_SERVICE,
        auth : {
            user : process.env.SMTP_MAIL,
            pass : process.env.SMTP_APP_PASSWORD 
        }
    })

    const mailOptions = {
        from : process.env.SMTP_MAIL,
        to : options.email,
        subject : options.subject,
        text : options.message
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;