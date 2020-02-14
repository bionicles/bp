const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * @name sendVerificationEmail
 * @example
 * ```js sendVerificationEmail(email, code)
 * @arg {string} email - address to verify
 * @arg {string} code - code to send
 * @link https://github.com/sendgrid/sendgrid-nodejs
 * @returns {*} sgResponse - from sendgrid
 */
const sendVerificationEmail = async (email, code) => {
  const sgResponse = await sgMail.send({
    to: email,
    from: "noreply@bitpharma.com",
    templateId: "d-010f070801ff414db1bb2a44ba973a1f",
    dynamic_template_data: { code }
  });
  return sgResponse;
};

export default sendVerificationEmail;
