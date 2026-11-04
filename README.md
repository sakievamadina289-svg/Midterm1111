# Engineering College

A responsive, static multi-page website for an engineering college, built with HTML5, CSS3, Bootstrap 5, and vanilla JavaScript.

## Project structure

```text
.
├── index.html          # Home page
├── about.html          # College story and engineering programs
├── admissions.html     # Application steps, tuition, scholarships, searchable FAQ
├── student-life.html   # Campus news, clubs, and category filters
├── contact.html        # Contact details and validated contact form
├── register.html       # Applicant registration form
├── css/
│   └── styles.css      # Responsive custom styles
└── js/
    └── main.js         # Form validation, news filters, and FAQ search
```

## Features

- Shared fixed Bootstrap navigation with a current-page indicator and mobile menu.
- Mobile-first layouts, semantic page landmarks, skip links, visible keyboard focus, and reduced-motion support.
- Four engineering program cards and admissions information.
- Student-life story filtering by category and searchable admissions FAQ.
- Client-side registration validation for email, phone, password match, required fields, and start date.
- Contact-form validation with a simple arithmetic challenge and a hidden honeypot field.
- Accessible labels, validation messages, live status regions, and text alternatives for decorative story illustrations.

## Run locally

Open `index.html` in a browser, or serve this folder with any static-file server. No build step or package installation is required. Bootstrap CSS and JavaScript are loaded from jsDelivr; the optional font import uses Google Fonts.

## Form behavior

These are static front-end demonstrations. They validate input in the browser and display a confirmation, but do not transmit or save application or contact data. Connect a secure, privacy-compliant backend before using the forms to collect real submissions.

Tuition figures, dates, email addresses, and contact details are illustrative placeholders and should be confirmed or replaced before publishing.
