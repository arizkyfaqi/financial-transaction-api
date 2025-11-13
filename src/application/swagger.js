import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Financial Transaction API",
    version: "1.0.0",
    description:
      "REST API untuk layanan transaksi keuangan (register, login, topup, payment, dll)",
  },
  servers: [
    {
      url: "https://financial-transaction-api-production.up.railway.app",
      description: "Development Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  schemas: {
    User: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          example: 1,
        },
        first_name: {
          type: "string",
          example: "Jhone",
        },
        last_name: {
          type: "string",
          example: "Dow",
        },
        email: {
          type: "string",
          example: "jhon@mail.com",
        },
        balance: {
          type: "integer",
          example: 100000,
        },
        profile_image: {
          type: "string",
          example: "uploads/profile/user_1_1762951605560.jpg",
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-11-12T07:34:25.000Z",
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger Docs tersedia di: http://localhost:3000/api-docs");
};

export default setupSwagger;
