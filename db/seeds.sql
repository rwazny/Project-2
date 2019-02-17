CREATE TABLE Characters (
id INT auto_increment NOT NULL,
character_name varchar(30) NOT NULL,
hp INT(255) NOT NULL,
attack INT(255) NOT NULL,
activeFlag varchar(1) DEFAULT 'N' NOT NULL,
charSelected BOOLEAN DEFAULT false NOT NULL,
ItemId INT NOT NULL,
imgLoc varchar(50) NOT NULL,
createdAt DATETIME,
updatedAt DATETIME,
PRIMARY KEY(id)
);

CREATE TABLE Items(
id INT auto_increment NOT NULL,
item_name varchar(30) NOT NULL,
attack INT(255) NOT NULL,
createdAt DATETIME,
updatedAt DATETIME,
PRIMARY KEY(id)
);

INSERT INTO Items (item_name, attack)
VALUES("Cookie", 5 );

INSERT INTO Items (item_name, attack)
VALUES("Candy Bar", 5 );

INSERT INTO Items (item_name, attack)
VALUES("Fire", 10);

INSERT INTO Items (item_name, attack)
VALUES("Knife", 5);

INSERT INTO Items (item_name, attack)
VALUES("Fried Chicken", 5);

INSERT INTO Items (item_name, attack)
VALUES("Donut", 5);


INSERT INTO Characters (character_name, hp, attack, ItemId, imgLoc)
VALUES("Chilli Pepper", 100, 25, (SELECT id from Items where item_name = "Fire"), "../images/ChilliPepper.png");

INSERT INTO Characters(character_name, hp, attack, ItemId, imgLoc)
VALUES("Passion Fruit", 100, 25, (SELECT id from Items where item_name = "Candy Bar"), "../images/PassionFruit.png");

INSERT INTO Characters(character_name, hp, attack, ItemId, imgLoc)
VALUES("Crab", 125, 15, (SELECT id from Items where item_name = "Knife"), "../images/Crab.png");

INSERT INTO Characters(character_name, hp, attack, ItemId, imgLoc)
VALUES("Egg", 100, 25, (SELECT id from Items where item_name = "Fried Chicken"), "../images/Egg.png");

INSERT INTO Characters(character_name, hp, attack, ItemId, imgLoc)
VALUES("Broccoli", 100, 25, (SELECT id from Items where item_name = "Donut"), "../images/Broccoli.png");

INSERT INTO Characters(character_name, hp, attack, ItemId, imgLoc)
VALUES("Durian", 100, 25, (SELECT id from Items where item_name = "Cookie"), "../images/Durian.png");

SELECT * FROM Characters;
SELECT * FROM Items;