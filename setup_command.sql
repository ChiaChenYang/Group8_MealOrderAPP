CREATE DATABASE MealOrderDB;

USE MealOrderDB;

CREATE TABLE UserCredentials (
    CredentialId INT AUTO_INCREMENT,
    UserName VARCHAR(16) UNIQUE NOT NULL,
    HashedPassword VARCHAR(16) NOT NULL,
    UserRole ENUM('Consumer','Owner'),
    PRIMARY KEY (CredentialId)
);

CREATE TABLE Consumers (
    ConsumerId INT AUTO_INCREMENT,
    UserCredentialId INT,
    DisplayName VARCHAR(16) NOT NULL,
    Department VARCHAR(16) NOT NULL,
    JobTitle VARCHAR(16) NOT NULL,
    FactoryLocation VARCHAR(16) NOT NULL,
    Phone VARCHAR(16),
    Email VARCHAR(255),
    CustomizationNote VARCHAR(255),
    PRIMARY KEY (ConsumerId),
    FOREIGN KEY (UserCredentialId) REFERENCES UserCredentials(CredentialId)
);

CREATE TABLE Owners (
    OwnerId INT AUTO_INCREMENT,
    UserCredentialId INT,
    OwnerName VARCHAR(16),
    OwnerPhone VARCHAR(16),
    OwnerEmail VARCHAR(255),
    PRIMARY KEY (OwnerId),
    FOREIGN KEY (UserCredentialId) REFERENCES UserCredentials(CredentialId)
);

CREATE TABLE Restaurants (
    RestaurantId INT AUTO_INCREMENT,
    OwnerId INT,
    RestaurantName VARCHAR(16),
    RestaurantImage BLOB,
    RestaurantLocation VARCHAR(255),
    FactoryLocation VARCHAR(255),
    RestaurantPhone VARCHAR(16),
    RestaurantEmail VARCHAR(255),
    IsOpening BOOLEAN,
    ServiceMethod ENUM('外帶','內用','外帶內用'),
    IsOrderAvailable BOOLEAN,
    IsTemporaryRestaurant BOOLEAN,
    Rating FLOAT(8),
    StationStartDate DATETIME,
    StationEndDate DATETIME,
    PRIMARY KEY (RestaurantId),
    FOREIGN KEY (OwnerId) REFERENCES Owners(OwnerId)
);

CREATE TABLE RestaurantsOpenHours (
    OpenHoursId INT AUTO_INCREMENT,
    RestaurantId INT,
    DayOfWeek ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'),
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    PRIMARY KEY (OpenHoursId),
    FOREIGN KEY (RestaurantId) REFERENCES Restaurants(RestaurantId)
);

CREATE TABLE Categories (
    CategoryId INT AUTO_INCREMENT,
    CategoryName VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (CategoryId)
);

CREATE TABLE RestaurantCategories (
    RestaurantId INT,
    CategoryId INT,
    PRIMARY KEY (RestaurantId, CategoryId),
    FOREIGN KEY (RestaurantId) REFERENCES Restaurants(RestaurantId),
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
);

CREATE TABLE RestaurantLatestNews (
    NewsId INT,
    RestaurantId INT,
    NewsContent VARCHAR(255),
    PRIMARY KEY (NewsId),
    FOREIGN KEY (RestaurantId) REFERENCES Restaurants(RestaurantId)
);

CREATE TABLE Menus (
    MenuId INT AUTO_INCREMENT,
    RestaurantId INT,
    MenuName VARCHAR(255),
    MenuType VARCHAR(16),
    PRIMARY KEY (MenuId),
    FOREIGN KEY (RestaurantId) REFERENCES Restaurants(RestaurantId)
);

CREATE TABLE MenuHours (
    MenuHoursId INT AUTO_INCREMENT,
    MenuId INT,
    DayOfWeek ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'),
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    PRIMARY KEY (MenuHoursId),
    FOREIGN KEY (MenuId) REFERENCES Menus(MenuId)
);

CREATE TABLE MenuCategories (
    MenuCategoryId INT AUTO_INCREMENT,
    MenuId INT,
    MenuCategoryName VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (MenuCategoryId),
    FOREIGN KEY (MenuId) references Menus(MenuId)
);

CREATE TABLE MenuItems (
    ItemId INT AUTO_INCREMENT,
    MenuId INT,
    ItemName VARCHAR(255),
    ItemImage BLOB,
    DescriptionText VARCHAR(255),
    Calories INT,
    PrepareTime INT,
    Price INT,
    IsAvailable BOOLEAN,
    AvailableQuantity INT,
    PRIMARY KEY (ItemId),
    FOREIGN KEY (MenuId) REFERENCES Menus(MenuId)
);

