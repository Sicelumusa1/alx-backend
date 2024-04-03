#!/usr/bin/env python3

"""
A basic caching system that inherits from BaseCaching
"""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    A basic caching system that inherits from BaseCaching
    It has no limit on the number of items it can store
    """

    def put(self, key, item):
        """
        Assigns the item value to dictionary self.cache-data for given key
        If there is no key or item the method does nothing

        Args:
            key: key to associate with item
            item: value to cache
        """
        if key is not None and item is not None:
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

