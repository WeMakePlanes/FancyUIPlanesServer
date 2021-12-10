Stuff for planes using type-graphql, typescript, and primsa.

1. Create a .env file at the root. This is for connecting prisma to your sql instance.

2. In the .env file, add a DATEBASE_URL variable and add the required information. If you do not know how to create the string for a mySQL connection, refer to the [Prisma documentation](https://www.prisma.io/docs/concepts/database-connectors/mysql).

3. After the DATABASE_URL is setup correctly, in the server folder, run ```
                                                                        npx prisma generate
                                                                        ```.
   If you wish to push to production, you may have to run a migration once with
          ```
          npx prisma migrate dev
          ``` after changing your .env db url string to the hosted db.

4. Run ```
       npm start
       ``` to initialize the application.