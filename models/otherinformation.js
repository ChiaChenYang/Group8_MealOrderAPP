module.exports = (sequelize, DataTypes) => {
    // 其他資訊表（用來儲存圖片之類）
    const otherinformations = sequelize.define("otherinformations", {
        // 定義各個欄位跟屬性
        informationId: {
            // 資訊 id
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
        },
        informationName: { 
            // 資訊名稱
            type: DataTypes.STRING, 
            allowNull: false, 
        },
        informationImage: {
            // 資訊圖片
            type: DataTypes.BLOB('long'), 
            allowNull: false, 
        }
        
    },{
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });
     

    return otherinformations
};