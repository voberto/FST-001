# Full Stack Template (Django, Next.js, Docker, nginx) for Web Applications

## Project Description
This project is a full-stack web application template designed to streamline the development of modern web applications. It combines Django for the backend, Next.js for the frontend, and Docker for containerization, providing a robust and scalable architecture.

<div style="display: flex; justify-content: space-between;">
    <img src="img/img_login.png" alt="Login Image" width="400" height="500" style="margin-right: 15px;">
    <img src="img/img_dashboard.png" alt="Dashboard Image" width="400" height="500">
</div>

## Installation Requirements
- Docker and Docker Compose.
- Node.js (version 22.14.0).
- Python (version 3.13.2).
- PostgreSQL (if using PostgreSQL without Docker).

## Technologies Used
- **Backend**: Django (version 5.2.0), Django REST Framework (version 3.16.0).
- **Frontend**: Next.js (version 14.2.28), ShadCN/UI.
- **Database**: PostgreSQL (or SQLite3).
- **Containerization**: Docker, Docker Compose.
- **Web Server**: Nginx.

## Features
1. Login page with e-mail and password.
2. Dashboard page.
3. Infrastructure:
    1. Web Server -> nginx (`http://localhost`).
    2. Frontend -> Next.js (`http://localhost:3000`) + ShadCN/UI.
    3. Backend -> Django REST Framework (`http://localhost:8000/api/login/`).

## Setup
### Without Docker
1. Make sure to set DB = SQLite3 (if not using PostgreSQL):
```
let using_docker : boolean = false; // frontend/services/api.ts
USING_DOCKER = False                // backend/prj_core/settings.py
```
2. Backend:
    1. Create virtual environment and install libraries -> `pip install -r requirements.txt`.
    2. Run the development server -> `python manage.py runserver`.
3. Frontend:
    1. `npm run build` (first time if needed or if using `npm start`).
    2. `npm run dev` (or npm start).
4. With both backend and frontend running, access the application on 'http://localhost:3000'.

### With Docker
1. Make sure to set DB = PostgreSQL:
```
let using_docker : boolean = true; // frontend/services/api.ts
USING_DOCKER = True                // backend/prj_core/settings.py
```
2. Run the server using `docker compose up --build`.
3. In a new terminal window, create a new user with `docker compose exec backend python manage.py createsuperuser`. Add username, e-mail and password.
4. Access the main page on 'http://localhost' and log into the system using the credentials from (3.2.3).

## Usage Examples
### API Endpoints
- **Login**: `POST /api/login/`
- **Get Dashboard Data**: `GET /api/dashboard/`

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.
