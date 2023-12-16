const express = require('express');
const { usercredentials, owners, consumers } = require('../models')
const asyncHandler = require("express-async-handler");
const { env } = require('../utils/env.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createConsumerUserCredential = async (newConsumerUser) => {
    const name = newConsumerUser.name;
    const division = newConsumerUser.division;
    const position = newConsumerUser.position;
    const email = newConsumerUser.email;
    const password = newConsumerUser.password;

    try {
		const existingConsumer = await consumers.findOne({ where: { consumerEmail: email } });
		if (existingConsumer) {
			return { 
                status: 409,
                error: 'Consumer already exists' 
            };
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		// 創建 usercredential
        const userCredential = await usercredentials.create({
            userName: name,
            hashedPassword: hashedPassword,
            userRole: 0, // 消費者用户角色
        });

        // 創建 consumer
        const consumer = await consumers.create({
            consumerId: userCredential.credentialId,
            credentialId: userCredential.credentialId,
            displayName: name,
            department: division,
            jobTitle: position,
            consumerFactoryLocation: '暫無', // 由於消費者不會設定這個資訊，因此以假資訊取代
            consumerPhone: '0912345678', // 由於消費者不會設定這個資訊，因此以假資訊取代
            consumerEmail: email,
        });

		if (!env.JWT_SECRET) {
			throw new Error('JWT_SECRET is not defined in your environment variables');
		}

		const token = jwt.sign({ userId: consumer.consumerId }, env.JWT_SECRET, {
			expiresIn: '24h',
		});

		return {
            status: 200,
			user: {
				id: consumer.consumerId,
				email: consumer.consumerEmail,
			},
			token,
		};
        
	} catch (error) {
        console.log(error);
		return { 
            status: 500,
            error: 'Internal server error' 
        };
	}
};

exports.validateConsumerUserCredential = async (ConsumerUser) => {
	const email = ConsumerUser.email;
    const password = ConsumerUser.password;

	try {
		const existingConsumer = await consumers.findOne({ where: { consumerEmail: email } });
		if (!existingConsumer) {
			return { 
                status: 404,
                error: 'User not found' 
            };
		}
        // console.log('hereherehereherehere', existingConsumer);
        existingCredential = await usercredentials.findOne({ where: { credentialId: existingConsumer.dataValues.credentialId } });
        // console.log('hereherehereherehere', existingCredential);
		const isPasswordValid = await bcrypt.compare(password, existingCredential.dataValues.hashedPassword);
		if (!isPasswordValid) {
			return { 
                status: 401,
                error: 'Invalid password' 
            };
		}

		if (!env.JWT_SECRET) {
			throw new Error('JWT_SECRET is not defined in your environment variables');
		}

		const token = jwt.sign({ userId: existingConsumer.ownerId }, env.JWT_SECRET, {
			expiresIn: '24h',
		});

		return {
            status: 200,
			user: {
				id: existingConsumer.consumerId,
				name: existingConsumer.displayName,
				email: existingConsumer.consumerEmail,
			},
			token,
		};

	} catch (error) {
        console.log(error);
		return { 
            status: 500,
            error: 'Internal server error' 
        };
	}
};

exports.createMerchantUserCredential = async(newMerchantUser) => {
    const email = newMerchantUser.email;
    const password = newMerchantUser.password;

    try {
		const existingOwner = await owners.findOne({ where: { ownerEmail: email } });
		if (existingOwner) {
			return { 
                status: 409,
                error: 'Owner already exists' 
            };
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		// 創建 usercredential
        const userCredential = await usercredentials.create({
            userName: '商家負責人', // 由於商家不會設定這個資訊，因此以假資訊取代
            hashedPassword: hashedPassword,
            userRole: 1, // 商家用户角色
        });

        // 創建 owner
        const owner = await owners.create({
            ownerId: userCredential.credentialId,
            credentialId: userCredential.credentialId,
            ownerName: '商家負責人', // 由於商家不會設定這個資訊，因此以假資訊取代
            ownerPhone: '0912345678', // 由於商家不會設定這個資訊，因此以假資訊取代
            ownerEmail: email,
        });

		if (!env.JWT_SECRET) {
			throw new Error('JWT_SECRET is not defined in your environment variables');
		}

		const token = jwt.sign({ userId: owner.ownerId }, env.JWT_SECRET, {
			expiresIn: '24h',
		});

		return {
            status: 200,
			user: {
				id: owner.ownerId,
				email: owner.ownerEmail,
			},
			token,
		};
        
	} catch (error) {
		return { 
            status: 500,
            error: 'Internal server error' 
        };
	}

};

exports.validateMerchantUserCredential = async (MerchantUser) => {
	const email = MerchantUser.email;
    const password = MerchantUser.password;

	try {
		const existingOwner = await owners.findOne({ where: { ownerEmail: email } });
		if (!existingOwner) {
			return { 
                status: 404,
                error: 'User not found' 
            };
		}

        existingCredential = await usercredentials.findOne({ where: { credentialId: existingOwner.dataValues.credentialId } });

		const isPasswordValid = await bcrypt.compare(password, existingCredential.dataValues.hashedPassword);
		if (!isPasswordValid) {
			return { 
                status: 401,
                error: 'Invalid password' 
            };
		}

		if (!env.JWT_SECRET) {
			throw new Error('JWT_SECRET is not defined in your environment variables');
		}

		const token = jwt.sign({ userId: existingOwner.ownerId }, env.JWT_SECRET, {
			expiresIn: '24h',
		});

		return {
            status: 200,
			user: {
				id: existingOwner.ownerId,
				// name: existingOwner.ownerName,
				email: existingOwner.ownerEmail,
			},
			token,
		};

	} catch (error) {
		return { 
            status: 500,
            error: 'Internal server error' 
        };
	}
};

// exports.createUserCredential = async (newUser) => {
//     const username = newUser.username;
//     const password = newUser.password;
//     const userrole = newUser.userrole;
//     const user = await UserCredential.create({
//         UserName: username,
//         HashedPassword: password,
//         UserRole: userrole
//     });
    
//     console.log(user.toJSON());
// };

// exports.getAllUserCredentials = async () => {
//     allusers = await UserCredential.findAll();
//     console.log("All users:", JSON.stringify(allusers, null, 2));
//     return allusers;
// };