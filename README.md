# GitHub API Integration

This project involves building both **Backend** and **Frontend** applications to interact with the GitHub API and display relevant data to users. Below are the requirements and instructions to get started.

---

## **Backend**

The backend should provide several API endpoints to handle the GitHub user data. Here are the main functionalities:

### **API Endpoints:**

1. **Save GitHub User Data**
   - **Request Type**: `GET`
   - **Endpoint**: `https://api.github.com/users/:username`
   - **Action**: Accept a GitHub username, fetch the user data from the GitHub API, and save it in the database. If the data already exists in the database, do not call the GitHub API again.

2. **Find Mutually Followed Users**
   - **Action**: For a given user, find all the users where both users follow each other and save them as friends. For example:
     - `UserA -> Follows UserB, UserC, UserD`
     - `UserA is followed back by UserB, UserC`
     - In this case, `UserB` and `UserC` would be friends of `UserA`.

3. **Search Saved Users**
   - **Action**: Search the saved GitHub user data based on fields such as username, location, etc.

4. **Soft Delete a User**
   - **Action**: Soft delete a record based on a given username from the database.

5. **Update User Information**
   - **Action**: Update fields like `location`, `blog`, `bio`, etc., for a given user in the database.

6. **List Users Sorted by Fields**
   - **Action**: Return a list of all users sorted by fields like:
     - `public_repos`
     - `public_gists`
     - `followers`
     - `following`
     - `created_at`

---

### **Bonus Points:**

- Implement API validation.
- Use **TypeScript**.

---

### **Technologies Used:**

- **Node.js** and **Express.js** for backend development.
- **Relational Database** (Preferably MySQL or PostgreSQL) for data storage.

---

## **Frontend**

The frontend should be built using **React** and should display the GitHub user and repository data as specified.

### **Requirements:**

1. **Initial Page:**
   - An input box that accepts a GitHub username and a submit/search button.
   
2. **Display Repositories:**
   - On submission, display the list of repositories returned from the GitHub API for the entered username.
   - Show relevant user information above the repository list (name, avatar, etc.).

3. **Repository Details Page:**
   - Clicking on any repository should take the user to a page that shows detailed information about that repository.

4. **Followers Page:**
   - Add a button or link to the repository list page that navigates to a page with the current user's followers.
   - Clicking on a follower should display the repository list page for that user.

5. **Navigation:**
   - Provide a way to go back to the repository list page with the input box.

---

### **Important Notes:**

1. **React Hooks**: Use only React hooks for building the app.
2. **State Management**: Use **Redux** or manage state using React's `useState` and `useContext`.
3. **Image Handling**: Use `owner.avatar_url` for displaying user avatars.
4. **API Optimization**: Do not call the GitHub API again for any information already fetched (e.g., repositories, followers).
5. **UI Styling**: You are free to choose any design or follow the design given, but beautification is not a priority. Ensure the layout and presentation resemble the provided images.
6. **No CSS/UI Frameworks**: Do not use CSS or UI frameworks like Bootstrap.
7. **Page Routing**: Do not manage browser history. All pages can share the same URL.
8. **Version Control**: Push your code to GitHub or another hosting platform. Make sure to maintain a reasonable commit history.

---

### **Technologies Used:**

- **React** (with React hooks) for frontend development.
- **State management** via Redux or React’s built-in hooks.
- **Axios or Fetch API** for making HTTP requests to the backend.

---

### **Submission:**

- Submit your code by pushing the repository to GitHub or any hosting platform of your choice.
- Maintaining a reasonable commit history is highly recommended.

---

Good luck with your project! 🚀
