# FeedItForward (Frontend)

_This README.md assumes that you have already cloned the repo._

**Table of Content**

- [FeedItForward (Frontend)](#feeditforward-frontend)
- [Setup Instructions](#setup-instructions)
- [App Design (Frontend)](#app-design-frontend)
  - [Tech Stack](#tech-stack)
  - [External APIs](#external-apis)

# Setup Instructions

1. In the `/frontend` directory, install the required node modules.

```bash
npm install
```

2. Start the application.

```bash
npm run start
```

And you are ready to start using the FeedItForward Frontend! The frontend application is running on http://localhost:3000/

# App Design (Frontend)

The frontend (React.js) mainly consists of the different **User Interfaces** (Screens), which are structured and categorized into **AdminUI**, **ConsumerUI**, **DriverUI**, **HawkerUI**, and **MainUI** as designed in the class diagrams. More detailed sub-screens can be found in the respective UI screen folders. They can be found in the `/src/screens` directory.

The `/src/App.tsx` is the entry point of the frontend application.

Other folders such as `/components`, `/contexts`, `/data`, `/utils`, `/schemas`, `/hooks`, and `/contexts` contains helper files that makes the frontend code more organized and easier to read for ease of collaboration (as recommended by the React.js framework).

## Tech Stack

- React.js
- TypeScript
- Tailwind CSS

## External APIs

1. **Singapore's OneMap API**
   a. Map (https://www.onemap.gov.sg/docs/maps/)
   b. Geocoding (https://developers.onemap.sg/commonapi/search?searchVal=639798&returnGeom=Y&getAddrDetails=Y)
2. **Weather API (Live)**
   a. 24-hour Weather Forecast (https://beta.data.gov.sg/datasets/d_50d2bbe678607d78d74a0fe6e8b5b6dd/view)
   b. 4-day Weather Forecast (https://beta.data.gov.sg/datasets/d_1efe4728b2dad26fd7729c5e4eff7802/view)
3. **Hawker GeoJson Dataset**
   a. https://beta.data.gov.sg/collections/1445/datasets/d_4a086da0a5553be1d89383cd90d07ecd/view
4. **Google OAuth 2.0 API**
   a. https://developers.google.com/identity/protocols/oauth2
