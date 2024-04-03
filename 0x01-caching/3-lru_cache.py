#!/usr/bin/env python3

"""
A caching system that inherits from baseCaching and uses the LRU algorithm
"""

from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """
    A caching system that inherits from baseCaching and uses the LRU algorithm
    """

    def __init__(self):
        """
        Initializes the LRUCache by calling the parent class's __init__ method
        """
        super().__init__()
        #  Keep track of usage order
        self.usage_order = []

    def put(self, key, item):
        """
        Assigns the item value to dictionary self.cache-data for given key

        If there is no key or item the method does nothing

        If the number of items in self.cache_data exceeds
        BaseCaching.MAX_ITEMS, the least recently used item (LRU) is discarded

        Args:
            key: key to associate with item
            item: value to cache
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # Discard the least recently used item (LRU)
                lru_key = self.usage_order.pop(0)
                print(f"DISCARD: {lru_key}")
                del self.cache_data[lru_key]
            self.cache_data[key] = item
            self.usage_order.append(key)

    def get(self, key):
        """
        Returns the value associated with the given key
        Updates the usage order to reflect the most recent access
        Args:
            key: The key to retrieve the valur for

        Returns:
            The cached value corresponding to the key, or None if not
            found
        """
        if key in self.cache_data:
            # Update usage order (move key to the end
            self.usage_order.remove(key)
            sefl.usage_order.append(key)
            return self.cache_data[key]
        return self.cache_data.get(key, None)
