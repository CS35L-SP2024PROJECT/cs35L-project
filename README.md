# BruinMarket (CS35L-finalProject)

**Team Curry:** Hameed Shaik, Hemanth Sammatur, Aamina Mohammed

## Why BruinMarket?

### Purpose:
BruinMarket is an e-commerce website specifically designed to cater to the needs of the UCLA student body.

### Inspiration:
Think of BruinMarket as a combination of Facebook Marketplace and the UCLA Store.

## Implementation

### Frontend:
- React
- Redux Toolkit
- React Router
- CSS

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Stripe
- Cloudinary

## Setting Up BruinMarket

1. **Express Server Connection:**
   - The Express server is connected to MongoDB using Mongoose, a library used to interact with the database.
2. **Database Connection:**
   - Connect to the URL of the database from the backend.
3. **Starting the Database:**
   - Start the database and open the website from the frontend.

## BruinMarket Features

### Login
- Create a new account or use an existing one.
- Reset password through email.
- Secure authentication using JWT (JSON Web Token).

### Filter and Search
- Uses pagination to organize products.
- Items show their description and stock availability.
- Search keywords to find products quickly.
- Filter by price, category, and rating.

### Order and Checkout
- Users can purchase items by adding them to their cart.
- Choice between cash or card.
- Input card information and pay via Stripe.
- View pending orders and download invoices.

### Manage Orders
- Admin can post new products with their information and price.
- Track sales and existing orders.
- Search for reviews using product ID.

## Demo
A demo of BruinMarket is available to showcase its features and functionality. 

## Getting Started

To get started with BruinMarket, follow these steps:

### Prerequisites:
- Node.js
- MongoDB
- npm (Node Package Manager)

### Installation:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/BruinMarket.git
   cd BruinMarket
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root of the backend directory with the following variables:
     ```env
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     STRIPE_SECRET_KEY=your_stripe_secret_key
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

### Running the Application:
1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing
We welcome contributions from the community. To contribute, please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries or feedback, please contact us at [teamcurry@bruinmarket.com](mailto:teamcurry@bruinmarket.com).

---