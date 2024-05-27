# Default librarian use
librarian@ito.com
password.

This will allow you to create users, books, return books, access a dashboard and many more things.

# Steps to install
1. Clone the repo: `git clone https://github.com/montanoo/ito-development-test.git`
2. Change directory: `cd ito-development-test`
3. Copy the .env.example into .env: `cp .env.example .env`
4. Enter the backend and run the following command: `npm install`, after that, follow up with `npx prisma generate` (this is required to generate Prisma models or Typescript crashes) OR, you could enter the container and do it there.
   (With enough time, I would have been able to create an automated script, which I did but for deployment purposes only)
5. Run Docker: `docker-compose --profile dev up --build` at the root directory, where backend and frontend folders are.
6. Now you have access to the app, enter the folder backend again and run the last commands: `npx prisma db push` and `npx prisma db seed` (this last one creates 3 genres, 3 authors and the librarian user)
7. Enjoy the app! @localhost:5173
