<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->



# 🚜 Livestock Farming Cooperative - NestJS  

## 📌 Description  
This project is a *NestJS* application designed for managing an agricultural cooperative.  
It provides several features such as *user management, products, appointments, prescriptions, invoices, order and care management*.  
The application is secured with *JWT, bcrypt, and Passport* and includes an advanced *role-based access control system*.  

---

## ✨ Main Features  
- 🔑 *Secure Authentication* (JWT + bcrypt + Passport)  
- 👤 *User management* with roles:  
  - admin → full access  
  - farmer → manages animals, prescriptions and order  
  - delivery → manages deliveries  
  - veterinarian → manages appointments, prescriptions and care  
  - client → limited access to services and products  
- 📅 *Appointment management*  
- 💊 *Medical prescriptions management*  
- 🛒 *Product management*  
- 🐄 *Care management* 
and order then the payments 

---

## 🏗 Project Architecture

src/
│── main.ts                  
│── app.module.ts            
│
├── auth/                   
│   │── auth.module.ts
│   │── auth.controller.ts
│   │── auth.service.ts
│   │── jwt.strategy.ts
│   └── guards/jwt.guard.ts
│   └── dto/
│        ├── login.dto.ts
│        └── register.dto.ts
│
├── users/                   
│   │── users.module.ts
│   │── users.controller.ts
│   │── users.service.ts
│   └── dto/create-user.dto.ts
│
├── products/                
│   │── products.module.ts
│   │── products.controller.ts
│   │── products.service.ts
│   └── dto/create-product.dto.ts
│
├── orders/                  
│   │── orders.module.ts
│   │── orders.controller.ts
│   │── orders.service.ts
│   └── dto/create-order.dto.ts
│
├── deliveries/              
│   │── deliveries.module.ts
│   │── deliveries.controller.ts
│   │── deliveries.service.ts
│   └── dto/create-delivery.dto.ts
│
├── care/                    
│   │── care.module.ts
│   │── care.controller.ts
│   │── care.service.ts
│   └── dto/create-care.dto.ts
│
├── appointments/            
│   │── appointments.module.ts
│   │── appointments.controller.ts
│   │── appointments.service.ts
│   └── dto/create-appointment.dto.ts
│
├── prescriptions/           
│   │── prescriptions.module.ts
│   │── prescriptions.controller.ts
│   │── prescriptions.service.ts
│   └── dto/create-prescription.dto.ts
│
├── invoices/                
│   │── invoices.module.ts
│   │── invoices.controller.ts
│   │── invoices.service.ts
│   └── dto/create-invoice.dto.ts
│
├── upload/                 
│   │── upload.module.ts
│   │── upload.controller.ts
│   │── upload.service.ts
│
├── prisma/                  
│   │── prisma.module.ts      
│   │── prisma.service.ts     
│   └── schema.prisma         
│
├── common/                  
│   ├── decorators/roles.decorator.ts  
│   ├── guards/roles.guard.ts          
│   └── enums/
│        ├── role.enum.ts             
│        ├── delivery-status.enum.ts   
│        └── consultation-status.enum.ts 


// modèles

🔹 Utilisateurs

User : id, name, email, password,numero, role

Relations :

1 livreur → N livraisons (deliveries)

1 vétérinaire → N soins (cares)

1 vétérinaire → N ordonnances (prescriptions)

1 éleveur → N commandes reçues (ordersReceived)

1 éleveur → N produits (products)



🔹 Produits

Product : id, name, price, description,ownerId

Relation : 1 produit → N soins (cares)


🔹 Commandes

Order : id,quantity,status, products[], receiverId (éleveur)

Relation : 1 commande → N éleveur (receiver)


🔹 Livraisons

Delivery : id, status, orderId, driverId (livreur)


🔹 Soins

Care : id, date, productId, vetId


🔹 Consultations

Appointment : id, date, status, vetId, userId (éleveur)


🔹 Ordonnances

Prescription : id, issuedAt, careId, vetId


🔹 Factures

Invoice : id, issuedAt, orderId, userId (éleveur)


Payment :

id,payerName,receiverName,receiverNumber,reason ,amount


---

## ⚙ Technologies Used  
- [NestJS](https://nestjs.com/) (Node.js framework)  
- [TypeScript](https://www.typescriptlang.org/)  
- [JWT](https://jwt.io/) (token-based authentication)  
- [bcrypt](https://www.npmjs.com/package/bcrypt) (password hashing)  
- [Passport](http://www.passportjs.org/) (security strategies)  
- Database: *MySQL or PostgreSQL*  

---

## 🚀 Installation & Setup  

### 1️⃣ Clone the project  
```bash
git clone https://github.com/Aslam-06/APIRestFull-Nestjs.git

2️⃣ Install dependencies

npm install

4️⃣ Run the server

npm run start:dev

---

📡 API Endpoints (examples)

🔑 Auth

POST /auth/register → register a new user

POST /auth/login → login and generate JWT


👤 Users

GET /users → list all users (admin only)

GET /users/:id → get user details

PUT /users/:id → update a user

DELETE /users/:id → delete a user


📅 Appointments

POST /appointments → create an appointment

GET /appointments → list all appointments


💊 Prescriptions

POST /prescriptions → create a prescription

GET /prescriptions → list prescriptions


🛒 Products

POST /products → add a product

GET /products → list all products


🐄 Care

POST /care → create a care record

GET /care → list all care records



---

🔐 Security & Roles

Access to routes is protected with guards and a role-based access control system:

Admin → full access

Farmer → access to own appointments/care

Veterinarian → access to appointments & prescriptions

Delivery → access to products & deliveries

Client → limited access

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
