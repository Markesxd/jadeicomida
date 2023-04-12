CREATE TABLE IF NOT EXISTS food (
        id INT AUTO_INCREMENT,
        manha TINYINT DEFAULT 0,
        tarde TINYINT DEFAULT 0,
        noite TINYINT DEFAULT 0,
        data DATE,
        PRIMARY KEY (id)
    )