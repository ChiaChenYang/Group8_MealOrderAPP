module.exports = (sequelize, DataTypes) => {
    // 餐廳擁有者表
    const owners = sequelize.define("owners", {
        // 定義各個欄位跟屬性
        ownerId: {
            // 餐廳擁有者 id
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
        ownerName: {
            // 餐廳擁有者名稱
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        ownerPhone: { 
            // 餐廳擁有者手機號碼
            type: DataTypes.STRING(16), 
            allowNull: false, 
        },
        ownerEmail: { 
            // 餐廳擁有者信箱
            type: DataTypes.STRING, 
            allowNull: false, 
        },
    },{
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });
    owners.associate = (models) => {
        // 餐廳擁有者跟用戶: 一對一
        owners.belongsTo(models.usercredentials, {
            foreignKey: 'credentialId', 
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    };

    return owners
};