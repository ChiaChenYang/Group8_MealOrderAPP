module.exports = (sequelize, DataTypes) => {
    // 用戶憑證表
    const usercredentials = sequelize.define("usercredentials", {
        // 定義各個欄位跟屬性
        credentialId: {
            // 用戶 id
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
        }, 
        userName: {
            // 用戶帳號
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        hashedPassword: {
            // 用戶密碼
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        userRole: { 
            // 用戶身分，例如消費者或餐廳擁有者(用 0 or 1)
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
        },
    },{
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });

    return usercredentials
};