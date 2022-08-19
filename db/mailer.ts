import nodemailer from "nodemailer";

const mailer = async (email: string, verifyVal: string) => {
  const port: number = parseInt(process.env.SMTP_PORT!);

  const newMailer = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: port || 465,
    secure: process.env.SMTP_SECURED ? true : false,
    auth: {
      user: process.env.SUPPORT_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let response = await newMailer.sendMail({
    from: "Kensworkshop Support <support@kensworkshop.dev>",
    to: `${email}, ${email}`,
    subject: "Verify Your Account",
    text: `Visit ${process.env.URL}/verify/${verifyVal} to verify your account`,
    html: `<a href=\"${process.env.URL}/verify/${verifyVal}\">Click here</a> to verify your account`,
  });
};

export default mailer;
