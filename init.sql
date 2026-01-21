-- データベース作成
CREATE DATABASE IF NOT EXISTS shop_db;
USE shop_db;

-- テーブル作成
CREATE TABLE IF NOT EXISTS shops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    lat DOUBLE,
    lng DOUBLE,
    open_time TIME,
    close_time TIME
);

-- テストデータ
INSERT INTO shops (name, lat, lng, open_time, close_time) VALUES
('テスト店A', 35.3001, 139.4812, '00:00:00', '23:59:59'),
('テスト店B', 35.3010, 139.4820, '09:00:00', '22:00:00');
