DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Shift;

CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT PRIMARY KEY,
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

CREATE INDEX idx_shift_time ON Shift (start_time, end_time);
CREATE INDEX idx_shift_user ON Shift (user_id);
