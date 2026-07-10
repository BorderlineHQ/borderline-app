'use client';

import React from 'react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <div>
          <h4 className="project-title">{project.title}</h4>
          <span className="project-date">
            Compiled on {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>
        {project.isAudited ? (
          <span className="status-badge audited">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Audited
          </span>
        ) : (
          <span className="status-badge pending">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Pending Review
          </span>
        )}
      </div>

      <div className="project-skills">
        {project.verifiedSkills.map((skill, index) => (
          <span key={index} className="skill-badge">{skill}</span>
        ))}
      </div>

      <div className="project-summary">
        {project.aiSummary.split('\n').map((line, idx) => {
          if (line.startsWith('### ')) {
            return <h5 key={idx}>{line.substring(4)}</h5>;
          } else if (line.startsWith('* ') || line.startsWith('- ')) {
            return <li key={idx}>{line.substring(2)}</li>;
          } else if (line.trim()) {
            return <p key={idx}>{line}</p>;
          }
          return null;
        })}
      </div>

      <div className="project-links">
        {project.githubUrl && (
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="project-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            GitHub
          </a>
        )}
        {project.figmaUrl && (
          <a 
            href={project.figmaUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="project-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            Figma
          </a>
        )}
      </div>
    </div>
  );
}
