Thinking Log – Appointment Booking Backend

Project Overview
I set out to build a robust, scalable backend for an appointment slot booking system using Node.js, Express, and MongoDB (Mongoose). The goal was to create a clean, maintainable API that could serve as a solid foundation for a modern booking platform, supporting user registration, authentication, slot management, and bookings, all while following best practices in architecture and security.

Architecture & Design

I adopted a modular, layered architecture:

Models (Mongoose): Represented Users, Slots, and Bookings, with proper indexing for performance.
Controllers: Handled HTTP request/response logic, delegating business logic to services or directly to models for simple flows.
Services: Encapsulated business logic (e.g., user registration, authentication).
Middlewares: Managed authentication (JWT), validation (Joi), and error handling.
Validation: Used Joi schemas to ensure all incoming data was well-formed.
Utils: Centralized helpers for encryption, JWT, error formatting, and response formatting.
I ensured all sensitive operations (like booking a slot or updating a profile) were protected by authentication middleware, and that all user input was validated and sanitized.

Key Features Implemented

User Registration & Login: With JWT authentication and bcrypt password hashing.
Profile Management: Users can update their skills (as a comma-separated string) and bio.
Slot Management: Authenticated users can create, view, and delete their own slots. Slot creation checks for overlaps to prevent double-booking.
Booking System: Authenticated users can book available slots. Bookings are linked to both the professional and the client.
Public Profiles: Anyone can view a user’s public profile and their available slots, grouped and sorted by date and time.
Booking Views: Both “bookings as professional” and “bookings made by me” endpoints are supported.
Sorting & Grouping: All slot and booking lists are sorted by date and time for a better user experience.
Extensible Design: The system is ready for future enhancements like role-based permissions, booking cancellation, and more.

Challenges & Solutions

Slot Overlap Prevention:
Ensuring no two slots for a user overlap required careful query logic. I used Mongoose queries to check for time conflicts before allowing slot creation.

Consistent Sorting & Grouping:
To provide a great UI/UX, I made sure all slot and booking lists are sorted by date and time, and grouped where needed. This required both MongoDB query sorting and, in some cases, post-fetch sorting in JavaScript.

Flexible Skills Management:
I debated between storing skills as an array or a comma-separated string. I chose an array in the database for flexibility, but allowed the frontend to send a comma-separated string for ease of use, converting it server-side.

Authentication Consistency:
I standardized on using req.user everywhere for authenticated user info, ensuring all protected endpoints worked seamlessly.

Extensibility:
I designed the API and data models to be easily extensible, so features like booking cancellation, user roles, and profile pictures can be added with minimal refactoring.

What Went Well
The modular structure made it easy to add new features and endpoints.
Using Joi for validation and Mongoose for schema enforcement caught many issues early.
The API is clean, RESTful, and well-documented, making it easy for frontend integration.

What Could Be Improved / Next Steps

Add automated tests for all endpoints.
Implement rate limiting and more granular permissions for production.
Add endpoints for profile picture upload, booking cancellation, and notifications.
Consider pagination for large lists of slots or bookings.

Conclusion
This project was a great exercise in building a production-ready backend from scratch. I’m confident the architecture is solid, the codebase is maintainable, and the API is ready for frontend integration and future growth.
