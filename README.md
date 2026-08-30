# Ajax Travels

Ajax Travels is a travel web application designed to make it easier for users to discover destinations, find places to stay, and explore local experiences from one platform.

The project focuses on building a clean and modern travel experience while keeping the booking flow simple. Visitors can browse the platform without an account, while features that require a user account are protected behind authentication.

## Features

* Responsive travel-focused landing page
* Destination discovery
* Stays section for browsing accommodation options
* Local experiences section
* User registration and login
* Authentication using Firebase
* Protected dashboard
* Logout functionality
* React Router navigation
* Reusable navigation and UI components
* Responsive layout for desktop and mobile screens
* 404 page for invalid routes

## Tech Stack

**Frontend**

* React
* JavaScript
* React Router
* Tailwind CSS
* Vite

**Authentication**

* Firebase Authentication

**Development**

* Vite development server
* Git and GitHub


## Getting Started

### Prerequisites

You'll need the following installed on your computer:

* Node.js
* npm
* Git

You can check whether Node.js and npm are installed with:

```bash
node -v
npm -v
```

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/ajax-travels.git
```

Move into the project directory:

```bash
cd ajax-travels
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL, normally something similar to:

```text
http://localhost:5173
```

Open that address in your browser.

## Firebase Setup

Ajax Travels uses Firebase Authentication for user accounts.

Create a Firebase project and enable the authentication methods required by the application.

Add your Firebase configuration to the project using environment variables rather than committing your credentials directly to GitHub.

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Make sure `.env` is included in `.gitignore`:

```text
.env
.env.local
```

Do not commit private keys or other sensitive Firebase configuration to the repository.

## Authentication

Authentication is handled through the application's `AuthContext`.

The context provides the current user and authentication functions to components that need them.

Protected routes are handled by `ProtectedRoute.jsx`.

For example, the dashboard is only available to authenticated users:

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

If a user isn't authenticated and tries to access the dashboard, they are redirected to the login page.

## Navigation

The main navigation includes:

* Home
* Stays
* Local Experiences
* About
* Login
* Sign Up

Once a user is authenticated, additional options such as the Dashboard and Logout become available.

## Current Booking Flow

The project is being built around a travel booking workflow where users can:

1. Browse destinations.
2. Explore available stays and experiences.
3. View relevant information and pricing.
4. Sign in or create an account when authentication is required.
5. Continue towards availability and booking.

Some of these features are still being developed, particularly the integration with external travel and accommodation APIs.

## Future Improvements

There are several areas planned for future versions of Ajax Travels.

### Travel API Integration

Integrate travel and accommodation APIs to provide live or regularly updated information such as:

* Destinations
* Accommodation
* Prices
* Availability
* Activities
* Travel information

### Search and Filtering

Add more advanced search functionality so users can filter results by things such as:

* Destination
* Price
* Dates
* Accommodation type
* Number of guests
* Experience type

### Booking System

Expand the current flow into a complete booking system with:

* Availability checking
* Booking confirmation
* User booking history
* Cancellation handling
* Booking details

### User Dashboard

The dashboard can be expanded to include:

* Upcoming trips
* Previous bookings
* Saved destinations
* Saved stays
* Profile information

### Payments

A payment provider can eventually be integrated to allow users to complete bookings directly through the platform.

## Running a Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Contributing

This project is currently being developed as an ongoing application.

If you'd like to contribute:

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your work.

```bash
git add .
git commit -m "Add your feature"
```

5. Push the branch.

```bash
git push origin feature/your-feature
```

6. Open a pull request.

## Known Limitations

Ajax Travels is still under development, so some parts of the application may not yet represent the final product.

In particular:

* Travel data is not yet fully connected to a live booking provider.
* Some destination information is currently static.
* Booking and payment functionality is still being developed.
* API integrations may change as the project evolves.

## License

This project is currently for development and educational purposes.


## Author

**Wayne Kim**

Ajax Travels is an ongoing project focused on building a practical travel discovery and booking experience using modern web technologies.
