const sqlite3 = require('sqlite3').verbose();

class MyDBManager {

  createDB() {

    const db = new sqlite3.Database('myDB2', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the myDB2 SQlite database.');

      db.run("CREATE TABLE if not exists users(user_id integer PRIMARY KEY, user_name text NOT NULL, password text NOT NULL)");

      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });

      this.createTable();
    });
  }

  createTable() {
    const db = new sqlite3.Database('myDB2', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the myDB2 SQlite database.');
      db.run("DELETE FROM users");
      db.run("INSERT into users(user_id,user_name,password) VALUES (2,'moroder','pass')");
      db.run("INSERT into users(user_id,user_name,password) VALUES (3,'bla','wordd')");

      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });
    });
  }

  login(user, callback) {
    const db = new sqlite3.Database('myDB2', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the myDB2 SQlite database.');
    });

    db.serialize(function() {
      const getStmt = `SELECT * from users where user_name=${user}`;
      db.get(getStmt, function(err, row) {
        callback(true);
        //
        // if (row) {
        //   callback(true);
        // }
      });
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });
    });
  }
}

export default new MyDBManager();





