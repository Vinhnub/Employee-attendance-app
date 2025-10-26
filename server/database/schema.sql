DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Shift;
DROP TABLE IF EXISTS UserLog;

CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
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
CREATE TABLE UserLog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    date_time TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE INDEX idx_shift_time ON Shift (start_time, end_time);
CREATE INDEX idx_shift_user ON Shift (user_id);
CREATE INDEX idx_log_user ON UserLog (user_id);