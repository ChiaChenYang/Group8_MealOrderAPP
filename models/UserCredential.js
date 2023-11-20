module.exports = (sequelize, DataTypes) => {

    const UserCredential = sequelize.define('UserCredential', {
        CredentialId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UserName: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true
        },
        HashedPassword: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        UserRole: {
            type: DataTypes.ENUM('Consumer','Owner')
        }
    }, {
        tableName: 'UserCredentials',
        createdAt: false,
        updatedAt: false
    });

    return UserCredential;
}