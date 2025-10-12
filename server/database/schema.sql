DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Shift;

CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    fullname TEXT,
    role TEXT
);

CREATE TABLE Shift (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time TEXT,
    end_time TEXT,
    note TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES User(id)
);
