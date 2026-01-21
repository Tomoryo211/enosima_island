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

-- テストデータ
INSERT INTO shops (name, category, image_url, lat, lng, open_time, close_time, closed_on, tel, address) VALUES
('怪力や', '飲食', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400', 35.3001, 139.4812, '10:00:00', '17:00:00', '第2水曜日', '000-0000-0000', '江の島1-1-1'),
('キラキラ屋', '体験', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400', 35.3010, 139.4820, '10:00:00', '18:00:00', '火曜日', '000-0000-0001', '江の島1-2-3'),
('江の島フード', '飲食', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400', 35.3020, 139.4830, '11:00:00', '21:00:00', '年中無休', '000-0000-0002', '江の島1-3-5'),
('サーフィンスクール', '体験', 'https://images.unsplash.com/photo-1502680399488-2a658321d3a4?q=80&w=400', 35.3030, 139.4840, '09:00:00', '16:00:00', '不定休', '000-0000-0003', '江の島1-4-7'),
('海鮮丼の店', '飲食', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400', 35.3005, 139.4815, '10:00:00', '20:00:00', '水曜日', '000-0000-0004', '江の島2-1-1'),
('お土産ショップ', '体験', 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=400', 35.3015, 139.4825, '10:00:00', '18:30:00', '木曜日', '000-0000-0005', '江の島2-2-2');
