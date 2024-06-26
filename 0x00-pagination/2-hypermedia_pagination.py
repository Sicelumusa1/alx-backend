#!/usr/bin/env python3

"""
Server class to paginate a database of popular baby names.
"""

import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Retrieves the appropriate page of data based on pagination parameters

        Args:
            page(int): The 1-indexed page number
            page_size(int): The number of items per page

        Returns:
            list: A list of rows corresponding to the requested page
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        self.dataset()

        total_items = len(self.__dataset)
        start_index, end_index = index_range(page, page_size)

        if start_index >= total_items:
            return []

        return self.__dataset[start_index:end_index]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """
        Retrieves hyper-paginated information for the given page

        Args:
            page(int): The 1-indexed page number
            page_size(int): number of items per page

        Returns:
            dict: A disctionary containing hyper-paginated info
        """
        data_page = self.get_page(page, page_size)
        total_items = len(self.__dataset)
        total_pages = math.ceil(total_items / page_size)

        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        return {
            "page_size": len(data_page),
            "page": page,
            "data": data_page,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages
        }


def index_range(page: int, page_size: int) -> tuple:
    """
    calculates the start and end indices for a given page and page size

    Args:
        page (int): page number
        page_size(int): number of items per page

    Returs:
        tuple: start and end indices
    """
    if page <= 0 or page_size <= 0:
        raise ValueError("Page and page_size  must be positive")
    start_index = (page - 1) * page_size
    end_index = start_index + page_size

    return start_index, end_index
