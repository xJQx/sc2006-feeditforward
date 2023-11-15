# FeedItForward (Backend)

_This README.md assumes that you have already cloned the repo._

**Table of Content**

- [FeedItForward (Backend)](#feeditforward-backend)
- [Setup Instructions](#setup-instructions)
- [Database Seeding](#database-seeding)
  - [Pre-configured Users](#pre-configured-users)
- [API Docs](#api-docs)
  - [API Endpoints](#api-endpoints)
- [App Design (Backend)](#app-design-backend)
  - [Design Patterns](#design-patterns)
  - [Folder Architecture](#folder-architecture)
  - [Tech Stack](#tech-stack)
  - [External APIs](#external-apis)

# Setup Instructions

1. In the `/backend` directory, create a python virtual environment and activate it.

```bash
python -m venv .venv
. .venv/Scripts/activate # The .venv activation command might differ depending on your operating system
```

2. Install the required packages.

```bash
pip install -r requirements.txt
```

3. In the `/backend/app` directory, start the application.

```bash
cd app
uvicorn main:app --reload
```

And you are ready to start using the FeedItForward Backend! The server application is running on http://127.0.0.1:8000/

# Database Seeding

If you would like to seed the database with pre-configured data, please uncomment the following line in the `backend/app/main.py` before re-starting the application.

```python
# app/main.py
# Uncomment this line 👇🏻
# add_event_listener_to_seed_database()
```

_Note: Please ensure that the `sql_app.db` in the app directory is deleted before re-starting the application._

## Pre-configured Users

| Name                                     | Role     | Email               | Password  |
| ---------------------------------------- | -------- | ------------------- | --------- |
| Admin Jane                               | Admin    | admin1@gmail.com    | 123123123 |
| Janice                                   | Consumer | consumer1@gmail.com | 123123123 |
| Alicia                                   | Consumer | consumer2@gmail.com | 123123123 |
| James                                    | Consumer | consumer3@gmail.com | 123123123 |
| Alex (A Hot Hideout)                     | Hawker   | hawker1@gmail.com   | 123123123 |
| Adam (North Spine Koufu - Cai Fan Store) | Hawker   | hawker2@gmail.com   | 123123123 |
| Aaron (The Crowded Bowl)                 | Hawker   | hawker3@gmail.com   | 123123123 |
| Tim                                      | Driver   | driver1@gmail.com   | 123123123 |
| Thomas                                   | Driver   | driver2@gmail.com   | 123123123 |

# API Docs

The FeedItForward Backend application uses FastAPI, which comes with an in-built documentation for API routes created. You may access it via http://127.0.0.1:8000/docs#/

![docs preview](public/docs-preview.png)

## API Endpoints

The FeedItForward API Endpoints consists of 3 main category - `Controller`, `CRUD`, and `Misc`.

1. **`Controller`:** API endpoints for Controller specific functionalities as specified in the class diagrams designed.
2. **`CRUD`:** API endpoints for basic Create, Read, Update, and Delete Operation on classes saved in the database.
3. **`Misc`:** Other API endpoints such as file uploads and retrievals.

_Please refer to the the [API Docs page](#api-docs) for the specific endpoints and the required request body and expected response._

# App Design (Backend)

## Design Patterns

1. **`Strategy + Factory Patterns`** for Database Implementation.
   a. Refer to `backend/app/factory/database.py`
2. **`Facade Pattern`** via the Controllers.
   a. Refer to `backend/app/controllers/*.py`
3. **`Publisher-Subscriber Pattern`** for real-time text messaging communication between different users (websocket).
   a. Refer to `backend/app/websocket.py`

## Folder Architecture

- `📁 app/assets`
  - Contains server assets like data files and uploads.
- `📁 app/models`
  - Contains the Business Objects.
- `📁 app/services`
  - Contains methods to create, read, update, and delete business objects.
- `📁 app/controllers`
  - Controllers that uses the various services implemented in the `app/services` directory.
  - They implements the Facade Pattern by masking the more complex underlying implementation details from the frontend.
- `📁 app/routers`
  - Routers that implements REST API endpoints for communication between frontend and backend. They allow the frontend to use the controllers in the backend.
  - Routers use the controllers implemented in the `app/controllers` directory.
- `📁 app/schemas`
  - Defines all the request and response fields.
- `📁 app/factory`
  - Factory design pattern implementation of the database.
- `📁 app/database.py`
  - Entry point to database that will store all the business objects.
- `📁 app/websocket.py`
  - Implements the Publisher-Subscriber Pattern via websockets for real-time text messaging communication between different users.

## Tech Stack

- FastAPI
- Python
- MySQL

## External APIs

1. **Singapore's OneMap API**
   1. Map (https://www.onemap.gov.sg/docs/maps/)
   2. Geocoding (https://developers.onemap.sg/commonapi/search?searchVal=639798&returnGeom=Y&getAddrDetails=Y)
2. **Weather API (Live)**
   1. 24-hour Weather Forecast (https://beta.data.gov.sg/datasets/d_50d2bbe678607d78d74a0fe6e8b5b6dd/view)
   2. 4-day Weather Forecast (https://beta.data.gov.sg/datasets/d_1efe4728b2dad26fd7729c5e4eff7802/view)
3. **Hawker GeoJson Dataset**
   1. https://beta.data.gov.sg/collections/1445/datasets/d_4a086da0a5553be1d89383cd90d07ecd/view
4. **Google OAuth 2.0 API**
   1. https://developers.google.com/identity/protocols/oauth2
