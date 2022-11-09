from typing import Tuple
from sshtunnel import SSHTunnelForwarder
from sshtunnel import open_tunnel
import yaml
import sqlalchemy
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, String, Date, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import ForeignKey
from sqlalchemy.engine import Engine
from sqlalchemy.orm import sessionmaker, Session
Base = declarative_base()


def connect_server(setting_file_path) -> Tuple[SSHTunnelForwarder, Engine, Session]:
    with open(setting_file_path) as setting_file:
        settings = yaml.safe_load(setting_file)
        # ref:https://blog.honjala.net/entry/2016/06/25/013131
        ssh_password = input("input ssh password :")
        tunnel = open_tunnel(
            (settings['ssh_server_address'], settings['ssh_server_port']),
            ssh_username=settings['ssh_user_name'],
            ssh_password=ssh_password,
            remote_bind_address=(
                settings['db_server_address'], settings['db_server_port'])
        )
        tunnel.start()
        local_port = tunnel.local_bind_port
        mariadb_password = input("input mariadb password : ")
        hoge = f"mysql+mysqlconnector://{settings['db_user_name']}:{mariadb_password}@localhost:{local_port}/{settings['db_initial_database']}"
        engine = sqlalchemy.create_engine(
            f"mysql+mysqlconnector://{settings['db_user_name']}:{mariadb_password}@localhost:{local_port}/{settings['db_initial_database']}")
        #session_maker = sessionmaker(bind=engine)
        session = Session(autocommit=False, autoflush=True, bind=engine)
        return tunnel, engine, session


