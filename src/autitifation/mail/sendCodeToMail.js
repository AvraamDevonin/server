const nodemailer = require("nodemailer");
const { nanoid } = require('nanoid')

async function sendCodeToMail(email, name, code) {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: "arbitrage.frontend@gmail.com", // generated ethereal user
			pass: "1q2w3e4rQQ", // generated ethereal password
		},
	});

    

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Hype 👻" <arbitrage.frontend@gmail.com>', // sender address
		to: email, // list of receivers
		subject: "Registration", // Subject line
		// text: "Hello world?", // plain text body
		html: `
            <div style="padding: 16px; background-color: #457b9d">
                <h2 style="color: #1d3557">${name}, Wellcome to Hype Project</h2>
                <p style="color: #a8dadc;"> To complete the registration, you need to enter the code: </p>
                <h3>
                    <b style="text-decoration: underline; color: #f1faee; letter-spacing: 2px; font-size: 20px; margin-left: 32px;"> ${code.toUpperCase()} </b>
                </h3>
                <p style="color: #a8dadc;"> Thank you for trusting us </p>
            </div>
        `, // html body
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendCodeToMail;