CREATE TABLE ItemMenuCategories (
    ItemId INT,
    MenuCategoryId INT,
    PRIMARY KEY (ItemId, MenuCategoryId),
    FOREIGN KEY (MenuCategoryId) references MenuCategories(MenuCategoryId),
    FOREIGN KEY (ItemId) references MenuItems(ItemId)
);

CREATE TABLE Tags (
    TagId INT AUTO_INCREMENT,
    TagName VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (TagId)
);

CREATE TABLE ItemTags (
    ItemId INT,
    TagId INT,
    PRIMARY KEY (ItemId, TagId),
    FOREIGN KEY (ItemId) REFERENCES MenuItems(ItemId),
    FOREIGN KEY (TagId) REFERENCES Tags(TagId)
);

CREATE TABLE ShoppingCarts (
    CartId INT AUTO_INCREMENT,
    ConsumerId INT,
    RestaurantId INT,
    CartNote VARCHAR(255),
    PRIMARY KEY (CartId),
    FOREIGN KEY (ConsumerId) REFERENCES Consumers(ConsumerId),
    FOREIGN KEY (RestaurantId) REFERENCES Restaurants(RestaurantId)
);

CREATE TABLE CartItems (
    CartItemId INT AUTO_INCREMENT,
    ItemId INT,
    CartId INT,
    Quantity INT,
    ItemNote VARCHAR(255),
    PRIMARY KEY (CartItemId),
    FOREIGN KEY (CartId) REFERENCES ShoppingCarts(CartId),
    FOREIGN KEY (ItemId) REFERENCES MenuItems(ItemId)
);

CREATE TABLE Orders (
    OrderId INT AUTO_INCREMENT,
    CartId INT,
    ConsumerId INT,
    RestaurantId INT,
    TotalPrice INT,
    OrderedTime DATETIME,
    OrderNote VARCHAR(255),
    ExpectedFinishedTime DATETIME,
    ExpectedPickupTime DATETIME,
    ReceivedTime DATETIME,
    FinishTime DATETIME,
    CompleteTime DATETIME,
    OrderStatus VARCHAR(16),
    PaymentMethod VARCHAR(16),
    PickupMethod VARCHAR(16),
    Rating INT,
    PRIMARY KEY (OrderId),
    FOREIGN KEY (ConsumerId) REFERENCES Consumers(ConsumerId),
    FOREIGN KEY (CartId) REFERENCES ShoppingCarts(CartId),
    FOREIGN KEY (RestaurantId) REFERENCES Restaurants(RestaurantId)
);

CREATE TABLE OrderItems (
    OrderItemId INT AUTO_INCREMENT,
    ItemId INT,
    OrderId INT,
    Quantity INT,
    ItemNote VARCHAR(255),
    PRIMARY KEY (OrderItemId),
    FOREIGN KEY (ItemId) REFERENCES MenuItems(ItemId),
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId)
);

CREATE TABLE ConsumerFavorites (
    ConsumerId INT,
    RestaurantId INT,
    PRIMARY KEY (ConsumerId, RestaurantId),
    FOREIGN KEY (ConsumerId) REFERENCES Consumers(ConsumerId),
    FOREIGN KEY (RestaurantId) REFERENCES Restaurants(RestaurantId)
);

CREATE TABLE CombolItems (
    ItemId INT,
    ComboId INT,
    PRIMARY KEY (ItemId, ComboId),
    FOREIGN KEY (ItemId) REFERENCES MenuItems(ItemId),
    FOREIGN KEY (ComboId) REFERENCES MenuItems(ItemId)
);

CREATE TABLE CustomizedOptions (
    CustomizedOptionsId INT AUTO_INCREMENT,
    ItemId INT,
    MinSelection INT,
    MaxSelection INT,
    Explanation VARCHAR(255),
    PRIMARY KEY (CustomizedOptionsId),
    FOREIGN KEY (ItemId) REFERENCES MenuItems(ItemId)
);

CREATE TABLE SingleCustomize (
    SingleCustomizeId INT AUTO_INCREMENT,
    CustomizedOptionsId INT,
    PriceChange INT,
    Explanation VARCHAR(255),
    PRIMARY KEY (SingleCustomizeId),
    FOREIGN KEY (CustomizedOptionsId) REFERENCES CustomizedOptions(CustomizedOptionsId)
);

CREATE TABLE OrderItemCustomizedOptions (
    OrderItemId INT,
    CustomizedOptionsId INT,
    SingleCustomizeId INT,
    PRIMARY KEY (OrderItemId, CustomizedOptionsId, SingleCustomizeId),
    FOREIGN KEY (OrderItemId) REFERENCES OrderItems(OrderItemId),
    FOREIGN KEY (CustomizedOptionsId) REFERENCES CustomizedOptions(CustomizedOptionsId),
    FOREIGN KEY (SingleCustomizeId) REFERENCES SingleCustomize(SingleCustomizeId)
);