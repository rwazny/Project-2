CREATE TABLE Characters (
id INT auto_increment NOT NULL,
character_name varchar(30) NOT NULL,
hp INT(255) NOT NULL,
attack INT(255) NOT NULL,
activeFlag varchar(1) DEFAULT 'N' NOT NULL,
charSelected BOOLEAN DEFAULT false NOT NULL,
imgLoc varchar(50) NOT NULL,
createdAt DATETIME,
updatedAt DATETIME,
PRIMARY KEY(id)
);

CREATE TABLE Items(
id INT auto_increment NOT NULL,
item_name varchar(30) NOT NULL,
attack INT(255) NOT NULL,
imgLoc varchar(50) NOT NULL,
createdAt DATETIME,
updatedAt DATETIME,
PRIMARY KEY(id)
);

INSERT INTO Items (item_name, attack, imgLoc)
VALUES("Cookie", 5 , "../images/Cookie.png");

INSERT INTO Items (item_name, attack, imgLoc)
VALUES("Sucker", 5, "../images/Sucker.png");

INSERT INTO Items (item_name, attack, imgLoc)
VALUES("Pretzel", 5, "../images/Pretzel.png");

INSERT INTO Items (item_name, attack, imgLoc)
VALUES("Candy Bar", 10 , "../images/Candy.png");

INSERT INTO Items (item_name, attack, imgLoc)
VALUES("Donut", 10, "../images/Donut.png");

INSERT INTO Items (item_name, attack, imgLoc)
VALUES("Pizza", 15, "../images/Pizza.png");



INSERT INTO Characters (character_name, hp, attack, imgLoc)
VALUES("Chilli Pepper", 100, 25, "../images/ChiliPepper.png");

INSERT INTO Characters(character_name, hp, attack, imgLoc)
VALUES("Passion Fruit", 100, 25, "../images/PassionFruit.png");

INSERT INTO Characters(character_name, hp, attack, imgLoc)
VALUES("Crab", 125, 15, "../images/Crab.png");

INSERT INTO Characters(character_name, hp, attack, imgLoc)
VALUES("Egg", 100, 25, "../images/Egg.png");

INSERT INTO Characters(character_name, hp, attack, imgLoc)
VALUES("Broccoli", 100, 25, "../images/Broccoli.png");

INSERT INTO Characters(character_name, hp, attack, imgLoc)
VALUES("Durian", 100, 25, "../images/Durian.png");


SELECT * FROM Characters;
SELECT * FROM Items;