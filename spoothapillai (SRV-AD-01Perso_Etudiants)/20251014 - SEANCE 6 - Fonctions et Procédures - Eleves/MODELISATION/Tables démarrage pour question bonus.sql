-- Suppression des tables dans le bon ordre pour éviter les erreurs de contraintes
DROP TABLE IF EXISTS EASY2DRIVE.UtilisateurRole;
DROP TABLE IF EXISTS EASY2DRIVE.Utilisateur;

DROP TABLE IF EXISTS EASY2DRIVE.Role;
DROP TABLE IF EXISTS EASY2DRIVE.AutoEcole;
DROP SCHEMA IF EXISTS EASY2DRIVE;
GO

-- Création du schéma
CREATE SCHEMA EASY2DRIVE;
GO

-- Table pour stocker les auto-écoles partenaires
CREATE TABLE EASY2DRIVE.AutoEcole (
    Id INT PRIMARY KEY IDENTITY(1,1),
    RaisonSociale NVARCHAR(100) NOT NULL,
    CodePostal NVARCHAR(5) NOT NULL,
    Ville NVARCHAR(100) NOT NULL
);

-- Table pour stocker les différents rôles (la structure ne change pas)
CREATE TABLE EASY2DRIVE.Role (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nom NVARCHAR(50) NOT NULL UNIQUE
);

-- Table pour les utilisateurs, MODIFIÉE pour inclure la référence au rôle
CREATE TABLE EASY2DRIVE.Utilisateur (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nom NVARCHAR(50) NOT NULL,
    Prenom NVARCHAR(50) NOT NULL,
    IdAutoEcole INT NOT NULL,
    IdRole INT NOT NULL, -- Ajout de la clé étrangère pour le rôle
    CONSTRAINT FK_Utilisateur_AutoEcole FOREIGN KEY (IdAutoEcole) REFERENCES EASY2DRIVE.AutoEcole(Id),
    CONSTRAINT FK_Utilisateur_Role FOREIGN KEY (IdRole) REFERENCES EASY2DRIVE.Role(Id)
);
GO

-- Peuplement de la table des Auto-Écoles
INSERT INTO EASY2DRIVE.AutoEcole (RaisonSociale, CodePostal, Ville) VALUES
('Auto-école ABC', '55000', 'Bar-Le-Duc'),
('Conduite Zen Paris 15', '75015', 'Paris'),
('Volant d''Or Lyon', '69003', 'Lyon');

-- Peuplement de la table des Rôles
INSERT INTO EASY2DRIVE.Role (Nom) VALUES
('Directeur'),
('Formateur'),
('Élève'),
('Modérateur');

-- Peuplement de la table des Utilisateurs, MODIFIÉ pour insérer le rôle directement
INSERT INTO EASY2DRIVE.Utilisateur (Nom, Prenom, IdAutoEcole, IdRole) VALUES
-- Samira Ghalam est une élève
('Ghalam', 'Samira', 1, (SELECT Id FROM EASY2DRIVE.Role WHERE Nom = 'Élève')),

-- Fabien Leroux est un formateur
('Leroux', 'Fabien', 1, (SELECT Id FROM EASY2DRIVE.Role WHERE Nom = 'Formateur')),

-- Paul Durand est le directeur
('Durand', 'Paul', 2, (SELECT Id FROM EASY2DRIVE.Role WHERE Nom = 'Directeur')),

-- Alice Martin est une élève
('Martin', 'Alice', 2, (SELECT Id FROM EASY2DRIVE.Role WHERE Nom = 'Élève')),

-- Clémence Bernard est modératrice
('Bernard', 'Clémence', 3, (SELECT Id FROM EASY2DRIVE.Role WHERE Nom = 'Modérateur')),

-- Lucas Petit est un élève
('Petit', 'Lucas', 3, (SELECT Id FROM EASY2DRIVE.Role WHERE Nom = 'Élève'));
GO