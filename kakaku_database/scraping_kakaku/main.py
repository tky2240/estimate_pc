from datetime import date, datetime
import datetime
import requests
from bs4 import BeautifulSoup, Tag
import urllib.parse
import csv
import sys
import time
import random
from typing import List
import re
import traceback
import json
import codecs


def main():
    if len(sys.argv) < 3:
        print("require two arguments")
    csv_path = sys.argv[1]
    json_path = sys.argv[2]
    run(csv_path, json_path)


def run(csv_path, json_path):
    return json_path
    base_url = "https://kakaku.com/specsearch/"

    with open(csv_path) as f:
        reader = csv.DictReader(f)
        item_data_dictionary = dict()
        for genre in reader:
            print(f"name: {genre['name']} code: {genre['code']}")
            # if genre["name"] != "ssd":
            #     continue
            time.sleep(random.uniform(2, 4))
            current_genre_url = urllib.parse.urljoin(base_url, genre['code'])
            response = None
            if genre["name"] == "case":
                response = requests.post(current_genre_url, data={
                    "DispSaleDate": "on", "DispNonPrice": "on", "Sort": "price_asc", "CategoryCD": genre['code'], "DispTypeColor": 2, "ButtonType": "D"})

            elif genre["name"] == "memory":
                response = requests.post(current_genre_url, data={
                    "DispSaleDate": "on", "DispNonPrice": "on", "Sort": "price_asc", "CategoryCD": genre['code'], "MemoryClass": "7,6"})
            elif genre["name"] == "gpu":
                response = requests.post(current_genre_url, data={
                    "DispSaleDate": "on", "DispNonPrice": "on", "Sort": "price_asc", "CategoryCD": genre['code'], "RAM": 1024})
            elif genre["name"] == "ssd":
                response = requests.post(current_genre_url, data={
                    "DispSaleDate": "on", "DispNonPrice": "on", "Sort": "price_asc", "CategoryCD": genre['code'], "FormFactor": "2,6,8"})
            else:
                response = requests.post(current_genre_url, data={
                    "DispSaleDate": "on", "DispNonPrice": "on", "Sort": "price_asc", "CategoryCD": genre['code']})

            if not response.ok:
                print("post failed")
                continue
            soup = BeautifulSoup(response.text, 'html.parser')
            try:
                item_count = int(soup.select_one(
                    "div.alignL > span.number").contents[0].text.replace(",", ""))
            except:
                print("item count parse error")
                time.sleep(random.uniform(2, 4))
                continue
            page_count = int(item_count / 30) + 1
            print(f"1 / {page_count}...")
            item_tables = [soup.select_one(
                "table.alignC.tblBorderGray02.mTop5")]

            for i in range(2, page_count+1):
                print(f"{i} / {page_count}...")
                time.sleep(random.uniform(1, 3))
                if not response.ok:
                    print("post failed")
                    continue
                if genre["name"] == "case":
                    response = requests.post(current_genre_url, data={
                        "DispSaleDate": "on", "DispNonPrice": "on", "Sort": "price_asc", "CategoryCD": genre['code'], "DispTypeColor": 2, "ButtonType": "D", "Page": i})
                elif genre["name"] == "memory":
                    response = requests.post(current_genre_url, data={
                        "DispSaleDate": "on", "DispNonPrice": "on", "Sort": "price_asc", "CategoryCD": genre['code'], "MemoryClass": "7,6", "Page": i})
                elif genre["name"] == "gpu":
                    response = requests.post(current_genre_url, data={
                        "DispSaleDate": "on", "DispNonPrice": "on", "Sort": "price_asc", "CategoryCD": genre['code'], "RAM": 1024, "Page": i})
                elif genre["name"] == "ssd":
                    response = requests.post(current_genre_url, data={
                        "DispSaleDate": "on", "DispNonPrice": "on", "Sort": "price_asc", "CategoryCD": genre['code'], "FormFactor": "2,6,8", "Page": i})
                else:
                    response = requests.post(current_genre_url, data={
                        "DispSaleDate": "on", "DispNonPrice": "on", "Sort": "price_asc", "CategoryCD": genre['code'], "Page": i})

                soup = BeautifulSoup(response.text, 'html.parser')
                item_tables.append(soup.select_one(
                    "table.alignC.tblBorderGray02.mTop5"))

            if genre["name"] == "cpu":
                item_data_dictionary[genre["name"]
                                     ] = update_cpu_information(item_tables)
            elif genre["name"] == "cpu_cooler":
                item_data_dictionary[genre["name"]
                                     ] = update_cpu_cooler_information(item_tables)
            elif genre["name"] == "motherboard":
                item_data_dictionary[genre["name"]] = update_motherboard_information(
                    item_tables)
            elif genre["name"] == "memory":
                item_data_dictionary[genre["name"]
                                     ] = update_memory_information(item_tables)
            elif genre["name"] == "gpu":
                item_data_dictionary[genre["name"]
                                     ] = update_gpu_information(item_tables)
            elif genre["name"] == "ssd":
                item_data_dictionary[genre["name"]
                                     ] = update_ssd_information(item_tables)
            elif genre["name"] == "hdd":
                item_data_dictionary[genre["name"]
                                     ] = update_hdd_information(item_tables)
            elif genre["name"] == "case":
                item_data_dictionary[genre["name"]
                                     ] = update_case_information(item_tables)
            elif genre["name"] == "power_supply":
                item_data_dictionary[genre["name"]
                                     ] = update_power_supply_information(item_tables)
        with codecs.open(json_path, "w", "utf-8") as json_file:
            json.dump(item_data_dictionary, json_file,
                      default=json_serial, ensure_ascii=False)

