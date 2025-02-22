# Unsplash Clone

An Unsplash-clone web application built with Vue 3 and Vite, allowing users to search and browse high-quality images using the Unsplash API.

## Features

- 🔍 **Image Search** - Search for high-quality images by keyword.
- 📸 **Browse Popular Images** - Handling API calls and responses using an API client.
- 📱 **Responsive Design** - Fully responsive UI for mobile and desktop.

## Screenshots

![Home Page](https://via.placeholder.com/800x400?text=Home+Page)

![Search Results](https://via.placeholder.com/800x400?text=Search+Results)

![Dark Mode](https://via.placeholder.com/800x400?text=Dark+Mode)

## Installation

To set up the project locally, follow these steps:

### Prerequisites
- Node.js (>= 16.0.0)
- NPM or Yarn

### Clone the Repository
```sh
git clone https://github.com/payose/Unsplash-clone.git
cd unsplash-clone
```

### Install Dependencies
```sh
npm install  # or yarn install
```

### Set Up Environment Variables
Create a `.env` file in the project root and add your Unsplash API key:
```env
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_api_key
```

## Running the App

### Start Development Server
```sh
npm run dev  # or yarn dev
```
The app will be available at `http://localhost:5173/`.

### Build for Production
```sh
npm run build  # or yarn build
```

### Preview Production Build
```sh
npm run preview  # or yarn preview
```

## Deployment

To deploy the application using Vercel, Netlify, or any static hosting, follow these steps:

### Deploy to Vercel
```sh
npm install -g vercel
vercel
```

### Deploy to Netlify
```sh
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to GitHub Pages
1. Install `gh-pages`:
   ```sh
   npm install --save-dev gh-pages
   ```
2. Add the following script to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Deploy:
   ```sh
   npm run build
   npm run deploy
   ```

