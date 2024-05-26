-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 26, 2024 at 03:24 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `modmed`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `clock_in` datetime NOT NULL,
  `clock_out` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `clock_in`, `clock_out`) VALUES
(1, '2024-05-06 06:50:14', '2024-05-07 18:40:41'),
(1, '2024-05-07 07:41:47', '2024-05-07 20:14:40'),
(1, '2024-05-08 07:59:59', '2024-05-09 00:25:24'),
(1, '2024-05-26 18:20:44', '2024-05-26 18:46:26'),
(1, '2024-05-26 19:12:26', '2024-05-26 19:12:48'),
(2, '2024-04-16 08:17:18', '2024-04-16 16:17:18'),
(2, '2024-04-17 07:14:38', '2024-04-17 20:24:30'),
(2, '2024-04-30 08:56:29', '2024-04-30 23:56:29'),
(2, '2024-05-06 07:00:14', '2024-05-06 17:00:10'),
(2, '2024-05-17 21:34:32', '2024-05-17 21:34:48'),
(2, '2024-05-18 00:22:33', '2024-05-18 02:39:40'),
(2, '2024-05-18 15:53:37', '2024-05-19 01:16:20'),
(3, '2024-05-19 01:03:41', '2024-05-19 02:28:34'),
(4, '2024-05-18 17:42:07', '2024-05-18 21:14:42');

-- --------------------------------------------------------

--
-- Table structure for table `cure_history`
--