# ref:https://www.yoheim.net/blog.php?q=20170703


def json_serial(obj):
    # 日付型の場合には、文字列に変換します
    if isinstance(obj, (type(datetime), date)):
        return obj.isoformat()
    # 上記以外はサポート対象外.
    raise TypeError("Type %s not serializable" % type(obj))


def update_cpu_information(item_tables: List[Tag]):
    cpu_data_dictionaries = []
    for item_table in item_tables:
        table_rows = item_table.select("tr:not(.bgColor03.vt):not(.bgColor02)")
        for table_row in table_rows:
            try:
                table_data: List[Tag] = table_row.find_all('td')
                cpu_data_dictionary = {
                    "item_id": re.findall(r"/item/(\w+)/", table_data[1].find('a').get('href'))[0],
                    "name": table_data[2].text.strip(),
                    "price": int(re.findall(r"¥([,\d]+)", table_data[3].find('a').text.strip())[0].replace(",", "")),
                    "popular_rank": None if table_data[5].text == "-" else int(re.findall(r"(\d+)位", table_data[5].text.strip())[0]),
                    "maker_name": table_data[2].find_all('strong')[0].text.strip(),
                    "product_name": table_data[2].find_all('strong')[1].text.strip(),
                    "generation":  table_data[9].text.strip(),
                    "socket_name": table_data[10].text.strip(),
                    "core_count": int(re.findall(r"(\d+)コア", table_data[11].text.strip())[0]),
                    "thread_count": int(re.findall(r"(\d+)コア", table_data[11].text.strip())[0]) if table_data[15].text.strip() == ""else int(table_data[15].text),
                    "tdp": None if table_data[12].text.strip() == "" else int(re.findall(r"(\d+)W", table_data[12].text.strip())[0]),
                    "base_clock": float(re.findall(r"(\d+\.\d+|\d+)GHz", table_data[13].text)[0]),
                    "boost_clock": None if table_data[14].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)GHz", table_data[14].text)[0]),
                    "graphics": table_data[19].text.strip(),
                    "release_date": None if table_data[21].text.strip() == "" else datetime.datetime.strptime(re.sub(r"\s", "", table_data[21].text), "%Y年%m月%d日").date()
                    if re.match(r"\d+年\d+月\d+日", re.sub(r"\s", "", table_data[21].text)) is not None else datetime.datetime.strptime(re.findall(r"(\d+年\d+月)", re.sub(r"\s", "", table_data[21].text))[0], "%Y年%m月").date(),
                    "is_exist": True
                }
            except Exception as exception:
                print(f"error with {exception}")
                print(traceback.format_exc())
                continue
            cpu_data_dictionaries.append(cpu_data_dictionary)
            # print(item_data_dictionary)
    # print(cpu_data_dictionaries)
    return cpu_data_dictionaries


