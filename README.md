# FirstClass Mail - Virtual Mailboxes & E-Communications Platform

A comprehensive TypeScript platform for creating virtual mailboxes, managing mail exchange servers, and building powerful web forms for modern businesses.

## Features

### 🏢 Virtual Mailboxes
- Create unlimited virtual mailboxes with custom domains
- Professional email addresses for your business
- Email forwarding and management
- Spam filtering and security
- Mobile access and notifications

### 📧 Mail Exchange Servers
- Set up and manage your own mail exchange servers
- Full SMTP/IMAP support
- SSL encryption and security
- Custom server configurations
- High availability and reliability

### 📝 Web Forms
- Drag & drop form builder
- Real-time validation
- Email notifications
- Data export and analytics
- Custom styling and branding

### 🔒 Security & Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Secure API endpoints
- User session management

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, SQLite
- **Email**: Nodemailer, IMAP
- **Authentication**: JWT, bcrypt
- **Database**: SQLite with custom schema

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd firstclassmail
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL=./database.sqlite
   
   # JWT Secret (change this!)
   JWT_SECRET=your-super-secret-jwt-key
   
   # SMTP Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=your-email@gmail.com
   
   # IMAP Configuration
   IMAP_HOST=imap.gmail.com
   IMAP_PORT=993
   IMAP_USER=your-email@gmail.com
   IMAP_PASS=your-app-password
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── mailboxes/     # Mailbox management
│   │   └── forms/         # Form handling
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── forms/             # Form components
│   └── ui/                # UI components
├── lib/                   # Utility libraries
│   ├── auth/              # Authentication utilities
│   ├── db/                # Database utilities
│   └── mail/              # Email utilities
└── types/                 # TypeScript type definitions
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Mailboxes
- `GET /api/mailboxes` - Get user mailboxes
- `POST /api/mailboxes` - Create new mailbox

### Forms
- `GET /api/forms` - Get user forms
- `POST /api/forms` - Create new form
- `POST /api/forms/[id]/submit` - Submit form data

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Database Schema

The application uses SQLite with the following main tables:
- `users` - User accounts
- `virtual_mailboxes` - Virtual mailbox configurations
- `mail_messages` - Email messages
- `web_forms` - Form definitions
- `form_submissions` - Form submission data
- `mail_servers` - Mail server configurations

## Deployment

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

### Environment Variables for Production

Make sure to set secure values for:
- `JWT_SECRET` - Use a strong, random secret
- `SMTP_*` - Configure your email service
- `IMAP_*` - Configure your IMAP settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue on GitHub
- Contact: support@firstclassmail.com

## Roadmap

- [ ] Advanced email filtering
- [ ] Email templates
- [ ] Analytics dashboard
- [ ] Multi-tenant support
- [ ] API rate limiting
- [ ] Webhook integrations
- [ ] Mobile app
- [ ] Advanced form validation
- [ ] Email scheduling
- [ ] Team collaboration features
