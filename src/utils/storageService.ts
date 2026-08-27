import {
  UserProfile,
  PromptHistoryItem,
  FavoriteItem,
  UsageStatistics,
  ManagedTemplate,
  ManagedCategory,
  UserNoteEntry,
  AdminAppSettings,
  AppMode,
  UserRole
} from '../types';
import { PRESET_TEMPLATES } from '../data/presetData';

const STORAGE_KEYS = {
  CURRENT_USER: 'app_current_user_v1',
  ALL_USERS: 'app_all_users_v1',
  HISTORY: 'app_prompt_history_v1',
  FAVORITES: 'app_favorites_v1',
  USAGE_STATS: 'app_usage_stats_v1',
  ADMIN_TEMPLATES: 'app_admin_templates_v1',
  ADMIN_CATEGORIES: 'app_admin_categories_v1',
  USER_ENTRIES: 'app_user_entries_v1',
  APP_SETTINGS: 'app_admin_settings_v1',
};

// Default initial user profiles
const DEFAULT_USERS: UserProfile[] = [
  {
    id: 'usr_admin_01',
    name: 'Admin Master (စီမံခန့်ခွဲသူ)',
    email: 'admin@aistudio.mm',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    createdAt: '2026-01-01',
    bio: 'System Administrator & Prompt Engineer Lead',
    credits: 9999
  },
  {
    id: 'usr_member_02',
    name: 'Kyaw Win',
    email: 'kyawwin64.mm@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'user',
    createdAt: '2026-02-15',
    bio: 'Photographer & AI Creator from Myanmar',
    credits: 250
  }
];

const DEFAULT_CATEGORIES: ManagedCategory[] = [
  { id: 'cat_01', nameMm: 'ရိုးရာပွဲတော်နှင့် မင်္ဂလာဆောင်', nameEn: 'Heritage & Wedding', emoji: '✨', description: 'ရိုးရာဝတ်စုံနှင့် မင်္ဂလာပွဲတော်များ', itemCount: 12, isActive: true },
  { id: 'cat_02', nameMm: 'ဆိုက်ဘာပန့်ခ်နှင့် ခေတ်လွန်', nameEn: 'Cyberpunk & Sci-Fi', emoji: '⚡', description: 'နီယွန်အလင်းနှင့် ခေတ်ရှေ့ပြေး စတိုင်များ', itemCount: 8, isActive: true },
  { id: 'cat_03', nameMm: 'ဖက်ရှင်နှင့် မဂ္ဂဇင်းကာဗာ', nameEn: 'Fashion & Magazine', emoji: '👗', description: 'စတူဒီယို ဖက်ရှင်နှင့် မဂ္ဂဇင်းကာဗာများ', itemCount: 15, isActive: true },
  { id: 'cat_04', nameMm: 'ရှေးဟောင်းသမိုင်းဝင် နန်းတွင်း', nameEn: 'Royal & Historical', emoji: '👑', description: 'ပုဂံ၊ မန္တလေး၊ အင်းဝ နန်းတွင်းစတိုင်များ', itemCount: 10, isActive: true },
  { id: 'cat_05', nameMm: 'သဘာဝရှုခင်းနှင့် ခရီးသွား', nameEn: 'Nature & Travel', emoji: '🏔️', description: 'မြန်မာ့သဘာဝအလှနှင့် ခရီးသွားပုံရိပ်များ', itemCount: 9, isActive: true }
];

const DEFAULT_USER_ENTRIES: UserNoteEntry[] = [
  {
    id: 'entry_01',
    title: 'ပုဂံနေဝင်ချိန် ရွှေရောင်ဆည်းဆာ',
    category: 'ရိုးရာပွဲတော်နှင့် မင်္ဂလာဆောင်',
    mode: 'txt2img',
    masterPrompt: '8k photorealistic portrait of an elegant Myanmar lady in traditional silk htamein at Bagan ancient pagodas during golden hour sunset, cinematic lighting, ultra-detailed Hasselblad shot',
    negativePrompt: 'blurry, deformed, bad anatomy, low quality',
    notes: 'ပုဂံစေတီနောက်ခံအတွက် အလင်းရောင် အထူးကောင်းမွန်သော prompt ဖြစ်သည်',
    createdAt: '2026-02-18',
    updatedAt: '2026-02-18'
  },
  {
    id: 'entry_02',
    title: 'Cyberpunk Thingyan Neon Queen',
    category: 'ဆိုက်ဘာပန့်ခ်နှင့် ခေတ်လွန်',
    mode: 'txt2img',
    masterPrompt: 'Futuristic Myanmar female warrior during cyberpunk Thingyan festival, neon water splashes, holographic padauk flowers, 8k octane render',
    negativePrompt: 'low resolution, flat colors, cartoon',
    notes: 'သင်္ကြန်ဆိုက်ဘာပန့်ခ်အတွက် အကောင်းဆုံး preset',
    createdAt: '2026-02-19',
    updatedAt: '2026-02-19'
  }
];