def update_cpu_cooler_information(item_tables: List[Tag]):
    cpu_cooler_data_dictionaries = []
    for item_table in item_tables:
        table_rows = item_table.select("tr:not(.bgColor03.vt):not(.bgColor02)")
        for table_row in table_rows:
            try:
                table_data: List[Tag] = table_row.find_all('td')
                cpu_cooler_data_dictionary = {
                    "item_id": re.findall(r"/item/(\w+)/", table_data[1].find('a').get('href'))[0],
                    "name": table_data[2].text.strip(),
                    "price": int(re.findall(r"¥([,\d]+)", table_data[3].find('a').text.strip())[0].replace(",", "")),
                    "popular_rank": None if table_data[5].text == "-" else int(re.findall(r"(\d+)位", table_data[5].text.strip())[0]),
                    "maker_name": table_data[2].find_all('strong')[0].text.strip(),
                    "product_name": table_data[2].find_all('strong')[1].text.strip(),
                    "air_flow_type": table_data[10].text.strip(),
                    "noise_level": table_data[11].text.strip(),
                    "max_tdp": None if table_data[19].text.strip() == "" else int(re.findall(r"(\d+)W", table_data[19].text.strip())[0]),
                    "width": None if table_data[21].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[21].text.strip())[0][0]),
                    "height": None if table_data[21].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[21].text.strip())[0][1]),
                    "depth": None if table_data[21].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[21].text.strip())[0][2]),
                    "release_date": None if table_data[24].text.strip() == "" else datetime.datetime.strptime(re.sub(r"\s", "", table_data[24].text), "%Y年%m月%d日").date()
                    if re.match(r"\d+年\d+月\d+日", re.sub(r"\s", "", table_data[24].text)) is not None else datetime.datetime.strptime(re.findall(r"(\d+年\d+月)", re.sub(r"\s", "", table_data[24].text))[0], "%Y年%m月").date(),
                    "is_exist": True
                }
                intel_socket_names = []
                if not table_data[8].text.strip() == "":
                    socket_name_lines = table_data[8].text.split("LGA")
                    for socket_name_line in socket_name_lines:
                        if socket_name_line.strip() == "":
                            continue
                        intel_socket_names += [
                            "LGA" + socket_name for socket_name in socket_name_line.strip().split("/")]
                    # print(intel_socket_names)
                amd_socket_names = []
                if not table_data[9].text.strip() == "":
                    amd_socket_names = table_data[9].get_text("/").split("/")
                    # print(amd_socket_names)
            except Exception as exception:
                print(f"error with {exception}")
                print(traceback.format_exc())
                continue
            cpu_cooler_data_dictionary["cpu_cooler_sockets"] = intel_socket_names + \
                amd_socket_names
            cpu_cooler_data_dictionaries.append(cpu_cooler_data_dictionary)
            # print(item_data_dictionary)
    # print(cpu_cooler_data_dictionaries)
    return cpu_cooler_data_dictionaries


