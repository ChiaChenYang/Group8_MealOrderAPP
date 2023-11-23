INSERT INTO restaurants (restaurantName, restaurantLocation, factoryLocation, restaurantPhone, restaurantMail, prepareTime, rating) VALUES ("McDonalds", "某地址", "新竹", "0888-222333", "test@gmail.com", 30, 2.5);

INSERT INTO orders (totalPrice, orderTime, status, paymentMethod, pickupMethod) VALUES (150, '2023-11-21 12:45:56', 'progressing', 'cash', '外帶'); 

INSERT INTO orders (totalPrice, orderTime, status, paymentMethod, pickupMethod) VALUES (200, '2023-11-21 12:28:51', 'progressing', 'cash', '外帶'); 

INSERT INTO orders (totalPrice, orderTime, status, paymentMethod, pickupMethod) VALUES (200, '2023-11-21 12:52:11', 'progressing', 'cash', '內用'); 

INSERT INTO orders (totalPrice, orderTime, status, paymentMethod, pickupMethod) VALUES (120, '2023-11-21 13:10:08', 'incoming', 'creditCard', '外帶');

UPDATE orders Set restaurantId=1;

INSERT INTO menuitems (menuId, itemName, prepareTime, price, availableQuantity) VALUES (1, '大麥克', 5, 50, 26);

INSERT INTO menuitems (menuId, itemName, prepareTime, price, availableQuantity) VALUES (1, '雙層牛肉吉士堡', 8, 60, 13);

INSERT INTO orderitems (itemId, orderId, orderQuantity, orderItemNote) VALUES (1, 2, 1, '小辣')

INSERT INTO orderitems (itemId, orderId, orderQuantity) VALUES (2, 2, 2)

INSERT INTO orderitems (itemId, orderId, orderQuantity) VALUES (2, 3, 1)