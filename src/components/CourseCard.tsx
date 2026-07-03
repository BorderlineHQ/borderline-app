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

  // Extract instructor name (before comma)
  const instructorName = course.instructor.split(',')[0].trim();
  const instructorRole = course.instructor.includes(',') ? course.instructor.split(',').slice(1).join(',').trim() : '';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={isExpandable ? onToggle : onClickPreview}
      className="course-card-clean"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: isExpanded 
          ? '1px solid var(--color-accent)' 
          : '1px solid var(--color-border)',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isHovered 
          ? '0 12px 32px -8px rgba(0,0,0,0.12)' 
          : '0 1px 3px rgba(0,0,0,0.04)',
        transform: isHovered && !isExpanded ? 'translateY(-4px)' : 'none',
        cursor: 'pointer',
        position: 'relative',
        ...(isExpanded ? { gridColumn: '1 / -1' } : {}),
      }}
    >
      {/* Thumbnail Image */}
      <div style={{
        width: '100%',
        height: isExpanded ? '220px' : '180px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'var(--color-surface-elevated)',
      }}>
        <img
          src={course.thumbnail}
          alt={course.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        {/* Category badge floating on image */}
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontSize: '0.68rem', 
          fontWeight: 700, 
          padding: '4px 10px', 
          borderRadius: '6px',
          backgroundColor: 'rgba(0,0,0,0.65)', 
          color: '#fff', 
          textTransform: 'uppercase', 
          letterSpacing: '0.04em',
          backdropFilter: 'blur(8px)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <span>{catEmoji[course.category]}</span>
          {course.category}
        </span>
      </div>

      {/* Card Body */}
      <div style={{ padding: '16px 20px 20px' }}>
        {/* Title */}
        <h3 style={{
          fontSize: '0.95rem', 
          fontWeight: 700, 
          lineHeight: 1.4, 
          color: 'var(--color-text-primary)',
          marginBottom: '10px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden',
        }}>
          {course.title}
        </h3>

        {/* Metadata row: Duration, Modules, Lessons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '0.75rem',
          color: 'var(--color-text-tertiary)',
          marginBottom: '14px',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {course.duration}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            {course.modules.length} Modules
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 10 3 12 0v-5"/></svg>
            {totalLessons} Lessons
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: '12px' }} />

        {/* Instructor Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Instructor avatar placeholder */}
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${cc.bg}, ${cc.text}40)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: cc.text,
            flexShrink: 0,
          }}>
            {instructorName.split(' ').map(n => n[0]).join('')}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {instructorName}
            </div>
            {instructorRole && (
              <div style={{ fontSize: '0.68rem', color: 'var(--color-text-tertiary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {instructorRole}
              </div>
            )}
          </div>
          {/* Level badge */}
          <span style={{
            marginLeft: 'auto',
            fontSize: '0.65rem', 
            fontWeight: 600, 
            padding: '2px 8px', 
            borderRadius: '4px',
            backgroundColor: cc.bg, 
            color: cc.text,
            flexShrink: 0,
          }}>
            {course.level}
          </span>
        </div>
      </div>

      {/* Expanded Curriculum Section */}
      {isExpanded && isExpandable && (
        <div style={{
          borderTop: '1px solid var(--color-border)',
          padding: '20px',
          backgroundColor: 'var(--color-surface-elevated)',
        }}>
          {/* Description */}
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
            {course.description}
          </p>

          {/* Skills Acquired */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {course.skillsAcquired.map((skill, idx) => (
              <span key={idx} style={{
                fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: '20px',
                backgroundColor: 'var(--color-accent-subtle)',
                color: 'var(--color-accent)',
                border: '1px solid rgba(52,211,153,0.15)',
              }}>
                {skill}
              </span>
            ))}
          </div>

          {/* Module list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {course.modules.map((mod, idx) => {
              const isModuleOpen = expandedModuleId === mod.id;
              return (
                <div key={mod.id} 
                  onClick={(e) => { e.stopPropagation(); onToggleModule?.(mod.id); }}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: isModuleOpen ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '14px 16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        width: '24px', height: '24px', borderRadius: '6px',
                        backgroundColor: cc.bg, color: cc.text,
                        fontSize: '0.72rem', fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {idx + 1}
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {mod.title}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)' }}>
                        {mod.duration}
                      </span>
                      <svg 
                        className={`accordion-chevron ${isModuleOpen ? 'open' : ''}`}
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {isModuleOpen && (
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
                        {mod.description}
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {mod.lessons.map((lesson, li) => (
                          <li 
                            key={li} 
                            className="lesson-item"
                            style={{ 
                              display: 'flex', 
                              alignItems: 'flex-start', 
                              gap: '10px',
                              fontSize: '0.8rem', 
                              color: 'var(--color-text-secondary)',
                              padding: '4px 0',
                              transition: 'color var(--transition-fast)',
                            }}
                          >
                            <span className="lesson-step-bullet"></span>
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
