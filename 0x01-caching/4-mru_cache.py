#!/usr/bin/env python3

"""
A caching system that inherits from BaseCaching and uses
MRU algorithm
"""

from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """
    A caching system that inherits from BaseCaching and uses
    MRU algorithm
    """

    def __init__(self):
        """
        Initializes he MRUCache by calling the parent class's
        __init__ method
        """
        super().__init__()

    def put(self, key, item):
        """
        Assigns the item value to dictionary self.cache-data for given key

        If there is no key or item the method does nothing

        If the number of items in self.cache_data exceeds
        BaseCaching.MAX_ITEMS, the most recently used item (MRU) is discarded

        Args:
            key: key to associate with item
            item: value to cache
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                #  discard the most recently used item
                mru_key = list(self.cache_data.keys())[-1]
                print(f"DISCARD: {mru_key}")
                del self.cache_data[mru_key]
            self.cache_data[key] = item

    def get(self, key):
        """
        Returns the value associated with the given key

        Args:
            key: The key to retrieve the valur for

        Returns:
            The cached value corresponding to the key, or None if not
            found
        """
        return self.cache_data.get(key, None)