def update_motherboard_information(item_tables: List[Tag]):
    motherboard_data_dictionaries = []
    for item_table in item_tables:
        table_rows = item_table.select("tr:not(.bgColor03.vt):not(.bgColor02)")
        for table_row in table_rows:
            try:
                table_data: List[Tag] = table_row.find_all('td')
                motherboard_data_dictionary = {
                    "item_id": re.findall(r"/item/(\w+)/", table_data[1].find('a').get('href'))[0],
                    "name": table_data[2].text.strip(),
                    "price": int(re.findall(r"¥([,\d]+)", table_data[3].find('a').text.strip())[0].replace(",", "")),
                    "popular_rank": None if table_data[5].text == "-" else int(re.findall(r"(\d+)位", table_data[5].text.strip())[0]),
                    "maker_name": table_data[2].find_all('strong')[0].text.strip(),
                    "product_name": table_data[2].find_all('strong')[1].text.strip(),
                    "chipset":  table_data[8].get_text(" ").strip(),
                    "socket_name": table_data[9].text.strip(),
                    "form_factor": table_data[10].text.strip(),
                    "memory_type": table_data[12].text.strip(),
                    "memory_slot_count": int(table_data[13].text.strip()),
                    "max_memory_capacity": int(re.findall(r"(\d+)GB", table_data[14].text.strip())[0]),
                    "pci_slot_count": 0 if table_data[15].text.strip() == "" else int(re.findall(r"(\d+)本", table_data[15].text.strip())[0]),
                    "pcie_x16_slot_count": 0 if table_data[16].text.strip() == "" else int(re.findall(r"(\d+)本", table_data[16].text.strip())[0]),
                    "pcie_x8_slot_count": 0 if table_data[17].text.strip() == "" else int(re.findall(r"(\d+)本", table_data[17].text.strip())[0]),
                    "pcie_x4_slot_count": 0 if table_data[18].text.strip() == "" else int(re.findall(r"(\d+)本", table_data[18].text.strip())[0]),
                    "pcie_x1_slot_count": 0 if table_data[19].text.strip() == "" else int(re.findall(r"(\d+)本", table_data[19].text.strip())[0]),
                    "sata_connector_count": 0 if table_data[20].text.strip() == "" else int(re.findall(r"(\d+)本", table_data[20].text.strip())[0]),
                    "release_date": None if table_data[40].text.strip() == "" else datetime.datetime.strptime(re.sub(r"\s", "", table_data[40].text), "%Y年%m月%d日").date()
                    if re.match(r"\d+年\d+月\d+日", re.sub(r"\s", "", table_data[40].text)) is not None else datetime.datetime.strptime(re.findall(r"(\d+年\d+月)", re.sub(r"\s", "", table_data[40].text))[0], "%Y年%m月").date(),
                    "is_exist": True
                }
            except Exception as exception:
                print(f"error with {exception}")
                print(traceback.format_exc())
                continue
            motherboard_data_dictionaries.append(motherboard_data_dictionary)
            # print(item_data_dictionary)
    # print(motherboard_data_dictionaries)
    return motherboard_data_dictionaries


def update_memory_information(item_tables: List[Tag]):
    memory_data_dictionaries = []
    for item_table in item_tables:
        table_rows = item_table.select("tr:not(.bgColor03.vt):not(.bgColor02)")
        for table_row in table_rows:
            try:
                table_data: List[Tag] = table_row.find_all('td')
                memory_data_dictionary = {
                    "item_id": re.findall(r"/item/(\w+)/", table_data[1].find('a').get('href'))[0],
                    "name": table_data[2].text.strip(),
                    "price": int(re.findall(r"¥([,\d]+)", table_data[3].find('a').text.strip())[0].replace(",", "")),
                    "popular_rank": None if table_data[5].text == "-" else int(re.findall(r"(\d+)位", table_data[5].text.strip())[0]),
                    "maker_name": table_data[2].find_all('strong')[0].text.strip(),
                    "product_name": table_data[2].find_all('strong')[1].text.strip(),
                    "capacity_per_module":  int(re.findall(r"(\d+)GB", table_data[8].text.strip())[0]),
                    "module_count":  int(re.findall(r"(\d+)枚", table_data[9].text.strip())[0]),
                    "interface": table_data[10].text.strip(),
                    "memory_type": table_data[11].text.strip(),
                    "module_type": table_data[13].text.strip(),
                    "release_date": None if table_data[21].text.strip() == "" else datetime.datetime.strptime(re.sub(r"\s", "", table_data[21].text), "%Y年%m月%d日").date()
                    if re.match(r"\d+年\d+月\d+日", re.sub(r"\s", "", table_data[21].text)) is not None else datetime.datetime.strptime(re.findall(r"(\d+年\d+月)", re.sub(r"\s", "", table_data[21].text))[0], "%Y年%m月").date(),
                    "is_exist": True
                }
            except Exception as exception:
                print(f"error with {exception}")
                print(traceback.format_exc())
                print(table_data)
                continue
            memory_data_dictionaries.append(memory_data_dictionary)
            # print(item_data_dictionary)
    # print(memory_data_dictionaries)
    return memory_data_dictionaries


