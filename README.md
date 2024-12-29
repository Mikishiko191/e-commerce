# E-Commerce Project

This repository contains an e-commerce application with a Nest.js backend and a Next.js frontend.

## Project Structure

```
e-commerce/
│
├── backend/   # Nest.js backend
│   ├── src/
│   ├── test/
│   ├── .eslintrc.js
│   ├── .prettierrc
│   ├── nest-cli.json
│   ├── package.json
│   ├── tsconfig.build.json
│   └── tsconfig.json
│
├── frontend/  # Next.js frontend
│   ├── pages/
│   ├── public/
│   ├── styles/
│   ├── .eslintrc.json
│   ├── next.config.js
│   ├── package.json
│   ├── README.md
│   └── tsconfig.json
│
└── README.md  # Project description
```

## Getting Started

### Backend

Navigate to the `backend` directory and install dependencies:

```sh
cd backend
npm install
```

Start the Nest.js server:

```sh
npm run start
```

### Frontend

Navigate to the `frontend` directory and install dependencies:

```sh
cd ../frontend
npm install
```

Start the Next.js development server:

```sh
npm run dev
```

## Deployment

### Frontend on Vercel

1. Navigate to the Vercel website and sign up or log in.
2. Create a new project and link your GitHub repository.
3. Select the `frontend` directory as the root for the project.
4. Configure the build settings if necessary.
5. Deploy the project.

### Backend on AWS

1. Set up an AWS account if you don't have one.
2. Create an Elastic Beanstalk application or use another AWS service like ECS or Lambda.
3. Configure your AWS CLI with your credentials.
4. Navigate to the `backend` directory and deploy using the AWS CLI.

#### Example for Elastic Beanstalk

1. Initialize Elastic Beanstalk in the backend directory:

   ```sh
   cd backend
   eb init
   ```

2. Create an environment and deploy:

   ```sh
   eb create
   eb deploy
   ```

## License

This project is licensed under the MIT License.
