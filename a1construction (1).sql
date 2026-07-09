-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2026 at 03:12 PM
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
-- Database: `a1construction`
--

-- --------------------------------------------------------

--
-- Table structure for table `enquiries`
--

CREATE TABLE `enquiries` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `organisation` varchar(200) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` enum('new','read','replied') DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `url` varchar(1000) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `caption` text DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `uploaded_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `filename`, `url`, `alt_text`, `caption`, `type`, `size`, `uploaded_by`, `created_at`) VALUES
(1, 'smoke-upload-1783333535948.txt', 'http://localhost:3000/uploads/smoke-upload-1783333535948.txt', NULL, NULL, 'text/plain', 47, NULL, '2026-07-06 10:25:35'),
(2, 'assam1-1783601432621.jpg', 'http://localhost:3000/uploads/assam1-1783601432621.jpg', NULL, NULL, 'image/jpeg', 109344, NULL, '2026-07-09 12:50:32'),
(3, 'assam1-1783601708886.jpg', 'http://localhost:3000/uploads/assam1-1783601708886.jpg', NULL, NULL, 'image/jpeg', 109344, NULL, '2026-07-09 12:55:08'),
(4, 'assam1-1783601965806.jpg', 'http://localhost:3000/uploads/assam1-1783601965806.jpg', NULL, NULL, 'image/jpeg', 109344, NULL, '2026-07-09 12:59:25'),
(5, 'assam1-1783602614208.jpg', 'http://localhost:3000/uploads/assam1-1783602614208.jpg', NULL, NULL, 'image/jpeg', 109344, NULL, '2026-07-09 13:10:14'),
(6, 'screenshot_1-7-2026_174353_u-pack.com-1783602665010.jpeg', 'http://localhost:3000/uploads/screenshot_1-7-2026_174353_u-pack.com-1783602665010.jpeg', NULL, NULL, 'image/jpeg', 420025, NULL, '2026-07-09 13:11:05');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(300) NOT NULL,
  `slug` varchar(300) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `type` enum('page','post') DEFAULT 'page',
  `status` enum('draft','published','archived') DEFAULT 'draft',
  `author_id` int(11) DEFAULT NULL,
  `featured_image` varchar(1000) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `menu_order` int(11) DEFAULT 0,
  `published_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `type`, `status`, `author_id`, `featured_image`, `active`, `menu_order`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 'Smoke Test Post 1783333509480', 'smoke-test-1783333509480', 'Automated smoke test', '<p>ok</p>', 'post', 'published', 1, NULL, 1, 0, NULL, '2026-07-06 10:25:09', '2026-07-06 10:25:09');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(300) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `category`, `location`, `desc`, `image`, `color`, `featured`, `active`, `sort_order`, `created_at`, `updated_at`) VALUES
(7, 'ASSAM BHAWAN, Bheemanakuppe, Bangalore ', 'Government', 'Bangalore', 'test', 'http://localhost:3000/uploads/assam1-1783601965806.jpg', NULL, NULL, 1, 1, '2026-07-09 13:00:14', '2026-07-09 13:00:14');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `icon` varchar(10) DEFAULT '?',
  `name` varchar(200) NOT NULL,
  `desc` text DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `icon`, `name`, `desc`, `sort_order`, `active`, `created_at`, `updated_at`) VALUES
(1, '🏗', 'Building Construction', 'Residential, commercial, and institutional structures to the highest standards.', 1, 1, '2026-06-29 09:10:59', '2026-06-29 09:10:59'),
(2, '🏛', 'Government Infrastructure', 'Public buildings, civil works, and government-mandated projects.', 2, 1, '2026-06-29 09:10:59', '2026-06-29 09:10:59'),
(3, '🏥', 'Healthcare Infrastructure', 'Hospitals, medical centres, and healthcare facilities with precision execution.', 3, 1, '2026-06-29 09:10:59', '2026-06-29 09:10:59'),
(4, '🎓', 'Educational Infrastructure', 'Colleges, universities, hostels, and academic campuses across Karnataka.', 4, 1, '2026-06-29 09:10:59', '2026-06-29 09:10:59'),
(5, '🏭', 'Industrial Construction', 'Warehouses, storage facilities, and industrial complexes built for durability.', 5, 1, '2026-06-29 09:10:59', '2026-06-29 09:10:59'),
(6, '⚙️', 'Structural Works', 'RCC frameworks, steel structures, and civil engineering works at scale.', 6, 1, '2026-06-29 09:10:59', '2026-06-29 09:10:59'),
(7, '⚡', 'Electrical & Plumbing', 'Complete MEP services integrated seamlessly into construction workflows.', 7, 1, '2026-06-29 09:10:59', '2026-06-29 09:10:59'),
(8, '🎨', 'Interior & Exterior Works', 'Finishing, cladding, and interior fit-outs for premium project delivery.', 8, 1, '2026-06-29 09:10:59', '2026-06-29 09:10:59'),
(9, '🛣', 'Infrastructure Development', 'Roads, drainage, utilities, and urban infrastructure for public authorities.', 9, 1, '2026-06-29 09:10:59', '2026-06-29 09:10:59'),
(10, '📋', 'Project Management', 'Full PMC services — planning, coordination, quality, and timely delivery.', 10, 1, '2026-06-29 09:10:59', '2026-06-29 09:10:59');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `key` varchar(150) NOT NULL,
  `value` text DEFAULT NULL,
  `autoload` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `slides`
--

CREATE TABLE `slides` (
  `id` int(11) NOT NULL,
  `eyebrow` varchar(200) DEFAULT NULL,
  `title` varchar(500) NOT NULL,
  `subtitle` text DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `slides`
--

INSERT INTO `slides` (`id`, `eyebrow`, `title`, `subtitle`, `image`, `sort_order`, `active`, `created_at`, `updated_at`) VALUES
(1, 'Est. 2012 · Bengaluru, Karnataka', 'Building Infrastructure That Shapes Communities', 'Trusted partner for government, institutional and corporate projects across Karnataka and South India.', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85', 1, 1, '2026-06-29 09:10:59', '2026-06-29 09:10:59'),
(2, 'Government · Healthcare · Education', 'Delivering Engineering Excellence Across South India', 'End-to-end construction solutions — from project planning through to final handover.', 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85', 2, 1, '2026-06-29 09:10:59', '2026-06-29 09:10:59'),
(3, 'Quality · Safety · Sustainability', 'Building National Assets, Enabling Economic Progress', 'Proven track record of 100+ projects for government bodies, PSUs, and institutional clients.', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=85', 3, 1, '2026-06-29 09:10:59', '2026-06-29 09:10:59');

-- --------------------------------------------------------

--
-- Table structure for table `terms`
--

CREATE TABLE `terms` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `taxonomy` varchar(50) DEFAULT 'category',
  `parent` int(11) DEFAULT 0,
  `active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `term_relationships`
--

CREATE TABLE `term_relationships` (
  `object_id` int(11) NOT NULL,
  `term_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','editor') DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'A1 Admin', 'admin@a1construction.co.in', '$2a$12$Hf/EF9QHxIt4vUzZxrawO.9QNas0EqmFztv6izNlbbxDcoEii1iJS', 'admin', '2026-06-29 09:10:59', '2026-06-29 09:10:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `enquiries`
--
ALTER TABLE `enquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploaded_by` (`uploaded_by`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key` (`key`);

--
-- Indexes for table `slides`
--
ALTER TABLE `slides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terms`
--
ALTER TABLE `terms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_term` (`slug`,`taxonomy`);

--
-- Indexes for table `term_relationships`
--
ALTER TABLE `term_relationships`
  ADD PRIMARY KEY (`object_id`,`term_id`),
  ADD KEY `term_id` (`term_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `enquiries`
--
ALTER TABLE `enquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `slides`
--
ALTER TABLE `slides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `terms`
--
ALTER TABLE `terms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `media_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `term_relationships`
--
ALTER TABLE `term_relationships`
  ADD CONSTRAINT `term_relationships_ibfk_1` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `term_relationships_ibfk_2` FOREIGN KEY (`object_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
