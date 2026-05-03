-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 03, 2026 at 11:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nilevo`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `gmail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `gmail`, `password`, `created_at`) VALUES
(1, 'amasser020@gmail.com', 'asser.yasser', '2026-03-04 17:04:07'),
(2, 'nilevo@gmail.com', 'admin@123', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `chatbot_usage`
--

CREATE TABLE `chatbot_usage` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `usage_date` date NOT NULL,
  `message_count` int(11) NOT NULL DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chatbot_usage`
--

INSERT INTO `chatbot_usage` (`id`, `user_id`, `usage_date`, `message_count`, `updated_at`) VALUES
(7, 7, '2026-03-10', 1, '2026-03-10 00:07:55'),
(8, 9, '2026-03-10', 6, '2026-03-10 03:05:47'),
(17, 10, '2026-03-10', 2, '2026-03-10 19:13:26'),
(19, 10, '2026-03-11', 3, '2026-03-11 00:02:28'),
(24, 18, '2026-03-11', 3, '2026-03-11 01:07:12'),
(28, 22, '2026-03-30', 1, '2026-03-30 07:12:31'),
(29, 19, '2026-04-01', 3, '2026-04-01 00:52:34'),
(32, 2, '2026-04-11', 1, '2026-04-11 10:32:48'),
(33, 24, '2026-04-28', 2, '2026-04-28 06:28:31'),
(35, 27, '2026-05-03', 2, '2026-05-03 19:10:16');

-- --------------------------------------------------------

--
-- Table structure for table `coupon_redemptions`
--

CREATE TABLE `coupon_redemptions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `coupon_code` varchar(20) NOT NULL,
  `voucher_code` varchar(20) NOT NULL,
  `discount` int(11) NOT NULL DEFAULT 5,
  `redeemed_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coupon_redemptions`
--

INSERT INTO `coupon_redemptions` (`id`, `user_id`, `coupon_code`, `voucher_code`, `discount`, `redeemed_at`) VALUES
(1, 1, 'T4P911', 'AQ-6491859D', 5, '2026-05-02 03:17:49'),
(2, 1, 'DR1P42', 'AQ-2D1C29B9', 5, '2026-05-02 03:45:32');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` enum('like','reply') NOT NULL,
  `actor_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `reply_id` int(11) DEFAULT NULL,
  `is_read` tinyint(4) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `type`, `actor_id`, `post_id`, `reply_id`, `is_read`, `created_at`) VALUES
