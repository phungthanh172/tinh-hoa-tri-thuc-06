import { CookieManager } from './cookieUtils';
import { CacheManager } from './cacheUtils';

export interface UserBehavior {
  pageViews: Record<string, number>;
  searchQueries: string[];
  courseInteractions: Record<string, number>;
  timeSpent: Record<string, number>;
  preferences: Record<string, any>;
  lastVisit: number;
  sessionStart: number;
}

export interface BehaviorEvent {
  type: 'page_view' | 'search' | 'course_interaction' | 'time_spent' | 'preference_change';
  data: any;
  timestamp: number;
}

export class BehaviorTracker {
  private static readonly BEHAVIOR_COOKIE = 'user_behavior';
  private static readonly BEHAVIOR_CACHE = 'behavior_data';
  private static readonly SESSION_CACHE = 'session_data';

  /**
   * Initialize behavior tracking
   */
  static init(): void {
    const existingBehavior = this.getBehavior();
    const now = Date.now();

    if (!existingBehavior) {
      const initialBehavior: UserBehavior = {
        pageViews: {},
        searchQueries: [],
        courseInteractions: {},
        timeSpent: {},
        preferences: {},
        lastVisit: now,
        sessionStart: now
      };
      this.saveBehavior(initialBehavior);
    } else {
      // Update session start for new session
      existingBehavior.sessionStart = now;
      this.saveBehavior(existingBehavior);
    }

    // Track page visibility changes for time spent
    this.initTimeTracking();
    
    console.log('Behavior tracking initialized');
  }

  /**
   * Track a page view
   */
  static trackPageView(path: string): void {
    const behavior = this.getBehavior();
    if (behavior) {
      behavior.pageViews[path] = (behavior.pageViews[path] || 0) + 1;
      behavior.lastVisit = Date.now();
      this.saveBehavior(behavior);
      
      this.trackEvent({
        type: 'page_view',
        data: { path },
        timestamp: Date.now()
      });
    }
  }

  /**
   * Track a search query
   */
  static trackSearch(query: string): void {
    const behavior = this.getBehavior();
    if (behavior && query.trim()) {
      behavior.searchQueries.push(query);
      // Keep only last 50 searches
      if (behavior.searchQueries.length > 50) {
        behavior.searchQueries = behavior.searchQueries.slice(-50);
      }
      this.saveBehavior(behavior);

      this.trackEvent({
        type: 'search',
        data: { query },
        timestamp: Date.now()
      });
    }
  }

  /**
   * Track course interactions
   */
  static trackCourseInteraction(courseId: string, action: string = 'view'): void {
    const behavior = this.getBehavior();
    if (behavior) {
      const key = `${courseId}_${action}`;
      behavior.courseInteractions[key] = (behavior.courseInteractions[key] || 0) + 1;
      this.saveBehavior(behavior);

      this.trackEvent({
        type: 'course_interaction',
        data: { courseId, action },
        timestamp: Date.now()
      });
    }
  }

  /**
   * Track time spent on a page
   */
  static trackTimeSpent(path: string, seconds: number): void {
    const behavior = this.getBehavior();
    if (behavior) {
      behavior.timeSpent[path] = (behavior.timeSpent[path] || 0) + seconds;
      this.saveBehavior(behavior);

      this.trackEvent({
        type: 'time_spent',
        data: { path, seconds },
        timestamp: Date.now()
      });
    }
  }

  /**
   * Save user preferences
   */
  static savePreference(key: string, value: any): void {
    const behavior = this.getBehavior();
    if (behavior) {
      behavior.preferences[key] = value;
      this.saveBehavior(behavior);

      this.trackEvent({
        type: 'preference_change',
        data: { key, value },
        timestamp: Date.now()
      });
    }
  }

  /**
   * Get user preferences
   */
  static getPreference(key: string): any {
    const behavior = this.getBehavior();
    return behavior?.preferences[key] || null;
  }

  /**
   * Get all behavior data
   */
  static getBehavior(): UserBehavior | null {
    // Try cache first
    const cached = CacheManager.get<UserBehavior>(this.BEHAVIOR_CACHE);
    if (cached) return cached;

    // Try cookie
    const cookieData = CookieManager.get(this.BEHAVIOR_COOKIE);
    if (cookieData) {
      try {
        const behavior = JSON.parse(cookieData);
        // Cache it for faster access
        CacheManager.set(this.BEHAVIOR_CACHE, behavior, { expiryMinutes: 30 });
        return behavior;
      } catch (error) {
        console.warn('Failed to parse behavior cookie:', error);
      }
    }

    return null;
  }

  /**
   * Save behavior data
   */
  private static saveBehavior(behavior: UserBehavior): void {
    // Save to cache
    CacheManager.set(this.BEHAVIOR_CACHE, behavior, { expiryMinutes: 30 });
    
    // Save to cookie (expires in 30 days)
    CookieManager.set(this.BEHAVIOR_COOKIE, JSON.stringify(behavior), {
      expires: 30,
      path: '/',
      sameSite: 'lax'
    });
  }

  /**
   * Track individual events
   */
  private static trackEvent(event: BehaviorEvent): void {
    const events = CacheManager.get<BehaviorEvent[]>('behavior_events') || [];
    events.push(event);
    
    // Keep only last 100 events
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }
    
    CacheManager.set('behavior_events', events, { expiryMinutes: 60 });
  }

  /**
   * Get behavior analytics
   */
  static getAnalytics(): {
    mostVisitedPages: Array<{ path: string; visits: number }>;
    topSearches: Array<{ query: string; count: number }>;
    totalTimeSpent: number;
    sessionDuration: number;
  } {
    const behavior = this.getBehavior();
    if (!behavior) {
      return {
        mostVisitedPages: [],
        topSearches: [],
        totalTimeSpent: 0,
        sessionDuration: 0
      };
    }

    // Most visited pages
    const mostVisitedPages = Object.entries(behavior.pageViews)
      .map(([path, visits]) => ({ path, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);

    // Top searches
    const searchCounts: Record<string, number> = {};
    behavior.searchQueries.forEach(query => {
      searchCounts[query] = (searchCounts[query] || 0) + 1;
    });
    const topSearches = Object.entries(searchCounts)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Total time spent
    const totalTimeSpent = Object.values(behavior.timeSpent)
      .reduce((total, time) => total + time, 0);

    // Session duration
    const sessionDuration = Date.now() - behavior.sessionStart;

    return {
      mostVisitedPages,
      topSearches,
      totalTimeSpent,
      sessionDuration
    };
  }

  /**
   * Initialize time tracking
   */
  private static initTimeTracking(): void {
    let startTime = Date.now();
    let currentPath = window.location.pathname;

    const updateTimeSpent = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      if (timeSpent > 0) {
        this.trackTimeSpent(currentPath, timeSpent);
      }
      startTime = Date.now();
    };

    // Track time when page becomes hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        updateTimeSpent();
      } else {
        startTime = Date.now();
      }
    });

    // Track time before page unload
    window.addEventListener('beforeunload', updateTimeSpent);

    // Update time every 30 seconds for long sessions
    setInterval(updateTimeSpent, 30000);
  }

  /**
   * Clear all behavior data
   */
  static clearAll(): void {
    CacheManager.remove(this.BEHAVIOR_CACHE);
    CacheManager.remove('behavior_events');
    CookieManager.remove(this.BEHAVIOR_COOKIE);
    console.log('All behavior data cleared');
  }
}
