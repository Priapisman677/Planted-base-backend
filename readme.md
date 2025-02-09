Regarding environment variables files:

You will find three environment variable files.
The one that is on the root will only be used for MIGRATIONS.
If you want to run a migration to a specific database whether it's test or development uncommented and run the migration.

The environment variable files that are in the config folder Will serve for prisma to actually get connected to the database during execution of the code, for example to perform "user.findMany()".
Prisma can definitely take a look into these files and get connected to the specified database even if the databases in the .env on the root is commented.