# Statement of Work (SOW)

**TypeShi - Typing Performance Application** **CS 3354.009 | Group 09 | Prof. Priya Narayanasami**

## Team Members
- Adrian Trang
- Ahmad Zahid
- Daniel Yoo
- Hunter Woodworth
- Karthik Yammanur
- Phuc Trinh

---

## Contents
- [Introduction](#introduction)
- [Project Parameters](#project-parameters)
- [Project Goals](#project-goals)
- [Scope of Work](#scope-of-work)
  - [Core App Functionality](#core-app-functionality)
  - [User Interface](#user-interface)
  - [Back-End](#back-end)
- [Out-of-Scope Features](#out-of-scope-features)
- [Tentative Work Schedule (Phase-based)](#tentative-work-schedule-phase-based)
- [Front-End and Back-End Responsibilities](#front-end-and-back-end-responsibilities)
  - [Front-End Team](#front-end-team)
  - [Back-End Team](#back-end-team)
- [Completion Criteria](#completion-criteria)
- [Team Communication](#team-communication)
- [Points of Contact](#points-of-contact)
- [Course Information](#course-information)
- [Approval and Sign-Off](#approval-and-sign-off)

---

## Introduction
Group 09’s Statement of Work outlines the overall software development plan for **TypeShi**, a web-based typing performance application that is designed to help users improve their typing speed and accuracy. This project will be developed throughout the course of one academic semester by a team of six CS/SE students that are currently enrolled in CS 3354.009, Software Engineering.

TypeShi will be able to provide users with a streamlined typing interface where they will be able to practice typing, track their words-per-minute (WPM), measure accuracy, as well as generally monitor their progress.

## Project Parameters
As stated in the instructions within Phase 01 of the project, this application must include:
- A registration and log-in feature
- Some level of authentication

With these features in mind, the project will accommodate these guidelines as best as possible.

## Project Goals
The primary goals of TypeShi are to:
- Deliver a functional typing test application that can correctly measure typing speed (WPM) and accuracy.
- Implement a user authentication method in order to enable personalized user accounts and track progress.
- Create an intuitive and responsive user interface with clean and minimal design principles in mind.
- Develop a back-end system capable of managing user’s data, scoring logic, and overall content delivery.
- Gain practical experience in full-stack web development, team collaboration, and strong software development practices.
- Push a deployable basic product by the end of the semester (Phase 06) that demonstrates Group 09’s technical breadth.

## Scope of Work
The following list of features are within the logical scope of this project and will be implemented throughout the semester:

### Core App Functionality
- Typing test interface with input-validation
- Configurable timer options
- Words per minute (WPM) calculation
- Accuracy percentage calculation
- Text generation
- User authentication with secure password storage
- Personalized user dashboard showing unique statistics
- Basic responsive design for web-based activity

### User Interface
- Clean and minimal design
- Real-time visual feedback during typing
- Displaying results after tests
- User profile page
- Login and registration pages

### Back-End
- User authentication and session management
- Database schema for users, test results, and word content
- Scoring algorithms for WPM and accuracy calculation
- Word/text generation logic

## Out-of-Scope Features
The following list of features are not realistically within the logical scope of this project but may be considered for development should the opportunity arise:
- Leaderboards
- Mobile application (iOS/Android)
- Achievement system
- Social features (friends, sharing)
- Advanced analytical performance breakdowns
- Multiple language support
- Custom visual themes beyond light/dark mode(s)
- Typing lessons or tutorial sessions

## Tentative Work Schedule (Phase-based)
The project will follow a development approach with the following milestones *(may be subject to changes under the entire group’s discretion)*:

- **Phase 1: Planning + Setup**
  - Finalize SOW + SE slides
  - GitHub repo setup + assigned files push/pull + screenshots
  - Weekly meeting time setup
  - *Delivery Date:* February 6, 2026

- **Phase 2: MVP Typing Test (Frontend-Focused)**
  - Develop the core typing test UI, including timer and text generation
  - Implement real-time input validation and an early version of the results screen displaying WPM and accuracy
  - Back-end discussion/prep: define APIs to be used and establish a rough skeleton
  - *Delivery Date:* February 20, 2026

- **Phase 3: Backend Foundations and Authentication**
  - Design and implement a database outline for user typing results
  - Begin work on registration, login, and logout with secure password hashing
  - Configure protected endpoints and determine session-based auth or JWT (TBD)
  - Enable data saving/persistence for authenticated users
  - *Delivery Date:* March 13, 2026

- **Phase 4: System Integration**
  - Integrate front-end components with back-end APIs
  - Implement user dashboard/profile to display stats/test history
  - Complete overall workflow: login -> typing test -> data save -> results
  - *Delivery Date:* April 3, 2026

- **Phase 5: Stabilization and Refinement**
  - Input validation, error handling, basic rate limiting
  - UI/UX polish + responsiveness
  - Test edge cases + bug fixing
  - *Delivery Date:* April 24, 2026

- **Phase 6: Finalization + Deployment**
  - Deploy to URL
  - Run final demo-ready build
  - Submit final phase deliverables

## Front-End and Back-End Responsibilities

### Front-End Team
**Members:** Daniel Yoo, Phuc Trinh, Adrian Trang

**Responsibilities:**
- **Typing Interface:**
  - Implement the main typing test interface.
  - Create real-time input validation and character-by-character feedback.
  - Implement visual indicators for correct and incorrect characters.
  - Build timer display and controls.
  - Develop results display screen with WPM and accuracy percentages.
- **User Interface Components:**
  - Login and registration pages.
  - User profile/dashboard page.
  - Implement test history view.
  - Ensure consistent styling theme across all pages.
  - Create a responsive design for various screen sizes.
- **Front-End Integration:**
  - Connect UI components to back-end.
  - Manage application states.
  - Implement client-side routing.
  - Handle error messages and user feedback.
  - Optimize front-end performance.
- **Technologies to Consider:**
  - React.js or Vue.js (TBD)
  - HTML/CSS
  - JavaScript/TypeScript
  - Bootstrap or Tailwind CSS (TBD)
  - API for HTTP requests

### Back-End Team
**Members:** Ahmad Zahid, Hunter Woodworth, Karthik Yammanur

**Responsibilities:**
- **Database and Data Management:**
  - Design and implement database schema for users and test results.
  - Set up database connection and query optimization.
  - Implement data validation and sanitization.
  - Create database migration scripts and version control.
  - Manage word/text content storage and retrieval.
- **Authentication and Security:**
  - Implement user registration and login endpoints.
  - Set up secure password hashing and storage.
  - Develop session management and possibly token-based authentication (JWT).
  - Implement input validation and prevent common security vulnerabilities.
  - Configure CORS and security headers.
- **API Development and Logic:**
  - Build RESTful API endpoints for front-end integration.
  - Develop scoring algorithms for WPM and accuracy calculations.
  - Implement text generation and randomization logic.
  - Handle test result processing and storage.
  - Ensure efficient server-side performance and response times.
- **Technologies to Consider:**
  - Node.js with Express or Flask (TBD)
  - PostgreSQL or MongoDB (TBD)
  - Primary authentication: session-based OR JWT (TBD)
  - bcrypt for password hashing
  - RESTful API design principles

## Completion Criteria
The project will be considered complete when the following base criteria are met:
- Users can take a typing test with a working timer.
- WPM is accurately calculated and displayed after tests.
- Accuracy percentage is calculated and displayed after tests.
- Users can register for an account with email and password.
- Users can log in and log out safely and securely.
- Application correctly validates user input in real-time.
- Text is properly generated for each test.
- Front-end and back-end are integrated.
- User passwords are securely stored.
- Application is responsive on desktop and adaptable to varying window sizes.
- No critical bugs or security vulnerabilities present.
- Code is well documented and follows consistent style guidelines.
- Application performs efficiently with reasonable load times.
- User interface is intuitive and easy to navigate.
- Application is deployed and accessible via URL.
- All project phases (1-6) and their separate deliverables are successfully completed throughout the semester.

## Team Communication
- **Communication Channels:** Group Messaging - Discord
- **Code Repository:** GitHub
- **Project Management:** Discord
- **Meetings:** Weekly virtual team meetings held on Discord

## Points of Contact

### Front-End Team
- **Daniel Yoo:** dhy220000@utdallas.edu
- **Phuc Trinh:** ppt230000@utdallas.edu 
- **Adrian Trang:** alt210004@utdallas.edu

### Back-End Team
- **Ahmad Zahid:** dal219265@utdallas.edu
- **Hunter Woodworth:** hww190000@utdallas.edu
- **Karthik Yammanur:** ksy230000@utdallas.edu

## Course Information
- **Course:** CS 3354.009 - Software Engineering
- **Instructor:** Prof. Priya Narayanasami
- **Semester:** Spring, 2026
- **Institution:** University of Texas at Dallas

## Approval and Sign-Off
This Statement of Work (SOW) has been reviewed and approved by the following team members:

**Front-End Team**
- [ ] Daniel Yoo
- [ ] Phuc Trinh
- [ ] Adrian Trang

**Back-End Team**
- [ ] Ahmad Zahid
- [ ] Hunter Woodworth
- [ ] Karthik Yammanur
