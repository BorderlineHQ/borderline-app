'use client';

import React, { useState } from 'react';
import { Course } from '../types';
import { catColors, catEmoji } from '../data/coursesData';

interface CourseCardProps {
  course: Course;
  mode?: 'expandable' | 'preview';
  isExpanded?: boolean;
  onToggle?: () => void;
  expandedModuleId?: string | null;
  onToggleModule?: (moduleId: string) => void;
  onClickPreview?: () => void;
}

export default function CourseCard({
  course,
  mode = 'expandable',
  isExpanded = false,
  onToggle,
  expandedModuleId = null,
  onToggleModule,
  onClickPreview
}: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cc = catColors[course.category] || { bg: 'rgba(156,163,175,0.1)', text: '#9ca3af' };
  
  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const isExpandable = mode === 'expandable';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={isExpandable ? onToggle : onClickPreview}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: isExpanded 
          ? '1px solid var(--color-accent)' 
          : isHovered 
            ? '1px solid var(--color-accent-secondary)' 
            : '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isExpanded 
          ? 'var(--color-accent-glow)' 
          : isHovered 
            ? '0 10px 25px -5px rgba(52, 211, 153, 0.08), 0 8px 10px -6px rgba(52, 211, 153, 0.05)'
            : 'none',
        transform: isHovered && !isExpanded ? 'translateY(-4px)' : 'none',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* Course Header / Main card click area */}
      <div style={{ padding: '24px' }}>
        {/* Top Row: category and level badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.68rem', 
            fontWeight: 700, 
            padding: '4px 12px', 
            borderRadius: '20px',
            backgroundColor: cc.bg, 
            color: cc.text, 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>{catEmoji[course.category]}</span>
            {course.category}
          </span>
          
          <span style={{
            fontSize: '0.68rem', 
            fontWeight: 600, 
            padding: '3px 10px', 
            borderRadius: '20px',
            backgroundColor: 'var(--color-surface-elevated)', 
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}>
            {course.level}
          </span>
          
          <span style={{
            fontSize: '0.68rem', 
            fontWeight: 700, 
            padding: '3px 10px', 
            borderRadius: '20px',
            backgroundColor: 'rgba(245, 158, 11, 0.08)', 
            color: '#f59e0b',
            border: '1px solid rgba(245, 158, 11, 0.15)',
            textTransform: 'uppercase', 
            letterSpacing: '0.04em',
          }}>
            ⏳ Coming Soon
          </span>
        </div>

        {/* Title + Description */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: '1.25rem', 
              fontWeight: 800, 
              color: 'var(--color-text-primary)',
              lineHeight: 1.3, 
              marginBottom: '10px',
              transition: 'color var(--transition-fast)',
              color: isHovered || isExpanded ? 'var(--color-text-primary)' : 'var(--color-text-primary)'
            }}>
              {course.title}
            </h3>
            <p style={{
              fontSize: '0.88rem', 
              color: 'var(--color-text-secondary)', 
              lineHeight: 1.6, 
              margin: 0,
            }}>
              {course.description}
            </p>
          </div>
          
          {isExpandable && (
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: isExpanded ? 'var(--color-accent-subtle)' : 'var(--color-surface-elevated)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: isExpanded ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
              flexShrink: 0,
              marginTop: '2px',
              transition: 'all var(--transition-fast)'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', 
                  transition: 'transform 0.25s ease',
                  color: isExpanded ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          )}
        </div>

        {/* Meta Info Row */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '24px', 
          marginTop: '20px', 
          flexWrap: 'wrap',
          borderTop: '1px solid var(--color-border)',
          paddingTop: '16px'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-tertiary)' }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {course.duration}
          </span>
          
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-tertiary)' }}>
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            {course.modules.length} modules · {totalLessons} lessons
          </span>
          
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-tertiary)' }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {course.instructor}
          </span>
        </div>
      </div>

      {/* Expanded Content (Modules and Curriculum) */}
      {isExpandable && isExpanded && (
        <div style={{ borderTop: '1px solid var(--color-border)', animation: 'fadeIn 0.2s ease-out' }}>
          {/* Skills Acquired */}
          <div style={{
            padding: '16px 24px', 
            display: 'flex', 
            gap: '8px', 
            flexWrap: 'wrap', 
            alignItems: 'center',
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface-elevated)'
          }}>
            <span style={{ 
              fontSize: '0.72rem', 
              fontWeight: 700, 
              color: 'var(--color-text-tertiary)', 
              marginRight: '8px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em' 
            }}>
              Skills Acquired:
            </span>
            {course.skillsAcquired.map(skill => (
              <span key={skill} style={{
                fontSize: '0.72rem', 
                fontWeight: 600, 
                padding: '4px 12px', 
                borderRadius: '16px',
                backgroundColor: 'var(--color-accent-subtle)', 
                color: 'var(--color-accent)',
                border: '1px solid rgba(52, 211, 153, 0.15)'
              }}>
                {skill}
              </span>
            ))}
          </div>

          {/* Modules List */}
          <div style={{ padding: '24px' }}>
            <h4 style={{ 
              fontSize: '0.78rem', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.06em', 
              color: 'var(--color-text-primary)', 
              marginBottom: '16px' 
            }}>
              Program Curriculum
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {course.modules.map((mod, modIdx) => {
                const isModOpen = expandedModuleId === mod.id;
                
                return (
                  <div key={mod.id} style={{
                    backgroundColor: 'var(--color-surface-elevated)',
                    border: isModOpen ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)', 
                    overflow: 'hidden', 
                    transition: 'all var(--transition-fast)',
                  }}>
                    {/* Module Header (Toggle button) */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation(); // prevent collapsing the parent card
                        if (onToggleModule) onToggleModule(mod.id);
                      }}
                      style={{ 
                        padding: '16px 20px', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '16px' 
                      }}
                    >
                      {/* Module Number badge */}
                      <div style={{
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%', 
                        flexShrink: 0,
                        backgroundColor: isModOpen ? 'var(--color-accent)' : 'var(--color-surface)',
                        border: isModOpen ? 'none' : '1px solid var(--color-border)',
                        color: isModOpen ? '#000' : 'var(--color-text-secondary)',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '0.8rem', 
                        fontWeight: 800, 
                        transition: 'all var(--transition-fast)',
                      }}>
                        {modIdx + 1}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
                          {mod.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
                          ⏳ {mod.duration} · 📚 {mod.lessons.length} lessons
                        </div>
                      </div>
                      
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        style={{ 
                          transform: isModOpen ? 'rotate(180deg)' : 'rotate(0)', 
                          transition: 'transform 0.25s ease', 
                          color: 'var(--color-text-tertiary)', 
                          flexShrink: 0 
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>

                    {/* Module Lessons details */}
                    {isModOpen && (
                      <div style={{ 
                        borderTop: '1px solid var(--color-border)', 
                        padding: '16px 20px 20px',
                        backgroundColor: 'rgba(0, 0, 0, 0.05)'
                      }}>
                        <p style={{ 
                          fontSize: '0.82rem', 
                          color: 'var(--color-text-secondary)', 
                          lineHeight: 1.6, 
                          margin: '0 0 16px 0', 
                          padding: '0 4px',
                          borderLeft: '2px solid var(--color-accent)',
                          paddingLeft: '10px'
                        }}>
                          {mod.description}
                        </p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {mod.lessons.map((lesson, idx) => (
                            <div key={idx} style={{
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '12px', 
                              padding: '10px 8px',
                              borderRadius: 'var(--radius-sm)', 
                              transition: 'background-color 0.15s ease',
                            }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface)'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                              <div style={{
                                width: '20px', 
                                height: '20px', 
                                borderRadius: '50%', 
                                flexShrink: 0,
                                border: '2px solid var(--color-border)',
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                              }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
                              </div>
                              <span style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', flex: 1 }}>{lesson}</span>
                              <span style={{ 
                                fontSize: '0.68rem', 
                                fontWeight: 700, 
                                color: 'var(--color-text-tertiary)', 
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                flexShrink: 0 
                              }}>
                                Soon
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Preview Card Button (Rendered only on preview mode) */}
      {!isExpandable && isHovered && (
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: 'var(--color-accent)',
          animation: 'fadeInRight 0.2s ease-out'
        }}>
          Explore Curriculum
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      )}
    </div>
  );
}
