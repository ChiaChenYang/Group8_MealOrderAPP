INSERT INTO restaurants (restaurantId, restaurantName, restaurantLocation, factoryLocation, restaurantPhone, restaurantMail, prepareTime, rating) VALUES (1, "McDonalds", "某地址", "新竹", "0888-222333", "test@gmail.com", 30, 2.5);

INSERT INTO restaurants (restaurantId, restaurantName, restaurantLocation, factoryLocation, restaurantPhone, restaurantMail, prepareTime, rating) VALUES (2, "段純真", "某地址", "新竹", "0888-222343", "test2@gmail.com", 35, 3.5);

INSERT INTO menus (menuId, restaurantId, menuName, menuTime) VALUES (1, 1, '中午菜單', '午段');

INSERT INTO menuitems (menuId, itemName, prepareTime, price, totalQuantity) VALUES (1, '大麥克', 5, 50, 26);

INSERT INTO menuitems (menuId, itemName, prepareTime, price, totalQuantity) VALUES (1, '雙層牛肉吉士堡', 8, 60, 13);

INSERT INTO menus (menuId, restaurantId, menuName, menuTime) VALUES (2, 2, '中午菜單', '午段');

INSERT INTO menuitems (menuId, itemName, prepareTime, price, totalQuantity) VALUES (2, '紅燒牛肉麵', 15, 240, 100);

INSERT INTO menuitems (menuId, itemName, prepareTime, price, totalQuantity) VALUES (2, '清燉牛肉麵', 12, 210, 150);

INSERT INTO menus (restaurantId, menuName, menuTime) VALUES (1, '中午菜單', '午段');

INSERT INTO consumers (displayName, department, jobTitle, consumerFactoryLocation, consumerPhone, consumerEmail) VALUES ('Andrew','研發','經理','新竹','0950-123-456','test@gmail.com');

INSERT INTO consumers (displayName, department, jobTitle, consumerFactoryLocation, consumerPhone, consumerEmail) VALUES ('Joe','測試','工程師','新竹','0950-321-456','test@gmail.com');