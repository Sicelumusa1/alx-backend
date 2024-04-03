#!/usr/bin/env python3

"""
A caching system that inherits from BaseCaching and uses the LFU algorithm
"""

from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """
    A caching system that inherits from BaseCaching and uses the LFU algorithm
    """

    def __init__(self):
        """
        Initializes the LFUCache by calling the parent class's __init__ method
        """
        super().__init__()
        # Keep track of usage frequency
        self.usage_count = {}

    def put(self, key, item):
        """
        Assigns the item value to the dictionary self.cache_data
        If the number of items in self.cache_data exceeds
        BaseCaching.MAX_ITEMS,the least frequently used item (LFU)
        is discarded

        Args:
            key: Key to associate with the item
            item: The value to be cached
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # find the least frequently used item
                min_usage = min(self.usage_count.values())
                lfu_keys = [k for k, v in self.usage_count.items() if
                            v == min_usage]

                # if multiple items have the same least frequency, use
                # LRU to break the tie
                lru_key = lfu_keys[-1]
                print(f"DISCARD: {lru_key}")
                del self.cache_data[lru_key]
                del self.usage_count[lru_key]

            self.cache_data[key] = item
            self.usage_count[key] = 0

    def get(self, key):
        """
        Returns the value associated with the given key

        Args:
            key: The key to retrieve the valur for

        Returns:
            The cached value corresponding to the key, or None if not
            found
        """
        if key in self.cache_data:
            self.usage_count[key] += 1
            return self.cache_data[key]
        return None
