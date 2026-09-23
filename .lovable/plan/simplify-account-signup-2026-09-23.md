# Simplify account signup

## What will change
- Replace the signup name field with a required, unique username.
- Keep email and password required for signup and sign-in.
- Remove the email-confirmation wait so new accounts sign in immediately.
- Keep profile records and show the saved username across the site.
- Add CAPTCHA protection to signup once the required CAPTCHA credentials are available.

## Technical details
- Add a normalized, unique username to account profiles and populate it during signup.
- Enable email/password authentication and immediate confirmation in Lovable Cloud.
- Update the account form, validation, success/error states, and generated database types.
- Verify signup and sign-in behavior, mobile layout, and the website build.

## Required input
A production CAPTCHA requires Cloudflare Turnstile site and secret keys. The signup improvements and removal of email verification can be completed now; CAPTCHA will remain pending until those keys are supplied.
