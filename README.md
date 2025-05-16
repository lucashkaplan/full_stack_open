# Full Stack Open: Phonebook Application

This repo contains the code for the projects developed through the Full Stack Open course.
The primary project is a phonebook application that allows users to view their contacts
(name, number pairs), add a new contact, delete a contact, and filter contacts.
The frontend was developed in React and the backend was developed using Node.js and Express.


## Current Status
The frontend and backend have been integrated. The frontend code is built into a production
environment and served via the backend server. The application was deployed using Fly.io,
and can be found at: https://phonebook-f-s-o.fly.dev. Currently, the deployment is unavailable,
and the application should be run locally.

To run the application locally, follow these steps:
- Build the production version of the frontend
    - `cd ~/part2/phonebook`
    - `npm run build`
- Copy this to the backend
    - `cd ../../part3/phonebook`
    - `cp -r ../../part2/phonebook/dist/ ./`
- Run the backend server (which serves the frontend as well):
    - `npm run dev`
- Open the application at: http://localhost:3001/