CREATE TABLE `cure_history` (
  `p_id` int(11) NOT NULL,
  `date_cure` datetime NOT NULL,
  `basic_symp` text NOT NULL,
  `diag_result` text NOT NULL,
  `methods` text NOT NULL,
  `progress_status` tinyint(4) NOT NULL,
  `d_id` int(11) NOT NULL,
  `room_id` varchar(10) DEFAULT NULL,
  `date_finished` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cure_history`
--

INSERT INTO `cure_history` (`p_id`, `date_cure`, `basic_symp`, `diag_result`, `methods`, `progress_status`, `d_id`, `room_id`, `date_finished`) VALUES
(1, '2024-05-08 12:30:00', 'Backache', 'Backbone Broken', 'Give some adrinalines', 0, 1, NULL, '2024-05-08 15:54:49'),
(1, '2024-05-12 15:30:00', 'Fall in the restroom', 'Leg Broken', 'Get some cast', 0, 1, NULL, '2024-05-18 00:00:00'),
(2, '2024-05-09 13:30:00', 'Stomache Problem', 'Acid in tummy', 'Give stomachic mixture', 1, 1, NULL, NULL),
(3, '2024-05-09 18:20:00', 'Have a seizure', 'Cardiac Problem', 'Send to ICU', 0, 5, NULL, '2024-05-26 00:00:00'),
(3, '2024-05-26 19:08:57', 'aa', 'aa', 'aa', 1, 1, '102', NULL),
(4, '2024-04-30 20:46:50', 'Comes with eye hurt', 'Eyes infected', 'Give some anti-biotics', 0, 2, NULL, '2024-04-30 21:46:50'),
(4, '2024-05-18 10:30:00', 'Can see shorter', 'Short-sighted', 'Make an eyeglass', 0, 2, NULL, '2024-05-18 18:19:03'),
(4, '2024-05-25 23:57:34', 'acid hit body', 'bone broken', 'get some cast', 1, 1, '103', NULL),
(5, '2024-05-25 23:54:27', 'Come with something', 'EYE get f', 'something!', 0, 2, NULL, '2024-05-25 16:55:04');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `department_name`) VALUES
(1, 'Bone'),
(2, 'Eye'),
(3, 'Heart'),
(4, 'Dental'),
(5, 'Skin'),
(6, 'Ear, Nose, Throat');

-- --------------------------------------------------------

--
-- Table structure for table `edu`
--

CREATE TABLE `edu` (
  `id` int(11) NOT NULL,
  `level_edu` varchar(50) NOT NULL,
  `diploma` varchar(50) NOT NULL,
  `institute` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `year_graduated` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `edu`
--

INSERT INTO `edu` (`id`, `level_edu`, `diploma`, `institute`, `country`, `year_graduated`) VALUES
(2, 'Bachelor', 'MD (Eye studies)', 'Mahidol University', 'Thailand', 2004),
(3, 'Bachelor', 'B.Acc (Accountant)', 'King Mongkut\'s Institute of Technology Ladkrabang', 'Thailand', 2017),
(4, 'Bachalor', 'B.Eng (Computer Engineering)', 'King Mongkut\'s University of Technology Thonburi', 'Thailand', 2012);

-- --------------------------------------------------------

--
-- Table structure for table `emergency_contact`
--

CREATE TABLE `emergency_contact` (
  `e_id` int(11) NOT NULL,
  `fName` varchar(50) NOT NULL,
  `mName` varchar(50) DEFAULT NULL,
  `lName` varchar(50) NOT NULL,
  `tel` varchar(10) DEFAULT NULL,
  `addresses` text,
  `email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `emergency_contact`
--

INSERT INTO `emergency_contact` (`e_id`, `fName`, `mName`, `lName`, `tel`, `addresses`, `email`) VALUES
(1, 'Wongsatorn', NULL, 'Sungsila', '0875412653', '98/83 Bangna', 'wongsatorn.sung@local.com'),
(2, 'Kanit', NULL, 'Bunny', '0122254523', 'Royal Naval Academy', 'bunny@local.com'),
(3, 'Pitchayuth', NULL, 'Yampong', '0523124456', 'Chumpon', 'picha@local.com'),
(4, 'Chukiat', NULL, 'Bunny', '0845256325', 'Sukhumvit, Samutprakarn', 'jekchu@local.com'),
(5, 'Kittipong', NULL, 'Tapee', '0620650992', '04/41 Phetkasame Rd., Mueng Chumpon', 'kittipong.tpy@local.com');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `fName` varchar(50) NOT NULL,
  `mName` varchar(50) DEFAULT NULL,
  `lName` varchar(50) NOT NULL,
  `idNumber` varchar(13) NOT NULL,
  `DOB` date NOT NULL,
  `sex` varchar(10) NOT NULL,
  `addresses` text NOT NULL,
  `tel` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pw` text NOT NULL,
  `nationality` varchar(50) NOT NULL,
  `race` varchar(50) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `bloodType` varchar(5) NOT NULL,
  `e_id` int(11) NOT NULL,
  `relation` varchar(50) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `d_license_id` varchar(10) DEFAULT NULL,
  `d_department_id` int(11) DEFAULT NULL,
  `quit_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `fName`, `mName`, `lName`, `idNumber`, `DOB`, `sex`, `addresses`, `tel`, `email`, `pw`, `nationality`, `race`, `religion`, `bloodType`, `e_id`, `relation`, `role_name`, `d_license_id`, `d_department_id`, `quit_date`) VALUES
