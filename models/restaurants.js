module.exports = (sequelize, DataTypes) => {
    // 餐廳表
    const restaurants = sequelize.define("restaurants", {
        // 定義各個欄位跟屬性
        restaurantId: {
            // 餐廳 id
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
        },
        ownerId: {
            // 餐廳擁有者 id（FK）
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'owners', // 表名
                key: 'ownerId'   // 列名
            },
        },
        restaurantName: { 
            // 餐廳名稱
            type: DataTypes.STRING(16), 
            unique: true,
            allowNull: false, 
        },
        restaurantImage: {
            // 餐廳圖片
            type: DataTypes.BLOB('long'), 
            allowNull: false, 
        },
        restaurantLocation: { 
            // 餐廳位置
            type: DataTypes.STRING, 
            allowNull: false, 
        },
        factoryLocation: { 
            // 餐廳所在廠區
            type: DataTypes.STRING(16), 
            allowNull: false, 
        },
        restaurantPhone: { 
            // 餐廳電話
            type: DataTypes.STRING(16), 
            allowNull: false, 
        },
        restaurantMail: { 
            // 餐廳信箱
            type: DataTypes.STRING, 
            allowNull: false, 
        },
        isOpening: { 
            // 餐廳是否營業
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: true, // 預設為是
        },
        serviceMethod: {
            // 供餐方式
            type: DataTypes.ENUM('外帶', '內用', '外帶內用'), 
            allowNull: true, 
        },
        isorderAvailable: { 
            // 餐廳是否接單
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: true, // 預設為是
        },
        istemporaryRestaurant: { 
            // 餐廳是否為輪動櫃
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: false, // 預設為否
        },
        stationStartDate: {
            // 輪動櫃開始日期，固定櫃可為空值
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        stationEndDate: {
            // 輪動櫃結束日期，固定櫃可為空值
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        prepareTime: {
            // 餐廳提供的準備時間
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            // 餐廳評價
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        

    }, {
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    }); 
    
    restaurants.associate = (models) => {
        // 餐廳表跟擁有者表: 多對一
        restaurants.belongsTo(models.owners, {
            foreignKey: 'ownerId', 
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        // 餐廳表跟類別表: 多對多
        restaurants.belongsToMany(models.categories, {
            through: 'restaurantcategories',
            foreignKey: 'restaurantId',
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        // 餐廳與消費者: 多對多
        restaurants.belongsToMany(models.consumers, {
            through: 'consumerfavorites',
            foreignKey: 'restaurantId',
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    };
    
    return restaurants
};