-- Create a database named 'modmed'
CREATE DATABASE modmed
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;

USE modmed;

-- Create table part

CREATE TABLE account
(
  username VARCHAR (50) NOT NULL,
  pw       VARCHAR (50) NOT NULL,
  roles    VARCHAR (50) NOT NULL,
  r_id     INTEGER      NULL    ,
  d_id     INTEGER      NULL    ,
  PRIMARY KEY (username)
);

CREATE TABLE cure_history
(
  p_id            INTEGER      NOT NULL,
  date_cure       DATE         NOT NULL,
  time_cure       TIMESTAMP    NOT NULL,
  basic_symp      TEXT         NOT NULL,
  diag_result     TEXT         NOT NULL,
  methods         TEXT         NOT NULL,
  d_licence       VARCHAR (10) NOT NULL,
  progress_status TINYINT      NOT NULL,
  room            VARCHAR (10) NULL    ,
  PRIMARY KEY (p_id, date_cure, time_cure)
);

CREATE TABLE d_edu
(
  d_id           INTEGER      NOT NULL,
  level_edu      VARCHAR (1)  NOT NULL,
  diploma        VARCHAR (50) NOT NULL,
  institute      VARCHAR (50) NOT NULL,
  country        VARCHAR (50) NOT NULL,
  year_graduated YEAR         NOT NULL,
  PRIMARY KEY (d_id, level_edu, diploma)
);

CREATE TABLE doctor
(
  d_id        INTEGER      NOT NULL AUTO_INCREMENT,
  fName       VARCHAR (50) NOT NULL,
  mName       VARCHAR (50) NULL    ,
  lName       VARCHAR (50) NOT NULL,
  idNumber    VARCHAR (13) NOT NULL,
  DOB         DATE         NOT NULL,
  sex         VARCHAR (10) NOT NULL,
  addresses   TEXT         NOT NULL,
  tel         VARCHAR (10) NOT NULL,
  email       VARCHAR (50) NOT NULL,
  nationality VARCHAR (50) NOT NULL,
  race        VARCHAR (50) NOT NULL,
  religion    VARCHAR (50) NOT NULL,
  bloodType   VARCHAR (5)  NOT NULL,
  e_id        INTEGER      NOT NULL,
  relation    VARCHAR (50) NOT NULL,
  department  VARCHAR (50) NOT NULL,
  license_id  VARCHAR (10) UNIQUE NOT NULL,
  PRIMARY KEY (d_id)
);

CREATE TABLE emergency_contact
(
  e_id    INTEGER      NOT NULL AUTO_INCREMENT,
  fName   VARCHAR (50) NOT NULL,
  mName   VARCHAR (50) NULL    ,
  lName   VARCHAR (50) NOT NULL,
  tel     VARCHAR (10) NULL    ,
  addresses TEXT         NULL    ,
  email   VARCHAR (50) NULL    ,
  PRIMARY KEY (e_id)
);

CREATE TABLE patient
(
  p_id        INTEGER      NOT NULL AUTO_INCREMENT,
  fName       VARCHAR (50) NOT NULL,
  mName       VARCHAR (50) NULL    ,
  lName       VARCHAR (50) NOT NULL,
  idNumber    VARCHAR (13) NULL    ,
  DOB         DATE         NOT NULL,
  sex         VARCHAR (10) NOT NULL,
  addresses   TEXT         NULL    ,
  tel        VARCHAR (10) NOT NULL,
  email       VARCHAR (50) NULL    ,
  nationality VARCHAR (50) NOT NULL,
  race        VARCHAR (50) NOT NULL,
  religion    VARCHAR (50) NOT NULL,
  bloodType   VARCHAR (5)  NOT NULL,
  e_id        INTEGER      NOT NULL,
  relation    VARCHAR (50) NULL    ,
  PRIMARY KEY (p_id)
);

CREATE TABLE patient_allergy
(
  p_id           INTEGER      NOT NULL,
  type_allergy   VARCHAR (25) NOT NULL,
  allergy        VARCHAR (100)         NOT NULL,
  status_allergy TINYINT      NOT NULL,
  PRIMARY KEY (p_id, type_allergy, allergy)
);

CREATE TABLE register
(
  r_id  INTEGER      NOT NULL AUTO_INCREMENT,
  fName VARCHAR (50) NOT NULL,
  mName VARCHAR (50) NULL,
  lName VARCHAR (50) NOT NULL,
  tel   VARCHAR (10) NOT NULL,
  email VARCHAR (50) NOT NULL,
  PRIMARY KEY (r_id)
);

