# Birdnest - Reaktor summer trainee pre-assignment 2023

The current build can be accessed at https://birdnest-laurira.fly.dev/

**NOTE:** The application is functional as long as the API provided for the assignment is running.

### Key requirements from the [instructions](https://assignments.reaktor.com/birdnest/)

- Persist the pilot information for **10 minutes** since their drone was last seen by the equipment
- Display the closest confirmed distance to the nest
- Contain the pilot name, email address and phone number
- **Immediately** show the information from the last 10 minutes to anyone opening the application
- Not require the user to manually refresh the view to see up-to-date information

### About the solution & used stack

**TypeScript - Vite - React - TailwindCSS - MongoDB - Express.js - NodeJS**

Backend is an Express.js app that fetches and handles data from the provided api on set intervals. MongoDB atlas is then used for storing information about the trespassing drones & pilots. Even though MongoDB offers TTL indexes that can expire data within set intervals, this seemed like a trivial solution. So the backend handles removing inactive drones manually.

Project frontend is built with Vite for faster development process along with React components and Tailwind for styling.

### Other libraries used

[xml2js](https://www.npmjs.com/package/xml2js) Used to parse the XML data from the API to JSON format
