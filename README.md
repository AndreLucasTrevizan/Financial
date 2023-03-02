# Financial App

Hello there,

This is a simple project where the user can controll your personal bills.

> Images

<div>
  <img src='mobile/assets/images/signup.jpeg' width='200' />
  <img src='mobile/assets/images/signin.jpeg' width='200' />
  <img src='mobile/assets/images/dashboard.jpeg' width='200' />
  <img src='mobile/assets/images/transactions.jpeg' width='200' />
  <img src='mobile/assets/images/profile.jpeg' width='200' />
</div>

## Running the project

Just a little reminder, I've used Prisma ORM in the Backend and Expo to build the App. If you don't use any of this stacks I'll show you how to install.

> API Initial Config

Inside the <strong>api</strong> folder, you need to install the project dependencies inside the <strong>package.json</strong> then just run <strong>yarn</strong> or <strong>npm install</strong>

After the installation, you need to create a new file called <strong>.env</strong>. <br />

You need to create 3 env variables <strong>PORT</strong>, <strong>DATABASE_URL</strong> and <strong>JWT_SECRET</strong> 

I've used Postgres SQL in this project but you can choose other database aswel. <br />

First create a new database called test or another name that you wish to use as Database name, I used "financas" as you can see in the example.

> Example

<ul>
  <li>PORT=3333</li>
  <li>DATABASE_URL="postgresql://postgres:123123123@localhost:5432/financas?schema=public"</li>
  <li>JWT_SECRET="thisistheServerSECRETandcannotbeshared"</li>
</ul>

Then, after all this configuration run: <br />
<strong>npx prisma migrate dev</strong> -> This comand runs the migration and create the database models.<br />
<strong>npx prisma db seed</strong> -> This command will seed the database with some necessary information. You can see inside the src/prisma/seed.ts file.

And it's done, run <strong>yarn dev</strong> and open your browser then access <strong>"http://localhost:<your PORT inside the .env>/ping"</strong> and you'll see the success message.

> App Initial Config

Ok, inside the mobile folder, you're gonna need Expo installed so run <strong>npm i -g @expo/cli</strong> if you don't have Expo installed. <br />
Now, run <strong>yarn</strong> or <strong>npm install</strong> to install the package.json dependencies.<br />

Then, inside src/config/index.ts change the variable BASE_URL to your IP Address, example <strong>http://192.168.0.1:3333</strong> -> We use this variable to configure our api file and use it to consum the API.

Run <strong>expo start</strong>

Press <strong>a</strong> to open the app in a local emulator or open the Expo Go App in your smartphone and scan the QR Code.
