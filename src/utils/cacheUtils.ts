
export interface CacheItem<T> {
  value: T;
  timestamp: number;
  expiryTime?: number;
}

export interface CacheOptions {
  expiryMinutes?: number;
  useMemoryCache?: boolean;
  useLocalStorage?: boolean;
}

export class CacheManager {
  private static memoryCache = new Map<string, CacheItem<any>>();
  private static readonly DEFAULT_EXPIRY = 60; // 60 minutes

  /**
   * Set a value in cache
   */
  static set<T>(
    key: string, 
    value: T, 
    options: CacheOptions = {}
  ): void {
    const {
      expiryMinutes = this.DEFAULT_EXPIRY,
      useMemoryCache = true,
      useLocalStorage = true
    } = options;

    const timestamp = Date.now();
    const expiryTime = timestamp + (expiryMinutes * 60 * 1000);
    
    const cacheItem: CacheItem<T> = {
      value,
      timestamp,
      expiryTime
    };

    // Store in memory cache
    if (useMemoryCache) {
      this.memoryCache.set(key, cacheItem);
    }

    // Store in localStorage
    if (useLocalStorage) {
      try {
        localStorage.setItem(`cache_${key}`, JSON.stringify(cacheItem));
      } catch (error) {
        console.warn('Failed to save to localStorage:', error);
      }
    }
  }

  /**
   * Get a value from cache
   */
  static get<T>(key: string): T | null {
    // Try memory cache first
    const memoryItem = this.memoryCache.get(key);
    if (memoryItem && this.isValid(memoryItem)) {
      return memoryItem.value;
    }

    // Try localStorage
    try {
      const localItem = localStorage.getItem(`cache_${key}`);
      if (localItem) {
        const parsedItem: CacheItem<T> = JSON.parse(localItem);
        if (this.isValid(parsedItem)) {
          // Restore to memory cache
          this.memoryCache.set(key, parsedItem);
          return parsedItem.value;
        } else {
          // Remove expired item
          this.remove(key);
        }
      }
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
    }

    return null;
  }

  /**
   * Check if a cache item is still valid
   */
  private static isValid<T>(item: CacheItem<T>): boolean {
    if (!item.expiryTime) return true;
    return Date.now() < item.expiryTime;
  }

  /**
   * Remove a value from cache
   */
  static remove(key: string): void {
    this.memoryCache.delete(key);
    try {
      localStorage.removeItem(`cache_${key}`);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }

  /**
   * Clear all cache
   */
  static clear(): void {
    this.memoryCache.clear();
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('cache_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage cache:', error);
    }
  }

  /**
   * Get cache size information
   */
  static getStats(): { memoryItems: number; localStorageItems: number } {
    let localStorageItems = 0;
    try {
      const keys = Object.keys(localStorage);
      localStorageItems = keys.filter(key => key.startsWith('cache_')).length;
    } catch (error) {
      console.warn('Failed to get localStorage stats:', error);
    }

    return {
      memoryItems: this.memoryCache.size,
      localStorageItems
    };
  }

  /**
   * Clean up expired items
   */
  static cleanup(): void {
    // Clean memory cache
    for (const [key, item] of this.memoryCache.entries()) {
      if (!this.isValid(item)) {
        this.memoryCache.delete(key);
      }
    }

    // Clean localStorage cache
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('cache_')) {
          const item = localStorage.getItem(key);
          if (item) {
            try {
              const parsedItem = JSON.parse(item);
              if (!this.isValid(parsedItem)) {
                localStorage.removeItem(key);
              }
            } catch {
              localStorage.removeItem(key);
            }
          }
        }
      });
    } catch (error) {
      console.warn('Failed to cleanup localStorage cache:', error);
    }
  }
}

// Auto cleanup every 5 minutes
setInterval(() => {
  CacheManager.cleanup();
}, 5 * 60 * 1000);
