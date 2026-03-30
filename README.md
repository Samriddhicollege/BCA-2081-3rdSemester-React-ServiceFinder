## Project Title

> *NearFind---Service Finder with React Frontend*

---

## Student Information

* **Name:** Sushan Shrestha
* **Roll Number:** 2023-CS-045
* **Course / Program:** Bachelor of Computer Application
* **Semester / Year:** 3rd Semester / 2026

---

## Instructor Information

* **Instructor Name:** Mr. Dipak Shrestha
* **Course Title:** React Development / Full Stack Development
* **College Name:** Samriddhi College

---

## Project Overview

> This project is a web-based locally available Service Finder System developed using React for the frontend with the API Integration provided by baato.io.
> It allows people to search for the available services liike school, hospital, gym, hotel, fuel stations and many more near them.
> Users can browse the required servies, add them to the saved list and find the location in the map.
> The main goal is to digitize the nearby essential services based on location.

---

## Objectives

* Build a responsive and user-friendly React application for finding nearby services.
* Implement a Saved Services feature so users can bookmark and revisit useful places.
* Integrate location-based APIs to search services by place and category.
* Apply clean UI/UX design principles

---

## Technologies Used

### Frontend

* React.js
* HTML, CSS 
* JavaScript


### Other Tools

* Git & GitHub
* Baato.io API
* Vercel (for deployment)

---

## Key Features

* Search nearby services by location and service category
* Category-based discovery (hospital, school, gym, hotel, fuel, etc.)
* Saved Services feature with persistent browser storage (localStorage)
* Service cards with quick details view
* Responsive user interface for desktop and mobile
* API-based location and nearby place lookup using Baato.io

---

## Screens / Modules

* Header and Navigation (Explore / Saved)
* Explore Module (location input + category selection)
* Results Module (nearby services grid)
* Saved Services Module
* Service Details Modal

---

## Installation & Setup

```bash
# Clone repository
git clone <your-repository-url>

# Go to project folder
cd servicefinder_project

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
servicefinder_project/
|-- public/
|-- src/
|   |-- components/
|   |   |-- api.js
|   |   |-- ServiceCard.jsx
|   |   |-- ServiceDetailsModal.jsx
|   |-- hooks/
|   |   |-- useSavedServices.js
|   |   |-- useSearch.js
|   |-- assets/
|   |-- App.jsx
|   |-- App.css
|   |-- main.jsx
|   |-- index.css
|-- index.html
|-- package.json
|-- vite.config.js
|-- eslint.config.js
|-- README.md
```

---

## GitHub & Live Demo

* **GitHub Repository:** Add your repository link here
* **Live URL (if deployed):** Add your deployed app link here

---

## Testing

* Tested responsive layout on mobile, tablet, and desktop screen sizes
* Verified location search and category-based results
* Tested error handling for invalid locations or API issues
* Tested save/unsave flow and localStorage persistence

---

## Challenges Faced

* Managing UI state across explore view, saved view, and modal interactions
* Handling asynchronous API calls and proper loading/error states
* Standardizing service data from API responses for consistent rendering
* Preserving saved items correctly across page refreshes

---

## Future Enhancements

* Add user authentication for personalized saved lists across devices
* Integrate map view for live marker-based service visualization
* Add filters such as distance, rating, and open/closed status
* Add backend and database support for user profiles and analytics
* Provide multilingual support and accessibility improvements

---

## Acknowledgement

> I would like to thank my instructor **Mr. Dipak Shrestha** for guidance and support throughout this project.

---

## Declaration

> I hereby declare that this project is my original work and has been completed as part of my academic submission.
