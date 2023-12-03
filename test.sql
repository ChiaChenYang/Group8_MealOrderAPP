INSERT INTO restaurants (restaurantName, restaurantLocation, factoryLocation, restaurantPhone, restaurantMail, prepareTime, rating) VALUES ("McDonalds", "某地址", "新竹", "0888-222333", "test@gmail.com", 30, 2.5);

INSERT INTO orders (totalPrice, orderTime, status, paymentMethod, pickupMethod) VALUES (150, '2023-11-21 12:45:56', 'progressing', 'cash', '外帶'); 

INSERT INTO orders (totalPrice, orderTime, status, paymentMethod, pickupMethod) VALUES (200, '2023-11-21 12:28:51', 'progressing', 'cash', '外帶'); 

INSERT INTO orders (totalPrice, orderTime, status, paymentMethod, pickupMethod) VALUES (200, '2023-11-21 12:52:11', 'progressing', 'cash', '內用'); 

INSERT INTO orders (totalPrice, orderTime, status, paymentMethod, pickupMethod) VALUES (120, '2023-11-21 13:10:08', 'incoming', 'creditCard', '外帶');

UPDATE orders Set restaurantId=1;

INSERT INTO menus (restaurantId, menuName, menuTime) VALUES (1, '中午菜單', '午段');

INSERT INTO menuitems (menuId, itemName, prepareTime, price, totalQuantity) VALUES (1, '大麥克', 5, 50, 26);

INSERT INTO menuitems (menuId, itemName, prepareTime, price, totalQuantity) VALUES (1, '雙層牛肉吉士堡', 8, 60, 13);

INSERT INTO orderitems (itemId, orderId, orderQuantity, orderItemNote) VALUES (2, 2, 1, '小辣');

INSERT INTO orderitems (itemId, orderId, orderQuantity) VALUES (3, 2, 2);

INSERT INTO orderitems (itemId, orderId, orderQuantity) VALUES (3, 3, 1);

INSERT INTO orderitems (itemId, orderId, orderQuantity) VALUES (3, 1, 1);

UPDATE orders Set expectedFinishedTime=ADDTIME(orderTime, '0:20:0');

INSERT INTO orders (orderId, totalPrice, orderTime, status, paymentMethod, pickupMethod) VALUES (5, 100, '2023-11-21 13:05:33', 'incoming', 'creditCard', '外帶');

INSERT INTO orders (orderId, totalPrice, orderTime, status, paymentMethod, pickupMethod) VALUES (6, 150, '2023-11-21 13:06:31', 'incoming', 'creditCard', '外帶');

INSERT INTO orderitems (itemId, orderId, orderQuantity) VALUES (2, 5, 2);

INSERT INTO orderitems (itemId, orderId, orderQuantity) VALUES (2, 6, 3);

INSERT INTO consumers (displayName, department, jobTitle, consumerFactoryLocation, consumerPhone, consumerEmail) VALUES ('Andrew','研發','經理','新竹','0950-123-456','test@gmail.com');

INSERT INTO shoppingcarts (consumerId, restaurantId) VALUES (1, 1);

INSERT INTO consumers (displayName, department, jobTitle, consumerFactoryLocation, consumerPhone, consumerEmail) VALUES ('Joe','測試','工程師','新竹','0950-321-456','test@gmail.com');