(7, 7, 'reply', 1, 9, 10, 1, '2026-03-09 21:28:27'),
(8, 7, 'like', 9, 9, NULL, 1, '2026-03-10 00:02:51'),
(9, 4, 'like', 9, 7, NULL, 1, '2026-03-10 00:02:55'),
(10, 1, 'like', 9, 8, NULL, 1, '2026-03-10 00:02:59'),
(11, 1, 'like', 10, 8, NULL, 1, '2026-03-10 16:17:49'),
(12, 7, 'like', 10, 9, NULL, 1, '2026-03-10 16:17:54'),
(13, 7, 'like', 18, 9, NULL, 0, '2026-03-10 22:04:42'),
(14, 19, 'reply', 1, 14, 11, 1, '2026-03-11 09:21:55'),
(15, 1, 'like', 4, 8, NULL, 1, '2026-03-13 09:49:16'),
(16, 1, 'reply', 4, 8, 12, 1, '2026-03-13 09:50:01'),
(17, 1, 'like', 19, 8, NULL, 0, '2026-05-01 10:01:15'),
(18, 1, 'reply', 19, 8, 14, 0, '2026-05-02 07:11:44'),
(19, 19, 'reply', 27, 15, 15, 0, '2026-05-03 22:12:37');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `edited_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `title`, `body`, `image_path`, `created_at`, `edited_at`) VALUES
(7, 4, 'How To Save Water', 'My water bill is very expensive and I don\'t know why. How can I conserve water?', 'uploads/community/post_4_1773094934_8e2cc913.jpg', '2026-03-10 00:22:14', NULL),
(8, 1, 'I broke My water Tap ', 'I tried to fix it a lot but still leak can I find solution?', 'uploads/community/post_1_1773095151_db77ee99.jpg', '2026-03-10 00:25:51', '2026-03-10 11:04:47'),
(9, 7, 'water is imprtant', 'hello water is important', NULL, '2026-03-09 21:23:13', NULL),
(10, 9, 'This website helped me with saving water', 'Hello everyone, I am an Egyptian who was used to living as a water profuse, I needed to get better at consuming water and I didn\'t know how to..\nEverything seemed terrible, until the day came.\none day my friend Asser Yasser who is one of this website\'s developers told me about this website, I started using it and that helped me a lot at saving much water everyday!\nI\'m so grateful for my friend Asser, his team members, and this wonderful website ❤.', NULL, '2026-03-09 23:59:29', NULL),
(14, 19, 'Explain to me One thing', 'How can i reduce my water usage', NULL, '2026-03-11 08:38:01', NULL),
(15, 19, 'Hi Every one', 'I\'m asking about tips for saving water in garden', NULL, '2026-04-30 16:00:18', '2026-05-01 00:43:53'),
(16, 27, 'hi I am interest in saving water', 'how can i save water', NULL, '2026-05-03 22:12:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `post_likes`
--

CREATE TABLE `post_likes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_likes`
--

INSERT INTO `post_likes` (`id`, `post_id`, `user_id`) VALUES
(22, 8, 1),
(20, 8, 4),
(16, 8, 10),
(21, 8, 19),
(17, 9, 10),
(12, 10, 9);

-- --------------------------------------------------------

--
-- Table structure for table `replies`
--

CREATE TABLE `replies` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `body` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `replies`
--

INSERT INTO `replies` (`id`, `post_id`, `user_id`, `body`, `created_at`, `parent_id`) VALUES
(10, 9, 1, 'hi :)', '2026-03-09 21:28:27', NULL),
(11, 14, 1, 'To save water you can take just shorter your showers and use a dishwasher and If you need more tips your can ask the chatbot for more advice on water conservation.', '2026-03-11 09:21:55', NULL),
(12, 8, 4, 'up', '2026-03-13 09:50:01', NULL),
(13, 14, 19, 'Thank u ya asser', '2026-04-01 02:21:22', NULL),
(14, 8, 19, 'Up', '2026-05-02 07:11:44', NULL),
(15, 15, 27, 'just use less water', '2026-05-03 22:12:37', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `player_name` varchar(100) NOT NULL DEFAULT 'Guest',
  `time_remaining` float NOT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `user_id`, `player_name`, `time_remaining`, `date`) VALUES
(18, 4, 'Omar Khaled', 1600, '2026-03-09 13:26:38'),
(20, 7, 'Zezo Amir', 3000, '2026-03-09 21:19:25'),
(21, 8, 'omar sob7y', 1200, '2026-03-09 23:37:37'),
(23, 9, 'MNDAX SH', 3200, '2026-03-10 00:12:14'),
(29, 18, 'Asser yasser2', 1400, '2026-03-10 21:56:02'),
(44, NULL, 'Test2', 4800, '2026-05-02 04:10:35'),
(47, 19, 'Mohamed Maher', 4900, '2026-05-02 07:07:18'),
(48, NULL, 'Omar', 1200, '2026-05-02 08:22:05'),
(49, NULL, 'Test', 3300, '2026-05-02 13:16:24'),
(50, 27, 'asser yasser', 5400, '2026-05-03 22:08:38');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `account_type` varchar(50) DEFAULT 'Free',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `email`, `phone`, `password`, `account_type`, `created_at`) VALUES
(1, 'asser', 'yasser', 'amasser020@gmail.com', '12345678901', '123', 'premium', '2026-03-04 13:10:20'),
(2, 'Anas', 'yasser', 'amasser010@gmail.com', '01234567890', '123', 'standard', '2026-03-04 13:11:12'),
(4, 'Omar', 'Khaled', 'omarelafi00@gmail.com', '01022163368', '1234', 'premium', '2026-03-04 23:23:19'),
(5, 'Khaled', 'Ali', 'khaled70maths@gmail.com', '01022163368', '1234', 'Standard', '2026-03-05 18:31:15'),
(6, 'Abdallah', 'Khaled', 'abdallahelafi12@gmail.com', '01022163368', '1234', 'premium', '2026-03-05 20:59:26'),
(7, 'Zezo', 'Amir', 'zezoamirsta@gmail.com', '01019831766', '123', 'standard', '2026-03-10 00:06:42'),
(8, 'omar', 'sob7y', '1312@gmail.com', '123', '123', 'Standard', '2026-03-10 02:34:00'),
(9, 'MNDAX', 'SH', 'abdosharaf203@gmail.com', '01093599069', '123', 'Standard', '2026-03-10 02:40:01'),
(10, 'anas tarek', 'anas tarek', 'anastarek340@gmail.com', '01142979110', '123', 'Standard', '2026-03-10 19:11:04'),
(18, 'Asser', 'yasser2', 'amasser00@gmail.com', '01234567890', 'asseryasser', 'standard', '2026-03-11 00:53:19'),
(19, 'Mohamed', 'Maher', 'mo7amed.maher.28@gmail.com', '01152292951', '123', 'premium', '2026-03-11 11:36:08'),
(21, 'Karim', 'Diaa', 'karim@gmail.com', '33333330', '1234567890', 'Standard', '2026-03-16 13:28:04'),
(22, 'malak', 'waleed', 'malakwaleed140@gmail.com', '01026237633', '123456789', 'Standard', '2026-03-30 07:07:24'),
(23, 'Mohamed', 'Maher', '124075@sta.edu.eg', '01152292951', '123', 'premium', '2026-04-11 10:04:47'),
(24, 'Elham', 'ahmed', 'bossyahmed7689@gmail.com', '01101316038', '123', 'Standard', '2026-04-28 06:27:47'),
(25, 'Aqua', 'Mind', 'aquamindgame@gmail.com', '01152292951', 'game123123', 'Standard', '2026-05-02 03:38:13'),
(26, 'Mazen', 'Khaled', 'mazokhaled191@gmail.com', '01065740316 ', '123', 'Standard', '2026-05-02 03:56:25'),
(27, 'asser', 'yasser', 'amasser050@gmail.com', '01026710199', '123', 'Standard', '2026-05-03 19:06:21');

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `discount` int(11) NOT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(4) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `user_id`, `code`, `discount`, `expires_at`, `used`, `created_at`) VALUES
(0, 4, 'AQ-79A0F6AF', 20, '2026-03-11 14:45:48', 1, '2026-03-08 15:45:48'),
(2, 1, 'AQ-85EE37D3', 15, '2026-03-11 16:50:25', 0, '2026-03-08 17:50:25'),
(3, 1, 'AQ-8E7898BC', 15, '2026-03-11 18:37:02', 0, '2026-03-08 19:37:02'),
(4, 6, 'AQ-CC105F81', 20, '2026-03-11 19:40:31', 0, '2026-03-08 20:40:31'),
(5, 5, 'AQ-A838FBE7', 20, '2026-03-11 19:58:47', 1, '2026-03-08 20:58:47'),
(6, 7, 'AQ-2137F1B2', 20, '2026-03-13 01:20:56', 1, '2026-03-09 21:20:56'),
(7, 9, 'AQ-A4B956AB', 15, '2026-03-13 03:50:36', 0, '2026-03-09 23:50:36'),
(12, 18, 'AQ-2A8F0109', 20, '2026-03-14 01:56:20', 1, '2026-03-10 21:56:20'),
(13, 1, 'AQ-B36046AE', 10, '2026-03-19 01:18:35', 1, '2026-03-16 02:18:35'),
(14, 1, 'AQ-1BE9B909', 20, '2026-03-21 08:04:50', 1, '2026-03-18 09:04:50'),
(15, 2, 'AQ-BF6DADB1', 20, '2026-04-14 12:35:44', 0, '2026-04-11 12:35:44'),
(16, 1, 'AQ-68D46AD1', 20, '2026-05-03 14:59:28', 0, '2026-04-30 15:59:28'),
(17, 4, 'AQUA5OFF', 5, '2026-05-09 00:19:37', 0, '2026-05-02 01:19:37'),
(18, 1, 'AQ-6491859D', 5, '2026-05-09 02:17:49', 0, '2026-05-02 03:17:49'),
(19, 1, 'AQ-2D1C29B9', 5, '2026-05-09 02:45:32', 0, '2026-05-02 03:45:32'),
(20, 19, 'AQ-63B46E64', 20, '2026-05-05 05:32:37', 1, '2026-05-02 06:32:37'),
(21, 27, 'AQ-1844CC6C', 20, '2026-05-06 21:09:22', 1, '2026-05-03 22:09:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gmail` (`gmail`);

--
-- Indexes for table `chatbot_usage`
--
ALTER TABLE `chatbot_usage`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_user_date` (`user_id`,`usage_date`);

--
-- Indexes for table `coupon_redemptions`
--
ALTER TABLE `coupon_redemptions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_user_coupon` (`user_id`,`coupon_code`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `actor_id` (`actor_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_like` (`post_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `replies`
--
ALTER TABLE `replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_player` (`player_name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `chatbot_usage`
--
ALTER TABLE `chatbot_usage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `coupon_redemptions`
--
ALTER TABLE `coupon_redemptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `replies`
--
ALTER TABLE `replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chatbot_usage`
--
ALTER TABLE `chatbot_usage`
  ADD CONSTRAINT `chatbot_usage_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `coupon_redemptions`
--
ALTER TABLE `coupon_redemptions`
  ADD CONSTRAINT `fk_coupon_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_3` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD CONSTRAINT `post_likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `replies`
--
ALTER TABLE `replies`
  ADD CONSTRAINT `replies_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `replies_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD CONSTRAINT `vouchers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
