CREATE TABLE `Technician` (
  `id` String PRIMARY KEY,
  `name` String NOT NULL,
  `email` String UNIQUE NOT NULL,
  `password` String NOT NULL,
  `cat` Categorie,
  `catID` String NOT NULL,
  `role` String NOT NULL
);

CREATE TABLE `Categorie` (
  `id` String PRIMARY KEY,
  `name` String NOT NULL,
  `technicians` Technician NOT NULL,
  `tickets` Ticket NOT NULL
);

CREATE TABLE `User` (
  `id` String PRIMARY KEY,
  `name` String NOT NULL,
  `email` String UNIQUE NOT NULL,
  `password` String NOT NULL,
  `tickets` Ticket NOT NULL,
  `role` String NOT NULL
);

CREATE TABLE `Ticket` (
  `disscusions` Disscusion NOT NULL,
  `id` String PRIMARY KEY,
  `author` User,
  `authorID` String NOT NULL,
  `cat` Categorie,
  `catID` String NOT NULL,
  `closed` Boolean NOT NULL
);

ALTER TABLE `Technician` ADD FOREIGN KEY (`catID`) REFERENCES `Categorie` (`id`);

ALTER TABLE `Ticket` ADD FOREIGN KEY (`authorID`) REFERENCES `User` (`id`);

ALTER TABLE `Ticket` ADD FOREIGN KEY (`catID`) REFERENCES `Categorie` (`id`);