class Cpu(Base):
    __tablename__ = "cpu"
    item_id = Column(String(100), primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    price = Column(Integer, nullable=False)
    popular_rank = Column(Integer, nullable=True)
    maker_name = Column(String(100), nullable=False)
    product_name = Column(String(100), nullable=False)
    generation = Column(String(100), nullable=False)
    socket_name = Column(String(100), nullable=False)
    core_count = Column(Integer, nullable=False)
    thread_count = Column(Integer, nullable=False)
    tdp = Column(Integer, nullable=False)
    base_clock = Column(Integer, nullable=False)
    boost_clock = Column(Integer, nullable=False)
    graphics = Column(String(100), nullable=False)
    release_date = Column(Date, nullable=False)
    is_exist = Column(Boolean, nullable=False)


class CpuCooler(Base):
    __tablename__ = "cpu_cooler"
    item_id = Column(String(100), primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    price = Column(Integer, nullable=False)
    popular_rank = Column(Integer, nullable=True)
    maker_name = Column(String(100), nullable=False)
    product_name = Column(String(100), nullable=False)
    air_flow_type = Column(String(100), nullable=False)
    noise_level = Column(String(100), nullable=False)
    max_tdp = Column(Integer, nullable=True)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    depth = Column(Integer, nullable=True)
    release_date = Column(Date, nullable=False)
    is_exist = Column(Boolean, nullable=False)


class CpuCoolerSocket(Base):
    __tablename__ = "cpu_cooler_socket"
    cpu_cooler_item_id = Column(String(100), ForeignKey(
        "cpu_cooler.item_id", ondelete="CASCADE"), primary_key=True, nullable=False)
    socket_name = Column(String(100), nullable=False)
    #cpu_cooler = relationship("CpuCooler")


class Motherboard(Base):
    __tablename__ = "motherboard"
    item_id = Column(String(100), primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    price = Column(Integer, nullable=False)
    popular_rank = Column(Integer, nullable=True)
    maker_name = Column(String(100), nullable=False)
    product_name = Column(String(100), nullable=False)
    chipset = Column(String(100), nullable=False)
    socket_name = Column(String(100), nullable=False)
    form_factor = Column(String(100), nullable=False)
    memory_type = Column(String(100), nullable=False)
    memory_slot_count = Column(Integer, nullable=False)
    max_memory_capacity = Column(Integer, nullable=False)
    pci_slot_count = Column(Integer, nullable=False)
    pcie_x16_slot_count = Column(Integer, nullable=False)
    pcie_x8_slot_count = Column(Integer, nullable=False)
    pcie_x4_slot_count = Column(Integer, nullable=False)
    pcie_x1_slot_count = Column(Integer, nullable=False)
    sata_connector_count = Column(Integer, nullable=False)
    release_date = Column(Date, nullable=False)
    is_exist = Column(Boolean, nullable=False)


class Memory(Base):
    __tablename__ = "memory"
    item_id = Column(String(100), primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    price = Column(Integer, nullable=False)
    popular_rank = Column(Integer, nullable=True)
    maker_name = Column(String(100), nullable=False)
    product_name = Column(String(100), nullable=False)
    capacity_par_module = Column(Integer, nullable=False)
    module_count = Column(Integer, nullable=False)
    interface = Column(String(100), nullable=False)
    memory_type = Column(String(100), nullable=False)
    module_type = Column(String(100), nullable=False)
    release_date = Column(Date, nullable=False)
    is_exist = Column(Boolean, nullable=False)


class Gpu(Base):
    __tablename__ = "gpu"
    item_id = Column(String(100), primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    price = Column(Integer, nullable=False)
    popular_rank = Column(Integer, nullable=True)
    maker_name = Column(String(100), nullable=False)
    product_name = Column(String(100), nullable=False)
    chip_name = Column(String(100), nullable=False)
    gpu_memory_type = Column(String(100), nullable=False)
    gpu_memory_capacity = Column(Integer, nullable=False)
    gpu_memory_bus_width = Column(Integer, nullable=False)
    gpu_memory_clock = Column(Integer, nullable=False)
    pcie_interface = Column(String(100), nullable=False)
    is_low_profile = Column(Boolean, nullable=False)
    cooling_solution = Column(String(100), nullable=False)
    tdp = Column(Integer, nullable=False)
    hdmi_count = Column(Integer, nullable=False)
    displayport_count = Column(Integer, nullable=False)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    depth = Column(Integer, nullable=True)
    radiator_width = Column(Integer, nullable=True)
    radiator_height = Column(Integer, nullable=True)
    radiator_depth = Column(Integer, nullable=True)
    release_date = Column(Date, nullable=False)
    is_exist = Column(Boolean, nullable=False)


class Ssd(Base):
    __tablename__ = "ssd"
    item_id = Column(String(100), primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    price = Column(Integer, nullable=False)
    popular_rank = Column(Integer, nullable=True)
    maker_name = Column(String(100), nullable=False)
    product_name = Column(String(100), nullable=False)
    capacity = Column(Integer, nullable=False)
    size = Column(String(100), nullable=False)
    interface = Column(String(100), nullable=False)
    tbw = Column(Integer, nullable=True)
    release_date = Column(Date, nullable=False)
    is_exist = Column(Boolean, nullable=False)


class Hdd(Base):
    __tablename__ = "hdd"
    item_id = Column(String(100), primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    price = Column(Integer, nullable=False)
    popular_rank = Column(Integer, nullable=True)
    maker_name = Column(String(100), nullable=False)
    product_name = Column(String(100), nullable=False)
    capacity = Column(Integer, nullable=False)
    rpm = Column(Integer, nullable=False)
    write_style = Column(String(100), nullable=False)
    release_date = Column(Date, nullable=False)
    is_exist = Column(Boolean, nullable=False)


class Case(Base):
    __tablename__ = "case"
    item_id = Column(String(100), primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    price = Column(Integer, nullable=False)
    popular_rank = Column(Integer, nullable=True)
    maker_name = Column(String(100), nullable=False)
    product_name = Column(String(100), nullable=False)
    max_gpu_length = Column(String(100), nullable=False)
    max_cpu_cooler_height = Column(String(100), nullable=False)
    max_power_supply_size = Column(String(100), nullable=False)
    slot_information = Column(String(100), nullable=False)
    drive_bay_information = Column(String(100), nullable=False)
    is_low_profile = Column(Boolean, nullable=False)
    weight = Column(Integer, nullable=True)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    depth = Column(Integer, nullable=True)
    release_date = Column(Date, nullable=False)
    is_exist = Column(Boolean, nullable=False)


class CaseSupportFormFactor(Base):
    __tablename__ = "case_support_form_factor"
    case_item_id = Column(String(100), ForeignKey(
        "case.item_id", ondelete="CASCADE"), primary_key=True, nullable=False)
    form_factor = Column(String(100), nullable=False)


class PowerSupply(Base):
    __tablename__ = "power_supply"
    item_id = Column(String(100), primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    price = Column(Integer, nullable=False)
    popular_rank = Column(Integer, nullable=True)
    maker_name = Column(String(100), nullable=False)
    product_name = Column(String(100), nullable=False)
    form_factor = Column(String(100), nullable=False)
    capacity = Column(Integer, nullable=False)
    eighty_plus_certification = Column(String(100), nullable=False)
    cpu_connector_count = Column(Integer, nullable=False)
    six_pin_connector_count = Column(Integer, nullable=False)
    eight_pin_connector_count = Column(Integer, nullable=False)
    sata_connector_count = Column(Integer, nullable=False)
    peripheral_connector_count = Column(Integer, nullable=False)
    fdd_pin_connector_count = Column(Integer, nullable=False)
    weight = Column(Integer, nullable=True)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    depth = Column(Integer, nullable=True)
    release_date = Column(Date, nullable=False)
    is_exist = Column(Boolean, nullable=False)
