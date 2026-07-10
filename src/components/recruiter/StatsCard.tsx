'use client';

import React from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  color?: 'accent' | 'secondary' | 'default';
}

export default function StatsCard({ title, value, icon, trend, color = 'default' }: StatsCardProps) {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-card-icon">
        {icon}
      </div>
      <div className="stats-card-content">
        <h3 className="stats-card-value">{value}</h3>
        <p className="stats-card-title">{title}</p>
        {trend && (
          <div className={`stats-card-trend ${trend.positive ? 'positive' : 'negative'}`}>
            {trend.positive ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
                <polyline points="17 18 23 18 23 12"/>
              </svg>
            )}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  );
}
