const RestaurantInfoService = require('../RestaurantInfoService');
const RestaurantSalesReportService = require('../RestaurantSalesReportService');
const { restaurants, orders, Sequelize, categories, restaurantlatestnews, Op } = require('../../models');

jest.useFakeTimers();

jest.mock('../../models', () => ({
    restaurants: { 
        findAll: jest.fn(),
        create: jest.fn(),
        findByPk: jest.fn(), 
        findOne: jest.fn(),
        update: jest.fn()
    },
    orders: { 
        findAll: jest.fn() 
    },
    categories: { 
        findOrCreate: jest.fn(),
        through: { attributes: [] },
        findAll: jest.fn(),
        set: jest.fn() 
    },
    restaurantlatestnews: { 
        create: jest.fn(),
        findAll: jest.fn(),
        destroy: jest.fn()
    },
    Sequelize: {
        fn: jest.fn(),
        col: jest.fn(),
        Op: { lte: jest.fn() },
    },
    sequelize: {
        fn: jest.fn(),
        col: jest.fn(),
        Op: { lte: jest.fn() },
        where: jest.fn(),
    },
    Op: {
        gte: jest.fn(), 
        lt: jest.fn(), 
        and: jest.fn(),
    }
}));

describe('Restaurant Info Service Tests', ()=> {
    test('check if we can show restaurants in the homepage for consumers', async() => {

        const mockRestaurantsData = [
            {
                dataValues: {
                    restaurantId: 1,
                    restaurantName: 'Restaurant A',
                    restaurantImage: 'image-url-a',
                    serviceMethod: '內用',
                    prepareTime: 20,
                    categories: [{ dataValues: { categoryName: '中式' } }]
                }
            },
            {
                dataValues: {
                    restaurantId: 2,
                    restaurantName: 'Restaurant B',
                    restaurantImage: 'image-url-b',
                    serviceMethod: '外帶',
                    prepareTime: 30,
                    categories: [{ dataValues: { categoryName: '美式' } }]
                }
            },
        ];

        const mockOrdersData = [
            {
                dataValues: {
                    avgRating: 4.5
                }
            },
            // ... 其他訂單數據
        ];

        restaurants.findAll.mockResolvedValue(mockRestaurantsData);
        orders.findAll.mockResolvedValue(mockOrdersData);

        const results = await RestaurantInfoService.showAllRestaurants('晶圓二廠');

        expect(results).toEqual({
            1: {
                id: 1,
                name: 'Restaurant A',
                type: '中式',
                image: 'image-url-a',
                service: '內用',
                preparetime: 20,
                rating: 4.5
            },
            2: {
                id: 2,
                name: 'Restaurant B',
                type: '美式',
                image: 'image-url-b',
                service: '外帶',
                preparetime: 30,
                rating: 4.5
            }
        });

    });
   
    test('should get restaurant information', async () => {
        // 模擬 restaurants.findByPk 的返回值
        restaurants.findByPk.mockResolvedValueOnce({
            restaurantId: 1,
            restaurantName: 'Test Restaurant',
            istemporaryRestaurant: false,
            categories: [
                { categoryName: 'Category1' },
                { categoryName: 'Category2' },
            ],
            restaurantPhone: '123456789',
            factoryArea: 'Factory Area',
            factoryLocation: 'Factory Location',
            restaurantLocation: 'Restaurant Location',
            restaurantlatestnews: [
                { newsContent: 'Latest News 1' },
                { newsContent: 'Latest News 2' },
            ],
            isOpening: 1,
            prepareTime: 30,
            stationStartDate: new Date(),
            stationEndDate: new Date(),
            serviceMethod: 'Online',
        });

        // 調用 getRestaurantInfo 方法
        const result = await RestaurantInfoService.getRestaurantInfo(1); // 1 是 restaurantId

        // 斷言返回的格式化信息是否符合預期
        expect(result).toEqual({
            restaurantId: 1,
            restaurantName: 'Test Restaurant',
            restaurantGroup: '固定櫃',
            restaurantType: 'Category1, Category2',
            telephoneNumber: '123456789',
            factoryArea: 'Factory Area',
            factoryLocation: 'Factory Location',
            restaurantLocation: 'Restaurant Location',
            latestNews: ['Latest News 1', 'Latest News 2'],
            isOpening: true,
            prepareTime: 30,
            startTime: expect.any(Date),
            endTime: expect.any(Date),
            acceptingOrderType: 'Online',
        });
    });

    test('should show information status', async () => {
        // 模擬 restaurants.findByPk 的返回值
        restaurants.findByPk.mockResolvedValueOnce({
            dataValues: {
                // 這裡放入你期望的返回值，注意確保包含所有可能的屬性
                rating: 4.5,
                restaurantlatestnews: [{ newsContent: 'Latest News 1' }, { newsContent: 'Latest News 2' }],
                isOpening: true,
                istemporaryRestaurant: false,
                isorderAvailable: true,
                // 其他屬性...
            },
        });

        // 調用 showInfoStatus 方法
        const result = await RestaurantInfoService.showInfoStatus(1); // 1 是 restaurantId

        // 斷言應該沒有錯誤訊息，並且返回的是一個空數組，表示所有信息都已填寫
        expect(result).toEqual([]);
    });

    test('should show category restaurants', async () => {
        // 模擬 categories.findAll 的返回值
        categories.findAll.mockResolvedValueOnce([
            { categoryName: 'Category1' },
            { categoryName: 'Category2' },
        ]);

        // 模擬 restaurants.findAll 的返回值
        restaurants.findAll.mockResolvedValueOnce([
            {
                dataValues: {
                    restaurantId: 1,
                    restaurantName: 'Test Restaurant 1',
                    restaurantImage: 'image1.jpg',
                    serviceMethod: 'Online',
                    prepareTime: 30,
                    categories: [
                        { dataValues: { categoryName: 'Category1' } },
                    ],
                },
            },
            {
                dataValues: {
                    restaurantId: 2,
                    restaurantName: 'Test Restaurant 2',
                    restaurantImage: 'image2.jpg',
                    serviceMethod: 'Dine-in',
                    prepareTime: 45,
                    categories: [
                        { dataValues: { categoryName: 'Category2' } },
                    ],
                },
            },
        ]);

        // 模擬 orders.findAll 的返回值
        orders.findAll.mockResolvedValue([
            {
                dataValues: {
                    avgRating: 4.15,
                },
            },
        ]);

        // 調用 showCategoryRestaurants 方法
        const result = await RestaurantInfoService.showCategoryRestaurants('Location1', 'Category1');

        // 斷言返回的格式化信息是否符合預期
        expect(result).toEqual({
            1: {
                id: 1,
                name: 'Test Restaurant 1',
                type: 'Category1',
                image: 'image1.jpg',
                service: 'Online',
                preparetime: 30,
                rating: 4.15, // (4.5 + 3.8) / 2
            },
            2: {
                id: 2,
                name: 'Test Restaurant 2',
                type: 'Category2',
                image: 'image2.jpg',
                service: 'Dine-in',
                preparetime: 45,
                rating: 4.15, // (4.5 + 3.8) / 2
            },
        });
    });

    test('should show temporary restaurants news', async () => {
        // 模擬 restaurants.findAll 的返回值
        restaurants.findAll.mockResolvedValueOnce([
            {
                dataValues: {
                    restaurantId: 1,
                    restaurantName: 'Test Restaurant 1',
                    restaurantImage: 'image1.jpg',
                    serviceMethod: 'Online',
                    stationStartDate: '2023-01-01T00:00:00.000Z',
                    stationEndDate: '2023-12-31T23:59:59.999Z',
                    prepareTime: 30,
                    categories: [
                        { dataValues: { categoryName: 'Category1' } },
                    ]
                },
                restaurantlatestnews: [
                    { newsContent: 'News Content 1' },
                    { newsContent: 'News Content 2' },
                ]
            },
        ]);

        // 模擬 categories.findAll 的返回值
        categories.findAll.mockResolvedValueOnce([
            { categoryName: 'Category1' },
        ]);

        // 模擬 orders.findAll 的返回值
        orders.findAll.mockResolvedValueOnce([
            {
                dataValues: {
                    avgRating: 4.15,
                },
            },
        ]);

        // 模擬當前時間
        jest.setSystemTime(new Date('2023-06-15T12:00:00.000Z'));

        // 調用 showTempRestaurantsNews 方法
        const result = await RestaurantInfoService.showTempRestaurantsNews('Location1');

        // 斷言返回的格式化信息是否符合預期
        expect(result).toEqual({
            1: {
                isBetweenStartEndTime: true,
                id: 1,
                name: 'Test Restaurant 1',
                type: 'Category1',
                image: 'image1.jpg',
                service: 'Online',
                evaluate: 4.15,
                prepare_time: 30,
                LatestNews: ['News Content 1', 'News Content 2'],
            },
        });
    });

    test('should show time information', async () => {
        // 模擬 restaurants.findByPk 的返回值
        restaurants.findByPk.mockResolvedValueOnce({
            dataValues: {
                restaurantId: 1,
                stationStartDate: '2023-06-15T12:00:00.000Z',
                stationEndDate: '2023-06-30T12:00:00.000Z',
                prepareTime: 30,
            },
        });

        // 調用 showTime 方法
        const result = await RestaurantInfoService.showTime(1);

        // 斷言返回的格式化信息是否符合預期
        expect(result).toEqual({
            start_time: {
                year: 2023,
                month: 6,
                date: 15,
            },
            end_time: {
                year: 2023,
                month: 6,
                date: 30,
            },
            prepare_time: 30,
        });
    });

    test('should create restaurant information and related records', async () => {
        // 模拟 restaurants.create 的返回值
        const mockCreatedRestaurant = {
          restaurantId: 1,
          restaurantName: 'Test Restaurant',
          restaurantLocation: 'Test Location',
          isOpening: true,
          addCategory: jest.fn()
          // 其他属性
        };
        restaurants.create.mockResolvedValueOnce(mockCreatedRestaurant);
    
        // 模拟 restaurantlatestnews.create 的返回值
        restaurantlatestnews.create.mockResolvedValueOnce({
          restaurantId: 1,
          newsContent: 'Latest News 1',
          releaseTime: new Date(),
        });
    
        // 模拟 categories.findOrCreate 的返回值
        categories.findOrCreate.mockResolvedValueOnce([{ categoryName: 'Category1' }]);
    
        // 模拟 sequelize 模型实例的 addCategory 方法
        // const mockAddCategory = jest.fn();
        // const mockRestaurantInstance = {
        //   ...mockCreatedRestaurant, // Make sure mockCreatedRestaurant is defined before using it
        //   addCategory: mockAddCategory,
        // };
        // restaurants.findByPk.mockResolvedValueOnce(mockRestaurantInstance);
    
        // 调用 createRestaurantInfo 方法
        await RestaurantInfoService.createRestaurantInfo({
          restaurantId: 1,
          restaurantName: 'Test Restaurant',
          restaurantLocation: 'Test Location',
          isOpening: true,
          startTime: '2023-12-15T10:00:00.000Z',
          endTime: '2023-12-15T20:00:00.000Z',
          logo: 'test_logo_url',
          prepareTime: 30,
          restaurantGroup: '固定櫃',
          restaurantType: 'Category1',
          telephoneNumber: '123456789',
          factoryArea: 'Factory Area',
          factoryLocation: 'Factory Location',
          latestNews: ['Latest News 1'],
          acceptingOrderType: 'Online',
        });
    
        // 断言 restaurants.create 被调用了一次
        expect(restaurants.create).toHaveBeenCalledTimes(1);
    
        // 断言 restaurantlatestnews.create 被调用了一次
        expect(restaurantlatestnews.create).toHaveBeenCalledTimes(1);
    
        // 断言 categories.findOrCreate 被调用了一次
        expect(categories.findOrCreate).toHaveBeenCalledTimes(1);
    
        // 断言 mockAddCategory 被调用了一次
        // expect(mockAddCategory).toHaveBeenCalledTimes(1);
        // 可以添加其他与 mockAddCategory 相关的断言
    });

    // test('should modify restaurant information and related records', async () => {
    //     // Mock input data
    //     const restaurantInfo = {
    //         restaurantId: 1,
    //         restaurantName: 'Modified Restaurant',
    //         restaurantLocation: 'Modified Location',
    //         isOpening: false,
    //         startTime: '2023-12-15T08:00:00.000Z',
    //         endTime: '2023-12-15T18:00:00.000Z',
    //         logo: 'modified_logo_url',
    //         prepareTime: 45,
    //         restaurantGroup: '流動櫃',
    //         restaurantType: 'NewCategory',
    //         telephoneNumber: '987654321',
    //         factoryArea: 'Modified Factory Area',
    //         factoryLocation: 'Modified Factory Location',
    //         latestNews: ['Modified News 1', 'Modified News 2'],
    //         acceptingOrderType: 'Offline',
    //     };
      
    //     // Mock existing restaurant data
    //     const mockExistingRestaurant = {
    //         restaurantId: 1,
    //         restaurantName: 'Test Restaurant',
    //         restaurantLocation: 'Test Location',
    //         isOpening: true,
    //         update: jest.fn(),
    //         setCategories: jest.fn(),
    //         // Other properties
    //     };
    //     restaurants.findOne.mockResolvedValue(mockExistingRestaurant);
      
    //     // Mock update operation
    //     mockExistingRestaurant.update.mockResolvedValue(1);
      
    //     // Mock destroy operation
    //     restaurantlatestnews.destroy.mockResolvedValueOnce(2); // Assuming 2 rows were deleted
      
    //     // Mock create operation
    //     restaurantlatestnews.create.mockResolvedValueOnce({
    //         restaurantId: 1,
    //         newsContent: 'Modified News 1',
    //         // releaseTime: expect.any(Date),
    //     });
      
    //     // Mock findOrCreate operation
    //     categories.findOrCreate.mockResolvedValueOnce([{ categoryName: 'NewCategory' }]);
      
    //     // Mock setCategories operation
    //     categories.set.mockResolvedValueOnce(); // Assuming successful set operation
      
    //     // Call the function
    //     await RestaurantInfoService.modifyRestaurantInfo(restaurantInfo);
      
    //     // Verify that relevant functions were called with the correct parameters
    //     expect(restaurants.findOne).toHaveBeenCalledWith({ where: { restaurantId: 1 } });
    //     expect(mockExistingRestaurant.update).toHaveBeenCalledTimes(1);(
    //       {
    //         restaurantName: 'Modified Restaurant',
    //         restaurantLocation: 'Modified Location',
    //         isOpening: false,
    //         stationStartDate: new Date('2023-12-15T08:00:00.000Z'),
    //         stationEndDate: new Date('2023-12-15T18:00:00.000Z'),
    //         restaurantImage: 'modified_logo_url',
    //         prepareTime: 45,
    //         factoryArea: 'Modified Factory Area',
    //         factoryLocation: 'Modified Factory Location',
    //         restaurantPhone: '987654321',
    //         serviceMethod: 'Offline',
    //         istemporaryRestaurant: true,
    //       }
    //     //   { where: { restaurantId: 1 } }
    //     );
    //     expect(restaurantlatestnews.destroy).toHaveBeenCalledWith({
    //       where: { restaurantId: 1 },
    //     });
    //     expect(restaurantlatestnews.create).toHaveBeenCalledWith({
    //       restaurantId: 1,
    //       newsContent: 'Modified News 1',
    //     //   releaseTime: expect.any(Date),
    //     });
    //     expect(categories.findOrCreate).toHaveBeenCalledWith({
    //       where: { categoryName: 'NewCategory' },
    //     });
    //     expect(categories.set).toHaveBeenCalledWith([{ categoryName: 'NewCategory' }]);
    // });
      

});

