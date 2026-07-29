import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PlansConfig, PlanLimits } from '../types';
import { getPlansConfig, DEFAULT_PLANS_CONFIG } from '../services/plansConfigService';

interface PlansConfigContextType {
  plansConfig: PlansConfig;
  refreshPlansConfig: () => Promise<void>;
  loading: boolean;
  getCurrentLimits: (planType?: 'basic' | 'advanced') => PlanLimits;
}

const PlansConfigContext = createContext<PlansConfigContextType | undefined>(undefined);

export const PlansConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plansConfig, setPlansConfig] = useState<PlansConfig>(DEFAULT_PLANS_CONFIG);
  const [loading, setLoading] = useState(true);

  const refreshPlansConfig = async () => {
    try {
      setLoading(true);
      const config = await getPlansConfig();
      setPlansConfig(config);
    } catch (error) {
      console.error("Failed to load plans config", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPlansConfig();
  }, []);

  const getCurrentLimits = (planType?: 'basic' | 'advanced'): PlanLimits => {
    const type = planType || 'advanced';
    return plansConfig[type] || plansConfig.advanced;
  };

  return (
    <PlansConfigContext.Provider value={{ plansConfig, refreshPlansConfig, loading, getCurrentLimits }}>
      {children}
    </PlansConfigContext.Provider>
  );
};

export const usePlansConfig = () => {
  const context = useContext(PlansConfigContext);
  if (context === undefined) {
    throw new Error('usePlansConfig must be used within a PlansConfigProvider');
  }
  return context;
};
