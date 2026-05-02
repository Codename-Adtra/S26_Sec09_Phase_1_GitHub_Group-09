# Phase 04 - Coding Use Cases
**TypeShi - Typing Performance Application**
**CS 3354.009 | Group 09 | Prof. Priya Narayanasami**
Daniel, Phuc, Karthik, Adrian, Hunter, Ahmad

**Main Github Link:** [S26_Sec09_Project_GitHub_Group-09.git](https://github.com/Codename-Adtra/S26_Sec09_Project_GitHub_Group-09.git)

---

## Part 1. Code all the classes that would be needed for the above use cases

**Contributor:** Daniel

Code for all the classes involved in the following use cases:
* Login into an account (Mandatory)
* Logout of account (Mandatory)
* Begin Typing Test
* Complete Typing Test

Will be provided in the `Phase_4_Part_1` folder in the github under the Phase 4 branch.

**Github Link for Part 1:**
[Phase_4_Part_1](https://github.com/Codename-Adtra/S26_Sec09_Project_GitHub_Group-09/tree/Phase_4/Phase_4_Part_1)

---

## Part 2. Code the Test Classes

**Contributors:** Karthik, Ahmad, Phuc
**Editor:** Daniel

### Section a. Identify the input values, their type, value specification, valid/invalid/exceptional values

#### 1. Login Use Case - Ahmad
**Input Values, Types, and Specifications:**

| Input Element | Type | Value Specification | Valid | Invalid | Exceptional Cases |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **email** | string | Must be a non-empty string matching a registered account | Email exists in the system (e.g. daniel@example.com) | Email not registered in the system | Empty string, whitespace-only string |
| **password** | string | Must be a non-empty string matching the stored password for the given email | Password matches the stored password for the account | Password does not match the stored password | Empty string, whitespace-only string |

#### 2. Logout Use Case - Ahmad
**Input Values, Types, and Specifications:**

| Input Element | Type | Value Specification | Valid | Invalid | Exceptional Cases |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **userId** | string | Must be a non-empty string matching a registered user who has an active session | userId exists in the system and user has an active session | userId does not exist in the system, or user has no active session | User has already logged out (no active session remains) |

#### 3. Begin Test Use Case - Phuc Trinh
**Input Values, Types, and Specifications:**

| Input | Type | Specification | Valid | Invalid | Exceptional |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **userId** | String or Null | userId optional | "u1" | NONE | Null |
| **Duration** | Number | Must be > 0 | 30, 60 | 0, -5 | NONE |
| **text** | String | Must not be empty or whitespace | "the quick brown fox" | "", "     " | NONE |

#### 4. Complete Typing Test Use Case - Ahmad
**Input Values, Types, and Specifications:**

| Input Element | Type | Value Specification | Valid | Invalid | Exceptional Cases |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **typingSessionId** | string | Must match an existing TypingTestSession in the store | Session id returned from BeginTypingTest | Id that does not match any existing session | Empty string or made-up id |
| **correctChars** | number | Must be >= 0 and <= totalChars | Any non-negative integer no greater than totalChars | Negative number, or greater than totalChars | Zero (no chars typed correctly) |
| **totalChars** | number | Must be >= 0 | Any non-negative integer | Negative number | Zero (nothing typed) |
| **duration** | number | Must be greater than 0 | Any positive number in seconds | Zero or negative number | Very small value (e.g. 0.001) |

---

### Section b. How many test-cases or scenarios can be written? What would the corresponding output be?

#### Test Case Generation (Login):

| Test Case | Email | Password | Expected Outcome |
| :---: | :--- | :--- | :--- |
| **1** | Valid | Valid | Return active Session, user marked as logged in |
| **2** | Valid | Invalid | Throw error: Incorrect password. |
| **3** | Valid | Exceptional | Throw error: Email and password cannot be empty. |
| **4** | Invalid | Valid | Throw error: User not found. |
| **5** | Exceptional | Valid | Throw error: Email and password cannot be empty. |
| **6** | Exceptional | Exceptional | Throw error: Email and password cannot be empty. |

#### Test Case Generation (Logout):

| Test Case | userId | Pre-condition | Expected Outcome |
| :---: | :--- | :--- | :--- |
| **1** | Valid | User is logged in with active session | Returns true, session deactivated, user marked as logged out |
| **2** | Invalid | No user with this id exists | Throw error: User not found. |
| **3** | Valid | User exists but has no active session | Throw error: Active session not found. |
| **4** | Valid (exceptional) | User has already logged out once | Throw error: Active session not found. |

#### Test Case Generation (Begin Test):

| TC | userId | Duration | Text | Expected Outcome |
| :---: | :--- | :--- | :--- | :--- |
| **1** | "u1" | 60 | Valid | Session will return userId, sessionId, testId |
| **2** | Null | 30 | Valid | Session return with userId = null |
| **3** | "u1" | 0 | Valid | Throws “duration will be greater than 0” |
| **4** | "u1" | -5 | Valid | Throw “duration must be greater than 0” |
| **5** | "u1" | 60 | "" | Throw “typing test text cannot be empty” |
| **6** | "u1" | 60 | "   " | Throw “typing test text cannot be empty” |
| **7** | "u1" | 60 | Valid | Test with status “ACTIVE” and correct duration |
| **8** | "u1" | 60 | 2 different texts | 2 session with different ID |
| **9** | "u1" | 30 | Valid | store has 1 test and 1 session |

#### Test Case Generation (CompleteTypingTest):

| Test Case | typingSessionId | correctChars | totalChars | duration | Expected Outcome |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | Valid | Valid | Valid | Valid | Return TestResult with correct WPM and accuracy |
| **2** | Invalid | Valid | Valid | Valid | Throw error: Typing session not found. |
| **3** | Valid | Valid | Valid | Invalid (0) | Throw error: Duration must be greater than 0. |
| **4** | Valid | Negative | Valid | Valid | Throw error: Character counts cannot be negative. |
| **5** | Valid | Valid | Negative | Valid | Throw error: Character counts cannot be negative. |
| **6** | Valid | Greater than totalChars | Valid | Valid | Throw error: Correct characters cannot be greater than total characters. |
| **7** | Valid | 0 | 0 | Valid | Return TestResult with accuracy=0 and wpm=0 |

---

### Section c. Give concrete values for the narrowed down cases

#### Concrete Test Cases (Login):

| Test Case | Email | Password | Expected Result |
| :---: | :--- | :--- | :--- |
| **1** | "daniel@example.com" | "password123" | Session returned with isActive=true, userId="u1" |
| **2** | "daniel@example.com" | "wrongpassword" | Throws: Incorrect password. |
| **3** | "daniel@example.com" | "" | Throws: Email and password cannot be empty. |
| **4** | "unknown@example.com" | "password123" | Throws: User not found. |
| **5** | "   " | "password123" | Throws: Email and password cannot be empty. |
| **6** | "" | "" | Throws: Email and password cannot be empty. |

#### Concrete Test Cases (Logout):

| Test Case | userId | Pre-condition | Expected Result |
| :---: | :--- | :--- | :--- |
| **1** | "u1" | Login called first with valid credentials | Returns true, session.isActive=false, user.isLoggedIn=false |
| **2** | "nonexistent-id" | No login performed | Throws: User not found. |
| **3** | "u1" | User exists in store but logout called without logging in first | Throws: Active session not found. |
| **4** | "u1" | Login called, logout called once, logout called again | Throws: Active session not found. |

#### Concrete Test Cases (Begin Test):

| TC | userId | Duration | Text | Expected Result |
| :---: | :--- | :--- | :--- | :--- |
| **1** | "u1" | 60 | "the quick brown fox" | Session will return userId, sessionId, testId |
| **2** | Null | 30 | "the quick brown fox" | Session return with userId = null |
| **3** | "u1" | 0 | "the quick brown fox" | Throws “duration will be greater than 0” |
| **4** | "u1" | -5 | "the quick brown fox" | Throw “duration must be greater than 0” |
| **5** | "u1" | 60 | "" | Throw “typing test text cannot be empty” |
| **6** | "u1" | 60 | "   " | Throw “typing test text cannot be empty” |
| **7** | "u1" | 60 | "the quick brown fox" | Session testId links to a stored test with status "ACTIVE", duration = 60 |
| **8** | "u1" | 60 | "the quick brown fox" / "wheel on the bus" | Session1.sessionId != session2.sessionId |
| **9** | "u1" | 30 | "the quick brown fox" | store has exactly 1 test and 1 session |

#### Concrete Test Cases (CompleteTypingTest):

| Test Case | typingSessionId | correctChars | totalChars | duration | Expected Result |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | Valid session id from BeginTypingTest | 50 | 60 | 60 | TestResult with wpm=10, accuracy=83.33 |
| **2** | "fake-session" | 50 | 60 | 60 | Throws: Typing session not found. |
| **3** | Valid session id | 50 | 60 | 0 | Throws: Duration must be greater than 0. |
| **4** | Valid session id | -1 | 60 | 60 | Throws: Character counts cannot be negative. |
| **5** | Valid session id | 0 | -1 | 60 | Throws: Character counts cannot be negative. |
| **6** | Valid session id | 80 | 60 | 60 | Throws: Correct characters cannot be greater than total characters. |
| **7** | Valid session id | 0 | 0 | 60 | TestResult with accuracy=0, wpm=0 |

---

### Section d. Code/Implement the concrete test cases from Section c

**Github Link for Part 2:**
[Phase_4_Part_2](https://github.com/Codename-Adtra/S26_Sec09_Project_GitHub_Group-09/tree/Phase_4/Phase_4_Part_2)

---

## Part 3. Create Wireframes

**Contributors:** Adrian, Hunter

**Figma Share Link:**
[CS 3354 | PHASE 4 | GROUP 09 | PART 3](https://www.figma.com/site/VZGOUfOiAGDn3ENAHMQquI/CS-3354-%7C-PHASE-4-%7C-GROUP-09-%7C-PART-3?node-id=0-1&t=pjTA4D15NbU8N6Ar-1)

**Figma Screenshot(s):**
*(Screenshots to be added here)*

**Github Link for Part 3:**
[Phase_4_Part_3](https://github.com/Codename-Adtra/S26_Sec09_Project_GitHub_Group-09/tree/Phase_4/Phase_4_Part_3)
