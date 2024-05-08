-- Create a database named 'modmed'
CREATE DATABASE modmed
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;

USE modmed;

-- Test something

-- Create table part        
CREATE TABLE attendance
(
  id        INTEGER  NOT NULL,
  clock_in  DATETIME NOT NULL,
  clock_out DATETIME NULL    ,
  PRIMARY KEY (id, clock_in)
);

CREATE TABLE cure_history
(
  p_id            INTEGER      NOT NULL,
  date_cure       DATETIME     NOT NULL,
  basic_symp      TEXT         NOT NULL,
  diag_result     TEXT         NOT NULL,
  methods         TEXT         NOT NULL,
  progress_status TINYINT      NOT NULL,
  d_license       VARCHAR (10) NOT NULL,
  room_id         VARCHAR (10) NULL    ,
  date_finished   DATETIME     NULL    ,
  PRIMARY KEY (p_id, date_cure)
);

CREATE TABLE d_info
(
  d_id       INTEGER      NOT NULL,
  license_id VARCHAR (10) UNIQUE  NOT NULL,
  department VARCHAR (50) NOT NULL,
  PRIMARY KEY (d_id)
);

CREATE TABLE edu
(
  id             INTEGER      NOT NULL,
  level_edu      VARCHAR (1)  NOT NULL,
  diploma        VARCHAR (50) NOT NULL,
  institute      VARCHAR (50) NOT NULL,
  country        VARCHAR (50) NOT NULL,
  year_graduated INTEGER      NOT NULL,
  PRIMARY KEY (id, level_edu, diploma)
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

CREATE TABLE employee
(
  id          INTEGER      NOT NULL AUTO_INCREMENT,
  fName       VARCHAR (50) NOT NULL,
  mName       VARCHAR (50) NULL    ,
  lName       VARCHAR (50) NOT NULL,
  idNumber    VARCHAR (13) NOT NULL,
  DOB         DATE         NOT NULL,
  sex         VARCHAR (10) NOT NULL,
  addresses   TEXT         NOT NULL,
  tel         VARCHAR (10) NOT NULL,
  email       VARCHAR (50) NOT NULL,
  pw          TEXT         NOT NULL,
  nationality VARCHAR (50) NOT NULL,
  race        VARCHAR (50) NOT NULL,
  religion    VARCHAR (50) NOT NULL,
  bloodType   VARCHAR (5)  NOT NULL,
  e_id        INTEGER      NOT NULL,
  relation    VARCHAR (50) NOT NULL,
  role_name       VARCHAR (50) NOT NULL,
  PRIMARY KEY (id)
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
  tel         VARCHAR (10) NOT NULL,
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
  allergy        VARCHAR (100) NOT NULL,
  status_allergy TINYINT      NOT NULL,
  PRIMARY KEY (p_id, type_allergy, allergy)
);

CREATE TABLE roles
(
  role_name       VARCHAR (50) NOT NULL,
  income_base INTEGER      NOT NULL,
  PRIMARY KEY (role_name)
);

CREATE TABLE room
(
  room_id VARCHAR (10) NOT NULL,
  p_id INTEGER      NULL    ,
  PRIMARY KEY (room_id)
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
    REFERENCES patient (p_id);

ALTER TABLE employee
  ADD CONSTRAINT FK_emergency_contact_TO_employee
    FOREIGN KEY (e_id)
    REFERENCES emergency_contact (e_id);

ALTER TABLE attendance
  ADD CONSTRAINT FK_employee_TO_attendance
    FOREIGN KEY (id)
    REFERENCES employee (id);

ALTER TABLE d_info
  ADD CONSTRAINT FK_employee_TO_d_info
    FOREIGN KEY (d_id)
    REFERENCES employee (id);

ALTER TABLE cure_history
  ADD CONSTRAINT FK_d_license_TO_cure_history
    FOREIGN KEY (d_license)
    REFERENCES d_info (license_id);

ALTER TABLE edu
  ADD CONSTRAINT FK_employee_TO_edu
    FOREIGN KEY (id)
    REFERENCES employee (id);

ALTER TABLE employee
  ADD CONSTRAINT FK_role_TO_employee
    FOREIGN KEY (role_name)
    REFERENCES roles (role_name);

ALTER TABLE cure_history
  ADD CONSTRAINT FK_room_TO_cure_history
    FOREIGN KEY (room_id)
    REFERENCES room (room_id);

        
      
-- Insert dummies data to accounts

INSERT INTO roles (role_name, income_base)
    VALUES
        ('doctor', 900),
        ('register', 450),
        ('finance', 425);

INSERT INTO emergency_contact (fName, lName, tel, addresses, email)
    VALUES
        ('Wongsatorn', 'Sungsila', '0875412653', '98/83 Bangna', 'wongsatorn.sung@local.com'),
        ('Kanit', 'Bunny', '0122254523', 'Royal Naval Academy', 'bunny@local.com'),
        ('Pitchayuth', 'Yampong', '0523124456', 'Chumpon', 'picha@local.com'),
        ('Chukiat', 'Bunny', '0845256325', 'Sukhumvit, Samutprakarn', 'jekchu@local.com'),
        ('Kittipong', 'Tapee', '0620650992', '04/41 Phetkasame Rd., Mueng Chumpon', 'kittipong.tpy@local.com');

INSERT INTO patient (fName,lName,idNumber,DOB,sex,addresses,tel,email,nationality,race,religion,bloodType,e_id,relation)
    VALUES
        ('Apichat', 'Aimi', '1101402256352', '2004-04-04', 'Male', '784 Sanam Chandra, Nakorn Prathom', '0965236521','apichar@hotmail.com', 'Thai', 'Thai', 'Buddhist', 'A', 2, 'Husband'),
        ('Pairoj', 'Saisam', '1104774521698', '1945-07-04', 'Male', 'Mars', '0412563254','pair@hotmail.com', 'Thai', 'Thai', 'Buddhist', 'AB+', 1, 'Son'),
        ('Seesawat', 'Samranmark', '1458569652365', '2000-12-04', 'Female', 'Suam Phueng, Ratchaburi', '0856555541','s.samran@hotmail.com', 'Thai', 'Thai/Denmark', 'Protestant', 'B+', 4, 'Father'),
        ('Jumpol', 'Polvichai', '3145258754234', '1980-07-04', 'Male', 'KMUTT, Bangkok', '0985745245','jumo@hotmail.com', 'Thai', 'Thai', 'Buddhist', 'O-', 2, 'Relative'),
        ('Noppakhao', 'Somsrichai', '3452122157859', '1954-04-04', 'Female','218 Pracha Uthit Rd, Bangkok', '0982385749', 'mas@hotmail.com', 'Thai', 'Thai', 'Muslim', 'B+',4,'Son');

INSERT INTO employee (fName, lName, idNumber, DOB, sex, addresses, tel, email, pw, nationality, race, religion, bloodType, e_id, relation, role_name)
    VALUES
        ('Weera', 'Theeraphat', '3101100254685', '1940-02-09','Male', '13 Rama IX Rd., Bangkok', '0841234567', 'weera.t@modmed.com', '1234', 'Thai', 'Thai', 'Buddhist', 'A-', 1, 'Son', 'doctor'),
        ('Phond', 'Phunchongharn', '3100111002352', '1982-09-30','Female', '126 Pracha Uthit Rd', '0562235467', 'phond.p@modmed.com', 'pp', 'Thai', 'Thai', 'Buddhist', 'A+', 4, 'Father', 'doctor'),
        ('Acharee', 'Weerapong', '1104521345687', '1997-10-12','Female', 'Bangna, Bangkok', '0625526987', 'acharee.w@modmed.com', 'password', 'Thai', 'Thai', 'Buddhist', 'AB+', 5, 'Friend', 'finance'),
        ('Chuchai', 'Wiwatana', '3100521245657', '1964-02-09','Male', 'Victory Monument', '0914567852', 'chuchai.w@modmed.com', '888', 'Thai', 'Thai', 'Buddhist', 'A-', 2, 'Son', 'register'),
        ('Sanan', 'Srakaew', '3887451243216', '1960-04-23','Male', 'Srakaew', '0865986542', 'sanan.s@modmed.com', 'qwerty', 'Thai', 'Thai', 'Buddhist', 'O+', 2, 'Son', 'doctor');