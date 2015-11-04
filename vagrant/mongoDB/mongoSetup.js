conn = new Mongo();
db = conn.getDB("development");
if (db.getUsers().length == 0) {
db.createUser(
    {
        user: "admin",
        pwd: "admin",
        roles: [ { role: "userAdmin", db: "development" } ]
    }
);

}
