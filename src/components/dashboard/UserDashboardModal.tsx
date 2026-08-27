import React, { useState, useEffect, useRef } from 'react';
import {
  UserProfile,
  PromptHistoryItem,
  FavoriteItem,
  UsageStatistics,
  UserNoteEntry,
  AppMode,
  Language
} from '../../types';
import { StorageService } from '../../utils/storageService';
import {
  User,
  History,
  Star,
  BarChart3,
  X,
  Copy,
  Check,
  Trash2,
  Search,
  Sparkles,
  Shield,
  Clock,
  Calendar,
  Layers,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  Edit3,
  Plus,
  FileText,
  BookmarkPlus,
  Wand2,
  FolderPlus,
  RefreshCw
} from 'lucide-react';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUserUpdate: (user: UserProfile) => void;
  language: Language;
  onSelectPromptToUse?: (promptText: string) => void;
  onOpenAdminDashboard?: () => void;
}

// Preset Avatars for quick selection
const AVATAR_PRESETS = [
  { id: 'av1', label: 'Photographer', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
  { id: 'av2', label: 'Creative Queen', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
  { id: 'av3', label: 'Cyber Tech', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80' },
  { id: 'av4', label: 'Fashion Model', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' },
  { id: 'av5', label: 'Studio Master', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
  { id: 'av6', label: 'AI Artist', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
];

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserUpdate,
  language,
  onSelectPromptToUse,
  onOpenAdminDashboard
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'entries' | 'history' | 'favorites' | 'stats'>('profile');
  const [historyList, setHistoryList] = useState<PromptHistoryItem[]>([]);
  const [favoritesList, setFavoritesList] = useState<FavoriteItem[]>([]);
  const [userEntries, setUserEntries] = useState<UserNoteEntry[]>([]);
  const [stats, setStats] = useState<UsageStatistics>(StorageService.getUsageStats());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Profile Editor Form State
  const [editName, setEditName] = useState(currentUser.name);
  const [editEmail, setEditEmail] = useState(currentUser.email);
  const [editBio, setEditBio] = useState(currentUser.bio || '');
  const [editAvatar, setEditAvatar] = useState(currentUser.avatar || '');
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New User Entry Form State ("စာရင်းရေးသွင်းခြင်း")
  const [showAddEntryForm, setShowAddEntryForm] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryCategory, setNewEntryCategory] = useState('ရိုးရာပွဲတော်နှင့် မင်္ဂလာဆောင်');
  const [newEntryMode, setNewEntryMode] = useState<AppMode>('txt2img');
  const [newEntryPrompt, setNewEntryPrompt] = useState('');
  const [newEntryNegative, setNewEntryNegative] = useState('low quality, blurry, deformed, bad anatomy');
  const [newEntryNotes, setNewEntryNotes] = useState('');
  const [newEntryImageUrl, setNewEntryImageUrl] = useState('');
  const entryImageInputRef = useRef<HTMLInputElement>(null);

  const isMyanmar = language === 'my';

  useEffect(() => {
    if (isOpen) {
      setHistoryList(StorageService.getHistory());
      setFavoritesList(StorageService.getFavorites());
      setUserEntries(StorageService.getUserEntries());
      setStats(StorageService.getUsageStats());
      setEditName(currentUser.name);
      setEditEmail(currentUser.email);
      setEditBio(currentUser.bio || '');
      setEditAvatar(currentUser.avatar || '');
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  // Handle Profile Photo Upload from device
  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setEditAvatar(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Profile Changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...currentUser,
      name: editName.trim() || currentUser.name,
      email: editEmail.trim() || currentUser.email,
      bio: editBio.trim(),
      avatar: editAvatar.trim() || currentUser.avatar
    };
    StorageService.setCurrentUser(updated);
    onUserUpdate(updated);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 2500);
  };

  // Handle Custom Entry Image Upload from device
  const handleEntryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setNewEntryImageUrl(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save User Entry ("စာရင်းသွင်းခြင်း")
  const handleSaveUserEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntryTitle.trim() || !newEntryPrompt.trim()) return;

    const saved = StorageService.saveUserEntry({
      id: editingEntryId || undefined,
      title: newEntryTitle.trim(),
      category: newEntryCategory,
      mode: newEntryMode,
      masterPrompt: newEntryPrompt.trim(),
      negativePrompt: newEntryNegative.trim(),
      notes: newEntryNotes.trim(),
      imageUrl: newEntryImageUrl.trim() || undefined
    });

    setUserEntries(saved);
    // Reset Form
    setNewEntryTitle('');
    setNewEntryPrompt('');
    setNewEntryNegative('low quality, blurry, deformed, bad anatomy');
    setNewEntryNotes('');
    setNewEntryImageUrl('');
    setEditingEntryId(null);
    setShowAddEntryForm(false);
  };

  const handleEditEntry = (entry: UserNoteEntry) => {
    setEditingEntryId(entry.id);
    setNewEntryTitle(entry.title);
    setNewEntryCategory(entry.category);
    setNewEntryMode(entry.mode);
    setNewEntryPrompt(entry.masterPrompt);
    setNewEntryNegative(entry.negativePrompt || '');
    setNewEntryNotes(entry.notes || '');
    setNewEntryImageUrl(entry.imageUrl || '');
    setShowAddEntryForm(true);
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm(isMyanmar ? 'ဤမှတ်တမ်းစာရင်းကို ဖျက်ရန် သေချာပါသလား?' : 'Delete this recorded entry?')) {
      const updated = StorageService.deleteUserEntry(id);
      setUserEntries(updated);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteHistory = (id: string) => {
    const updated = StorageService.deleteHistoryItem(id);
    setHistoryList(updated);
    setStats(StorageService.getUsageStats());
  };

  const handleToggleFavorite = (item: PromptHistoryItem) => {
    const isFav = StorageService.isFavorite(item.masterPrompt);
    if (isFav) {
      const allFavs = StorageService.getFavorites();
      const target = allFavs.find(f => f.masterPrompt.trim() === item.masterPrompt.trim());
      if (target) {
        const updated = StorageService.removeFavorite(target.id);
        setFavoritesList(updated);
      }
    } else {
      const newFav = StorageService.addFavorite({
        promptId: item.id,
        title: item.optionsSummary?.event || item.optionsSummary?.subject || 'AI Prompt',
        masterPrompt: item.masterPrompt,
        mode: item.mode,
        aspectRatio: item.aspectRatio,
        previewImage: item.generatedImageUrl
      });
      setFavoritesList([newFav, ...favoritesList]);
    }
    setHistoryList(StorageService.getHistory());
    setStats(StorageService.getUsageStats());
  };

  const handleRemoveFavorite = (id: string) => {
    const updated = StorageService.removeFavorite(id);
    setFavoritesList(updated);
    setStats(StorageService.getUsageStats());
  };

  const filteredEntries = userEntries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.masterPrompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHistory = historyList.filter(h =>
    h.masterPrompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (h.optionsSummary?.subject && h.optionsSummary.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (h.optionsSummary?.event && h.optionsSummary.event.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredFavorites = favoritesList.filter(f =>
    f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.masterPrompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-slate-950 shadow-md">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>{isMyanmar ? 'User Dashboard (အသုံးပြုသူ ဒက်ရှ်ဘုတ်)' : 'User Dashboard'}</span>
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  currentUser.role === 'admin'
                    ? 'bg-amber-950/90 text-amber-300 border-amber-500/50'
                    : 'bg-blue-950/90 text-blue-300 border-blue-500/50'
                }`}>
                  {currentUser.role === 'admin' ? '👑 Admin' : '👤 Member'}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isMyanmar
                  ? 'ပရိုဖိုင်ဓာတ်ပုံ၊ စာရင်းမှတ်တမ်းသစ်များ ရေးသွင်းခြင်းနှင့် Prompt မှတ်တမ်းများ'
                  : 'Manage profile picture, create custom prompt records, and view history'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenAdminDashboard && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAdminDashboard();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 text-xs font-bold transition-all shadow-sm"
              >
                <Shield className="h-3.5 w-3.5" />
                <span>{isMyanmar ? '👑 Admin Dashboard' : 'Admin Panel'}</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 pt-2 border-b border-slate-800 bg-slate-950/50 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-cyan-400 text-cyan-300 bg-slate-800/40 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="h-4 w-4" />
            <span>{isMyanmar ? '👤 ပရိုဖိုင်နှင့် ဓာတ်ပုံ' : '👤 Profile & Photo'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('entries')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'entries'
                ? 'border-cyan-400 text-cyan-300 bg-slate-800/40 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookmarkPlus className="h-4 w-4" />
            <span>{isMyanmar ? `📝 စာရင်းမှတ်တမ်းများ (${userEntries.length})` : `📝 Custom Entries (${userEntries.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'history'
                ? 'border-cyan-400 text-cyan-300 bg-slate-800/40 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="h-4 w-4" />
            <span>{isMyanmar ? `📜 Prompt မှတ်တမ်း (${historyList.length})` : `📜 History (${historyList.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'favorites'
                ? 'border-cyan-400 text-cyan-300 bg-slate-800/40 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className="h-4 w-4" />
            <span>{isMyanmar ? `⭐ အကြိုက်ဆုံး (${favoritesList.length})` : `⭐ Favorites (${favoritesList.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'stats'
                ? 'border-cyan-400 text-cyan-300 bg-slate-800/40 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>{isMyanmar ? '📊 စာရင်းအင်း' : '📊 Stats'}</span>
          </button>
        </div>

        {/* Tab Contents Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 max-h-[calc(92vh-140px)] space-y-6">
          
          {/* TAB 1: User Profile & Photo Upload */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Profile Card & Avatar Section */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="relative group">
                    <img
                      src={editAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'}
                      alt={editName}
                      className="h-24 w-24 rounded-2xl object-cover border-2 border-cyan-400/80 shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[11px] font-bold transition-opacity cursor-pointer"
                    >
                      <Upload className="h-5 w-5 mb-1" />
                      <span>{isMyanmar ? 'ပုံပြောင်းမည်' : 'Upload'}</span>
                    </button>
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-bold text-slate-100">{editName || currentUser.name}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        currentUser.role === 'admin'
                          ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                          : 'bg-blue-950 text-blue-300 border-blue-500/50'
                      }`}>
                        {currentUser.role === 'admin' ? '🛡️ Administrator' : '✨ Member'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-2 flex-wrap">
                      <span>📧 {editEmail || currentUser.email}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{isMyanmar ? `အဖွဲ့ဝင်ရက်: ${currentUser.createdAt}` : `Member: ${currentUser.createdAt}`}</span>
                      </span>
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all cursor-pointer"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        <span>{isMyanmar ? '📷 ဖုန်း/ကွန်ပျူတာမှ ပုံတင်မည်' : 'Upload Photo'}</span>
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Preset Avatars Selection */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    {isMyanmar ? 'အမြန်ရွေးချယ်ရန် Profile ဓာတ်ပုံများ (Preset Avatars):' : 'Choose from Preset Avatars:'}
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                    {AVATAR_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setEditAvatar(preset.url)}
                        className={`group flex flex-col items-center gap-1 p-1.5 rounded-xl border transition-all cursor-pointer ${
                          editAvatar === preset.url
                            ? 'bg-cyan-950/60 border-cyan-400 ring-2 ring-cyan-500/30'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <span className="text-[10px] text-slate-300 font-medium truncate w-full text-center">
                          {preset.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Edit Details Form */}
              <form onSubmit={handleSaveProfile} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                  <Edit3 className="h-4 w-4 text-cyan-400" />
                  <span>{isMyanmar ? 'အကောင့် အချက်အလက်များ ပြင်ဆင်သိမ်းဆည်းရန်' : 'Edit Account Details'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      {isMyanmar ? 'အမည် (Full Name):' : 'Full Name:'}
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3.5 py-2.5 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      {isMyanmar ? 'အီးမေးလ် (Email Address):' : 'Email Address:'}
                    </label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3.5 py-2.5 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {isMyanmar ? 'Profile ဓာတ်ပုံ URL (Image URL):' : 'Avatar Image URL:'}
                  </label>
                  <input
                    type="url"
                    value={editAvatar}
                    onChange={(e) => setEditAvatar(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3.5 py-2.5 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {isMyanmar ? 'ကိုယ်ရေးအကျဉ်း / မှတ်စု (Bio / Notes):' : 'Bio / Description:'}
                  </label>
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl bg-slate-900 border border-slate-700/80 p-3 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none resize-none"
                    placeholder={isMyanmar ? 'သင်၏ အချက်အလက် သို့မဟုတ် မှတ်စုရေးပါ...' : 'Write your bio or notes...'}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    {isSavedSuccess && (
                      <>
                        <Check className="h-4 w-4" />
                        <span>{isMyanmar ? 'အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ!' : 'Profile updated successfully!'}</span>
                      </>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Check className="h-4 w-4" />
                    <span>{isMyanmar ? 'ပရိုဖိုင် အချက်အလက် သိမ်းမည်' : 'Save Profile Changes'}</span>
                  </button>
                </div>
              </form>

              {/* Role Toggle Demo */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 to-slate-950/60 border border-amber-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Shield className="h-4 w-4" />
                    <span>{isMyanmar ? 'အကောင့် Role ပြောင်းလဲစမ်းသပ်ခြင်း (Account Role Toggle):' : 'Account Role Permission:'}</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 pt-0.5">
                    {isMyanmar
                      ? 'Admin Dashboard စီမံခန့်ခွဲမှုများကို စမ်းသပ်ရန် Role ကို အလွယ်တကူ ပြောင်းလဲနိုင်ပါသည်။'
                      : 'Easily switch between User and Admin permissions for dashboard management.'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...currentUser, role: 'user' as const };
                      StorageService.setCurrentUser(updated);
                      onUserUpdate(updated);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      currentUser.role === 'user'
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    👤 User
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...currentUser, role: 'admin' as const };
                      StorageService.setCurrentUser(updated);
                      onUserUpdate(updated);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      currentUser.role === 'admin'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-extrabold'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    👑 Admin
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Custom Saved Entries & Notes ("စာရင်းရေးသွင်းခြင်း") */}
          {activeTab === 'entries' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* Header & Add Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="relative flex-1 w-full min-w-[220px]">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={isMyanmar ? 'စာရင်းမှတ်တမ်းများထဲမှ ရှာဖွေပါ...' : 'Search recorded entries...'}
                    className="w-full rounded-xl bg-slate-950/80 border border-slate-800 pl-9 pr-3 py-2 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingEntryId(null);
                    setNewEntryTitle('');
                    setNewEntryPrompt('');
                    setNewEntryNotes('');
                    setNewEntryImageUrl('');
                    setShowAddEntryForm(!showAddEntryForm);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>{showAddEntryForm ? (isMyanmar ? 'ဖောင်ပိတ်မည်' : 'Close Form') : (isMyanmar ? '+ စာရင်းအသစ် ရေးသွင်းမည်' : '+ Add New Entry')}</span>
                </button>
              </div>

              {/* Add / Edit Entry Form Drawer */}
              {showAddEntryForm && (
                <form onSubmit={handleSaveUserEntry} className="p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/50 shadow-xl space-y-4 animate-in slide-in-from-top-3 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                      <BookmarkPlus className="h-4 w-4" />
                      <span>{editingEntryId ? (isMyanmar ? 'စာရင်းမှတ်တမ်း ပြင်ဆင်ရန်' : 'Edit Entry') : (isMyanmar ? 'စာရင်းမှတ်တမ်းသစ် ရေးသွင်းရန်' : 'Create New Prompt Record')}</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowAddEntryForm(false)}
                      className="text-slate-400 hover:text-slate-200 text-xs"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'မှတ်တမ်း ခေါင်းစဉ် (Title):' : 'Entry Title:'}
                      </label>
                      <input
                        type="text"
                        value={newEntryTitle}
                        onChange={(e) => setNewEntryTitle(e.target.value)}
                        placeholder={isMyanmar ? 'ဥပမာ- ပုဂံနေဝင်ချိန် ရွှေရောင်ဆည်းဆာ' : 'e.g. Bagan Golden Sunset Portrait'}
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'ကဏ္ဍ (Category):' : 'Category:'}
                      </label>
                      <select
                        value={newEntryCategory}
                        onChange={(e) => setNewEntryCategory(e.target.value)}
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
                      >
                        <option value="ရိုးရာပွဲတော်နှင့် မင်္ဂလာဆောင်">ရိုးရာပွဲတော်နှင့် မင်္ဂလာဆောင်</option>
                        <option value="ဆိုက်ဘာပန့်ခ်နှင့် ခေတ်လွန်">ဆိုက်ဘာပန့်ခ်နှင့် ခေတ်လွန်</option>
                        <option value="ဖက်ရှင်နှင့် မဂ္ဂဇင်းကာဗာ">ဖက်ရှင်နှင့် မဂ္ဂဇင်းကာဗာ</option>
                        <option value="ရှေးဟောင်းသမိုင်းဝင် နန်းတွင်း">ရှေးဟောင်းသမိုင်းဝင် နန်းတွင်း</option>
                        <option value="သဘာဝရှုခင်းနှင့် ခရီးသွား">သဘာဝရှုခင်းနှင့် ခရီးသွား</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'အမျိုးအစား (Mode):' : 'Mode:'}
                      </label>
                      <select
                        value={newEntryMode}
                        onChange={(e) => setNewEntryMode(e.target.value as AppMode)}
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
                      >
                        <option value="txt2img">✨ Txt2Img (စာသားမှ ပုံဖန်တီးမှု)</option>
                        <option value="img2img">🖼️ Img2Img (ရည်ညွှန်းပုံမှ ဖန်တီးမှု)</option>
                        <option value="clothes-swap">👗 Clothes Swap (မဂ္ဂဇင်း ဝတ်စုံလဲ)</option>
                        <option value="background-only">🏔️ Background (နောက်ခံထုတ်)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'နမူနာပုံတင်ရန် သို့မဟုတ် URL:' : 'Preview Image:'}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newEntryImageUrl}
                          onChange={(e) => setNewEntryImageUrl(e.target.value)}
                          placeholder="https://..."
                          className="flex-1 rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => entryImageInputRef.current?.click()}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-all cursor-pointer"
                          title="Upload Image"
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                        <input
                          type="file"
                          ref={entryImageInputRef}
                          onChange={handleEntryImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      {isMyanmar ? 'အဓိက Master Prompt စာသား (English):' : 'Master Prompt:'}
                    </label>
                    <textarea
                      value={newEntryPrompt}
                      onChange={(e) => setNewEntryPrompt(e.target.value)}
                      rows={3}
                      placeholder="8k photorealistic portrait of..."
                      className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none resize-none font-mono"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'Negative Prompt (ရှောင်ကြဉ်ရန်):' : 'Negative Prompt:'}
                      </label>
                      <input
                        type="text"
                        value={newEntryNegative}
                        onChange={(e) => setNewEntryNegative(e.target.value)}
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'ကိုယ်ပိုင် မှတ်ချက် (Notes / Tips):' : 'Notes / Tips:'}
                      </label>
                      <input
                        type="text"
                        value={newEntryNotes}
                        onChange={(e) => setNewEntryNotes(e.target.value)}
                        placeholder={isMyanmar ? 'ဥပမာ- ရွှေရောင်ဆည်းဆာ အလင်းအတွက် အကောင်းဆုံး' : 'e.g. Best with 85mm lens'}
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddEntryForm(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                    >
                      {isMyanmar ? 'မလုပ်တော့ပါ' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Check className="h-4 w-4" />
                      <span>{isMyanmar ? 'စာရင်းမှတ်တမ်း သိမ်းမည်' : 'Save Record Entry'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Entries List Display */}
              {filteredEntries.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-3">
                  <BookmarkPlus className="h-8 w-8 text-slate-500 mx-auto" />
                  <p className="text-xs text-slate-400">
                    {isMyanmar ? 'ရေးသွင်းထားသော စာရင်းမှတ်တမ်း မရှိသေးပါ။ အထက်ပါ "+ စာရင်းအသစ် ရေးသွင်းမည်" ကိုနှိပ်၍ ထည့်သွင်းနိုင်ပါသည်။' : 'No recorded entries found. Click "+ Add New Entry" above to add your custom prompts!'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-3 shadow-sm group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                              {entry.category}
                            </span>
                            <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                              {entry.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleEditEntry(entry)}
                              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
                              title="Edit Entry"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteEntry(entry.id)}
                              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-red-950 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
                              title="Delete Entry"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {entry.imageUrl && (
                          <div className="rounded-xl overflow-hidden border border-slate-800 max-h-32">
                            <img
                              src={entry.imageUrl}
                              alt={entry.title}
                              className="w-full h-32 object-cover"
                            />
                          </div>
                        )}

                        <p className="text-[11px] text-slate-300 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80 line-clamp-3 font-mono">
                          {entry.masterPrompt}
                        </p>

                        {entry.notes && (
                          <p className="text-[10px] text-amber-300/90 italic">
                            💡 {entry.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                        <span>📅 {entry.createdAt}</span>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleCopy(entry.id, entry.masterPrompt)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold transition-all cursor-pointer"
                          >
                            {copiedId === entry.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                            <span>{copiedId === entry.id ? 'Copied' : 'Copy'}</span>
                          </button>

                          {onSelectPromptToUse && (
                            <button
                              type="button"
                              onClick={() => {
                                onSelectPromptToUse(entry.masterPrompt);
                                onClose();
                              }}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all cursor-pointer shadow-sm"
                            >
                              <Wand2 className="h-3 w-3" />
                              <span>{isMyanmar ? 'အသုံးပြုမည်' : 'Use'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 3: Prompt History */}
          {activeTab === 'history' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={isMyanmar ? 'မှတ်တမ်းထဲမှ ရှာဖွေပါ...' : 'Search prompt history...'}
                    className="w-full rounded-xl bg-slate-950/80 border border-slate-800 pl-9 pr-3 py-2 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                {historyList.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(isMyanmar ? 'မှတ်တမ်းအားလုံးကို ရှင်းလင်းမှာ သေချာပါသလား?' : 'Clear all history?')) {
                        StorageService.clearHistory();
                        setHistoryList([]);
                        setStats(StorageService.getUsageStats());
                      }
                    }}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold px-2 py-1 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>{isMyanmar ? 'မှတ်တမ်းအားလုံး ဖျက်မည်' : 'Clear All'}</span>
                  </button>
                )}
              </div>

              {filteredHistory.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-2">
                  <Clock className="h-8 w-8 text-slate-500 mx-auto" />
                  <p className="text-xs text-slate-400">
                    {isMyanmar ? 'ထုတ်ယူထားသော Prompt မှတ်တမ်း မရှိသေးပါ။' : 'No prompt history found.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredHistory.map((item) => {
                    const isFav = StorageService.isFavorite(item.masterPrompt);
                    return (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-all space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap text-[11px] text-slate-400">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40 uppercase">
                              {item.mode}
                            </span>
                            {item.aspectRatio && (
                              <span className="text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                                {item.aspectRatio}
                              </span>
                            )}
                            <span>{item.timestamp}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleToggleFavorite(item)}
                              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                isFav
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                                  : 'bg-slate-800/80 text-slate-400 hover:text-amber-300 border-slate-700'
                              }`}
                              title="Favorite"
                            >
                              <Star className={`h-3.5 w-3.5 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopy(item.id, item.masterPrompt)}
                              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
                              title="Copy Prompt"
                            >
                              {copiedId === item.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                            </button>
                            {onSelectPromptToUse && (
                              <button
                                type="button"
                                onClick={() => {
                                  onSelectPromptToUse(item.masterPrompt);
                                  onClose();
                                }}
                                className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-all cursor-pointer text-[11px] font-bold flex items-center gap-1"
                                title="Use Prompt"
                              >
                                <Wand2 className="h-3.5 w-3.5" />
                                <span>Use</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeleteHistory(item.id)}
                              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-700 transition-all cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {item.generatedImageUrl && (
                          <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
                            <img
                              src={item.generatedImageUrl}
                              alt="Generated Preview"
                              className="h-14 w-14 rounded object-cover border border-slate-700"
                            />
                            <span className="text-[10px] text-slate-400">Preview AI Generated Result</span>
                          </div>
                        )}

                        <p className="text-xs text-slate-200 font-mono bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 select-all">
                          {item.masterPrompt}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Favorites */}
          {activeTab === 'favorites' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={isMyanmar ? 'အကြိုက်ဆုံးများထဲမှ ရှာဖွေပါ...' : 'Search favorites...'}
                  className="w-full rounded-xl bg-slate-950/80 border border-slate-800 pl-9 pr-3 py-2 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
                />
              </div>

              {filteredFavorites.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-2">
                  <Star className="h-8 w-8 text-amber-500/50 mx-auto" />
                  <p className="text-xs text-slate-400">
                    {isMyanmar ? 'အကြိုက်ဆုံး သိမ်းဆည်းထားသော Prompt မရှိသေးပါ။' : 'No favorites saved yet.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredFavorites.map((fav) => (
                    <div
                      key={fav.id}
                      className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 hover:border-amber-500/60 transition-all space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span>{fav.title}</span>
                          </h4>
                          <button
                            type="button"
                            onClick={() => handleRemoveFavorite(fav.id)}
                            className="text-slate-400 hover:text-red-400 transition-colors p-1"
                            title="Remove Favorite"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {fav.previewImage && (
                          <img
                            src={fav.previewImage}
                            alt={fav.title}
                            className="w-full h-32 rounded-lg object-cover border border-slate-800"
                          />
                        )}

                        <p className="text-[11px] text-slate-200 font-mono bg-slate-900/90 p-2 rounded-lg border border-slate-800 line-clamp-3">
                          {fav.masterPrompt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                        <span>{fav.savedAt}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleCopy(fav.id, fav.masterPrompt)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer"
                            title="Copy"
                          >
                            {copiedId === fav.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          </button>
                          {onSelectPromptToUse && (
                            <button
                              type="button"
                              onClick={() => {
                                onSelectPromptToUse(fav.masterPrompt);
                                onClose();
                              }}
                              className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all text-xs cursor-pointer shadow-sm"
                            >
                              {isMyanmar ? 'အသုံးပြုမည်' : 'Use'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Stats */}
          {activeTab === 'stats' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{isMyanmar ? 'စုစုပေါင်း Prompts' : 'Total Prompts'}</span>
                  <p className="text-2xl font-extrabold text-cyan-400">{stats.totalPromptsGenerated}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{isMyanmar ? 'ဖန်တီးထားသော ပုံများ' : 'Images Created'}</span>
                  <p className="text-2xl font-extrabold text-blue-400">{stats.imagesGenerated}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{isMyanmar ? 'အကြိုက်ဆုံးများ' : 'Favorites'}</span>
                  <p className="text-2xl font-extrabold text-amber-400">{stats.favoritesCount}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{isMyanmar ? 'နောက်ဆုံးလှုပ်ရှားမှု' : 'Last Active'}</span>
                  <p className="text-sm font-bold text-slate-200 pt-1">{stats.lastActive}</p>
                </div>
              </div>

              {/* Mode Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {isMyanmar ? 'အသုံးအများဆုံး Modes အချိုးအစား:' : 'Popular Modes Breakdown:'}
                </h4>
                <div className="space-y-2.5">
                  {stats.popularModes.map((m) => {
                    const pct = Math.min(100, Math.round((m.count / (stats.totalPromptsGenerated || 1)) * 100));
                    return (
                      <div key={m.mode} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-slate-300">
                          <span className="capitalize">{m.mode}</span>
                          <span>{m.count} ({pct}%)</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                            style={{ width: `${Math.max(10, pct)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>AI Studio Myanmar • User Profile Hub</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all cursor-pointer"
          >
            {isMyanmar ? 'ပိတ်မည် (Close)' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
