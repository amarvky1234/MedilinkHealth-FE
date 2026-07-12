# Spring Boot + MongoDB Backend Specification

## Overview
This specification describes a Spring Boot backend for the existing React frontend in `src/`.
The backend should run on `http://localhost:3300` and support the current frontend API contract.

## Recommended Versions
- Java: **17** or **21** (Java 17 is recommended for compatibility)
- Spring Boot: **3.2.x**
- Spring Data MongoDB: included with Spring Boot 3.2.x
- MongoDB Server: **7.0** or **6.0**
- Maven: **3.9.x** or Gradle **8.x**
- Spring Security: **6.x**
- JWT library: **jjwt 0.11.5** or Spring Security OAuth 2 JWT support

## Required Backend Features
- User registration with email verification via OTP
- Login with password or OTP
- Doctor search with filtering and pagination
- Single doctor detail fetch
- Appointment booking
- JWT authentication for protected routes
- MongoDB persistence
- CORS configured for `http://localhost:5173` and `http://localhost:3300`

## API Endpoints

### Authentication
#### `POST /auth/login`
- Request body:
  - `email` (string)
  - `password` (string, optional)
  - `otp` (string, optional)
- Response:
  - `token` (string) on success
  - `msg` = `"failed"` on invalid credentials
  - `msg` = `"Email OTP verification pending"` or `requiresOtp: true` if user exists but is not verified

### User
#### `POST /user/save`
- Request body:
  - `name` (string)
  - `email` (string)
  - `password` (string)
  - `confirmpassword` (string)
- Response:
  - confirmation of registration or validation errors

### OTP
#### `POST /otp/sendotp`
- Request body:
  - `email` (string)
- Response:
  - `isSent` (boolean)

#### `POST /otp/verifyotp`
- Request body:
  - `email` (string)
  - `otp` (string)
- Response:
  - `isVerified` (boolean)

### Doctor
#### `GET /doctor/get`
- Query parameters:
  - `search` (string)
  - `location` (string)
  - `gender` (string)
  - `experience` (number)
  - `fee` (string)
  - `sortBy` (string)
  - `page` (number)
- Response:
  - `doctors` (array of Doctor objects)
  - `totalPages` (number)
  - `page` (number)

#### `GET /doctor/get/{id}`
- Response: single Doctor object

#### `POST /doctor/save`
- Request body:
  - `name` (string)
  - `specialization` (string)
  - `qualification` (string)
  - `experience` (number)
  - `hospital` (string)
  - `city` (string)
  - `consultationFee` (number)
  - `gender` (string)
  - `photo` (string) - URL
  - `phone` (string)
- Response: saved Doctor object

### Appointment
#### `POST /appointment/book`
- Request body:
  - `doctorId` (string)
  - `appointmentDate` (string - ISO date)
  - `appointmentTime` (string)
- Response: appointment confirmation

## Security
- Use JWT bearer token authentication
- Protect routes:
  - `/doctor/get` and `/doctor/get/{id}` may require auth based on frontend headers
  - `/doctor/save` should require auth
  - `/appointment/book` must require auth
- Public routes:
  - `/auth/login`
  - `/user/save`
  - `/otp/sendotp`
  - `/otp/verifyotp`

## DTO Definitions

### `LoginRequestDTO`
- `email: String`
- `password: String` (optional)
- `otp: String` (optional)

### `LoginResponseDTO`
- `token: String`
- `msg: String` (optional)
- `requiresOtp: Boolean` (optional)

### `UserSaveRequestDTO`
- `name: String`
- `email: String`
- `password: String`
- `confirmpassword: String`

### `OtpSendRequestDTO`
- `email: String`

### `OtpVerifyRequestDTO`
- `email: String`
- `otp: String`

### `DoctorSearchRequestDTO`
- `search: String` (optional)
- `location: String` (optional)
- `gender: String` (optional)
- `experience: Integer` (optional)
- `fee: String` (optional)
- `sortBy: String` (optional)
- `page: Integer` (optional)

### `DoctorResponseDTO`
- `id: String`
- `name: String`
- `specialization: String`
- `qualification: String`
- `experience: Integer`
- `hospital: String`
- `city: String`
- `consultationFee: Double`
- `gender: String`
- `photo: String`
- `phone: String`
- `createdAt: Instant` (optional)

### `DoctorSaveRequestDTO`
- `name: String`
- `specialization: String`
- `qualification: String`
- `experience: Integer`
- `hospital: String`
- `city: String`
- `consultationFee: Double`
- `gender: String`
- `photo: String`
- `phone: String`

### `AppointmentSaveRequestDTO`
- `doctorId: String`
- `appointmentDate: String` (ISO date)
- `appointmentTime: String`

### `AppointmentResponseDTO`
- `id: String`
- `userId: String`
- `doctorId: String`
- `appointmentDate: String`
- `appointmentTime: String`
- `status: String`
- `createdAt: Instant`

### `UserResponseDTO`
- `id: String`
- `name: String`
- `email: String`
- `isVerified: Boolean`

## MongoDB Entities

### `User`
- `_id: ObjectId`
- `name: String`
- `email: String`
- `passwordHash: String`
- `isVerified: Boolean`
- `otpCode: String`
- `otpExpiry: Instant`
- `createdAt: Instant`
- `updatedAt: Instant`

### `Doctor`
- `_id: ObjectId`
- `name: String`
- `specialization: String`
- `qualification: String`
- `experience: Integer`
- `hospital: String`
- `city: String`
- `consultationFee: Double`
- `gender: String`
- `photo: String`
- `phone: String`
- `createdAt: Instant`

### `Appointment`
- `_id: ObjectId`
- `doctorId: ObjectId`
- `userId: ObjectId`
- `appointmentDate: Instant`
- `appointmentTime: String`
- `status: String`
- `createdAt: Instant`

## Notes for Implementation
- The frontend uses `localStorage.getItem("token")` and `Authorization: Bearer <token>` headers.
- Search flows and doctor filters are implemented in `src/features/finddoctors/`.
- `MyDoctors.jsx` expects `data.doctors` and `data.totalPages` for pagination.
- `SearchDoctors.jsx` expects `_id`, `photo`, `name`, `specialization`, `hospital`, and `city` for search result items.
- `DoctorDetails.jsx` expects a complete doctor object with `consultationFee`, `qualification`, and `phone`.
- Use DTOs in controllers and services to decouple API payloads from MongoDB entities.

## Suggested Spring Boot Package Structure
- `com.example.medilink` or `com.medilink.app`
- `controller`
- `service`
- `repository`
- `model`
- `dto`
- `config`
- `security`

## Example Build Dependencies
- `spring-boot-starter-web`
- `spring-boot-starter-data-mongodb`
- `spring-boot-starter-security`
- `spring-boot-starter-validation`
- `jjwt-api`, `jjwt-impl`, `jjwt-jackson`
- `spring-boot-starter-mail` (optional for OTP email)

## Final Prompt
Build a Spring Boot 3.2.x backend with MongoDB for the existing React frontend. Implement `/auth`, `/user`, `/otp`, `/doctor`, and `/appointment` endpoints. Use JWT authentication and MongoDB persistence. Support doctor search & filter by `search`, `location`, `gender`, `experience`, `fee`, `sortBy`, and pagination. Return `token` on login and enforce protected routes for booking and doctor save operations.