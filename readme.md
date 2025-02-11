Regarding environment variables files:

You will find three environment variable files.
The one that is on the root will only be used for MIGRATIONS.
If you want to run a migration to a specific database whether it's test or development uncommented and run the migration.

The environment variable files that are in the config folder Will serve for prisma to actually get connected to the database during execution of the code, for example to perform "user.findMany()".
Prisma can definitely take a look into these files and get connected to the specified database even if the databases in the .env on the root is commented.












{ "itemId": 1, "tagId": 3 }  // Oxygen Tank → Equipment
{ "itemId": 1, "tagId": 2 }  // Oxygen Tank → Consumable

{ "itemId": 2, "tagId": 1 }  // Metal Plate → Resource
{ "itemId": 2, "tagId": 3 }  // Metal Plate → Equipment

{ "itemId": 3, "tagId": 1 }  // Bioplastic Sheet → Resource

{ "itemId": 4, "tagId": 2 }  // Medical Supplies → Consumable

{ "itemId": 5, "tagId": 2 }  // Water Container → Consumable

{ "itemId": 6, "tagId": 3 }  // Solar Panel Unit → Equipment
{ "itemId": 6, "tagId": 5 }  // Solar Panel Unit → Energy

{ "itemId": 7, "tagId": 2 }  // Food Pack → Consumable

{ "itemId": 8, "tagId": 4 }  // Circuit Board → Electronics
{ "itemId": 8, "tagId": 3 }  // Circuit Board → Equipment

{ "itemId": 9, "tagId": 4 }  // Robot Spare Parts → Electronics
{ "itemId": 9, "tagId": 1 }  // Robot Spare Parts → Resource

{ "itemId": 10, "tagId": 5 }  // Energy Cell → Energy
{ "itemId": 10, "tagId": 2 }  // Energy Cell → Consumable






Here’s a simple role-to-tag relationship based on the item tags:

Engineer → Equipment, Electronics, Energy
Worker → Resource, Consumable
Medic → Consumable (specifically for medical-related items like Medical Supplies)
This setup ensures:

Engineers handle technical and mechanical components.
Workers manage general resources and consumables.
Medics handle medical-related consumables.
Let me know if you need adjustments!







[
  {
    "name": "Hiroshi Tanaka",
    "email": "hiroshi.tanaka@space.com",
    "password": "FixItSamurai42",
    "role": "ENGINEER"
  },
  {
    "name": "Amara Okafor",
    "email": "amara.okafor@space.com",
    "password": "OreFinder5000",
    "role": "WORKER"
  },
  {
    "name": "Luca Moretti",
    "email": "luca.moretti@space.com",
    "password": "WrenchTornado!",
    "role": "ENGINEER"
  },
  {
    "name": "Javier Gómez",
    "email": "javier.gomez@space.com",
    "password": "ShovelKing999",
    "role": "WORKER"
  },
  {
    "name": "Aisha Khan",
    "email": "aisha.khan@space.com",
    "password": "HealingHands007",
    "role": "MEDIC"
  },
  {
    "name": "Viktor Petrov",
    "email": "viktor.petrov@space.com",
    "password": "EnergyBoosterXL",
    "role": "ENGINEER"
  },
  {
    "name": "Chen Wei",
    "email": "chen.wei@space.com",
    "password": "SolarTechMaster",
    "role": "ENGINEER"
  }
]

OVERVIEWER token: eyJhbGciOiJIUzI1NiIsInR5cGUiOiJqd3QifQ.eyJ1c2VySWQiOjEzfQ.Lwv2EcWDcKXDWGaohpxZScAVC_nzrl9THJIOoaAnfkM

ENGINEER token: eyJhbGciOiJIUzI1NiIsInR5cGUiOiJqd3QifQ.eyJ1c2VySWQiOjZ9.Fgr5K8VrKH7Bni3M39tS-JfyFqIyJn2zpnuGxBeZtGc