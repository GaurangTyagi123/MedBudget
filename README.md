# MedBudget

MedBudget is a web application that helps users plan their monthly medicine requirements and ensures they never run out of essential medications. Users can create medicine schedules, calculate the required quantity for a given period, and receive automated email reminders when it's time to restock.

# Live Demo
https://medbudget.gaurang.work

## Features

* Create and manage medicine lists
* Calculate medicine requirements for a selected duration
* Add dosage frequency and quantity information
* Automatic monthly email reminders to restock medicines
* Responsive and user-friendly interface

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* supabase

### Services

* Supabase Cron Jobs (for scheduled reminder execution)
* Email notification service resend

## How It Works

1. Enter patient's name
2. Add the medicines you take regularly.
3. Specify:

   * Medicine name
   * Dosage
   * Frequency
   * Duration
4. MedBudget calculates how many units of each medicine are required.
5. Every month, a scheduled cron job checks whether reminders need to be sent.
6. Users receive an email reminding them to purchase medicines before they run out.

## Project Structure

```text
app/
components/
lib/
prisma/
public/
types/
```

## Installation

Clone the repository.

```bash
git clone <repository-url>
cd med-budget
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
DATABASE_URL=

EMAIL_USER=
EMAIL_PASS=

NEXT_PUBLIC_APP_URL=
```

Run database migrations.

```bash
npx prisma migrate dev
```

Start the development server.

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

| Variable              | Description                           |
| --------------------- | ------------------------------------- |
| `DATABASE_URL`        | PostgreSQL database connection string |
| `EMAIL_USER`          | Email account used to send reminders  |
| `EMAIL_PASS`          | Email app password or SMTP password   |
| `NEXT_PUBLIC_APP_URL` | Base URL of the application           |

## Scheduled Email Reminders

MedBudget uses scheduled jobs to automatically send reminder emails.

The scheduler:

* Runs at predefined intervals.
* Checks users' medicine schedules.
* Identifies medicines that require restocking.
* Sends reminder emails to the corresponding users.

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build production application
npm run start      # Start production server
npm run lint       # Run ESLint
```

## License

This project is licensed under the MIT License.