describe('Restaurant Sales Report Servie Test', () => {

    test('check if daily report is ok', async () => {
        // 假設的測試數據
        const mockOrdersData = [
            { getDataValue: jest.fn(attribute => {
                if (attribute === 'orderHour') return 12;
                if (attribute === 'totalSales') return 100;
                return 0; // 返回 0 而不是 undefined
            })},
            { getDataValue: jest.fn(attribute => {
                if (attribute === 'orderHour') return 13;
                if (attribute === 'totalSales') return 150;
                return 0; // 返回 0 而不是 undefined
            })},
            // 其他數據...
        ];
    
        orders.findAll.mockResolvedValue(mockOrdersData);
    
        // 執行 getDailyReport 函數
        const result = await RestaurantSalesReportService.getDailyReport(1, 2023, 10, 30, 'afternoon');
    
        // 驗證結果是否符合預期
        expect(result[1]).toBeCloseTo(100, 2); // 表示比較到小數點後 2 位
        expect(result[2]).toBeCloseTo(150, 2);
    
        // 驗證 findAll 方法是否被調用
        expect(orders.findAll).toHaveBeenCalledWith({
            where: expect.any(Object),
            attributes: expect.any(Array),
            group: expect.any(Array),
            order: expect.any(Array),
        });
    });    

    test('should get yearly report', async () => {
        // 模擬 orders.findAll 的返回值
        orders.findAll.mockResolvedValueOnce([
            {
                getDataValue: jest.fn()
                    .mockReturnValueOnce(1) // 返回數字而不是字符串
                    .mockReturnValueOnce(100),
            },
            {
                getDataValue: jest.fn()
                    .mockReturnValueOnce(2)
                    .mockReturnValueOnce(150),
            },
            // 根據需要添加更多返回值
        ]);

        // 調用 getYearlyReport 方法
        const result = await RestaurantSalesReportService.getYearlyReport(1, '2023', 'afternoon');

        // 斷言返回的格式化信息是否符合預期
        expect(result).toEqual([100, 150, ...new Array(10).fill(0)]);
    });

    // describe('getWeekNumber', () => {
    //     test('should return the correct week number', () => {
    //       const date = new Date('2023-06-15T12:00:00.000Z');
    //       const result = getWeekNumber(date);
    //       expect(result).toBe(3); // 2023年6月15日是第3週
    //     });
    // });
      
    // describe('getWeeksInMonth', () => {
    //     test('should return the correct number of weeks in a month', () => {
    //         const result = getWeeksInMonth(2023, 6); // 2023年6月
    //         expect(result).toBe(5); // 2023年6月有5週
    //     });
    // });

    test('should calculate weekly sales correctly', async () => {
        // 模擬 orders.findAll 的返回值
        orders.findAll.mockResolvedValue([
          {
            getDataValue: jest.fn()
            .mockReturnValueOnce('2023-06-05')
            .mockReturnValueOnce(100),
          },
          {
            getDataValue: jest.fn()
            .mockReturnValueOnce('2023-06-18')
            .mockReturnValueOnce(150),
          },
          // 可根據實際情況添加更多返回值
        ]);
    
        // 調用 getMonthlyReport 方法
        const result = await RestaurantSalesReportService.getMonthlyReport(1, 2023, 6, 'afternoon');
    
        // 斷言返回的銷售數據是否符合預期
        expect(result).toEqual([100, 0, 150, 0, 0]);
    });

    test('should calculate weekly sales correctly', async () => {
        // 模拟 orders.findAll 的返回值
        orders.findAll.mockResolvedValue([
          {
            getDataValue: jest.fn().
            mockReturnValueOnce('2023-06-10')
            .mockReturnValueOnce(100),
          },
          {
            getDataValue: jest.fn()
            .mockReturnValueOnce('2023-06-15')
            .mockReturnValueOnce(150),
          },
          // 可根據實際情況添加更多返回值
        ]);
    
        // 调用 getWeeklyReport 方法
        const result = await RestaurantSalesReportService.getWeeklyReport(1, 2023, 6, 15, 'afternoon');
    
        // 断言返回的銷售數據是否符合預期
        expect(result).toEqual([0, 100, 0, 0, 0, 0, 150]);
    });

});

describe('Restaurant Rating Service - getHistoryRating', () => {
  
    test('should calculate history, last month, and current month ratings correctly', async () => {
      // 模拟 orders.findAll 的返回值
      orders.findAll.mockResolvedValueOnce([
        {
          dataValues: {
            avgRating: 4.5,
          },
        },
      ]); // historyRating
      orders.findAll.mockResolvedValueOnce([
        {
          dataValues: {
            avgRating: 3.8,
          },
        },
      ]); // lastMonthRating
      orders.findAll.mockResolvedValueOnce([
        {
          dataValues: {
            avgRating: 4.2,
          },
        },
      ]); // currentMonthRating
  
      // 调用 getHistoryRating 方法
      const result = await RestaurantSalesReportService.getHistoryRating(1);
  
      // 断言返回的评分数据是否符合预期
      expect(result).toEqual([4.5, 3.8, 4.2]);
    });
  
    // 可以添加更多的测试用例
});