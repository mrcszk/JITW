DROP TABLE klienci;
DROP TABLE zamowienia;
DROP TABLE odbiorcy;
DROP TABLE kompozycje;
DROP TABLE zapotrzebowanie;
DROP TABLE historia;

BEGIN;

CREATE TABLE kwiaciarnia.klienci (
    idklienta varchar(10) PRIMARY KEY,
    haslo varchar(10) NOT NULL,
    nazwa varchar(40) NOT NULL,
    miasto varchar(40) NOT NULL,
    kod char(6) NOT NULL,
    adres varchar(40) NOT NULL,
    email varchar(40),
    telefon varchar(16) NOT NULL,
    faz varchar(16),
    nip char(13),
    regon char(9),
    CONSTRAINT haslo_min CHECK (length(haslo) >= 4)
);

CREATE TABLE kwiaciarnia.zamowienia (
    idzamowienia integer PRIMARY KEY,
    idklienta varchar(10) NOT NULL REFERENCES kwiaciarnia.klienci,
    idodbiorcy integer NOT NULL REFERENCES kwiaciarnia.odbiorcy,
    idkompozycji char(5) NOT NULL REFERENCES kwiaciarnia.kompozycje,
    termin date NOT NULL,
    cena numeric(10,2),
    zaplacone boolean,
    uwagi varchar(200)
);

CREATE TABLE kwiaciarnia.odbiorcy (
    idodbiorcy SERIAL NOT NULL PRIMARY KEY,
    nazwa varchar(40) NOT NULL,
    miasto varchar(40) NOT NULL,
    kod char(6) NOT NULL,
    adres varchar(40) NOT NULL
);

CREATE TABLE kwiaciarnia.kompozycje (
    idkompozycji char(5) NOT NULL PRIMARY KEY,
    nazwa varchar(40) NOT NULL,
    opis varchar(100),
    cena numeric(10,2),
    minimum integer,
    stan integer,
    CONSTRAINT cena_min CHECK ((cena >= 40.00))
);

CREATE TABLE kwiaciarnia.zapotrzebowanie (
    idkompozycji char(5) PRIMARY KEY REFERENCES kwiaciarnia.kompozycje,
    data date
);

CREATE TABLE kwiaciarnia.historia (
    idzamowienia integer PRIMARY KEY,
    idklienta varchar(10),
    idkompozycji char(5),
    cena numeric(10,2),
    termin date
);
commit;
