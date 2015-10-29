conn = new Mongo();
db = conn.getDB("development");
db.createUser(
    {
        user: "admin",
        pwd: "admin",
        roles: [ { role: "userAdmin", db: "development" } ]
    }
);