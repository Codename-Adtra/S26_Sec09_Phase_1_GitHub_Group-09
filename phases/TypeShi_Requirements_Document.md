# Requirements Document
## TypeShi - Typing Performance Application
**CS 3354.009 | Group 09 | Prof. Priya Narayanasami**

---

## Approach to Drafting Requirements
Group 09 has identified the following requirements for TypeShi by analyzing our primary stakeholders: fellow students looking to improve their typing skills, programmers practicing code typing consistency, competitive typists, and casual online users seeking to calculate their typing performance journey.

We conducted research by examining pre-existing established typing platforms such as Monkeytype and TypeRacer to understand the core functionalities that users should expect from typing applications. Through team meeting sessions, we discussed features that would be essential for a minimum viable product versus features that could be implemented in later phases.

Our requirements were validated against our Statement of Work (SOW) to ensure alignment with the project scope and timeline constraints.

---

## Functional Requirements

**R1 - The system shall allow users to take typing tests.**
* **R1.1** - The system shall provide multiple timer duration options (15 seconds, 30 seconds, 60 seconds, and 120 seconds).
* **R1.2** - The system shall display text content that the user must type during the test.
* **R1.3** - The system shall provide real-time visual feedback as the user types, highlighting correct characters in one color and incorrect characters in another color.
* **R1.4** - The system shall display the remaining time during an active typing test.
* **R1.5** - The system shall allow users to restart a test at any point before completion.

**R2 - The system shall calculate and display typing performance metrics.**
* **R2.1** - The system shall calculate Words Per Minute (WPM) using the formula: `(total characters typed / 5) / time in minutes`.
* **R2.2** - The system shall calculate accuracy percentage based on the ratio of correct characters to total characters typed.
* **R2.3** - The system shall display WPM and accuracy results immediately after test completion.
* **R2.4** - The system shall display the total number of characters typed during the test.

**R3 - The system shall allow users to create an account.**
* **R3.1** - The system shall require users to provide an email address and password during account registration.
* **R3.2** - The system shall validate that the email address is in a valid format.
* **R3.3** - The system shall require passwords to meet minimum security criteria (minimum 8 characters).
* **R3.4** - The system shall prevent duplicate accounts with the same email address.

**R4 - The system shall allow users to log in and log out.**
* **R4.1** - The system shall authenticate users using their registered email and password.
* **R4.2** - The system shall maintain user sessions after a successful login.
* **R4.3** - The system shall allow users to log out, terminating their active session.
* **R4.4** - The system shall display appropriate error messages for invalid login credentials.

**R5 - The system shall store test history for registered users.**
* **R5.1** - The system shall save each completed test's results including WPM, accuracy, date, and time.
* **R5.2** - The system shall associate test results with the user's account.
* **R5.3** - The system shall allow users to view their complete test history in chronological order.

**R6 - The system shall generate typing content from a work bank.**
* **R6.1** - The system shall display the user's average WPM across all tests.
* **R6.2** - The system shall display the user's highest WPM score.
* **R6.3** - The system shall display the total number of tests completed by the user.
* **R6.4** - The system shall display the user's average accuracy percentage.

**R7 - The system shall generate typing content from a word bank.**
* **R7.1** - The system shall randomly select words from a stored database for each test.
* **R7.2** - The system shall ensure that generated text is appropriate for the selected test duration.
* **R7.3** - The system shall provide different text content for each new test.

**R8 - The system shall allow users to navigate between different pages.**
* **R8.1** - The system shall provide navigation to the typing test page from the home screen.
* **R8.2** - The system shall provide navigation to the user profile page for logged-in users.
* **R8.3** - The system shall provide navigation to the login/registration pages for guest users.
* **R8.4** - The system shall display different navigation options based on authentication status.

**R9 - The system shall allow guest users to take typing tests.**
* **R9.1** - The system shall not require authentication for users to access the basic typing test.
* **R9.2** - The system shall display results to guest users after test completion.
* **R9.3** - The system shall prompt guest users to create an account to save their results.

**R10 - The system shall provide user account management features.**
* **R10.1** - The system shall allow users to view their account information.
* **R10.2** - The system shall allow users to change their password.

---

## Non-Functional Requirements
* The system shall securely hash and store user passwords using industry-standard encryption algorithms and never store passwords in plain text.
* The system shall implement secure session management using JWT tokens or secure session cookies to prevent unauthorized access to user accounts.
* The system shall respond to user typing input with visual feedback in less than 50 milliseconds to ensure real-time responsiveness.
* The system shall load the typing test page in under 2 seconds on standard internet connections.
* The system shall be available to users 99% of the time, with minimal planned downtime for maintenance during off-peak hours.
* The system shall accurately save all completed test results to the database without data loss.
* The system shall provide an intuitive and clean user interface that requires no prior training for users to understand how to take a typing test.
* The system shall display clear error messages when users input invalid data or encounter errors.
* The system shall maintain readable contrast ratios between text and background colors according to WCAG 2.1 Level AA standards.
* The system shall function correctly on major modern web browsers including Chrome, Firefox, Safari, and Edge.
* The system shall provide a responsive design that works on desktop screens, tablets, and laptop devices with screen widths of 768 pixels or greater.
* The system shall log all critical errors and authentication attempts to support debugging and security monitoring.
* The system shall be designed to handle at least 100 concurrent users taking typing tests simultaneously without performance degradation.
* The system shall validate all user inputs on both client-side and server-side to prevent injection attacks and data corruption.
* The system shall optimize database queries to retrieve user test history in under 1 second for accounts with up to 1000 saved tests.

