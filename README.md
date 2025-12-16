# https://codebhaiya.com

> The right way to learn coding.

🔥 YouTube - https://www.youtube.com/@AbhinayJangde

# Local Development Setup

## Prerequisites

- Node.js (v18 or higher)
- pnpm
- PostgreSQL (or access to PostgreSQL Atlas)
- Git

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/abhinayjangde/codebhaiya.git
   cd codebhaiya
   docker compose up -d  # to start postgres via docker
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory similary to .env.example

   For social authentication and other services, you'll need to create accounts and obtain API keys from:
   - [GitHub OAuth](https://github.com/settings/developers)
   - [Google OAuth](https://console.cloud.google.com/)
   - [Nodemailer](https://nodemailer.com/about/) for email services
   - [Razorpay](https://razorpay.com/) for payment processing
   - [Cloudinary](https://cloudinary.com/) for media management

4. **Run the development server**

   ```bash
   pnpm run dev
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
