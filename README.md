#  Madle
The next generation Moodle!

## Run this project locally
### Install the dependencies
You need the following
- [NodeJS](https://nodejs.org/en/download) version >18
- [pnpm](https://pnpm.io/installation)
- [Docker](https://docs.docker.com/engine/install/)

### Start the project
This project needs a local database, you can run it using docker

```sh
docker run --name madledb -p 5432:5432 -e POSTGRES_PASSWORD=root -e POSTGRES_USER=root -e POSTGRES_DB=madledb -d postgres
```

Next you need to add .env file in the root of the project.
See the wiki [here](https://github.com/Sawangg/madle/wiki/Environment-variables) for more informations.


Install the project dependencies
```sh
pnpm i
```

Then build the project
```sh
pnpm build
```

And run it!
```sh
pnpm start
```

### Initializing data
The database will be empty when the container is launched. To initialize the database and the different tables, do the following:
```sh
cd <your_path>/madle
pnpm db:push
```

If you want to access a drizzle easily without entering the postgreSQL container you can do :
```sh
cd <your_path>/madle
pnpm db:studio
```

You can now see the website on http://localhost:3000 🚀