ALTER TABLE patient_allergy
  ADD CONSTRAINT FK_patient_TO_patient_allergy
    FOREIGN KEY (p_id)
    REFERENCES patient (p_id);

ALTER TABLE patient
  ADD CONSTRAINT FK_emergency_contact_TO_patient
    FOREIGN KEY (e_id)
    REFERENCES emergency_contact (e_id);

ALTER TABLE cure_history
  ADD CONSTRAINT FK_patient_TO_cure_history
    FOREIGN KEY (p_id)
    REFERENCES patient (p_id),
  ADD CONSTRAINT FK_doctor_TO_cure_history
    FOREIGN KEY (d_licence)
    REFERENCES doctor (license_id);

ALTER TABLE d_edu
  ADD CONSTRAINT FK_doctor_TO_d_edu
    FOREIGN KEY (d_id)
    REFERENCES doctor (d_id);

ALTER TABLE account
  ADD CONSTRAINT FK_register_TO_account
    FOREIGN KEY (r_id)
    REFERENCES register (r_id);

ALTER TABLE account
  ADD CONSTRAINT FK_doctor_TO_account
    FOREIGN KEY (d_id)
    REFERENCES doctor (d_id);

ALTER TABLE doctor
    ADD CONSTRAINT FK_emergency_contact_TO_doctor
        FOREIGN KEY (e_id)
        REFERENCES emergency_contact (e_id);


-- Insert dummies data to accounts

INSERT INTO emergency_contact (fName, lName, tel, addresses, email)
    VALUES
        ('Wongsatorn', 'Sungsila', '0875412653', '98/83 Bangna', 'wongsatorn.sung@local.com'),
        ('Kanit', 'Bunny', '0122254523', 'Royal Naval Academy', 'bunny@local.com'),
        ('Pitchayuth', 'Yampong', '0523124456', 'Chumpon', 'picha@local.com'),
        ('Chukiat', 'Bunny', '0845256325', 'Sukhumvit, Samutprakarn', 'jekchu@local.com');

INSERT INTO patient (fName,lName,idNumber,DOB,sex,addresses,tel,email,nationality,race,religion,bloodType,e_id,relation)
    VALUES
        ('Apichat', 'Aimi', '1101402256352', '2004-04-04', 'Male', '784 Sanam Chandra, Nakorn Prathom', '0965236521','apichar@hotmail.com', 'Thai', 'Thai', 'Buddhist', 'A', 2, 'Husband'),
        ('Pairoj', 'Saisam', '1104774521698', '1945-07-04', 'Male', 'Mars', '0412563254','pair@hotmail.com', 'Thai', 'Thai', 'Buddhist', 'AB+', 1, 'Son'),
        ('Seesawat', 'Samranmark', '1458569652365', '2000-12-04', 'Female', 'Suam Phueng, Ratchaburi', '0856555541','s.samran@hotmail.com', 'Thai', 'Thai/Denmark', 'Protestant', 'B+', 4, 'Father'),
        ('Jumpol', 'Polvichai', '3145258754234', '1980-07-04', 'Male', 'KMUTT, Bangkok', '0985745245','jumo@hotmail.com', 'Thai', 'Thai', 'Buddhist', 'O-', 2, 'Relative');


INSERT INTO doctor(fName,lName,idNumber,DOB,sex,addresses,tel,email,nationality,race,religion,bloodType,e_id,relation,department,license_id)
    VALUES
        ('Weera', 'Theerapat', '3102544152359', '1925-07-04', 'Male', '745 Rama IX, Bangkok', '0248856985','weera@modmed.com', 'Thai', 'Thai', 'Buddhist', 'B+', 3, 'Son', 'Therapy', 'W23234'),
        ('Sanan', 'Srakaew', '3110255698526', '1950-07-04', 'Male', '74 Mitrapap, Srakaew', '0856623584','sanan.s@modmed.com', 'Thai', 'Thai', 'Buddhist', 'A-', 2, 'Niece', 'Othodontics', 'R44152'),
        ('Phond', 'Phundchongharn', '1101522102568', '1998-07-04', 'Male', '745 Rama IX, Bangkok', '0248856985','weera@modmed.com', 'Thai', 'Thai', 'Buddhist', 'B+', 3, 'Son', 'Visuali', 'M51120');

INSERT INTO register (fName, lName, tel, email)
    VALUES
        ('Somporn', 'Wongmamuang', '0815462563', 'somporn@modmed.com');
INSERT INTO account (username, pw, roles, r_id, d_id)
    VALUES
        ('somporn@modmed.com', '123456', 'regis', 1, NULL),
        ('weera@modmed.com', 'jekchu', 'doctor', NULL, 1);