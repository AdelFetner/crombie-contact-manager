# Crombie Contact Manager

A full-stack contact management application built with React, TypeScript, NodeJs and AWS DynamoDB as part of a technical challenge for Crombie.

## Features

### Core Features:
- **Contact Form**
  - Validated fields for firstName, lastName, email, phone, company, role, and notes through React-Hook-Form 
  - Optional fields: company, role, notes
  - Real-time validation with Zod
  - Loading states during submissions
  - Error handling on getters and setters
- **Contact Management**
  - Create new contacts
  - View all contacts in a list
  - Edit existing contacts
  - Delete contacts

- **AWS Integration**
  - S3 Connection to store images and show them on the client
  - DynamoDB table for contact storage
  - CRUD operations using AWS SDK v3
  - Proper error handling for AWS operations
  - AWS SDK's Type handling

### Bonus Features Implemented
- ✨ Edit existing contacts
- 🗑️ Delete functionality
- 🧺 S3 Connection to Contact

## Technologies Used

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | Component UI Library |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| React Hook Form | Form management |
| Zod | Schema validation |
| Axios | HTTP client |
| React Router | Navigation |

### Backend
| Technology | Purpose |
|------------|---------|
| AWS DynamoDB | NoSQL database |
| AWS SDK v3 | Cloud service interaction and documentation |
| Node.js | Backend |
| Express.js | API endpoints |
| Multer | multform middleware |

## Project Structure

Server:   

   ![image](https://github.com/user-attachments/assets/130e8114-4d26-4726-91fd-26620f08f219)


Client:   
![Client folder Structure](https://github.com/user-attachments/assets/d796355a-f86c-42fe-b8b5-dd26cf7a5aba)




## Setup Instructions

### Prerequisites
- Node.js v18+
- AWS account with DynamoDB access and S3 Bucket access
- AWS Credentials for both DynamoDB and S3 Bucket

### Installation
1. Clone repository
```bash
git clone https://github.com/AdelFetner/crombie-contact-manager.git
cd crombie-contact-manager
```

2. Install dependencies

```
npm install
```

3. Configure environment variables
```
# .env
ORG_AWS_REGION=your_aws_region
ORG_AWS_ACCESS_KEY_ID=your_access_key
ORG_AWS_SECRET_ACCESS_KEY=your_secret_key
S3_AWS_ACCESS_KEY
S3_AWS_SECRET_ACCESS
S3_AWS_REGION
```

Start development server
```
cd server 
npm run dev
cd client
npm run dev
```

## Schema implementation

```
interface Contact {
  id: string;  // Partition key
  lastName: string;  // Sort key
  firstName: string;
  createdAt: string;    
  email: string;
  phone: string;
  company?: string;
  role?: string;
  notes?: string;
  image: union(file string)
}
```



### Future Improvements
- DynamoDB query optimizations (put method)
- Add pagination/infinite scroll
- Implementation of unit tests
