# Quillory

**Quillory** is a modern blog platform designed to provide users with a seamless experience in **creating, managing, and sharing** blog posts with multimedia content. Built with a focus on **accessibility, engagement, and responsiveness**, Quillory makes it easy for users to share their thoughts while maintaining a clean and minimalist UI.

**Live Demo**: (Coming soon! Deployed version not yet available.)


## Authors
- Amber Apale
- Kacey Burce
- Maria Gilbero
- Mizzi Pomoy

## Project Structure
**Tech Used**: VS Code (HTML, CSS, JavaScript) 
**Framework** Node.js

Quillory is a blog platform with a lightweight backend to handle user authentication, post management, and media uploads. Here’s how we built it:

### **Frontend Files**
| File Name       | Description |
|----------------|------------|
| `index.html` | Landing page of the dashboard displaying recent blog posts and featured content |
| `about.html`  | 	Static page providing information about the platform and its purpose. |
| `contact.html`   | Page with a contact form for user inquiries or feedback submission. |
| `register.html`   | User registration page for creating new accounts. |
| `login.html`    | 	User login page for account access. |
| `dashboard.html`     | Main user dashboard showing user posts and ontent |
| `post.html`     | Editor page for creating blog posts. |
| `profile.html`      | User profile management page and account settings. |
| `styles.css`     | Styling specific to the index.html page|
| `about-style.css`     | Custom styles specific to the about.html page. |
| `contact-style.css`     | Custom styles specific to the contact.html page. |
| `register.css`     | Styles specific to the registration page. |
| `login.css`     | Styles specific to the login page. |
| `dashboard.css`     | Custom styles for the dashboard layout. |
| `post-styles.css`     | Styling for the post editor page, including forms and formatting tools. |
| `profile.css`     | Custom styles for the profile page and settings layout. |

### **Backend Files**
| File Name       | Description |
|----------------|------------|
| `node.js`       | Node.js server file |
| `package-json.js` | Lists dependencies used in the project |
| `index.js`      | Main backend logic (handles authentication, data storage) |
| `register.js`      | Main backend logic (handles authentication, data storage) |
| `login.js`       | Node.js server file |
| `dashboard.js` | Lists dependencies used in the project |
| `post.js`      | Main backend logic (handles authentication, data storage) |
| `profile.js`       | Node.js server file |
| `contact-us.js` | Lists dependencies used in the project |


- **Challenges to Overcome**:
  - Linking posts to profile
  - Interactivity (Likes, and comments)
  - Building a dynamic feed in `dashboard.js` that sorts posts by recency or popularity (likes) while remaining responsive.

## Features

### User Authentication
- Secure **sign-up/login** via email or Google.

### Post Creation and Management
- **Customizable Title & Description** (with character limits).
- **Media Uploads**: Supports **JPEG, PNG, GIF** (max size **50MB**).
- **Tags & Categories**: Users can add tags or select predefined categories.
- **Drafts**: Save posts before publishing.
- **Edit/Delete**: Users can modify or remove their own posts.

### Content Display
- **Homepage Feed**: Displays **recent**, **trending**, and **category-based posts** dynamically.
- **Search Functionality**: Users can search posts **by title, tags, or keywords**.
- **Post Layout**: Clean, responsive design with **media previews, title, truncated description**, and **read-more links**.
- **Single Post View**: Displays the **full post, media gallery, comments**, and **sharing options**.

### Interactivity
- **Comments Section**: Users can leave feedback and discussions on posts.
- **Likes/xUpvotes**: Posts can be liked to boost visibility.

### User Profiles
- **Customizable Profiles**: Bio, profile picture, and social media links.
- **User Activity**: Displays user’s **published posts and liked posts**.

### Design Preferences
- **Minimalist UI** with a focus on **typography and media**.


## How to Run Quillory Locally
- Extract the files from the ZIP file
- Download Visual Studio Code if not downloaded already
- Open Visual Studio Code
- Download the Live Server extension
- Click on the HTML FILES folder and click on index.html
- Click on Live Server at the bottom right of VS Code