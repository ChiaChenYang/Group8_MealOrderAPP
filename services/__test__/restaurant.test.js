const RestaurantsInfoService = require('../RestaurantInfoService');

const { restaurants, orders, Sequelize } = require('../../models');

jest.mock('../../models', () => ({
    restaurants: { findAll: jest.fn() },
    orders: { findAll: jest.fn() },
    Sequelize: {
        fn: jest.fn(),
        col: jest.fn(),
        Op: { lte: jest.fn() },
    }
}));

describe('Restaurant Service tests', ()=> {
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

        const results = await RestaurantsInfoService.showAllRestaurants('晶圓二廠');

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
});