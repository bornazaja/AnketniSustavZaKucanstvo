USE master
GO
CREATE DATABASE AnketniSustavZaKucanstvo
GO
USE AnketniSustavZaKucanstvo
GO

CREATE TABLE Grad
(
IDGrad INT CONSTRAINT PK_IDGrad PRIMARY KEY IDENTITY,
Naziv NVARCHAR(50) NOT NULL
)

GO

CREATE TABLE VlasnikKucanstva
(
IDVlasnikKucanstva INT CONSTRAINT PK_IDVlasnikKucanstva PRIMARY KEY IDENTITY,
Ime NVARCHAR(50) NOT NULL,
Prezime NVARCHAR(50) NOT NULL,
Ulica NVARCHAR(50) NOT NULL,
KucniBroj NVARCHAR(20) NOT NULL,
GradID INT CONSTRAINT FK_VlasnikKucanstva_IDGrad FOREIGN KEY REFERENCES Grad(IDGrad) NOT NULL
)

GO

CREATE TABLE Kucanstvo
(
IDKucanstvo INT CONSTRAINT PK_IDKucanstvo PRIMARY KEY IDENTITY,
Sifra NVARCHAR(10) UNIQUE NOT NULL,
VlasnikKucanstvaID INT CONSTRAINT FK_Kucanstvo_IDVlasnikKucanstva FOREIGN KEY REFERENCES VlasnikKucanstva(IDVlasnikKucanstva) NOT NULL,
)

GO

CREATE TABLE Valuta
(
IDValuta INT CONSTRAINT PK_IDValuta PRIMARY KEY IDENTITY,
Naziv NVARCHAR(3) NOT NULL
)

GO

CREATE TABLE Anketa
(
IDAnketa INT CONSTRAINT PK_IDAnketa PRIMARY KEY IDENTITY,
KucanstvoID INT CONSTRAINT FK_Anketa_IDKucanstvo FOREIGN KEY REFERENCES Kucanstvo(IDKucanstvo) NOT NULL,
IznosHraneZaProsliMjesec MONEY NOT NULL,
IznosRacunaZaProsliMjesec MONEY NOT NULL,
IznosZabaveZaProsliMjesec MONEY NOT NULL,
IznosOstalihIzdatakaZaProsliMjesec MONEY NOT NULL,
ValutaID INT CONSTRAINT FK_Anketa_IDValuta FOREIGN KEY REFERENCES Valuta(IDValuta) NOT NULL
)

GO

INSERT INTO Grad(Naziv) VALUES('Zagreb')
INSERT INTO Grad(Naziv) VALUES('Split')
INSERT INTO Grad(Naziv) VALUES('Rijeka')
INSERT INTO Grad(Naziv) VALUES('Osijek')
INSERT INTO Grad(Naziv) VALUES('Velika Gorica')
INSERT INTO Grad(Naziv) VALUES('Varaždin')
INSERT INTO Grad(Naziv) VALUES('Šibenik')

INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Miro', 'Mirić', 'Branimirova', '11', 1)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Pero', 'Perić', 'Petrova', '3', 1)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Ana', 'Anić', 'Jovićeva', '10', 2)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Luka', 'Lukić', 'Kuržićeva', '14a', 2)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Ante', 'Antić', 'Starćevićeva', '15', 3)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Slavko', 'Slavkić', 'Mohoročićeva', '16', 3)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Jura', 'Jurić', 'Gundulićeva', '11', 4)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Maja', 'Majić', 'Trpimirova', '31', 4)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Mirko', 'Mirkić', 'Zagrebačka', '14', 5)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Petar', 'Petrić', 'Splitska', '30', 5)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Tomislav', 'Tomislavić', 'Radićeva', '16a', 6)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Goran', 'Goranić', 'Meštrovićeva', '12', 6)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Hrvoje', 'Hrvojić', 'Zvonimirova', '15', 7)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Bruno', 'Brunić', 'Antićeva', '11', 7)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Marko', 'Markić', 'Gajeva', '16', 1)
INSERT INTO VlasnikKucanstva(Ime, Prezime, Ulica, KucniBroj, GradID) VALUES('Fran', 'Franić', 'Tomašićeva', '5', 1)

INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('2121212121', 1)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('3248484848', 2)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('9482736372', 3)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('3725272537', 4)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('4838382927', 5)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('9373626373', 6)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('9473625262', 7)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('4747374737', 8)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('4847363637', 9)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('2726252428', 10)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('8372626242', 11)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('3836262828', 12)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('3937262526', 13)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('3837262525', 14)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('7463625251', 15)
INSERT INTO Kucanstvo(Sifra, VlasnikKucanstvaID) VALUES('3625262512', 16)

INSERT INTO Valuta(Naziv) VALUES('HRK')
INSERT INTO Valuta(Naziv) VALUES('EUR')

INSERT INTO Anketa(KucanstvoID, IznosHraneZaProsliMjesec, IznosRacunaZaProsliMjesec, IznosZabaveZaProsliMjesec, IznosOstalihIzdatakaZaProsliMjesec, ValutaID) VALUES(1, 1000, 1500, 200, 500, 1)
INSERT INTO Anketa(KucanstvoID, IznosHraneZaProsliMjesec, IznosRacunaZaProsliMjesec, IznosZabaveZaProsliMjesec, IznosOstalihIzdatakaZaProsliMjesec, ValutaID) VALUES(2, 500, 1000, 300, 200, 1)