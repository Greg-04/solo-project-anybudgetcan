# Any Budget Can

"Any Budget Can" is an application that streamlines personal finance management by tracking income and expenses to tailor savings plans. Users will input their financial details, including income and fixed expenses, and set limits on predefined category expenses. They can then manually add transactions to track and monitor their budget. The home dashboard will display a comprehensive overview of created savings plans by displaying previews to pages like:

- Transaction history
- Categorized budget overview
- Viewing multiple created savings plans
- Remaining budget amount
  
Users will also be able to access each of these pages to view, modify, or add additional savings plans. Allowing users to understand their financial habits and progress toward savings goals effectively.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
Node
Postgres
Git
```

### Installing


Install project dependencies

```
npm install

```


## Running Application

Run database from postgressql. Use the "database.sql" to initialize the database.

1. Create a database named "any_budget_can".
2. The queries in the tables.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed.
3. Open up your editor of choice and run an npm install
4. In terminal run

```
npm run server
```

5. In seperate terminal run

```
npm run client
```

6. The npm run client command will open up a new browser tab for you!

## Deployment

1. Create a new Heroku project.
1. Link the Heroku project to the project GitHub Repo.
1. Create an Heroku Postgres database.
1. Connect to the Heroku Postgres database from Postico.
1. Create the necessary tables.
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security.
1. In the deploy section, select manual deploy.

## Built With

- DrawSQL
- React
- Express.js
- Node.js
- PostgreSQL
- Material-UI
- Express

## Authors

- **Gabriel Regalado** - [GitHub Profile](https://github.com/Greg-04)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Thanks to Prime Digital Academy who equipped and helped me to make this application a reality.

## Support

If you have suggestions or issues, please email me at regs0404@gmail.com
