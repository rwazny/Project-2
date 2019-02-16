
CREATE TABLE Characters (
id INT auto_increment NOT NULL,
character_name varchar(30) NOT NULL,
hp INT(255) NOT NULL,
attack INT(255) NOT NULL,
activeFlag varchar(1) DEFAULT 'N' NOT NULL,
ItemId INT NOT NULL,
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


INSERT INTO Characters (character_name, hp, attack, ItemId)
VALUES("Chilli Pepper", 100, 25, (SELECT id from Items where item_name = "Fire"));

INSERT INTO Characters(character_name, hp, attack, ItemId)
VALUES("Passion Fruit", 100, 25, (SELECT id from Items where item_name = "Candy Bar"));

INSERT INTO Characters(character_name, hp, attack, ItemId)
VALUES("Crab", 125, 15, (SELECT id from Items where item_name = "Knife"));

INSERT INTO Characters(character_name, hp, attack, ItemId)
VALUES("Egg", 100, 25, (SELECT id from Items where item_name = "Fried Chicken"));

INSERT INTO Characters(character_name, hp, attack, ItemId)
VALUES("Broccoli", 100, 25, (SELECT id from Items where item_name = "Donut"));

INSERT INTO Characters(character_name, hp, attack, ItemId)
VALUES("Durian", 100, 25, (SELECT id from Items where item_name = "Cookie"));

SELECT * FROM Characters;
SELECT * FROM Items;