(1, 'Weeraa', NULL, 'Theeraphat', '3101100254685', '1940-02-07', 'Male', '13 Rama IX Rd., Bangkok', '0841234567', 'weera.t@modmed.com', '1234', 'Thai', 'Thai', 'Buddhist', 'A-', 1, 'Son', 'doctor', 'W74125', 1, NULL),
(2, 'Phond', NULL, 'Phunchongharn', '3100111002352', '1982-09-30', 'Female', '126 Pracha Uthit Rd', '0562235467', 'phond.p@modmed.com', 'pp', 'Thai', 'Thai', 'Buddhist', 'A+', 4, 'Father', 'doctor', 'E41578', 2, NULL),
(3, 'Acharee', NULL, 'Weerapong', '1104521345687', '1997-10-12', 'Female', 'Bangna, Bangkok', '0625526987', 'acharee.w@modmed.com', 'password', 'Thai', 'Thai', 'Buddhist', 'AB+', 5, 'Friend', 'finance', NULL, NULL, NULL),
(4, 'Chuchai', NULL, 'Wiwatana', '3100521245657', '1964-02-09', 'Male', 'Victory Monument', '0914567852', 'chuchai.w@modmed.com', '888', 'Thai', 'Thai', 'Buddhist', 'A-', 2, 'Son', 'register', NULL, NULL, NULL),
(5, 'Sanan', NULL, 'Srakaew', '3887451243216', '1960-04-23', 'Male', 'Srakaew', '0865986542', 'sanan.s@modmed.com', 'qwerty', 'Thai', 'Thai', 'Buddhist', 'O+', 2, 'Son', 'doctor', 'H19374', 3, NULL),
(6, 'Khajonpong', NULL, 'Akkarajitsakul', '1105213457854', '1985-02-08', 'Male', 'Bangmod, Bangkok', '0855552356', 'khajonpong.a@modmed.com', '112', 'Thai', 'Thai', 'Buddhist', 'A-', 4, 'Father', 'doctor', 'D51024', 4, '2024-03-05 01:28:31');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `p_id` int(11) NOT NULL,
  `fName` varchar(50) NOT NULL,
  `mName` varchar(50) DEFAULT NULL,
  `lName` varchar(50) NOT NULL,
  `idNumber` varchar(13) DEFAULT NULL,
  `DOB` date NOT NULL,
  `sex` varchar(10) NOT NULL,
  `addresses` text,
  `tel` varchar(10) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `nationality` varchar(50) NOT NULL,
  `race` varchar(50) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `bloodType` varchar(5) NOT NULL,
  `e_id` int(11) NOT NULL,
  `relation` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`p_id`, `fName`, `mName`, `lName`, `idNumber`, `DOB`, `sex`, `addresses`, `tel`, `email`, `nationality`, `race`, `religion`, `bloodType`, `e_id`, `relation`) VALUES
(1, 'Apichat', NULL, 'Aimi', '1101402256352', '2004-04-04', 'Male', '784 Sanam Chandra, Nakorn Prathom', '0965236521', 'apichar@hotmail.com', 'Thai', 'Thai', 'Buddhist', 'A', 2, 'Husband'),
(2, 'Pairoj', NULL, 'Saisam', '1104774521698', '1945-07-04', 'Male', 'Mars', '0412563254', 'pair@hotmail.com', 'Thai', 'Thai', 'Buddhist', 'AB+', 1, 'Son'),
(3, 'Seesawat', NULL, 'Samranmark', '1458569652365', '2000-12-04', 'Female', 'Suam Phueng, Ratchaburi', '0856555541', 's.samran@hotmail.com', 'Thai', 'Thai/Denmark', 'Protestant', 'B+', 4, 'Father'),
(4, 'Jumpol', NULL, 'Polvichai', '3145258754234', '1980-07-04', 'Male', 'KMUTT, Bangkok', '0985745245', 'jumo@hotmail.com', 'Thai', 'Thai', 'Buddhist', 'O-', 2, 'Relative'),
(5, 'Noppakhao', NULL, 'Somsrichai', '3452122157859', '1954-04-04', 'Female', '218 Pracha Uthit Rd, Bangkok', '0982385749', 'mas@hotmail.com', 'Thai', 'Thai', 'Muslim', 'B+', 4, 'Son');

-- --------------------------------------------------------

--
-- Table structure for table `patient_allergy`
--

