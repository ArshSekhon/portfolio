// pages/api/register.js
import fetch from "node-fetch";
import * as mailJet from "node-mailjet";
import { Email } from "node-mailjet";

export type EmailToSend = Omit<Email.SendParamsMessage, "From" | "Sender">;

const sleep = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({});
    }, 350);
  });

const sendEmail = async (name, email, message) => {
  const mailJetClient = mailJet.connect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );

  return mailJetClient
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          From: {
            Email: "arshsekhon1998@gmail.com",
            Name: "Arsh",
          },
          To: [
            {
              Email: "arshsekhon1998@gmail.com",
              Name: "Arsh",
            },
          ],
          Subject: "Contact Request",
          HTMLPart: `<!DOCTYPE html>
            <html>
            <head>
            <title>Contact Request</title>
            </head>
            <body>
            
            <h1>Contact Request</h1>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Message:</b> ${message}</p>
            
            </body>
            </html>
            `,
        },
      ],
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Failed to send email");
    })
    .then(() => {
      console.log("Email sent succesfully!");
    });
};

export default async function handler(req, res) {
  const { body, method } = req;

  // Extract the email and captcha code from the request body
  const { name, message, email, captchaHumanKey } = body;

  if (method === "POST") {
    // If email or captcha are missing return an error
    if (!name || !email || !message || !captchaHumanKey) {
      return res.status(400).json({
        message: "Bad request, please provide the required fields",
      });
    }

    try {
      // Ping the google recaptcha verify API to verify the captcha code you received
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaHumanKey}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();
      /**
       * The structure of response from the veirfy API is
       * {
       *  "success": true|false,
       *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
       *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
       *  "error-codes": [...]        // optional
        }
       */
      if (captchaValidation.success) {
        // Replace this with the API that will save the data received
        // to your backend
        return await sendEmail(name, email, message)
          .then(() => {
            // Return 200 if everything is successful
            return res.status(200).send("OK");
          })
          .catch(() => {
            return res.status(500).send("Failed to send Email");
          });
      }

      return res.status(400).json({
        message: "Bad request, Invalid captcha code",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send("GET OFF MY YARD! :P");
}
