CREATE TABLE IF NOT EXISTS restaurants(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image_url VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS dishes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(100),
    dish_type VARCHAR(100), -- For example drinks, deserts, main dish, etc.
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

INSERT INTO restaurants (name, image_url) VALUES('La antigua', 'https://www.facebook.com/share/1Ap6g59Exr/');
INSERT INTO dishes(restaurant_id, name, price, image_url, dish_type) VALUES
(1, 'Bisteces a la Mexicana', 150.00, 'https://www.facebook.com/share/p/1CXTDk73RL/', 'main'),
(1, 'Taquitos dorados', 120.00, 'https://www.facebook.com/share/1EKU9K5RDc/', 'entrance');