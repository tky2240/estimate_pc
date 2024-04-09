CREATE DATABASE IF NOT EXISTS `estimate_pc`;
USE `estimate_pc`;

CREATE TABLE IF NOT EXISTS `case` (
  `item_id` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `popular_rank` int(11) DEFAULT NULL,
  `maker_name` varchar(100) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `max_gpu_length` double DEFAULT 0,
  `max_cpu_cooler_height` double DEFAULT 0,
  `max_power_supply_size` double DEFAULT 0,
  `slot_count` double DEFAULT 0,
  `drive_bay_information` varchar(200) NOT NULL,
  `is_low_profile` bit(1) NOT NULL,
  `weight` double DEFAULT NULL,
  `width` double DEFAULT NULL,
  `height` double DEFAULT NULL,
  `depth` double DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `is_exist` bit(1) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='pc case information';

CREATE TABLE IF NOT EXISTS `case_support_form_factor` (
  `case_item_id` varchar(100) NOT NULL,
  `form_factor` varchar(100) NOT NULL,
  PRIMARY KEY (`case_item_id`,`form_factor`),
  CONSTRAINT `FK__case` FOREIGN KEY (`case_item_id`) REFERENCES `case` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='case suppot motherboard form factor';

CREATE TABLE IF NOT EXISTS `cpu` (
  `item_id` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `popular_rank` int(11) DEFAULT NULL,
  `maker_name` varchar(100) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `generation` varchar(100) NOT NULL,
  `socket_name` varchar(100) NOT NULL,
  `core_count` int(11) NOT NULL,
  `thread_count` int(11) NOT NULL,
  `tdp` int(11) DEFAULT NULL,
  `base_clock` double NOT NULL,
  `boost_clock` double DEFAULT NULL,
  `graphics` varchar(100) NOT NULL,
  `release_date` date DEFAULT NULL,
  `is_exist` bit(1) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='cpus information';

CREATE TABLE IF NOT EXISTS `cpu_cooler` (
  `item_id` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `popular_rank` int(11) DEFAULT NULL,
  `maker_name` varchar(100) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `air_flow_type` varchar(100) NOT NULL,
  `noise_level` varchar(100) NOT NULL,
  `max_tdp` int(11) DEFAULT NULL,
  `width` double DEFAULT NULL,
  `height` double DEFAULT NULL,
  `depth` double DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `is_exist` bit(1) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='cpu coolers information';

CREATE TABLE IF NOT EXISTS `cpu_cooler_socket` (
  `cpu_cooler_item_id` varchar(100) NOT NULL,
  `socket_name` varchar(100) NOT NULL,
  PRIMARY KEY (`cpu_cooler_item_id`,`socket_name`) USING BTREE,
  CONSTRAINT `FK__cpu_cooler` FOREIGN KEY (`cpu_cooler_item_id`) REFERENCES `cpu_cooler` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='supported information for cpu coolers';

CREATE TABLE IF NOT EXISTS `gpu` (
  `item_id` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `popular_rank` int(11) DEFAULT NULL,
  `maker_name` varchar(100) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `chip_name` varchar(100) NOT NULL,
  `gpu_memory_type` varchar(100) NOT NULL,
  `gpu_memory_capacity` int(11) NOT NULL,
  `gpu_memory_bus_width` int(11) DEFAULT 0,
  `gpu_memory_clock` double DEFAULT 0,
  `pcie_interface` varchar(100) NOT NULL,
  `is_low_profile` bit(1) NOT NULL,
  `cooling_solution` varchar(100) NOT NULL,
  `tdp` int(11) DEFAULT NULL,
  `hdmi_count` int(11) NOT NULL,
  `displayport_count` int(11) NOT NULL,
  `width` double DEFAULT NULL,
  `height` double DEFAULT NULL,
  `depth` double DEFAULT NULL,
  `radiator_width` double DEFAULT NULL,
  `radiator_height` double DEFAULT NULL,
  `radiator_depth` double DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `is_exist` bit(1) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='gpu information';

CREATE TABLE IF NOT EXISTS `hdd` (
  `item_id` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `popular_rank` int(11) DEFAULT NULL,
  `maker_name` varchar(100) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `capacity` int(11) NOT NULL,
  `rpm` int(11) DEFAULT NULL,
  `write_style` varchar(100) NOT NULL,
  `release_date` date DEFAULT NULL,
  `is_exist` bit(1) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='hdd information';

CREATE TABLE IF NOT EXISTS `memory` (
  `item_id` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `popular_rank` int(11) DEFAULT NULL,
  `maker_name` varchar(100) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `capacity_per_module` int(11) NOT NULL,
  `module_count` int(11) NOT NULL,
  `interface` varchar(100) NOT NULL,
  `memory_type` varchar(100) NOT NULL,
  `module_type` varchar(100) NOT NULL,
  `release_date` date DEFAULT NULL,
  `is_exist` bit(1) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='memory module information';

CREATE TABLE IF NOT EXISTS `motherboard` (
  `item_id` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `popular_rank` int(11) DEFAULT NULL,
  `maker_name` varchar(100) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `chipset` varchar(100) NOT NULL,
  `socket_name` varchar(100) NOT NULL,
  `form_factor` varchar(100) NOT NULL,
  `memory_type` varchar(100) NOT NULL,
  `memory_slot_count` int(11) NOT NULL,
  `max_memory_capacity` int(11) NOT NULL,
  `pci_slot_count` int(11) NOT NULL,
  `pcie_x16_slot_count` int(11) NOT NULL,
  `pcie_x8_slot_count` int(11) NOT NULL,
  `pcie_x4_slot_count` int(11) NOT NULL,
  `pcie_x1_slot_count` int(11) NOT NULL,
  `sata_connector_count` int(11) NOT NULL,
  `release_date` date DEFAULT NULL,
  `is_exist` bit(1) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='motherboard information';

CREATE TABLE IF NOT EXISTS `power_supply` (
  `item_id` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `popular_rank` int(11) DEFAULT NULL,
  `maker_name` varchar(100) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `form_factor` varchar(100) NOT NULL,
  `capacity` int(11) NOT NULL,
  `eighty_plus_certification` varchar(100) NOT NULL,
  `cpu_connector_count` int(11) DEFAULT NULL,
  `six_pin_connector_count` int(11) DEFAULT NULL,
  `eight_pin_connector_count` int(11) DEFAULT NULL,
  `sata_connector_count` int(11) DEFAULT NULL,
  `peripheral_connector_count` int(11) DEFAULT NULL,
  `fdd_connector_count` int(11) DEFAULT NULL,
  `width` double DEFAULT NULL,
  `height` double DEFAULT NULL,
  `depth` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `is_exist` bit(1) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='power supply information';

CREATE TABLE IF NOT EXISTS `ssd` (
  `item_id` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `popular_rank` int(11) DEFAULT NULL,
  `maker_name` varchar(100) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `capacity` int(11) NOT NULL,
  `size` varchar(100) NOT NULL,
  `interface` varchar(100) NOT NULL,
  `tbw` int(11) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `is_exist` bit(1) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ssd information';
