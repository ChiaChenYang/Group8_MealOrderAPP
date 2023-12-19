module.exports = (sequelize, DataTypes) => {
    // 消費者表
    const consumers = sequelize.define("consumers", {
        // 定義各個欄位跟屬性
        consumerId: {
            // 消費者 id
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
        }, 
        credentialId: {
            // 用戶 id（FK）
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'usercredentials', // 表名
                key: 'credentialId'   // 列名
            },
        },
        displayName: {
            // 消費者顯示名稱
            type: DataTypes.STRING(16),
            allowNull: true,
        },
        department: {
            // 單位名稱
            type: DataTypes.STRING(16),
            allowNull: true,
        },
        jobTitle: {
            // 消費者職位名稱
            type: DataTypes.STRING(16),
            allowNull: true,
        },
        department: {
            // 單位名稱
            type: DataTypes.STRING(16),
            allowNull: true,
        },
        consumerImage: {
            // 消費者圖片
            type: DataTypes.BLOB('long'), 
            allowNull: true, 
        },
        consumerFactoryLocation: {
            // 消費者工作廠區
            type: DataTypes.STRING(16),
            allowNull: true,
        },
        consumerPhone: { 
            // 消費者手機號碼
            type: DataTypes.STRING(16), 
            allowNull: true, 
        },
        consumerEmail: { 
            // 消費者信箱
            type: DataTypes.STRING, 
            allowNull: true, 
        },
        customizationNote: {
            // 客製化備註，於之後點餐時作為整筆訂單備註的預設內容
            type: DataTypes.STRING,
            allowNull: true,
        }
    },{
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });
    consumers.associate = (models) => {
        // 消費者跟用戶: 一對一
        consumers.belongsTo(models.usercredentials, {
            foreignKey: 'credentialId', 
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        // 消費者與最愛餐廳: 多對多
        consumers.belongsToMany(models.restaurants, {
            through: 'consumerfavorites',
            foreignKey: 'consumerId',
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    };

    return consumers
};