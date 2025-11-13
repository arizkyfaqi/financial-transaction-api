# Financial Transaction API

REST API untuk layanan **transaksi keuangan**, mencakup fitur registrasi, login, cek saldo, top up, pembayaran (pulsa, voucher, listrik, dll), serta pengelolaan profil pengguna.  
Dibangun menggunakan **Node.js (Express.js)** dan **PostgreSQL (Prisma ORM)** dengan autentikasi berbasis **JWT**.

---

## Tech Stack

| Komponen         | Teknologi             |
| ---------------- | --------------------- |
| Runtime          | Node.js               |
| Framework        | Express.js            |
| ORM              | Prisma                |
| Database         | PostgreSQL            |
| Authentication   | JSON Web Token (JWT)  |
| Password Hashing | bcrypt                |
| Validation       | Joi                   |
| Logger           | Winston               |
| File Upload      | Multer + Sharp        |
| Documentation    | Swagger (OpenAPI 3.0) |
| Environment      | dotenv                |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/arizkyfaqi/financial-transaction-api.git
cd financial-transaction-api
npm install
```

### Setup Environment

Buat file .env di root project dan isi dengan konfigurasi berikut:

```
DATABASE_URL="postgresql://user:password@localhost:5432/finance_db?schema=public"
JWT_SECRET="supersecretkey"
PORT=3000
```

### Setup Database

```
npx prisma migrate dev --name init
npx prisma generate
```

### Run Application

```
npm run dev
```

## Swagger API Documentation

```
http://localhost:3000/api-docs
```

## Location file uploads

```
/uploads/profile/
```
