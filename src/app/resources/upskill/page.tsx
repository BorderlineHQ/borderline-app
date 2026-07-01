'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useApp } from '../../../context/AppContext';
import { useSearchParams } from 'next/navigation';
import { mockCourses, catEmoji, catColors } from '../../../data/coursesData';
import CourseCard from '../../../components/CourseCard';

function UpskillContent() {
  const { theme } = useApp();
  const searchParams = useSearchParams();
  const courseParam = searchParams.get('course');
  
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Tech' | 'Creativity' | 'Business'>('All');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
  
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (courseParam) {
      const courseExists = mockCourses.some(c => c.id === courseParam);
      if (courseExists) {
        setExpandedCourseId(courseParam);
        // Smooth scroll to the element after state update and render
        setTimeout(() => {
          const el = cardRefs.current[courseParam];
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      }
    }
  }, [courseParam]);

  const filteredCourses = mockCourses.filter(
    (c) => selectedCategory === 'All' || c.category === selectedCategory
  );

  const toggleCourse = (id: string) => {
    setExpandedCourseId(expandedCourseId === id ? null : id);
    setExpandedModuleId(null);
  };

  const toggleModule = (id: string) => {
    setExpandedModuleId(expandedModuleId === id ? null : id);
  };

  return (
    <div style={{
      minHeight: '90vh',
      padding: 'var(--spacing-xxl) var(--spacing-md) var(--spacing-xxxl) var(--spacing-md)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '80%', height: '50%',
        background: 'radial-gradient(ellipse at 50% 0%, var(--color-accent-subtle) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '880px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            UPSKILL & GROW
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 800, lineHeight: 1.1,
            letterSpacing: '-0.03em', marginTop: '8px', marginBottom: 'var(--spacing-md)',
            color: 'var(--color-text-primary)'
          }}>
            Grow Your Digital Craft
          </h1>
          <p style={{
            fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6,
            maxWidth: '560px', margin: '0 auto'
          }}>
            Peer-designed programs built for African builders. Master production skills, earn verified credentials, and bypass the resume wall.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--spacing-xl)' }}>
          {(['All', 'Tech', 'Creativity', 'Business'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                borderRadius: '20px', padding: '7px 18px', fontSize: '0.82rem', fontWeight: 600,
                backgroundColor: selectedCategory === cat ? 'var(--color-accent)' : 'transparent',
                color: selectedCategory === cat ? '#000' : 'var(--color-text-secondary)',
                border: selectedCategory === cat ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {cat === 'All' ? '🔥 All Skills' : `${catEmoji[cat]} ${cat}`}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: 'var(--spacing-lg)' 
        }}>
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              ref={el => { cardRefs.current[course.id] = el; }}
              style={{
                gridColumn: expandedCourseId === course.id ? '1 / -1' : 'auto',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <CourseCard
                course={course}
                mode="expandable"
                isExpanded={expandedCourseId === course.id}
                onToggle={() => toggleCourse(course.id)}
                expandedModuleId={expandedModuleId}
                onToggleModule={toggleModule}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          textAlign: 'center', marginTop: 'var(--spacing-xxl)', padding: 'var(--spacing-xl)',
          backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '14px',
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Want to teach a course?
          </h3>
          <p style={{
            fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '16px',
            maxWidth: '460px', margin: '0 auto 16px', lineHeight: 1.5,
          }}>
            We&apos;re looking for experienced African engineers, designers, and product builders to create peer-led programs. Earn from your expertise.
          </p>
          <a
            href="mailto:teach@borderline.africa"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '10px',
              backgroundColor: 'var(--color-accent)', color: '#000', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
            }}
          >
            Apply to Teach
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function UpskillPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--color-text-secondary)' }}>
        Loading courses...
      </div>
    }>
      <UpskillContent />
    </Suspense>
  );
}