const DEFAULT_SETTINGS: AdminAppSettings = {
  siteName: 'AI Studio Master Myanmar',
  systemNoticeMm: 'ကြိုဆိုပါသည်! စနစ်ကို အဆင်ပြေချောမွေ့စွာ အသုံးပြုနိုင်ပါသည်။',
  systemNoticeEn: 'Welcome! The system is operating normally with all AI models available.',
  isMaintenanceMode: false,
  defaultEngine: 'gemini-3.7-flash',
  maxDailyPrompts: 100,
  enableGuestAccess: true
};

export const StorageService = {
  // Current User management
  getCurrentUser(): UserProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to read current user from storage', e);
    }
    // Default to regular user initially or admin
    return DEFAULT_USERS[1];
  },

  setCurrentUser(user: UserProfile) {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      // Update in all users list as well
      const all = this.getAllUsers();
      const idx = all.findIndex(u => u.id === user.id);
      if (idx >= 0) {
        all[idx] = user;
      } else {
        all.push(user);
      }
      localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(all));
    } catch (e) {
      console.warn('Failed to save current user', e);
    }
  },

  getAllUsers(): UserProfile[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to read all users', e);
    }
    return DEFAULT_USERS;
  },

  saveUser(user: UserProfile): UserProfile[] {
    const all = this.getAllUsers();
    const idx = all.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      all[idx] = user;
    } else {
      all.push(user);
    }
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(all));
    const current = this.getCurrentUser();
    if (current.id === user.id) {
      this.setCurrentUser(user);
    }
    return all;
  },

  deleteUser(userId: string): UserProfile[] {
    const all = this.getAllUsers();
    const updated = all.filter(u => u.id !== userId);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(updated));
    return updated;
  },

  updateUserRole(userId: string, newRole: UserRole): UserProfile[] {
    const users = this.getAllUsers();
    const updated = users.map(u => u.id === userId ? { ...u, role: newRole } : u);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(updated));
    const current = this.getCurrentUser();
    if (current.id === userId) {
      current.role = newRole;
      this.setCurrentUser(current);
    }
    return updated;
  },

  addNewUser(name: string, email: string, role: UserRole = 'user', avatar?: string, credits = 100, bio = ''): UserProfile {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role,
      createdAt: new Date().toISOString().split('T')[0],
      credits,
      avatar: avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      bio
    };
    const all = this.getAllUsers();
    all.push(newUser);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(all));
    return newUser;
  },

  // User Custom Saved Entries & Notes ("စာရင်းရေးသွင်းခြင်း")
  getUserEntries(): UserNoteEntry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER_ENTRIES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to read user entries', e);
    }
    return DEFAULT_USER_ENTRIES;
  },

  saveUserEntry(entry: Omit<UserNoteEntry, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): UserNoteEntry[] {
    const entries = this.getUserEntries();
    const now = new Date().toISOString().split('T')[0];
    let updated: UserNoteEntry[];

    if (entry.id) {
      const existingIdx = entries.findIndex(e => e.id === entry.id);
      if (existingIdx >= 0) {
        const item = entries[existingIdx];
        entries[existingIdx] = {
          ...item,
          ...entry,
          id: entry.id,
          createdAt: item.createdAt || now,
          updatedAt: now
        };
        updated = [...entries];
      } else {
        const newRecord: UserNoteEntry = {
          ...entry,
          id: entry.id,
          createdAt: now,
          updatedAt: now
        };
        updated = [newRecord, ...entries];
      }
    } else {
      const newRecord: UserNoteEntry = {
        ...entry,
        id: `entry_${Date.now()}`,
        createdAt: now,
        updatedAt: now
      };
      updated = [newRecord, ...entries];
    }

    localStorage.setItem(STORAGE_KEYS.USER_ENTRIES, JSON.stringify(updated));
    return updated;
  },

  deleteUserEntry(id: string): UserNoteEntry[] {
    const entries = this.getUserEntries();
    const updated = entries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.USER_ENTRIES, JSON.stringify(updated));
    return updated;
  },

  // Prompt History Management
  getHistory(): PromptHistoryItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to read history', e);
    }
    return [];
  },

  saveToHistory(item: Omit<PromptHistoryItem, 'id' | 'timestamp'>): PromptHistoryItem {
    const history = this.getHistory();
    const newItem: PromptHistoryItem = {
      ...item,
      id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
    // Keep max 50 recent items
    const updated = [newItem, ...history].slice(0, 50);
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
      this.incrementPromptCount(item.mode, !!item.generatedImageUrl);
    } catch (e) {
      console.warn('Failed to save history', e);
    }
    return newItem;
  },

  deleteHistoryItem(id: string): PromptHistoryItem[] {
    const history = this.getHistory();
    const updated = history.filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  },

  clearHistory(): void {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  },

  // Favorites Management
  getFavorites(): FavoriteItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to read favorites', e);
    }
    return [];
  },

  addFavorite(fav: Omit<FavoriteItem, 'id' | 'savedAt'>): FavoriteItem {
    const favs = this.getFavorites();
    const newFav: FavoriteItem = {
      ...fav,
      id: `fav_${Date.now()}`,
      savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    const updated = [newFav, ...favs];
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return newFav;
  },

  removeFavorite(id: string): FavoriteItem[] {
    const favs = this.getFavorites();
    const updated = favs.filter(f => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return updated;
  },

  isFavorite(promptText: string): boolean {
    const favs = this.getFavorites();
    return favs.some(f => f.masterPrompt.trim() === promptText.trim());
  },

  // Usage Statistics
  getUsageStats(): UsageStatistics {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USAGE_STATS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to read stats', e);
    }
    const history = this.getHistory();
    const favs = this.getFavorites();
    return {
      totalPromptsGenerated: history.length > 0 ? history.length : 12,
      imagesGenerated: history.filter(h => h.generatedImageUrl).length || 4,
      favoritesCount: favs.length || 3,
      lastActive: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      popularModes: [
        { mode: 'txt2img', count: 18 },
        { mode: 'img2img', count: 9 },
        { mode: 'clothes-swap', count: 14 },
        { mode: 'background-only', count: 6 },
      ]
    };
  },

  incrementPromptCount(mode: AppMode, hasImage: boolean) {
    const stats = this.getUsageStats();
    stats.totalPromptsGenerated += 1;
    if (hasImage) stats.imagesGenerated += 1;
    stats.lastActive = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const modeIdx = stats.popularModes.findIndex(m => m.mode === mode);
    if (modeIdx >= 0) {
      stats.popularModes[modeIdx].count += 1;
    } else {
      stats.popularModes.push({ mode, count: 1 });
    }
    try {
      localStorage.setItem(STORAGE_KEYS.USAGE_STATS, JSON.stringify(stats));
    } catch (e) {
      console.warn('Failed to update stats', e);
    }
  },

  // Admin Templates Management
  getAdminTemplates(): ManagedTemplate[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_TEMPLATES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to read admin templates', e);
    }
    // Convert base preset templates to manageable format
    return PRESET_TEMPLATES.map(t => ({
      id: t.id,
      titleMm: t.titleMm,
      titleEn: t.titleEn,
      mode: t.mode,
      emoji: t.emoji,
      category: t.mode === 'clothes-swap' ? 'Fashion / Swap' : 'Heritage & Wedding',
      isActive: true,
      createdAt: '2026-01-10'
    }));
  },

  saveAdminTemplate(tpl: ManagedTemplate): ManagedTemplate[] {
    const list = this.getAdminTemplates();
    const idx = list.findIndex(t => t.id === tpl.id);
    let updated: ManagedTemplate[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = tpl;
    } else {
      updated = [tpl, ...list];
    }
    localStorage.setItem(STORAGE_KEYS.ADMIN_TEMPLATES, JSON.stringify(updated));
    return updated;
  },

  toggleTemplateStatus(id: string): ManagedTemplate[] {
    const list = this.getAdminTemplates();
    const updated = list.map(t => t.id === id ? { ...t, isActive: !t.isActive } : t);
    localStorage.setItem(STORAGE_KEYS.ADMIN_TEMPLATES, JSON.stringify(updated));
    return updated;
  },

  deleteTemplate(id: string): ManagedTemplate[] {
    const list = this.getAdminTemplates();
    const updated = list.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.ADMIN_TEMPLATES, JSON.stringify(updated));
    return updated;
  },

  // Admin Categories Management
  getAdminCategories(): ManagedCategory[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_CATEGORIES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to read categories', e);
    }
    return DEFAULT_CATEGORIES;
  },

  saveCategory(cat: ManagedCategory): ManagedCategory[] {
    const list = this.getAdminCategories();
    const idx = list.findIndex(c => c.id === cat.id);
    let updated: ManagedCategory[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = cat;
    } else {
      updated = [cat, ...list];
    }
    localStorage.setItem(STORAGE_KEYS.ADMIN_CATEGORIES, JSON.stringify(updated));
    return updated;
  },

  toggleCategoryStatus(id: string): ManagedCategory[] {
    const list = this.getAdminCategories();
    const updated = list.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c);
    localStorage.setItem(STORAGE_KEYS.ADMIN_CATEGORIES, JSON.stringify(updated));
    return updated;
  },

  deleteCategory(id: string): ManagedCategory[] {
    const list = this.getAdminCategories();
    const updated = list.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.ADMIN_CATEGORIES, JSON.stringify(updated));
    return updated;
  },

  // App Settings
  getAppSettings(): AdminAppSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to read settings', e);
    }
    return DEFAULT_SETTINGS;
  },

  saveAppSettings(settings: AdminAppSettings): AdminAppSettings {
    try {
      localStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings', e);
    }
    return settings;
  }
};

