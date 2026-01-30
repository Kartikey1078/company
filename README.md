# MERN Product Listing Assignment

Clean, production-ready MERN stack app with a REST API, product listing, and cart state management.

## Project Structure

- `backend/` Express + MongoDB API (MVC, validation, error handling)
- `frontend/` React UI (React Query for server state, Redux for cart)

## Backend Setup

1. `cd backend`
2. `npm install`
3. Create `.env` file with:
   - `MONGODB_URI=mongodb://localhost:27017/products_db`
   - `PORT=4000`
   - `CLIENT_ORIGIN=http://localhost:5173`
   - `CLOUDINARY_NAME=your_cloud_name`
   - `CLOUDINARY_API_KEY=your_api_key`
   - `CLOUDINARY_SECRET_KEY=your_secret_key`
4. `npm run dev`

## Frontend Setup

1. `cd frontend`
2. `npm install`
3. Optional `.env` with `VITE_API_URL=http://localhost:4000/api`
4. `npm run dev`

## API Endpoints

Base URL: `http://localhost:4000/api`

### List products
`GET /products`

Response:
```json
{
  "data": [
    {
      "_id": "65f1d2",
      "name": "Desk Lamp",
      "description": "Warm light",
      "price": 29.99,
      "imageUrl": "",
      "category": "Home",
      "stock": 10,
      "createdAt": "2026-01-30T10:00:00.000Z",
      "updatedAt": "2026-01-30T10:00:00.000Z"
    }
  ]
}
```

### Create product
`POST /products`

Request:
```json
{
  "name": "Desk Lamp",
  "description": "Warm light",
  "price": 29.99,
  "imageUrl": "",
  "category": "Home",
  "stock": 10
}
```

Response:
```json
{ "data": { "_id": "65f1d2", "name": "Desk Lamp", "price": 29.99 } }
```

### Update product
`PUT /products/:id`

Request:
```json
{ "price": 24.99, "stock": 12 }
```

Response:
```json
{ "data": { "_id": "65f1d2", "price": 24.99, "stock": 12 } }
```

### Delete product
`DELETE /products/:id`

Response:
```json
{ "message": "Product deleted" }
```

## Architectural Decisions

- **MVC on backend**: controllers handle request logic, models encapsulate data schema, routes map HTTP verbs to controllers.
- **Zod validation**: schema-first validation keeps input constraints centralized and reusable.
- **Centralized error handling**: consistent API errors and validation responses.
- **React Query**: cache, invalidation, and async server state in one place; no heavy `useEffect`.
- **Redux cart slice**: purely client-side cart state with predictable updates.
- **Reusable components**: `ProductCard`, `ProductForm`, `ProductRow`, `CartSummary` to keep pages clean.
- **Separation of concerns**: `api/` for HTTP integration, `features/` for state, `pages/` for screens.

## Notes

- Update `VITE_API_URL` if your API runs on a different host/port.
- UI is intentionally minimal but clean and responsive.

## Vercel Deployment

This repo is Vercel-ready with a serverless API under `/api` (defined in `backend/api/index.js`) and a static Vite build.

### Environment Variables (Vercel)
- `MONGODB_URI`
- `CLOUDINARY_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_SECRET_KEY`
- `VITE_API_URL` (set to your Vercel deployment URL + `/api`)

### Build Settings
- Build command: `cd frontend && npm install && npm run build`
- Output directory: `frontend/dist`
