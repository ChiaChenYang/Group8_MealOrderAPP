// const UserCredentialsService = require('../UserCredentialService');
// const { usercredentials, owners, consumers, Sequelize } = require('../../models');
// const bcrypt = require('bcrypt');

// jest.mock('../../models', () => ({
//     usercredentials: { create: jest.fn(), findOne: jest.fn() },
//     owners: { findOne: jest.fn(), create: jest.fn() },
//     consumers: { findOne: jest.fn(), create: jest.fn() },
//     Sequelize: { Op: { between: jest.fn() } },
// }));

// jest.mock('bcrypt', () => ({
//     compare: jest.fn(),
//     hash: jest.fn()
// }));

// describe('User Credential Service Tests', () => {
//     describe('createConsumerUserCredential', () => {
//         test('should create consumer user credential and return token', async () => {
//             const mockConsumerData = {
//                 dataValues: {
//                     consumerId: 123,
//                     displayName: 'John Doe',
//                     department: 'IT',
//                     jobTitle: 'Developer',
//                     consumerFactoryLocation: '暫無',
//                     consumerPhone: '0912345678',
//                     consumerEmail: 'john.doe@example.com',
//                 },
//             };

//             usercredentials.create.mockResolvedValueOnce({
//                 credentialId: 'mockCredentialId', // 修改为字符串
//                 consumerId: 123,
//             }).mockResolvedValueOnce({
//                 dataValues: {
//                     hashedPassword: '$2b$12$Z85e1g3OVd8wtCcjYUM4TO379YJbUc6PH6Mk5XCj62O1PyTDf.Z9K',
//                 },
//             });

//             consumers.create.mockResolvedValue(mockConsumerData);

//             const newConsumerUser = {
//                 name: 'John Doe',
//                 division: 'IT',
//                 position: 'Developer',
//                 email: 'john.doe@example.com',
//                 password: 'password123',
//             };

//             const result = await UserCredentialsService.createConsumerUserCredential(newConsumerUser);

//             expect(result.status).toBe(200);
//             expect(result.user.id).toBe(mockConsumerData.dataValues.consumerId);
//             expect(result.user.email).toBe(mockConsumerData.dataValues.consumerEmail);
//             expect(result.token).toBeDefined();

//             // Verify that create and findOne methods were called with the correct parameters
//             expect(usercredentials.create).toHaveBeenCalledWith({
//                 userName: newConsumerUser.name,
//                 hashedPassword: expect.any(String),
//                 userRole: 0,
//             });
//             expect(consumers.create).toHaveBeenCalledWith({
//                 consumerId: expect.any(Number),
//                 credentialId: expect.any(Number),
//                 displayName: newConsumerUser.name,
//                 department: newConsumerUser.division,
//                 jobTitle: newConsumerUser.position,
//                 consumerFactoryLocation: '暫無',
//                 consumerPhone: '0912345678',
//                 consumerEmail: newConsumerUser.email,
//             });
//         });

//         test('should return error if consumer already exists', async () => {
//             const existingConsumer = { consumerEmail: 'john.doe@example.com', credentialId: 123 };
//             consumers.findOne.mockResolvedValue(existingConsumer);

//             const newConsumerUser = {
//                 name: 'John Doe',
//                 division: 'IT',
//                 position: 'Developer',
//                 email: 'john.doe@example.com',
//                 password: 'password123',
//             };

//             const result = await UserCredentialsService.createConsumerUserCredential(newConsumerUser);

//             expect(result.status).toBe(409);
//             expect(result.error).toBe('Consumer already exists');
//             // Ensure create method is not called when consumer already exists
//             expect(usercredentials.create).not.toHaveBeenCalled();
//             expect(consumers.create).not.toHaveBeenCalled();
//         });

//         // Add more test cases as needed
//     });