---

## Use Case Diagrams

### Team Member 1 - Authentication Subsystem (Adrian) 
*Covers R3, R4, R10*

#### Create Account
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. TypeShi displays homepage
1. TUCBW user clicks on profile icon
2. TypeShi displays signup/login page and forgot password button
3. User types in their username, email, and password
4. TypeShi displays signup button
5. User clicks on signup button
6. TypeShi displays a confirmation message on the screen and sends an email to user
7. TUCEW user sees the message and checks for the confirmation email.

#### Login
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. TypeShi displays homepage
1. TUCBW user clicks on profile icon
2. TypeShi displays signup/login page and forgot password button
3. User types in their email and password for the system
4. TypeShi displays login button
5. User clicks on login button
6. TypeShi displays homepage
7. TUCEW user sees the homepage and their username when clicking on profile icon

#### Logout
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. TypeShi displays homepage
1. TUCBW user clicks on profile icon
2. TypeShi displays username, view account information and logout button
3. User clicks on logout button
4. TypeShi displays signup/login page
5. TUCEW user sees the signup/login page

#### View Account Information
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. TypeShi displays homepage
1. TUCBW user clicks on profile icon
2. TypeShi displays username, view account information and logout button
3. User clicks on view account information button
4. TypeShi displays account information page and change password button
5. TUCEW user sees account information page

#### Change Password
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. TypeShi displays homepage
1. TUCBW user clicks on profile icon
2. TypeShi displays username, view account information and logout button
3. User clicks on view account information button
4. TypeShi displays account information page and change password button
5. User clicks on change password button
6. TypeShi displays change password page
7. User types old password, then new password
8. TypeShi displays save password button
9. User clicks save password button
10. TypeShi displays password changed message, sends email confirmation, and displays homepage
11. TUCEW user sees confirmation message, email, and homepage

#### Reset Password
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. TypeShi displays homepage
1. TUCBW user clicks on profile icon
2. TypeShi displays signup/login page and forgot password button
3. User clicks on forgot password button
4. TypeShi displays forgot password page and prompts user to enter email
5. User types in email
6. TypeShi displays send email confirmation button
7. User checks email and clicks on reset password link
8. TypesShi displays change password page
9. User types new password
10. TypeShi displays save password button
11. User clicks save password button
12. TypeShi displays password changed message, sends email confirmation, and displays homepage
13. TUCEW user sees confirmation message, email, and homepage

---

### Team Member 2 - Typing Test Subsystem (Daniel)
*Covers R1, R9*

#### Begin Typing Test
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. TypeShi displays the main homepage
1. User navigates to the typing test page
2. TypeShi displays timer duration options (15s, 30s, 60s, 120s)
3. User selects a timer duration setting
4. TypeShi generates random text from a word bank
5. TypeShi displays the generated text
6. User begins typing test
7. TypeShi starts countdown timer
8. TypeShi provides real-time visual feedback depending on correct and incorrect inputs
9. TypeShi continues timer countdown until it reaches zero
10. TypeShi calculates WPM and Accuracy
11. TypeShi displays results to the user

#### Set Timer Duration
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. TypeShi displays available timer options (15s, 30s, 60s, 120s)
1. TypeShi highlights default option (60s)
2. User click on desired timer duration
3. TypeShi visually indicates selected duration
4. TypeShi stores selected duration for the upcoming test

#### View Results Feedback
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. TypeShi displays the main homepage
1. User types a character during active test
2. TypeShi captures keystroke
3. TypeShi compares typed character to expected character
4. If correct: TypeShi highlights character in green and advances cursor
5. If incorrect: TypeShi highlights character in red
6. TypeShi updates character count
7. TypeShi recalculates accuracy percentage in real-time

#### Complete Typing Test
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. TypeShi conducts a typing test
1. User selects “Restart” button during active test
2. TypeShi displays a confirmation prompt: “Are you sure you want to restart?”
3. User confirms restart
4. TypeShi stops current timer
5. TypeShi clears all typed inputs and visual feedback
6. System generates a new text content
7. TypeShi displays new text
8. TypeShi resets timer to originally selected duration
9. TypeShi resets accuracy and character counters to zero
10. User begins a new typing test

