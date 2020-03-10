# App Onboarding Survey
---

### The task

applicationUsing the Figma designs provided, create a React application, which uses a Node.js Express backend to provide the data for the questions.

We will check your work using Chrome's built in emulator, using the "iPhone 5/SE" setting.

---

### You should

- Provide a basic Readme.md file at the root of the project to describe how to use it, and what tools you used.
- Publish your work to a git repository for us to review.
- After installing dependencies your application should start with `npm start` or `yarn start`
- Provide us with a dump of your database.
- Answering the questions does not need to send any data.

---

### Resources

**Designs** - https://www.figma.com/file/xxZTp668YotgaSUeOaa8gh/Coding-Challenge?node-id=0%3A1

**Questions** - See questions.txt file

---

### What we are looking for

- You read and understood the instructions.
- How closely your application matches the designs.
- Useful code comments.
- Git commit messages.
- There is no right or wrong way to do this, we want to see how you tackle the solution.

--- 

### Initial setup of completed challenge: 
I'd just like to note that I would have much preferred to use OvernightJS or NestJS for the server.
I don't typically write in vanilla Express, so I'd also like to apologise if it's a little messy :D.
As for DB, Mongo just made sense.

OvernightJS: https://www.npmjs.com/package/@overnightjs/core // Mimics Web API
NestJS: https://www.npmjs.com/org/nestjs // Mimics Angular 2+ structure

To run the frontend, simply just perform npm run start.
To run the backend, create a .env file at the root and place the following env variables relative
to your local i.e.:
    PORT=3000
    DBHOST=localhost
    DBPORT=27017
    DBNAME=versetask
Then run npm run dev. Or npm run build, then npm run start. (The scripts aren't combined are 
most cloud providers automatically run a build script prior, like Heroku for example).