//     describe('validateConsumerUserCredential', () => {
//         test('should validate consumer user credential and return token', async () => {
//             const mockExistingConsumer = {
//                 dataValues: {
//                     consumerId: 123,
//                     displayName: 'John Doe',
//                     consumerEmail: 'john.doe@example.com',
//                     credentialId: 123,
//                 },
//             };

//             const mockExistingCredential = {
//                 dataValues: {
//                     credentialId: 'mockCredentialId', // 修改为字符串
//                     hashedPassword: await bcrypt.hash('password123', 12),
//                 },
//             };

//             consumers.findOne.mockResolvedValue(mockExistingConsumer);
//             usercredentials.findOne.mockResolvedValue(mockExistingCredential);
//             bcrypt.compare.mockResolvedValue(true);

//             const consumerUser = {
//                 email: 'john.doe@example.com',
//                 password: 'password123',
//             };

//             const result = await UserCredentialsService.validateConsumerUserCredential(consumerUser);

//             expect(result.status).toBe(200);
//             expect(result.user.id).toBe(mockExistingConsumer.dataValues.consumerId);
//             expect(result.user.name).toBe(mockExistingConsumer.dataValues.displayName);
//             expect(result.user.email).toBe(mockExistingConsumer.dataValues.consumerEmail);
//             expect(result.token).toBeDefined();

//             // Verify that findOne method was called with the correct parameters
//             expect(consumers.findOne).toHaveBeenCalledWith({ where: { consumerEmail: consumerUser.email } });
//             expect(usercredentials.findOne).toHaveBeenCalledWith({
//                 where: { credentialId: mockExistingConsumer.dataValues.credentialId },
//             });
//             // Ensure bcrypt.compare method is called to validate password
//             expect(bcrypt.compare).toHaveBeenCalledWith(consumerUser.password, mockExistingCredential.dataValues.hashedPassword);
//         });

//         test('should return error if user not found', async () => {
//             consumers.findOne.mockResolvedValue(null);

//             const consumerUser = {
//                 email: 'john.doe@example.com',
//                 password: 'password123',
//             };

//             const result = await UserCredentialsService.validateConsumerUserCredential(consumerUser);

//             expect(result.status).toBe(404);
//             expect(result.error).toBe('User not found');
//             // Ensure findOne and compare methods are not called when user not found
//             expect(consumers.findOne).toHaveBeenCalledWith({ where: { consumerEmail: consumerUser.email } });
//             expect(usercredentials.findOne).not.toHaveBeenCalled();
//             expect(bcrypt.compare).not.toHaveBeenCalled();
//         });

//         test('should return error if invalid password', async () => {
//             const mockExistingConsumer = {
//                 dataValues: {
//                     consumerId: 123,
//                     displayName: 'John Doe',
//                     consumerEmail: 'john.doe@example.com',
//                 },
//             };

//             const mockExistingCredential = {
//                 dataValues: {
//                     hashedPassword: await bcrypt.hash('differentpassword', 12),
//                 },
//             };

//             consumers.findOne.mockResolvedValue(mockExistingConsumer);
//             usercredentials.findOne.mockResolvedValue(mockExistingCredential);
//             bcrypt.compare.mockResolvedValue(false);

//             const consumerUser = {
//                 email: 'john.doe@example.com',
//                 password: 'password123',
//             };

//             const result = await UserCredentialsService.validateConsumerUserCredential(consumerUser);

//             expect(result.status).toBe(401);
//             expect(result.error).toBe('Invalid password');
//             // Verify that findOne and compare methods were called with the correct parameters
//             expect(consumers.findOne).toHaveBeenCalledWith({ where: { consumerEmail: consumerUser.email } });
//             expect(usercredentials.findOne).toHaveBeenCalledWith({
//                 where: { credentialId: mockExistingConsumer.dataValues.credentialId },
//             });
//             expect(bcrypt.compare).toHaveBeenCalledWith(consumerUser.password, mockExistingCredential.dataValues.hashedPassword);
//         });

//         // Add more test cases as needed
//     });
// });