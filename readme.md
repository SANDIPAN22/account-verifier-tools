# Account-Verifier-Tools

A simple and efficient npm package to handle email verification for user registration and login processes. It allows developers to send confirmation emails to users and verify their responses, streamlining the verification process. Not only that but also, forgot-password process can also be developed very easily using this package.

## Features

- 'Plug and Play' classes and methods
- Javascript and Typescript both support
- Customizable validity-duration for links
- Responsive email templates
- Primary functionalities
        1. Email Confirmation
        2. Forgot Password Email and Confirmation
        3. Captcha Generation (Alphanumeric & Math based)

## Installation

Install account-verifier-tools with npm

```bash
  npm install account-verifier-tools

```

## 1. Confirm-Email Flow

### Creation of A Gmail Client

```javascript
const { GmailClientCore } = require("account-verifier-tools");

// Takes 4 parameters to create a Gmail Client
// 1. sender gmail id
// 2. send gmail app password (NOTE: app password is not the account the password)
// 3. Application Name / Project Name
// 4. Application Secret

const client = new GmailClientCore(
  "xxxx@gmail.com",
  "aaaa bbbb cccc dddd",
  "My Demo Application",
  "sssssssssssssssssssssssshhhhh!"
);
```

### Trigger Confirm-Email mail to the new user

```javascript
// sendVerifierEmail takes 3 parameters
// 1. new user's email id
// 2. redirect url (the url of the application where user will redirected for verification)
// 3. For how many minutes the link will be applicable

try {
  await client.sendVerifierEmail(
    "new.user@email.com",
    "http://localhost:8000/verify-email",
    5
  );
} catch (err) {
  console.error(err);
}
```

### Verify the Confirm-Email link

```javascript
// this snippet should be present inside the controller of email-verify route
// for above example the route would be: "http://localhost:8000/verify-email"
// verifyEmail returs the email if the link was not expired when clicked otherwise throws error
// verifyEmail takes the token (that developer can get from the request's query string) as parameter

try {
  const { email } = client.verifyEmail(token);
} catch (err) {
  console.error(err);
}
```

## 2. Forgot-Password Flow

### Creation of A Gmail Client

```javascript
const { GmailClientCore } = require("account-verifier-tools");

// Takes 4 parameters to create a Gmail Client
// 1. sender gmail id
// 2. send gmail app password (NOTE: app password is not the account the password)
// 3. Application Name / Project Name
// 4. Application Secret

const client = new GmailClientCore(
  "xxxx@gmail.com",
  "aaaa bbbb cccc dddd",
  "My Demo Application",
  "sssssssssssssssssssssssshhhhh!"
);
```

### Trigger Forgot-Password mail when user entered his/her email id

```javascript
// sendPasswordResetEmail takes 3 parameters
// 1. user's email id
// 2. redirect url (the url of the application where user will redirected for new password accepting form)
// 3. For how many minutes the link will be applicable

try {
  await client.sendPasswordResetEmail(
    "someone@email.com",
    "http://localhost:8000/reset-password",
    10
  );
} catch (err) {
  console.error(err);
}
```

### Verify the Forgot-Password link

```javascript
// this snippet should be present inside the controller of reset-password route
// for above example the route would be: "http://localhost:8000/reset-password"
// verifyPasswordResetLink returs the email if the link was not expired when clicked otherwise throws error
// verifyPasswordResetLink takes the token (that developer can get from the request's query string) as parameter

try {
  // validate the link and get the email address from it
  // this will make sure that the link is not expired and email is the correct one

  const { email } = client.verifyPasswordResetLink(token);

  // If verified then here, write custome form code to collect the new password (in that form developer can add email as hidden or in readonly mode bacause when the user will click the submit button of the form, the email will also go along with the new passowrd as POST request Body. Finally Based on that email, the new password can be changed)
} catch (err) {
  console.error(err);
}
```

## 3. Captcha Creation Flow

### Alphanumeric Captcha Creation

Just by calling getCaptcha method developer can get a captcha data url and the real text. The captcha data url can be used inside inside HTML <img> tag. Every captcha contains 5 characters with lots of noise, different rotation and different colors. Additionally, the real text will later be used to validate the user's input. It can be stored in the session or anywhere else as per developer's wish (but don't make it accessible to user-client to avoid vulnerabilities).

```javascript
const { getCaptcha } = require("account-verifier-tools");

// example given as an express js controller (but developer can use it in other places also)
app.get("/captcha", (req, res) => {
  const { image, text } = getCaptcha();
  console.log("Captcha text", text);
  res.send(`<img class="generated-captcha" src="${image}">`);
});
```

### Math Based Captcha Creation

Just by calling getMathCaptcha method developer can get a captcha data url and the real solution. The captcha data url can be used inside inside HTML <img> tag. Every captcha contains a simple math problem with lots of noise, different rotation and different colors. Additionally, the real solution will later be used to validate the user's input. It can be stored in the session or anywhere else as per developer's wish (but don't make it accessible to user-client to avoid vulnerabilities).

```javascript
const { getMathCaptcha } = require("account-verifier-tools");

// example given as an express js controller (but developer can use it in other places also)
app.get("/mcaptcha", (req, res) => {
  const { image, result } = getMathCaptcha();
  console.log("Captcha result", result);
  res.send(`<img class="generated-captcha" src="${image}">`);
});
```

## Sample Screenshots

### Image of the mail template of Confirm-Email

![App Screenshot](https://i.imghippo.com/files/QFT9240mVM.png)

### Image of the mail template of Forgot-Password

![App Screenshot](https://i.imghippo.com/files/UXf8628II.png)

### Image of a sample alphanumeric captcha

![App Screenshot](https://i.imghippo.com/files/dvx5554PKI.png)

### Image of a sample math-based captcha

![App Screenshot](https://i.imghippo.com/files/NAVS9476Zi.png)

## Author

- [Sandipan Chakraborty](https://www.linkedin.com/in/sandipan220799)

## Feedback

If you have any feedback, please reach out to us at chak.sandipan22@gmail.com

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributing

We welcome all contributions, including bug fixes, feature requests, and documentation improvements.

## Roadmap

- Additional Email Client support

- Add more verification flows (eg: mobile number verfication by sending sms)
