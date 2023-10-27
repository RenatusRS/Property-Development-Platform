# Property Development Platform
> Project for **Internet Applications Programming** / **Programiranje Internet Aplikacija** class.

**Property Development Platform** is a full-stack web application that serves as a concept service marketplace for property development. The platform caters to three user types: clients, agencies, and administrators. It's built with **Angular 14** integrated with **Material UI** on the frontend, and **Express** with **NodeJS** on the backend, both written in **TypeScript**. The data is managed using a **MongoDB** database.

## Functional Highlights

The application encapsulates a set of features tailored to each user role:

- **Object Management:** Clients can manage their space objects for refurbishing.
- **Agency Interaction:** Clients and agencies can interact to agree on refurbishing jobs.
- **Worker Management:** Agencies can manage their workforce for different jobs.
- **Job Management:** Agencies can manage job requests and update job status.
- **User Management:** Administrators can manage user accounts and handle registration requests.
- **Job Oversight:** Administrators can oversee job cancellation requests and decide on them.

## Technologies

- **Frontend:** Angular (14.2.3), TypeScript (4.6)
- **Backend:** ExpressJS (4.18.2), NodeJS (18.8.0), TypeScript (4.6)
- **Database:** MongoDB (6.0.1)

## How-To Run

**1\. Start three separate terminals:**

#### Frontend

```bash
cd frontend
npm install
ng serve
```

#### Backend

```bash
cd backend
npm install
npm start # or use nodemon with: npx nodemon
```

#### Database

```bash
mongod
```

**2\. Access the application:**
* Open your web browser and navigate to http://localhost:4200.