def update_gpu_information(item_tables: List[Tag]):
    gpu_data_dictionaries = []
    for item_table in item_tables:
        table_rows = item_table.select("tr:not(.bgColor03.vt):not(.bgColor02)")
        for table_row in table_rows:
            try:
                table_data: List[Tag] = table_row.find_all('td')
                gpu_data_dictionary = {
                    "item_id": re.findall(r"/item/(\w+)/", table_data[1].find('a').get('href'))[0],
                    "name": table_data[2].text.strip(),
                    "price": int(re.findall(r"¥([,\d]+)", table_data[3].find('a').text.strip())[0].replace(",", "")),
                    "popular_rank": None if table_data[5].text == "-" else int(re.findall(r"(\d+)位", table_data[5].text.strip())[0]),
                    "maker_name": table_data[2].find_all('strong')[0].text.strip(),
                    "product_name": table_data[2].find_all('strong')[1].text.strip(),
                    "chip_name": table_data[8].get_text(" ").strip(),
                    "gpu_memory_type": table_data[11].get_text(",").split(",")[0].strip(),
                    "gpu_memory_capacity": int(re.findall(r"(\d+)GB", table_data[11].get_text(",").split(",")[1].strip())[0]),
                    "gpu_memory_bus_width": None if re.match(r"(\d+)bit", table_data[12].text.strip()) is None else int(re.findall(r"(\d+)bit", table_data[12].text.strip())[0]),
                    "gpu_memory_clock": None if re.match(r"(\d+|\d+\.\d+)Gbps", table_data[13].text.strip()) is None else float(re.findall(r"(\d+|\d+\.\d+)Gbps", table_data[13].text.strip())[0]),
                    "pcie_interface": table_data[14].text.strip(),
                    "is_low_profile": table_data[15].text.strip() != "",
                    "cooling_solution": table_data[16].text.strip(),
                    "tdp": None if re.match(r"(\d+)W", table_data[17].text.strip()) is None else int(re.findall(r"(\d+)W", table_data[17].text.strip())[0]),
                    "hdmi_count": 0 if re.match(r"(\d+)ポート", table_data[23].text.strip()) is None else int(re.findall(r"(\d+)ポート", table_data[23].text.strip())[0]),
                    "displayport_count": 0 if re.match(r"(\d+)ポート", table_data[24].text.strip()) is None else int(re.findall(r"(\d+)ポート", table_data[24].text.strip())[0]),
                    "width": None if table_data[25].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[25].text.strip())[0][0]),
                    "height": None if table_data[25].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[25].text.strip())[0][1]),
                    "depth": None if table_data[25].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[25].text.strip())[0][2]),
                    "radiator_width": None if table_data[26].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[26].text.strip())[0][0]),
                    "radiator_height": None if table_data[26].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[26].text.strip())[0][1]),
                    "radiator_depth": None if table_data[26].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[26].text.strip())[0][2]),
                    "release_date": None if table_data[27].text.strip() == "" else datetime.datetime.strptime(re.sub(r"\s", "", table_data[27].text), "%Y年%m月%d日").date()
                    if re.match(r"\d+年\d+月\d+日", re.sub(r"\s", "", table_data[27].text)) is not None else datetime.datetime.strptime(re.findall(r"(\d+年\d+月)", re.sub(r"\s", "", table_data[27].text))[0], "%Y年%m月").date(),
                    "is_exist": True
                }
            except Exception as exception:
                print(f"error with {exception}")
                print(traceback.format_exc())
                continue
            gpu_data_dictionaries.append(gpu_data_dictionary)
            # print(item_data_dictionary)
    # print(gpu_data_dictionaries)
    return gpu_data_dictionaries


