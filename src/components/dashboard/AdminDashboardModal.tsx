import React, { useState, useEffect, useRef } from 'react';
import {
  UserProfile,
  ManagedTemplate,
  ManagedCategory,
  AdminAppSettings,
  Language,
  UserRole,
  AppMode
} from '../../types';
import { StorageService } from '../../utils/storageService';
import {
  Shield,
  Users,
  LayoutTemplate,
  Sliders,
  Settings,
  X,
  Plus,
  Trash2,
  Check,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  Save,
  Search,
  Lock,
  Layers,
  Globe,
  Upload,
  Image as ImageIcon,
  Edit3,
  Unlock,
  UserCheck,
  Coins,
  FileSpreadsheet,
  FolderTree
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  language: Language;
  onUserUpdate?: (user: UserProfile) => void;
}

const ADMIN_AVATAR_PRESETS = [
  { id: 'av_adm1', label: 'Admin Chief', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
  { id: 'av_adm2', label: 'Tech Lead', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
  { id: 'av_adm3', label: 'Cyber Admin', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80' },
  { id: 'av_adm4', label: 'Studio Manager', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
];

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  language,
  onUserUpdate
}) => {
  const isMyanmar = language === 'my';

  const [activeTab, setActiveTab] = useState<'users' | 'templates' | 'categories' | 'settings'>('users');
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [templatesList, setTemplatesList] = useState<ManagedTemplate[]>([]);
  const [categoriesList, setCategoriesList] = useState<ManagedCategory[]>([]);
  const [appSettings, setAppSettings] = useState<AdminAppSettings>(StorageService.getAppSettings());
  const [searchQuery, setSearchQuery] = useState('');
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  // User Management State (စာရင်းသွင်းခြင်း)
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [userCredits, setUserCredits] = useState<number>(150);
  const [userAvatar, setUserAvatar] = useState('');
  const [userBio, setUserBio] = useState('');
  const userAvatarInputRef = useRef<HTMLInputElement>(null);

  // Template Management State (စာရင်းသွင်းခြင်း)
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [editingTplId, setEditingTplId] = useState<string | null>(null);
  const [tplTitleMm, setTplTitleMm] = useState('');
  const [tplTitleEn, setTplTitleEn] = useState('');
  const [tplCategory, setTplCategory] = useState('Heritage & Wedding');
  const [tplEmoji, setTplEmoji] = useState('✨');
  const [tplMode, setTplMode] = useState<AppMode>('txt2img');

  // Category Management State (စာရင်းသွင်းခြင်း)
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [catNameMm, setCatNameMm] = useState('');
  const [catNameEn, setCatNameEn] = useState('');
  const [catEmoji, setCatEmoji] = useState('✨');
  const [catDesc, setCatDesc] = useState('');
  const [catItemCount, setCatItemCount] = useState<number>(10);

  useEffect(() => {
    if (isOpen) {
      setUsersList(StorageService.getAllUsers());
      setTemplatesList(StorageService.getAdminTemplates());
      setCategoriesList(StorageService.getAdminCategories());
      setAppSettings(StorageService.getAppSettings());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle unlocking admin for non-admin users
  const handleUnlockAdmin = () => {
    const updatedUser: UserProfile = { ...currentUser, role: 'admin' };
    StorageService.setCurrentUser(updatedUser);
    if (onUserUpdate) onUserUpdate(updatedUser);
    setUsersList(StorageService.getAllUsers());
  };

  // Upload user avatar from file
  const handleUserAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setUserAvatar(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save or Update User Record
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) return;

    if (editingUserId) {
      const existingUser = usersList.find(u => u.id === editingUserId);
      if (existingUser) {
        const updated: UserProfile = {
          ...existingUser,
          name: userName.trim(),
          email: userEmail.trim(),
          role: userRole,
          credits: userCredits,
          avatar: userAvatar.trim() || existingUser.avatar,
          bio: userBio.trim()
        };
        const all = StorageService.saveUser(updated);
        setUsersList(all);
        if (currentUser.id === editingUserId && onUserUpdate) {
          onUserUpdate(updated);
        }
      }
    } else {
      StorageService.addNewUser(
        userName.trim(),
        userEmail.trim(),
        userRole,
        userAvatar.trim() || undefined,
        userCredits,
        userBio.trim()
      );
      setUsersList(StorageService.getAllUsers());
    }

    // Reset Form
    setUserName('');
    setUserEmail('');
    setUserRole('user');
    setUserCredits(150);
    setUserAvatar('');
    setUserBio('');
    setEditingUserId(null);
    setShowAddUser(false);
  };

  const handleEditUserClick = (u: UserProfile) => {
    setEditingUserId(u.id);
    setUserName(u.name);
    setUserEmail(u.email);
    setUserRole(u.role);
    setUserCredits(u.credits || 100);
    setUserAvatar(u.avatar || '');
    setUserBio(u.bio || '');
    setShowAddUser(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (userId === currentUser.id) {
      alert(isMyanmar ? 'မိမိကိုယ်တိုင် User Account ကို ဖျက်၍ မရပါ။' : 'Cannot delete currently active user!');
      return;
    }
    if (confirm(isMyanmar ? 'ဤ User ကို ဖျက်ရန် သေချာပါသလား?' : 'Delete this user account?')) {
      const updated = StorageService.deleteUser(userId);
      setUsersList(updated);
    }
  };

  const handleRoleChange = (userId: string, role: UserRole) => {
    const updated = StorageService.updateUserRole(userId, role);
    setUsersList(updated);
    if (currentUser.id === userId && onUserUpdate) {
      onUserUpdate({ ...currentUser, role });
    }
  };

  // Save or Update Template Record
  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tplTitleMm.trim()) return;

    const tplData: ManagedTemplate = {
      id: editingTplId || `tpl_custom_${Date.now()}`,
      titleMm: tplTitleMm.trim(),
      titleEn: tplTitleEn.trim() || tplTitleMm.trim(),
      mode: tplMode,
      emoji: tplEmoji || '✨',
      category: tplCategory,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = StorageService.saveAdminTemplate(tplData);
    setTemplatesList(updated);

    // Reset Form
    setTplTitleMm('');
    setTplTitleEn('');
    setTplEmoji('✨');
    setTplCategory('Heritage & Wedding');
    setEditingTplId(null);
    setShowAddTemplate(false);
  };

  const handleEditTemplateClick = (tpl: ManagedTemplate) => {
    setEditingTplId(tpl.id);
    setTplTitleMm(tpl.titleMm);
    setTplTitleEn(tpl.titleEn);
    setTplEmoji(tpl.emoji);
    setTplCategory(tpl.category);
    setTplMode(tpl.mode);
    setShowAddTemplate(true);
  };

  const handleToggleTemplate = (id: string) => {
    const updated = StorageService.toggleTemplateStatus(id);
    setTemplatesList(updated);
  };

  const handleDeleteTemplate = (id: string) => {
    if (confirm(isMyanmar ? 'ဤ Template ကို ဖျက်ရန် သေချာပါသလား?' : 'Delete this template?')) {
      const updated = StorageService.deleteTemplate(id);
      setTemplatesList(updated);
    }
  };

  // Save or Update Category Record
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catNameMm.trim()) return;

    const catData: ManagedCategory = {
      id: editingCatId || `cat_${Date.now()}`,
      nameMm: catNameMm.trim(),
      nameEn: catNameEn.trim() || catNameMm.trim(),
      emoji: catEmoji || '✨',
      description: catDesc.trim(),
      itemCount: catItemCount || 5,
      isActive: true
    };

    const updated = StorageService.saveCategory(catData);
    setCategoriesList(updated);

    // Reset Form
    setCatNameMm('');
    setCatNameEn('');
    setCatEmoji('✨');
    setCatDesc('');
    setCatItemCount(10);
    setEditingCatId(null);
    setShowAddCategory(false);
  };

  const handleEditCategoryClick = (cat: ManagedCategory) => {
    setEditingCatId(cat.id);
    setCatNameMm(cat.nameMm);
    setCatNameEn(cat.nameEn);
    setCatEmoji(cat.emoji);
    setCatDesc(cat.description);
    setCatItemCount(cat.itemCount);
    setShowAddCategory(true);
  };

  const handleToggleCategory = (id: string) => {
    const updated = StorageService.toggleCategoryStatus(id);
    setCategoriesList(updated);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm(isMyanmar ? 'ဤ Category ကို ဖျက်ရန် သေချာပါသလား?' : 'Delete this category?')) {
      const updated = StorageService.deleteCategory(id);
      setCategoriesList(updated);
    }
  };

  // Save App Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveAppSettings(appSettings);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 2500);
  };

  // Access Control Screen if currentUser is not yet admin
  if (currentUser.role !== 'admin') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
        <div className="w-full max-w-md bg-slate-900 border border-amber-500/50 rounded-2xl p-6 text-center space-y-4 shadow-2xl text-slate-100">
          <div className="h-16 w-16 rounded-2xl bg-amber-950/80 border border-amber-500/60 flex items-center justify-center mx-auto text-amber-400 shadow-lg">
            <Lock className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-amber-400">
              {isMyanmar ? 'Administrator အခွင့်အရေး လိုအပ်ပါသည်' : 'Admin Authorization Required'}
            </h3>
            <p className="text-xs text-slate-300">
              {isMyanmar
                ? 'Admin Dashboard စီမံခန့်ခွဲမှုများကို အသုံးပြုရန် Admin Role အဖြစ် ချက်ချင်း Unlock ပြုလုပ်နိုင်ပါသည်။'
                : 'Unlock Administrator privileges to access full system control and record management.'}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
            <button
              type="button"
              onClick={handleUnlockAdmin}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Unlock className="h-4 w-4" />
              <span>{isMyanmar ? '👑 Admin အဖြစ် ချက်ချင်းဝင်ရောက်မည်' : 'Unlock Admin Role'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              {isMyanmar ? 'ပိတ်မည် (Close)' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-slate-900 border border-amber-500/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 shadow-md">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2">
                <span>{isMyanmar ? '👑 Admin Dashboard (စီမံခန့်ခွဲသူ ဒက်ရှ်ဘုတ်)' : '👑 Admin Control Dashboard'}</span>
                <span className="text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full uppercase">
                  v2.5.0
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isMyanmar
                  ? 'အသုံးပြုသူများ၊ Prompt Templates နှင့် Categories စာရင်းများ စီမံခန့်ခွဲမှု'
                  : 'Manage users, prompt templates, categories, and system broadcast settings'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 pt-2 border-b border-slate-800 bg-slate-950/50 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'users'
                ? 'border-amber-400 text-amber-300 bg-slate-800/40 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>{isMyanmar ? `👥 Users စာရင်း (${usersList.length})` : `👥 Users (${usersList.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'templates'
                ? 'border-amber-400 text-amber-300 bg-slate-800/40 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutTemplate className="h-4 w-4" />
            <span>{isMyanmar ? `🎨 Prompt Templates (${templatesList.length})` : `🎨 Templates (${templatesList.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'categories'
                ? 'border-amber-400 text-amber-300 bg-slate-800/40 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderTree className="h-4 w-4" />
            <span>{isMyanmar ? `📁 Categories စာရင်း (${categoriesList.length})` : `📁 Categories (${categoriesList.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'settings'
                ? 'border-amber-400 text-amber-300 bg-slate-800/40 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>{isMyanmar ? '⚙️ System Settings' : '⚙️ Settings'}</span>
          </button>
        </div>

        {/* Tab Contents Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 max-h-[calc(92vh-140px)] space-y-5">

          {/* TAB 1: User Management (Users စာရင်း ရေးသွင်းခြင်း / စီမံခြင်း) */}
          {activeTab === 'users' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Top Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="relative flex-1 w-full min-w-[220px]">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isMyanmar ? 'User အမည် သို့မဟုတ် Email ဖြင့် ရှာဖွေပါ...' : 'Search users...'}
                    className="w-full rounded-xl bg-slate-950/80 border border-slate-800 pl-9 pr-3 py-2 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingUserId(null);
                    setUserName('');
                    setUserEmail('');
                    setUserRole('user');
                    setUserCredits(150);
                    setUserAvatar('');
                    setUserBio('');
                    setShowAddUser(!showAddUser);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>{showAddUser ? (isMyanmar ? 'ဖောင်ပိတ်မည်' : 'Close Form') : (isMyanmar ? '+ User အသစ် စာရင်းသွင်းမည်' : '+ Add New User')}</span>
                </button>
              </div>

              {/* Add / Edit User Form Drawer */}
              {showAddUser && (
                <form onSubmit={handleSaveUser} className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/50 shadow-xl space-y-4 animate-in slide-in-from-top-3 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{editingUserId ? (isMyanmar ? 'User အချက်အလက် ပြင်ဆင်ရန်' : 'Edit User') : (isMyanmar ? 'User အသစ် စာရင်းသွင်းရန်' : 'Register New User')}</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowAddUser(false)}
                      className="text-slate-400 hover:text-slate-200 text-xs"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'အမည် (Name):' : 'Full Name:'}
                      </label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="e.g. Aung Kyaw"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'အခွင့်အရေး (Role):' : 'Role:'}
                      </label>
                      <select
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value as UserRole)}
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                      >
                        <option value="user">👤 Standard User</option>
                        <option value="admin">👑 Administrator</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'အီးမေးလ် (Email Address):' : 'Email Address:'}
                      </label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="user@example.com"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'ပေးအပ်မည့် Credits:' : 'Initial Credits:'}
                      </label>
                      <input
                        type="number"
                        value={userCredits}
                        onChange={(e) => setUserCredits(parseInt(e.target.value) || 0)}
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Profile Picture Upload & Presets for User */}
                  <div className="space-y-2 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                      <span>{isMyanmar ? 'Profile ဓာတ်ပုံ တင်ရန် / ရွေးချယ်ရန်:' : 'Profile Picture (Upload / URL / Presets):'}</span>
                    </label>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="relative">
                        <img
                          src={userAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'}
                          alt="Avatar Preview"
                          className="h-14 w-14 rounded-xl object-cover border border-amber-400/60"
                        />
                      </div>
                      <div className="flex-1 min-w-[200px] flex items-center gap-2">
                        <input
                          type="text"
                          value={userAvatar}
                          onChange={(e) => setUserAvatar(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 rounded-xl bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => userAvatarInputRef.current?.click()}
                          className="p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all cursor-pointer text-xs flex items-center gap-1 font-bold"
                          title="Upload Image"
                        >
                          <Upload className="h-3.5 w-3.5" />
                          <span>Upload</span>
                        </button>
                        <input
                          type="file"
                          ref={userAvatarInputRef}
                          onChange={handleUserAvatarUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] text-slate-400">Presets:</span>
                      {ADMIN_AVATAR_PRESETS.map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setUserAvatar(p.url)}
                          className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded border border-slate-700 cursor-pointer"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      {isMyanmar ? 'မှတ်စု / ကိုယ်ရေးအကျဉ်း (Bio):' : 'Bio / Notes:'}
                    </label>
                    <input
                      type="text"
                      value={userBio}
                      onChange={(e) => setUserBio(e.target.value)}
                      placeholder={isMyanmar ? 'အသုံးပြုသူဆိုင်ရာ မှတ်ချက်' : 'User description or notes'}
                      className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddUser(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                    >
                      {isMyanmar ? 'မလုပ်တော့ပါ' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Check className="h-4 w-4" />
                      <span>{editingUserId ? (isMyanmar ? 'အချက်အလက် သိမ်းမည်' : 'Save Changes') : (isMyanmar ? 'User စာရင်းသွင်းမည်' : 'Register User')}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Users Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 shadow-md">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3.5">{isMyanmar ? 'အသုံးပြုသူ (User Profile)' : 'User Profile'}</th>
                      <th className="px-4 py-3.5">{isMyanmar ? 'အီးမေးလ် (Email)' : 'Email'}</th>
                      <th className="px-4 py-3.5">{isMyanmar ? 'Role' : 'Role'}</th>
                      <th className="px-4 py-3.5">{isMyanmar ? 'Credits' : 'Credits'}</th>
                      <th className="px-4 py-3.5 text-right">{isMyanmar ? 'လုပ်ဆောင်ချက်' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {usersList
                      .filter(u =>
                        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((user) => (
                        <tr key={user.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="px-4 py-3 font-semibold text-slate-100 flex items-center gap-3">
                            <img
                              src={user.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                              alt={user.name}
                              className="h-9 w-9 rounded-xl object-cover border border-slate-700 shadow-sm"
                            />
                            <div>
                              <div className="font-bold text-slate-100">{user.name}</div>
                              {user.bio && <div className="text-[10px] text-slate-400 font-normal truncate max-w-[160px]">{user.bio}</div>}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-300 font-mono text-[11px]">{user.email}</td>
                          <td className="px-4 py-3">
                            <select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                              className={`rounded-lg px-2 py-1 text-xs font-bold border transition-all cursor-pointer ${
                                user.role === 'admin'
                                  ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                                  : 'bg-blue-950 text-blue-300 border-blue-500/50'
                              }`}
                            >
                              <option value="user">👤 User</option>
                              <option value="admin">👑 Admin</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 font-bold text-amber-400">
                            {user.credits || 100}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleEditUserClick(user)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-all cursor-pointer"
                                title="Edit User"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
                                title="Delete User"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 2: Prompt Templates Management (Template စာရင်း အသစ် ရေးသွင်းခြင်း) */}
          {activeTab === 'templates' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="relative flex-1 w-full min-w-[220px]">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isMyanmar ? 'Template အမည်ဖြင့် ရှာဖွေပါ...' : 'Search templates...'}
                    className="w-full rounded-xl bg-slate-950/80 border border-slate-800 pl-9 pr-3 py-2 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingTplId(null);
                    setTplTitleMm('');
                    setTplTitleEn('');
                    setTplEmoji('✨');
                    setTplCategory('Heritage & Wedding');
                    setShowAddTemplate(!showAddTemplate);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>{showAddTemplate ? (isMyanmar ? 'ဖောင်ပိတ်မည်' : 'Close Form') : (isMyanmar ? '+ Template အသစ် စာရင်းသွင်းမည်' : '+ Add New Template')}</span>
                </button>
              </div>

              {/* Add / Edit Template Form Drawer */}
              {showAddTemplate && (
                <form onSubmit={handleSaveTemplate} className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/50 shadow-xl space-y-4 animate-in slide-in-from-top-3 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                      <LayoutTemplate className="h-4 w-4" />
                      <span>{editingTplId ? (isMyanmar ? 'Template ပြင်ဆင်ရန်' : 'Edit Template') : (isMyanmar ? 'Template အသစ် စာရင်းသွင်းရန်' : 'Create New Template')}</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowAddTemplate(false)}
                      className="text-slate-400 hover:text-slate-200 text-xs"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'အီမိုဂျီ (Emoji):' : 'Emoji Icon:'}
                      </label>
                      <input
                        type="text"
                        value={tplEmoji}
                        onChange={(e) => setTplEmoji(e.target.value)}
                        placeholder="✨"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'ခေါင်းစဉ် (မြန်မာ):' : 'Title (Myanmar):'}
                      </label>
                      <input
                        type="text"
                        value={tplTitleMm}
                        onChange={(e) => setTplTitleMm(e.target.value)}
                        placeholder="ဥပမာ- ရိုးရာမင်္ဂလာဝတ်စုံ"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'ခေါင်းစဉ် (English):' : 'Title (English):'}
                      </label>
                      <input
                        type="text"
                        value={tplTitleEn}
                        onChange={(e) => setTplTitleEn(e.target.value)}
                        placeholder="e.g. Royal Wedding Heritage"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'ကဏ္ဍခွဲ (Category):' : 'Category:'}
                      </label>
                      <select
                        value={tplCategory}
                        onChange={(e) => setTplCategory(e.target.value)}
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                      >
                        <option value="Heritage & Wedding">Heritage & Wedding</option>
                        <option value="Fashion / Swap">Fashion / Clothes Swap</option>
                        <option value="Cyberpunk & Sci-Fi">Cyberpunk & Sci-Fi</option>
                        <option value="Royal & Historical">Royal & Historical</option>
                        <option value="Nature & Travel">Nature & Travel</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      {isMyanmar ? 'အမျိုးအစား (App Mode):' : 'App Mode Target:'}
                    </label>
                    <select
                      value={tplMode}
                      onChange={(e) => setTplMode(e.target.value as AppMode)}
                      className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                    >
                      <option value="txt2img">Txt2Img (စာသားမှ ပုံဖန်တီးမှု)</option>
                      <option value="img2img">Img2Img (ရည်ညွှန်းပုံမှ ဖန်တီးမှု)</option>
                      <option value="clothes-swap">Clothes Swap (မဂ္ဂဇင်း ဝတ်စုံလဲ)</option>
                      <option value="background-only">Background Only (နောက်ခံထုတ်)</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddTemplate(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                    >
                      {isMyanmar ? 'မလုပ်တော့ပါ' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Check className="h-4 w-4" />
                      <span>{editingTplId ? (isMyanmar ? 'အချက်အလက် သိမ်းမည်' : 'Save Changes') : (isMyanmar ? 'Template စာရင်းသွင်းမည်' : 'Create Template')}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Templates Grid List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {templatesList
                  .filter(t =>
                    t.titleMm.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.category.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((tpl) => (
                    <div
                      key={tpl.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 shadow-sm ${
                        tpl.isActive
                          ? 'bg-slate-950/80 border-slate-800 hover:border-amber-500/50'
                          : 'bg-slate-950/40 border-slate-900 opacity-60'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{tpl.emoji}</span>
                            <div>
                              <h4 className="text-xs font-bold text-slate-100">{tpl.titleMm}</h4>
                              <p className="text-[10px] text-slate-400 font-mono">{tpl.titleEn}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleToggleTemplate(tpl.id)}
                              className="text-slate-400 hover:text-amber-300 p-1 transition-colors cursor-pointer"
                              title="Toggle Status"
                            >
                              {tpl.isActive ? <ToggleRight className="h-5 w-5 text-emerald-400" /> : <ToggleLeft className="h-5 w-5 text-slate-600" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEditTemplateClick(tpl)}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-all cursor-pointer"
                              title="Edit"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTemplate(tpl.id)}
                              className="p-1 rounded bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                          <span className="bg-slate-900 px-2 py-0.5 rounded text-amber-400 font-semibold border border-slate-800">
                            {tpl.category}
                          </span>
                          <span className="bg-slate-900 px-2 py-0.5 rounded text-cyan-400 font-semibold border border-slate-800 uppercase">
                            {tpl.mode}
                          </span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <span>ID: {tpl.id}</span>
                        <span>{tpl.isActive ? '🟢 Active' : '⚪ Inactive'}</span>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* TAB 3: Category Management (Category စာရင်း ရေးသွင်းခြင်း) */}
          {activeTab === 'categories' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="relative flex-1 w-full min-w-[220px]">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isMyanmar ? 'Category အမည်ဖြင့် ရှာဖွေပါ...' : 'Search categories...'}
                    className="w-full rounded-xl bg-slate-950/80 border border-slate-800 pl-9 pr-3 py-2 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingCatId(null);
                    setCatNameMm('');
                    setCatNameEn('');
                    setCatEmoji('✨');
                    setCatDesc('');
                    setCatItemCount(10);
                    setShowAddCategory(!showAddCategory);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>{showAddCategory ? (isMyanmar ? 'ဖောင်ပိတ်မည်' : 'Close Form') : (isMyanmar ? '+ Category အသစ် စာရင်းသွင်းမည်' : '+ Add New Category')}</span>
                </button>
              </div>

              {/* Add / Edit Category Form Drawer */}
              {showAddCategory && (
                <form onSubmit={handleSaveCategory} className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/50 shadow-xl space-y-4 animate-in slide-in-from-top-3 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                      <FolderTree className="h-4 w-4" />
                      <span>{editingCatId ? (isMyanmar ? 'Category ပြင်ဆင်ရန်' : 'Edit Category') : (isMyanmar ? 'Category အသစ် စာရင်းသွင်းရန်' : 'Register New Category')}</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowAddCategory(false)}
                      className="text-slate-400 hover:text-slate-200 text-xs"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'အီမိုဂျီ (Emoji):' : 'Emoji Icon:'}
                      </label>
                      <input
                        type="text"
                        value={catEmoji}
                        onChange={(e) => setCatEmoji(e.target.value)}
                        placeholder="✨"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'ကဏ္ဍအမည် (မြန်မာ):' : 'Name (Myanmar):'}
                      </label>
                      <input
                        type="text"
                        value={catNameMm}
                        onChange={(e) => setCatNameMm(e.target.value)}
                        placeholder="ဥပမာ- ရိုးရာပွဲတော်နှင့် မင်္ဂလာဆောင်"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'ကဏ္ဍအမည် (English):' : 'Name (English):'}
                      </label>
                      <input
                        type="text"
                        value={catNameEn}
                        onChange={(e) => setCatNameEn(e.target.value)}
                        placeholder="e.g. Heritage & Wedding"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isMyanmar ? 'Items အရေအတွက်:' : 'Item Count:'}
                      </label>
                      <input
                        type="number"
                        value={catItemCount}
                        onChange={(e) => setCatItemCount(parseInt(e.target.value) || 0)}
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      {isMyanmar ? 'ရှင်းလင်းချက် (Description):' : 'Description:'}
                    </label>
                    <input
                      type="text"
                      value={catDesc}
                      onChange={(e) => setCatDesc(e.target.value)}
                      placeholder={isMyanmar ? 'ကဏ္ဍဆိုင်ရာ အကျဉ်းချုပ် ရှင်းလင်းချက်' : 'Brief category description'}
                      className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddCategory(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                    >
                      {isMyanmar ? 'မလုပ်တော့ပါ' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Check className="h-4 w-4" />
                      <span>{editingCatId ? (isMyanmar ? 'အချက်အလက် သိမ်းမည်' : 'Save Changes') : (isMyanmar ? 'Category စာရင်းသွင်းမည်' : 'Create Category')}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Categories Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {categoriesList
                  .filter(c =>
                    c.nameMm.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((cat) => (
                    <div
                      key={cat.id}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-3 shadow-sm"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{cat.emoji}</span>
                            <div>
                              <h4 className="text-xs font-bold text-slate-100">{cat.nameMm}</h4>
                              <p className="text-[10px] text-slate-400 font-mono">{cat.nameEn}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleToggleCategory(cat.id)}
                              className="text-slate-400 hover:text-amber-300 p-1 transition-colors cursor-pointer"
                              title="Toggle Status"
                            >
                              {cat.isActive ? <ToggleRight className="h-5 w-5 text-emerald-400" /> : <ToggleLeft className="h-5 w-5 text-slate-600" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEditCategoryClick(cat)}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-all cursor-pointer"
                              title="Edit"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCategory(cat.id)}
                              className="p-1 rounded bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {cat.description && (
                          <p className="text-[11px] text-slate-300 pt-1">
                            {cat.description}
                          </p>
                        )}
                      </div>

                      <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <span>Items: <strong className="text-amber-400">{cat.itemCount}</strong></span>
                        <span>{cat.isActive ? '🟢 Active' : '⚪ Inactive'}</span>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* TAB 4: System Broadcasts & Settings */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-5 animate-in fade-in duration-150 max-w-2xl">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>{isMyanmar ? 'စနစ် ကြေညာချက်နှင့် အသိပေးချက် စာရင်းများ' : 'System Notice & Broadcast Configuration'}</span>
                </h4>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {isMyanmar ? 'စနစ် ကြေညာချက် (မြန်မာလို):' : 'System Notice (Myanmar):'}
                  </label>
                  <textarea
                    value={appSettings.systemNoticeMm}
                    onChange={(e) => setAppSettings({ ...appSettings, systemNoticeMm: e.target.value })}
                    rows={2}
                    className="w-full rounded-xl bg-slate-900 border border-slate-700 p-2.5 text-xs text-slate-100 focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {isMyanmar ? 'စနစ် ကြေညာချက် (English):' : 'System Notice (English):'}
                  </label>
                  <textarea
                    value={appSettings.systemNoticeEn}
                    onChange={(e) => setAppSettings({ ...appSettings, systemNoticeEn: e.target.value })}
                    rows={2}
                    className="w-full rounded-xl bg-slate-900 border border-slate-700 p-2.5 text-xs text-slate-100 focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      {isMyanmar ? 'မူလ AI Engine သတ်မှတ်ချက်:' : 'Default AI Model Engine:'}
                    </label>
                    <select
                      value={appSettings.defaultEngine}
                      onChange={(e) => setAppSettings({ ...appSettings, defaultEngine: e.target.value })}
                      className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                    >
                      <option value="gemini-3.7-flash">Google Gemini 3.7 Flash (Default)</option>
                      <option value="imagen-3.0">Google Imagen 3.0 Real-time</option>
                      <option value="flux-schnell">Flux Schnell HD</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      {isMyanmar ? 'တစ်ရက် အခမဲ့ Prompt Limit:' : 'Max Daily Free Prompts:'}
                    </label>
                    <input
                      type="number"
                      value={appSettings.maxDailyPrompts}
                      onChange={(e) => setAppSettings({ ...appSettings, maxDailyPrompts: parseInt(e.target.value) || 100 })}
                      className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 text-xs text-slate-300 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appSettings.isMaintenanceMode}
                      onChange={(e) => setAppSettings({ ...appSettings, isMaintenanceMode: e.target.checked })}
                      className="h-4 w-4 rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-400"
                    />
                    <span>{isMyanmar ? 'ပြုပြင်ထိန်းသိမ်းမှု Mode ဖွင့်ထားမည် (Maintenance Mode)' : 'Enable Maintenance Mode'}</span>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  {isSavedSuccess && (
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" />
                      <span>{isMyanmar ? 'သိမ်းဆည်းပြီးပါပြီ!' : 'Settings Saved!'}</span>
                    </span>
                  )}
                  <button
                    type="submit"
                    className="ml-auto flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isMyanmar ? 'Settings အပြောင်းအလဲ သိမ်းမည်' : 'Save System Settings'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>AI Studio Myanmar • Administrator Command Center</span>
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
