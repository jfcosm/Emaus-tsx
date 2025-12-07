import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ParishSettings } from '../types';
import { getSettings } from '../services/settingsService';

// Version 1.9.19 - Force Sync
interface SettingsContextType {
  settings: ParishSettings;
  refreshSettings: () => Promise<void>;
  loading: boolean;
}

const defaultSettings: ParishSettings = {
  parishName: 'Emaús Gestión',
  parishAddress: '',
  parishPhone: '',
  parishEmail: '',
  diocese: '',
  priestName: '',
  secretaryName: '',
  city: '',
  planType: 'advanced',
  avatarIcon: 'church',
  avatarColor: 'bg-emaus-600',
  profileImage: '', // Ensure this field exists by default
  coverImage: '' // Ensure this field exists by default
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ParishSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const refreshSettings = async () => {
    try {
      const data = await getSettings();
      // Ensure we have at least default values if fields are missing
      setSettings({ ...defaultSettings, ...data });
    } catch (error) {
      console.error("Failed to load settings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, refreshSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};