def update_ssd_information(item_tables: List[Tag]):
    ssd_data_dictionaries = []
    for item_table in item_tables:
        table_rows = item_table.select("tr:not(.bgColor03.vt):not(.bgColor02)")
        for table_row in table_rows:
            try:
                table_data: List[Tag] = table_row.find_all('td')
                ssd_data_dictionary = {
                    "item_id": re.findall(r"/item/(\w+)/", table_data[1].find('a').get('href'))[0],
                    "name": table_data[2].text.strip(),
                    "price": int(re.findall(r"¥([,\d]+)", table_data[3].find('a').text.strip())[0].replace(",", "")),
                    "popular_rank": None if table_data[5].text == "-" else int(re.findall(r"(\d+)位", table_data[5].text.strip())[0]),
                    "maker_name": table_data[2].find_all('strong')[0].text.strip(),
                    "product_name": table_data[2].find_all('strong')[1].text.strip(),
                    "capacity": int(re.findall(r"(\d+)GB", table_data[8].text.strip())[0]),
                    "size": table_data[9].text.strip(),
                    "interface": table_data[10].text.strip(),
                    "tbw": None if table_data[21].text.strip() == "" else int(re.findall(r"(\d+)TBW", table_data[21].text.strip())[0]),
                    "release_date": None if table_data[23].text.strip() == "" else datetime.datetime.strptime(re.sub(r"\s", "", table_data[23].text), "%Y年%m月%d日").date()
                    if re.match(r"\d+年\d+月\d+日", re.sub(r"\s", "", table_data[23].text)) is not None else datetime.datetime.strptime(re.findall(r"(\d+年\d+月)", re.sub(r"\s", "", table_data[23].text))[0], "%Y年%m月").date(),
                    "is_exist": True
                }
            except Exception as exception:
                print(f"error with {exception}")
                print(traceback.format_exc())
                continue
            ssd_data_dictionaries.append(ssd_data_dictionary)
            # print(item_data_dictionary)
    # print(ssd_data_dictionaries)
    return ssd_data_dictionaries


def update_hdd_information(item_tables: List[Tag]):
    hdd_data_dictionaries = []
    for item_table in item_tables:
        table_rows = item_table.select("tr:not(.bgColor03.vt):not(.bgColor02)")
        for table_row in table_rows:
            try:
                table_data: List[Tag] = table_row.find_all('td')
                hdd_data_dictionary = {
                    "item_id": re.findall(r"/item/(\w+)/", table_data[1].find('a').get('href'))[0],
                    "name": table_data[2].text.strip(),
                    "price": int(re.findall(r"¥([,\d]+)", table_data[3].find('a').text.strip())[0].replace(",", "")),
                    "popular_rank": None if table_data[5].text == "-" else int(re.findall(r"(\d+)位", table_data[5].text.strip())[0]),
                    "maker_name": table_data[2].find_all('strong')[0].text.strip(),
                    "product_name": table_data[2].find_all('strong')[1].text.strip(),
                    "capacity": int(re.findall(r"(\d+)GB", table_data[9].text.strip())[0]) if re.match(r"(\d+)GB", table_data[9].text.strip()) is not None else int(re.findall(r"(\d+)TB", table_data[9].text.strip())[0]) * 1000,
                    "rpm": None if table_data[10].text.strip() == "" else int(re.findall(r"(\d+)rpm", table_data[10].text.strip())[0]),
                    "write_style": table_data[11].text.strip(),
                    "release_date": None if table_data[21].text.strip() == "" else datetime.datetime.strptime(re.sub(r"\s", "", table_data[21].text), "%Y年%m月%d日").date()
                    if re.match(r"\d+年\d+月\d+日", re.sub(r"\s", "", table_data[21].text)) is not None else datetime.datetime.strptime(re.findall(r"(\d+年\d+月)", re.sub(r"\s", "", table_data[21].text))[0], "%Y年%m月").date(),
                    "is_exist": True
                }
            except Exception as exception:
                print(f"error with {exception}")
                print(traceback.format_exc())
                continue
            hdd_data_dictionaries.append(hdd_data_dictionary)
            # print(item_data_dictionary)
    # print(hdd_data_dictionaries)
    return hdd_data_dictionaries


