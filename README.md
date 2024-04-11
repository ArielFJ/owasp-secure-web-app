# owasp-secure-web-app
## Introduction
This is the README file for the `owasp-secure-web-app` project.

## Installation
To install and run the project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/owasp-secure-web-app.git`
2. Change into the project directory: `cd owasp-secure-web-app`
3. Install dependencies: `npm install`
4. Start the application: `npm start`

### Usage
Once the application is running, you can access it at `http://localhost:3000`. 


## API Endpoints

### GET /users
- Description: Retrieves a list of all users.
- OWASP Applied: It also ensures that sensitive user information is not exposed in the response.

### GET /users/:id
- Description: Retrieves a specific user by their ID.
- OWASP Applied: The endpoint validates the user ID parameter to prevent any potential security vulnerabilities. It also implements proper error handling to prevent information leakage.

### POST /register
- Description: Creates a new user.
- OWASP Applied: The endpoint enforces strong password requirements and securely stores user passwords using hashing algorithms. It also implements rate limiting to prevent brute force attacks.

### POST /login
 - Description: This is the login endpoint for the OWASP Secure Web App.
 - OWASP Applied: The login endpoint implements various security measures recommended by OWASP to ensure secure authentication and prevent common vulnerabilities such as SQL injection, cross-site scripting (XSS), and brute-force attacks.

## OWASP Compliant

| OWASP Policy                                    | Compliance                                                                                                          |
|-------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| A1: Injection                                   | The project implements measures to prevent SQL injection attacks.                                                   |
| A2: Broken Authentication                       | The login endpoint implements security measures to ensure secure authentication and prevent common vulnerabilities. |
| A3: Sensitive Data Exposure                     | The project ensures that sensitive user information is not exposed in the response.                                 |
| A4: XML External Entities (XXE)                 | Is a REST API, so no XML is used in the project.     |
| A5: Broken Access Control                       | Standard authentication methods including JWT is implemented to manage access.                                      |
| A7: Cross-Site Scripting (XSS)                  | The login endpoint implements security measures to prevent cross-site scripting attacks.                            |
| A9: Using Components with Known Vulnerabilities | All the dependencies are in the last version, ensuring the latest security patches.                                      |
| A10: Insufficient Logging & Monitoring          | All requests to the server are saved in the `logs/` directory.                            |