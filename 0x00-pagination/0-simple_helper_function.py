#!/usr/bin/env python3

"""
A script that calculates the start and end indices for a given page
and page size
"""


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
