const ConsumerInfoService = require('../ConsumerInfoService');
const ConsumerExpenseReportService = require('../ConsumerExpenseReportService');
const { restaurants, orders, Sequelize, consumers } = require('../../models');

jest.mock('../../models', () => ({
    restaurants: { findAll: jest.fn() },
    orders: { findAll: jest.fn() },
    consumers: { findByPk: jest.fn(), findOne: jest.fn() },
    Sequelize: {
        fn: jest.fn(),
        col: jest.fn(),
        Op: { lte: jest.fn() },
    },
    sequelize: {
        fn: jest.fn(),
        col: jest.fn(),
        Op: { lte: jest.fn() },
    }
}));

describe('Consumer Service Tests', () => {

    test('should return expense report for a consumer in a specific month', async () => {
        const mockOrdersData = [
            // mock order data
            {
                dataValues: {
                    orderId: 1,
                    totalPrice: 50,
                    completeTime: new Date('2023-10-05T12:30:00Z'),
                },
                restaurant: {
                    dataValues: {
                        restaurantName: 'Restaurant A',
                    },
                },
            },
            // ... add more mock order data as needed
        ];

        // Mock the implementation of findAll to return the mockOrdersData
        orders.findAll.mockResolvedValue(mockOrdersData);

        const consumerId = 123; // replace with an actual consumer ID
        const year = 2023;
        const month = 10;

        const result = await ConsumerExpenseReportService.getExpenseReport(consumerId, year, month);

        // Assertions
        expect(result.user_id).toBe(consumerId);
        expect(result.accumulate_fee).toBe(50); // Adjust based on your mock data
        expect(result.time.year).toBe(year);
        expect(result.time.month).toBe(month);

        const expectedHistoryResults = {
            1: {
                name: 'Restaurant A',
                price: 50,
                time: '10月5號', // Adjust based on your mock data
            },
            // ... add more expected history results as needed
        };

        expect(result.history).toEqual(expectedHistoryResults);

        // Verify that the findAll method was called with the correct parameters
        expect(orders.findAll).toHaveBeenCalledWith({
            include: [
                {
                    model: restaurants,
                    attributes: ['restaurantName'],
                },
            ],
            attributes: ['orderId', 'totalPrice', 'completeTime'],
            where: {
                consumerId: consumerId,
                completeTime: {
                    [Sequelize.Op.between]: [expect.any(Date), expect.any(Date)],
                },
            },
            order: [['completeTime', 'DESC']],
        });
    });

    test('should return consumer info', async () => {
        const mockConsumerData = {
            dataValues: {
                consumerId: 123,
                displayName: 'John Doe',
                department: 'IT',
                jobTitle: 'Developer',
                consumerImage: 'image-url.jpg',
            },
        };

        consumers.findByPk.mockResolvedValue(mockConsumerData);

        const consumerId = 123;
        const result = await ConsumerInfoService.showInfo(consumerId);

        expect(result.id).toBe(mockConsumerData.dataValues.consumerId);
        expect(result.name).toBe(mockConsumerData.dataValues.displayName);
        expect(result.division).toBe(mockConsumerData.dataValues.department);
        expect(result.position).toBe(mockConsumerData.dataValues.jobTitle);
        expect(result.image).toBe(mockConsumerData.dataValues.consumerImage);

        expect(consumers.findByPk).toHaveBeenCalledWith(consumerId, {
            attribute: [
                'displayName',
                'consumerId',
                'department',
                'jobTitle',
                'consumerImage',
            ],
        });
    });

    test('should modify consumer info', async () => {
        const mockConsumerData = {
            update: jest.fn(),
        };

        consumers.findOne.mockResolvedValue(mockConsumerData);

        const consumerInfo = {
            id: 123,
            image: 'new-image-url.jpg',
        };

        await ConsumerInfoService.modifyInfo(consumerInfo);

        expect(consumers.findOne).toHaveBeenCalledWith({ where: { consumerId: 123 } });
        expect(mockConsumerData.update).toHaveBeenCalledWith({
            consumerImage: 'new-image-url.jpg',
        });
    });

    test('should throw error if consumer not found', async () => {
        consumers.findOne.mockResolvedValue(null);

        const consumerInfo = {
            id: 123,
            image: 'new-image-url.jpg',
        };

        await expect(ConsumerInfoService.modifyInfo(consumerInfo)).rejects.toThrowError(
            'Consumer not found'
        );
    });

});