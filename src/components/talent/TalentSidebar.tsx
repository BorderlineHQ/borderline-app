'use client';

import React from 'react';

type TabType = 'opportunities' | 'portfolio' | 'verify' | 'contracts' | 'resources' | 'notifications' | 'settings';

interface TalentSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  matchedGigsCount: number;
  hasNotifications: boolean;
}

export default function TalentSidebar({ 
  activeTab, 
  onTabChange, 
  matchedGigsCount,
  hasNotifications 
}: TalentSidebarProps) {
  const tabs = [
    { id: 'opportunities' as TabType, label: 'Opportunities', icon: 'briefcase' },
    { id: 'portfolio' as TabType, label: 'My Portfolio', icon: 'folder' },
    { id: 'verify' as TabType, label: 'Verify Peers', icon: 'shield' },
    { id: 'contracts' as TabType, label: 'Contracts & Payouts', icon: 'contracts' },
    { id: 'resources' as TabType, label: 'Resources', icon: 'book' },
    { id: 'notifications' as TabType, label: 'Notifications', icon: 'bell' },
    { id: 'settings' as TabType, label: 'Settings', icon: 'settings' },
  ];

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'briefcase':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
      case 'folder':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>;
      case 'shield':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
      case 'contracts':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;
      case 'book':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
      case 'bell':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
      case 'settings':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
      default:
        return null;
    }
  };

  return (
    <aside className="talent-sidebar">
      <nav className="talent-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`talent-nav-item ${activeTab === tab.id ? 'active' : ''}`}
          >
            {getIcon(tab.icon)}
            <span>{tab.label}</span>
            {tab.id === 'opportunities' && matchedGigsCount > 0 && (
              <span className="nav-badge">{matchedGigsCount}</span>
            )}
            {tab.id === 'notifications' && hasNotifications && (
              <span className="nav-indicator" />
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}