#### Restart Typing Test
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. TypeShi conducts a typing test
1. TypeShi detects when timer has reached zero
2. TypeShi stops accepting any further keyboard input
3. TypeShi calculates final WPM using the formula: (characters typed / 5) / time in minutes
4. TypeShi calculates the final accuracy: (correct characters / total characters) * 100
5. TypeShi displays results page with WPM and accuracy
6. If user is logged in: TypeShi saves test results to the database
7. If user is a guest: TypeShi displays results without saving
8. User views their test results
9. User can choose to start new test or navigate to profile

---

### Team Member 3 - Results & Scoring Subsystem (Ahmad)
*Covers R2*

#### Calculate WPM
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. Test ends
1. System counts characters
2. System applies WPM Formula
3. System saves accuracy
4. User views results

#### Calculate Accuracy
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. Test ends
1. System counts correct characters
2. System computes accuracy %
3. System saves accuracy
4. User views results

#### Display Test Results
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. Test ends
1. System loads WPM
2. System loads accuracy
3. System shows results page
4. User views results

#### View Performance Metrics
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. User opens metrics page
1. System loads past tests
2. System shows stats graph
3. User reviews metrics

---

### Team Member 4 - Test History Subsystem (Karthik)
*Covers R5*

#### Save Test Results
* **Actor:** User
* **System:** TypeShi

**Flow:**
1. User completes a typing test
2. System automatically saves the test results including WPM, accuracy, date, and time
3. User remains on the results screen
4. System associates the saved results with the user's account
5. System confirms the results have been stored successfully

#### View Test History
* **Actor:** User
* **System:** TypeShi

**Flow:**
1. User logs into their account
2. System verifies the user is authenticated
3. User navigates to their profile page
4. System retrieves all saved test results linked to the user's account
5. User views the test history list
6. System displays the results in chronological order showing WPM, accuracy, date, and time

#### Filter Test History
* **Actor:** User
* **System:** TypeShi

**Flow:**
1. User navigates to their test history page
2. System loads and displays the full test history
3. User selects a filter option such as date range or test duration
4. System applies the selected filter criteria to the history
5. User views the filtered results
6. System displays only the matching test entries
7. If no results match, system displays a message indicating no tests found

#### View Past Test Details
* **Actor:** User
* **System:** TypeShi

**Flow:**
1. User navigates to their test history page
2. System loads and displays the list of past tests
3. User clicks on a specific test entry
4. System retrieves the full details of the selected test
5. User reviews the detailed results
6. System displays WPM, accuracy, total characters typed, date, and time for that test

---

### Team Member 5 - User Profile / Dashboard Subsystem (Hunter)
*Covers R6*

#### View Profile Dashboard
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. User opens profile
1. System validates the user’s active session
2. System retrieves the user’s account information
3. System retrieves the user’s statistics summary (Average WPM, Best Score, Total Tests Count, Average Accuracy)

#### View Average WPM
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. User clicks Avg WPM
1. System gets test data
2. System calculates avg WPM
3. System displays result

#### View Best Score
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. User clicks Best Score
1. System reads test history
2. System finds max WPM
3. System shows score

#### View Total Tests Count
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. User clicks Total Tests
1. System counts tests
2. System returns number
3. System displays total

#### View Average Accuracy
* **Actor:** User
* **System:** TypeShi

**Flow:**
0. User clicks Avg Accuracy
1. System gets test data
2. System calculates average accuracy
3. System shows percentage

---

### Team Member 6 - Content Generation & Navigation Subsystem (Phuc)
*Covers R7, R8*

#### Generate Test Text
* **Actor:** User
* **System:** TypeShi

**Flow:**
1. User types out the website name and loads up the website
2. System generates a list of words in less than 1 second
3. System displays max 2 sentences at a time
4. After user has typed out a word, system moves the highlight to the next word
5. After completing a line, system moves the line down by 1 to display a new line
6. If an error was made, system displays the character in red
7. Once reaching near the end of the generated list, system generates more in the background

#### Navigate to Typing Test
* **Actor:** User
* **System:** TypeShi

**Flow:**
1. Once on the home page, users will click on the screen to start a test
2. System recognizes the click and auto-generates a list of words
3. System changes the interface to a typing screen

#### Navigate to Profile
* **Actor:** User
* **System:** TypeShi

**Flow:**
1. Once on the home page, users click on the profile icon on the top right corner
2. Once clicked, the system changes the interface to the profile view
3. System fetches users’ profile
4. System displays users’ information on the interface

#### Navigate to Login/Register
* **Actor:** User
* **System:** TypeShi

**Flow:**
1. Once website is loaded, users click on login/register button
2. System loads interface for login form
3. Users click on register
4. System loads interface for users’ registration

#### Navigate Based on Authentication Status
* **Actor:** User
* **System:** TypeShi

**Flow:**
1. Users click on log in
2. System checks log in credential
   * If credential matches, then load up home screen displaying users’ name
   * If credential doesn’t match, then display “credential does not match”
3. Users click on register
4. System loads up interface for users to input information

---

## Requirements Use Case Traceability Matrix (RUTM)
*Table: phase 2.xlsx*

## Sitemap
*(Sitemap content to be populated)*