def update_case_information(item_tables: List[Tag]):
    case_data_dictionaries = []
    for item_table in item_tables:
        table_rows = item_table.select("tr:not(.bgColor03.vt):not(.bgColor02)")
        for table_row in table_rows:
            try:
                table_data: List[Tag] = table_row.find_all('td')
                case_data_dictionary = {
                    "item_id": re.findall(r"/item/(\w+)/", table_data[1].find('a').get('href'))[0],
                    "name": table_data[2].text.strip(),
                    "price": int(re.findall(r"¥([,\d]+)", table_data[3].find('a').text.strip())[0].replace(",", "")),
                    "popular_rank": None if table_data[5].text == "-" else int(re.findall(r"(\d+)位", table_data[5].text.strip())[0]),
                    "maker_name": table_data[2].find_all('strong')[0].text.strip(),
                    "product_name": table_data[2].find_all('strong')[1].text.strip(),
                    "max_gpu_length": None if re.match(r"(\d+)mm", re.sub(r"[^0-9m]", "", table_data[9].text.strip())) is None else int(re.findall(r"(\d+)mm", re.sub(r"[^0-9m]", "", table_data[9].text.strip()))[0]),
                    "max_cpu_cooler_height": None if re.match(r"(\d+)mm", re.sub(r"[^0-9m]", "", table_data[10].text.strip())) is None else int(re.findall(r"(\d+)mm", re.sub(r"[^0-9m]", "", table_data[10].text.strip()))[0]),
                    "max_power_supply_size": None if re.match(r"(\d+)mm", re.sub(r"[^0-9m]", "", table_data[11].text.strip())) is None else int(re.findall(r"(\d+)mm", re.sub(r"[^0-9m]", "", table_data[11].text.strip()))[0]),
                    "slot_count": None if re.match(r"(\d)", table_data[13].text.strip()) is None else int(re.findall(r"(\d)", table_data[13].text.strip())[0]),
                    "drive_bay_information": table_data[14].get_text("\n").strip(),
                    "is_low_profile": table_data[17].text.strip() != "",
                    "weight": None if table_data[19].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)kg", table_data[19].text.strip())[0]),
                    "width": None if table_data[20].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[20].text.strip())[0][0]),
                    "height": None if table_data[20].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[20].text.strip())[0][1]),
                    "depth": None if table_data[20].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[20].text.strip())[0][2]),
                    "release_date": None if table_data[23].text.strip() == "" else datetime.datetime.strptime(re.sub(r"\s", "", table_data[23].text), "%Y年%m月%d日").date()
                    if re.match(r"\d+年\d+月\d+日", re.sub(r"\s", "", table_data[23].text)) is not None else datetime.datetime.strptime(re.findall(r"(\d+年\d+月)", re.sub(r"\s", "", table_data[23].text))[0], "%Y年%m月").date(),
                    "is_exist": True
                }
                motherboard_form_factors = []
                if not table_data[8].text.strip() == "":
                    motherboard_form_factors = table_data[8].get_text(
                        ",").split(",")
                    # print(amd_socket_names)
            except Exception as exception:
                print(f"error with {exception}")
                print(traceback.format_exc())
                print(table_row)
                continue
            case_data_dictionary["case_support_form_factors"] = motherboard_form_factors
            case_data_dictionaries.append(case_data_dictionary)
            # print(item_data_dictionary)
    # print(case_data_dictionaries)
    return case_data_dictionaries


