
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { BehaviorTracker } from '@/utils/behaviorTracker';
import { CookieManager } from '@/utils/cookieUtils';
import { CacheManager } from '@/utils/cacheUtils';

export const useBehaviorTracking = () => {
  const location = useLocation();

  // Initialize tracking on mount
  useEffect(() => {
    BehaviorTracker.init();
  }, []);

  // Track page views
  useEffect(() => {
    BehaviorTracker.trackPageView(location.pathname);
  }, [location.pathname]);

  // Tracking functions
  const trackSearch = useCallback((query: string) => {
    BehaviorTracker.trackSearch(query);
  }, []);

  const trackCourseInteraction = useCallback((courseId: string, action?: string) => {
    BehaviorTracker.trackCourseInteraction(courseId, action);
  }, []);

  const savePreference = useCallback((key: string, value: any) => {
    BehaviorTracker.savePreference(key, value);
  }, []);

  const getPreference = useCallback((key: string) => {
    return BehaviorTracker.getPreference(key);
  }, []);

  const getAnalytics = useCallback(() => {
    return BehaviorTracker.getAnalytics();
  }, []);

  // Cookie functions
  const setCookie = useCallback((name: string, value: string, options?: any) => {
    CookieManager.set(name, value, options);
  }, []);

  const getCookie = useCallback((name: string) => {
    return CookieManager.get(name);
  }, []);

  const removeCookie = useCallback((name: string) => {
    CookieManager.remove(name);
  }, []);

  // Cache functions
  const setCache = useCallback(<T>(key: string, value: T, options?: any) => {
    CacheManager.set(key, value, options);
  }, []);

  const getCache = useCallback(<T>(key: string): T | null => {
    return CacheManager.get<T>(key);
  }, []);

  const removeCache = useCallback((key: string) => {
    CacheManager.remove(key);
  }, []);

  const clearAllCache = useCallback(() => {
    CacheManager.clear();
  }, []);

  const clearAllBehavior = useCallback(() => {
    BehaviorTracker.clearAll();
  }, []);

  return {
    // Behavior tracking
    trackSearch,
    trackCourseInteraction,
    savePreference,
    getPreference,
    getAnalytics,
    clearAllBehavior,
    
    // Cookie management
    setCookie,
    getCookie,
    removeCookie,
    
    // Cache management
    setCache,
    getCache,
    removeCache,
    clearAllCache
  };
};
