import nodemailer from "nodemailer";

const mailer = async (email: string, val: string, reset?: boolean) => {
  const port: number = parseInt(process.env.SMTP_PORT!);

  const newMailer = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: port || 465,
    secure: process.env.SMTP_SECURED ? true : false,
    auth: {
      user: process.env.SUPPORT_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const from = "Kensworkshop Support <support@kensworkshop.dev>";
  let response;

  if (!reset) {
    response = await newMailer.sendMail({
      from,
      to: `${email}, ${email}`,
      subject: "Verify Your Account",
      text: `Visit ${process.env.URL}/verify/${val} to verify your account`,
      html: `<a href=\"${process.env.URL}/verify/${val}\">Click here</a> to verify your account`,
    });
  } else {
    response = await newMailer.sendMail({
      from,
      to: `${email}, ${email}`,
      subject: "Reset Your Password",
      text: `Visit ${process.env.URL}/login/reset/${val} to reset your password`,
      html: `<a href=\"${process.env.URL}/login/reset/${val}\">Click here</a> to reset your password`,
    });
  }

  return response;
};

export default mailer;