def update_power_supply_information(item_tables: List[Tag]):
    power_supply_data_dictionaries = []
    for item_table in item_tables:
        table_rows = item_table.select("tr:not(.bgColor03.vt):not(.bgColor02)")
        for table_row in table_rows:
            try:
                table_data: List[Tag] = table_row.find_all('td')
                power_supply_data_dictionary = {
                    "item_id": re.findall(r"/item/(\w+)/", table_data[1].find('a').get('href'))[0],
                    "name": table_data[2].text.strip(),
                    "price": int(re.findall(r"¥([,\d]+)", table_data[3].find('a').text.strip())[0].replace(",", "")),
                    "popular_rank": None if table_data[5].text == "-" else int(re.findall(r"(\d+)位", table_data[5].text.strip())[0]),
                    "maker_name": table_data[2].find_all('strong')[0].text.strip(),
                    "product_name": table_data[2].find_all('strong')[1].text.strip(),
                    "form_factor": table_data[8].text.strip(),
                    "capacity": int(re.findall(r"(\d+)W", table_data[9].text.strip())[0]),
                    "eighty_plus_certification": table_data[10].text.strip(),
                    "cpu_connector_count": None if re.match(r"x(\d)", table_data[15].text.strip()) is None else len(re.findall(r"x\d", table_data[15].text.strip())),
                    "six_pin_connector_count": None if re.match(r"6ピンx(\d)", table_data[16].text.strip()) is None else int(re.findall(r"6ピンx(\d)", table_data[16].text.strip())[0]),
                    "eight_pin_connector_count": None if re.match(r"6\+2ピンx(\d)", table_data[16].text.strip()) is None else int(re.findall(r"6\+2ピンx(\d)", table_data[16].text.strip())[0]),
                    "sata_connector_count": None if re.match(r"(\d+)個", table_data[17].text.strip()) is None else int(re.findall(r"(\d+)個", table_data[17].text.strip())[0]),
                    "peripheral_connector_count": None if re.match(r"(\d+)個", table_data[18].text.strip()) is None else int(re.findall(r"(\d+)個", table_data[18].text.strip())[0]),
                    "fdd_connector_count": None if re.match(r"(\d+)個", table_data[19].text.strip()) is None else int(re.findall(r"(\d+)個", table_data[19].text.strip())[0]),
                    "weight": None if table_data[21].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)kg", table_data[21].text.strip())[0]),
                    "width": None if table_data[20].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[20].text.strip())[0][0]),
                    "height": None if table_data[20].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[20].text.strip())[0][1]),
                    "depth": None if table_data[20].text.strip() == "" else float(re.findall(r"(\d+\.\d+|\d+)x(\d+\.\d+|\d+)x(\d+\.\d+|\d+)", table_data[20].text.strip())[0][2]),
                    "release_date": None if table_data[22].text.strip() == "" else datetime.datetime.strptime(re.sub(r"\s", "", table_data[22].text), "%Y年%m月%d日").date()
                    if re.match(r"\d+年\d+月\d+日", re.sub(r"\s", "", table_data[22].text)) is not None else datetime.datetime.strptime(re.findall(r"(\d+年\d+月)", re.sub(r"\s", "", table_data[22].text))[0], "%Y年%m月").date(),
                    "is_exist": True
                }
            except Exception as exception:
                print(f"error with {exception}")
                print(traceback.format_exc())
                continue
            power_supply_data_dictionaries.append(power_supply_data_dictionary)
            # print(item_data_dictionary)
    # print(power_supply_data_dictionaries)
    return power_supply_data_dictionaries


if __name__ == "__main__":
    main()
