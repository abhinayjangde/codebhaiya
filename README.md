# https://codebhaiya.com

> The right way to learn coding.

🔥 YouTube - https://www.youtube.com/@AbhinayJangde

# Local Development Setup

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (or access to MongoDB Atlas)
- Git

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/abhinayjangde/codebhaiya.git
   cd codebhaiya
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory with the following variables:

   ```
   TOKEN_SECRET=your_token_secret
   DOMAIN=http://localhost:3000
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   MONGODB_URI=your_mongodb_connection_string
   GITHUB_ID=your_github_oauth_id
   GITHUB_SECRET=your_github_oauth_secret
   GOOGLE_ID=your_google_oauth_id
   GOOGLE_SECRET=your_google_oauth_secret
   RESEND_API_KEY=your_resend_api_key
   NEXT_PUBLIC_KEY_ID=your_razorpay_key_id
   KEY_SECRET=your_razorpay_key_secret
   ```

   For social authentication and other services, you'll need to create accounts and obtain API keys from:
   - [GitHub OAuth](https://github.com/settings/developers)
   - [Google OAuth](https://console.cloud.google.com/)
   - [Resend](https://resend.com/) for email services
   - [Razorpay](https://razorpay.com/) for payment processing

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the code style of the project.

## Future Courses

- Git & GitHub Course
- Docker Course
- GenAI Course