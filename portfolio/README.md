# Portfolio Website

## Overview
This is my portfolio frontend built with Vue 3, Vite, and TailwindCSS.  
The app uses Vue Router for page navigation and structured local data to simulate a backend API.

## Tech Stack
- Vue 3 (Composition API)
- Vite
- TailwindCSS
- Vue Router

## Project Structure
- `src/views` - Page-level components (Home, About, Projects, ProjectDetail, Contact)
- `src/layouts` - Layouts wrapping page components
- `src/data` - Local structured JSON-like data
- `src/router` - Vue Router configuration

## Routes
- `/` - Home
- `/about` - About
- `/projects` - Projects list
- `/projects/:slug` - Project detail page
- `/contact` - Contact form page

## Deployment
Deployed on Vercel: 

## Notes
- Local data is structured for easy backend replacement.
- Layouts handle global chrome (navbar, footer), pages handle content only.