CREATE TABLE `patient_allergy` (
  `allergy_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `type_allergy` varchar(25) NOT NULL,
  `allergy` varchar(100) NOT NULL,
  `status_allergy` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `patient_allergy`
--

INSERT INTO `patient_allergy` (`allergy_id`, `p_id`, `type_allergy`, `allergy`, `status_allergy`) VALUES
(1, 1, 'food', 'peach', 1),
(2, 1, 'food', 'pad kraphao', 1),
(3, 1, 'drug', 'paracetamol', 1),
(4, 1, 'food', 'peanuts', 1),
(5, 5, 'food', 'seafood', 1),
(6, 5, 'symptom', 'diabetes', 1),
(7, 1, 'food', 'orange', 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_name` varchar(50) NOT NULL,
  `income_base` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_name`, `income_base`) VALUES
('doctor', 900),
('finance', 425),
('register', 450);

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `room_id` varchar(10) NOT NULL,
  `p_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `p_id`) VALUES
('101', NULL),
('104', NULL),
('105', NULL),
('201', NULL),
('202', NULL),
('203', NULL),
('204', NULL),
('205', NULL),
('102', 3),
('103', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`,`clock_in`);

--
-- Indexes for table `cure_history`
--
ALTER TABLE `cure_history`
  ADD PRIMARY KEY (`p_id`,`date_cure`),
  ADD KEY `FK_d_id_TO_cure_history` (`d_id`),
  ADD KEY `FK_room_TO_cure_history` (`room_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `edu`
--
ALTER TABLE `edu`
  ADD PRIMARY KEY (`id`,`level_edu`,`diploma`);

--
-- Indexes for table `emergency_contact`
--
ALTER TABLE `emergency_contact`
  ADD PRIMARY KEY (`e_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_emergency_contact_TO_employee` (`e_id`),
  ADD KEY `FK_role_TO_employee` (`role_name`),
  ADD KEY `FK_department_TO_employee` (`d_department_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`p_id`),
  ADD KEY `FK_emergency_contact_TO_patient` (`e_id`);

--
-- Indexes for table `patient_allergy`
--
ALTER TABLE `patient_allergy`
  ADD PRIMARY KEY (`allergy_id`),
  ADD KEY `FK_patient_TO_patient_allergy` (`p_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_name`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `FK_patient_TO_room` (`p_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `emergency_contact`
--
ALTER TABLE `emergency_contact`
  MODIFY `e_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `patient_allergy`
--
ALTER TABLE `patient_allergy`
  MODIFY `allergy_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `FK_employee_TO_attendance` FOREIGN KEY (`id`) REFERENCES `employee` (`id`);

--
-- Constraints for table `cure_history`
--
ALTER TABLE `cure_history`
  ADD CONSTRAINT `FK_d_id_TO_cure_history` FOREIGN KEY (`d_id`) REFERENCES `employee` (`id`),
  ADD CONSTRAINT `FK_patient_TO_cure_history` FOREIGN KEY (`p_id`) REFERENCES `patient` (`p_id`),
  ADD CONSTRAINT `FK_room_TO_cure_history` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`);

--
-- Constraints for table `edu`
--
ALTER TABLE `edu`
  ADD CONSTRAINT `FK_employee_TO_edu` FOREIGN KEY (`id`) REFERENCES `employee` (`id`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `FK_department_TO_employee` FOREIGN KEY (`d_department_id`) REFERENCES `department` (`department_id`),
  ADD CONSTRAINT `FK_emergency_contact_TO_employee` FOREIGN KEY (`e_id`) REFERENCES `emergency_contact` (`e_id`),
  ADD CONSTRAINT `FK_role_TO_employee` FOREIGN KEY (`role_name`) REFERENCES `roles` (`role_name`);

--
-- Constraints for table `patient`
--
ALTER TABLE `patient`
  ADD CONSTRAINT `FK_emergency_contact_TO_patient` FOREIGN KEY (`e_id`) REFERENCES `emergency_contact` (`e_id`);

--
-- Constraints for table `patient_allergy`
--
ALTER TABLE `patient_allergy`
  ADD CONSTRAINT `FK_patient_TO_patient_allergy` FOREIGN KEY (`p_id`) REFERENCES `patient` (`p_id`);

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `FK_patient_TO_room` FOREIGN KEY (`p_id`) REFERENCES `patient` (`p_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
