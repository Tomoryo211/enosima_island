-- データベース作成
CREATE DATABASE IF NOT EXISTS shop_db;
USE shop_db;

-- テーブル作成
CREATE TABLE IF NOT EXISTS shops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category ENUM('飲食', '体験') NOT NULL,
    image_url VARCHAR(255),
    lat DOUBLE NOT NULL,
    lng DOUBLE NOT NULL,
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    closed_on VARCHAR(50), -- 例: "第2水曜日", "火曜日"
    tel VARCHAR(20),
    address VARCHAR(255)
);

