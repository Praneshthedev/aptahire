import nodemailer from "nodemailer";
import { readFileSync } from "fs";

const env = readFileSync(".env", "utf8");
const match = env.match(/^MAIL_PASS=(.*)$/m);

if (!match) {
  console.log(
    JSON.stringify({
      success: false,
      status: "error",
      error: "MAIL_PASS missing in .env",
    })
  );
  process.exit(1);
}

let pass = match[1].trim();
if (
  (pass.startsWith('"') && pass.endsWith('"')) ||
  (pass.startsWith("'") && pass.endsWith("'"))
) {
  pass = pass.slice(1, -1);
}

const transporter = nodemailer.createTransport({
  host: "mail.deepsense.co.in",
  port: 587,
  secure: false,
  auth: {
    user: "info@aptahire.io",
    pass,
  },
  authMethod: "LOGIN",
  requireTLS: true,
});

try {
  const info = await transporter.sendMail({
    from: "Aptahire <info@aptahire.io>",
    to: "pranesh@getnos.io",
    subject: "Aptahire SMTP Test Email",
    text:
      "SMTP test from info@aptahire.io to pranesh@getnos.io\n" +
      "Server: mail.deepsense.co.in:587 (TLS)\n" +
      "Sent at: " +
      new Date().toISOString(),
  });

  console.log(
    JSON.stringify({
      success: true,
      status: "sent",
      from: "info@aptahire.io",
      to: "pranesh@getnos.io",
      server: "mail.deepsense.co.in:587",
      messageId: info.messageId,
    })
  );
} catch (error) {
  console.log(
    JSON.stringify({
      success: false,
      status: "error",
      from: "info@aptahire.io",
      to: "pranesh@getnos.io",
      server: "mail.deepsense.co.in:587",
      error: error.message,
    })
  );
  process.exit(1);
}
