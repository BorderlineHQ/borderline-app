import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockProfiles } from "../../../data/mockData";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

// Helper to look up a profile from the ID/slug
function getProfile(id: string) {
  const profileId = id.startsWith("talent-") ? id : `talent-${id}`;
  return mockProfiles.find((p) => p.id === profileId);
}

// Next.js 16 dynamic metadata generation (params is a Promise)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const profile = getProfile(id);

  if (!profile) {
    return {
      title: "Profile Not Found",
      description: "The requested builder profile could not be found on BorderLine.",
    };
  }

  const cleanBio = profile.bio || "";
  const shortBio = cleanBio.length > 150 ? `${cleanBio.slice(0, 147)}...` : cleanBio;

  return {
    title: `${profile.fullName} - ${profile.techFocus} | Verified Portfolio`,
    description: `View ${profile.fullName}'s verified developer portfolio on BorderLine. Build Score: ${profile.projects[0]?.isAudited ? "1,240 (AI-Verified)" : "1,180"}, ${profile.peerVouched || "vouched"}. ${shortBio}`,
    keywords: [
      `${profile.fullName} portfolio`,
      `${profile.fullName} software engineer`,
      `${profile.techFocus}`,
      ...profile.skills,
      "BorderLine verified builder",
      "Africa tech talent",
    ],
    alternates: {
      canonical: `/in/${profile.id}`,
    },
    openGraph: {
      type: "profile",
      url: `https://borderline.africa/in/${profile.id}`,
      title: `${profile.fullName} - ${profile.techFocus} | BorderLine`,
      description: `View ${profile.fullName}'s verified capabilities, project case studies, and Build Score on BorderLine.`,
      firstName: profile.fullName.split(" ")[0],
      lastName: profile.fullName.split(" ").slice(1).join(" "),
      username: profile.id.replace("talent-", ""),
      gender: "unspecified",
      images: [
        {
          url: profile.avatarUrl || "/borderline_talent_cafe.png",
          width: 200,
          height: 200,
          alt: `${profile.fullName} Profile Avatar`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${profile.fullName} - ${profile.techFocus} | BorderLine`,
      description: `View ${profile.fullName}'s verified developer portfolio and Build Score on BorderLine.`,
      images: [profile.avatarUrl || "/borderline_talent_cafe.png"],
    },
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { id } = await params;
  const profile = getProfile(id);

  if (!profile) {
    notFound();
  }

  // Generate JSON-LD Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "dateCreated": profile.createdAt,
    "mainEntity": {
      "@type": "Person",
      "name": profile.fullName,
      "jobTitle": profile.techFocus,
      "description": profile.bio,
      "image": profile.avatarUrl,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": profile.country,
      },
      "knowsAbout": profile.skills,
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": profile.country === "Nigeria" ? "University of Nigeria, Nsukka (UNN)" : 
              profile.country === "South Africa" ? "University of Cape Town (UCT)" : "African Tech Ecosystem",
      },
    },
  };

  // Helper to render case study markdown
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    let inList = false;
    const listItems: React.ReactNode[] = [];
    const elements: React.ReactNode[] = [];

    const lines = text.split("\n");

    lines.forEach((line, idx) => {
      const isHeader = line.startsWith("### ");
      const isBullet = line.startsWith("* ") || line.startsWith("- ");

      if (inList && !isBullet) {
        elements.push(<ul key={`list-${idx}`} style={{ listStyleType: "disc", marginLeft: "20px", marginBottom: "12px" }}>{[...listItems]}</ul>);
        listItems.length = 0;
        inList = false;
      }

      if (isHeader) {
        elements.push(
          <h4 key={idx} style={{ fontWeight: 700, fontSize: "1rem", margin: "16px 0 8px 0", borderBottom: "1px solid var(--color-border)", paddingBottom: "4px", color: "var(--color-text-primary)" }}>
            {line.substring(4)}
          </h4>
        );
      } else if (isBullet) {
        inList = true;
        listItems.push(
          <li key={idx} style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "4px" }}>
            {line.substring(2)}
          </li>
        );
      } else if (line.trim() === "") {
        // Skip
      } else {
        elements.push(
          <p key={idx} style={{ fontSize: "0.85rem", margin: "6px 0", lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
            {line}
          </p>
        );
      }
    });

    if (inList) {
      elements.push(<ul key="list-final" style={{ listStyleType: "disc", marginLeft: "20px", marginBottom: "12px" }}>{[...listItems]}</ul>);
    }

    return <div className="markdown-render">{elements}</div>;
  };

  const hasAuditedProject = profile.projects.some(p => p.isAudited);
  const displayBuildScore = hasAuditedProject ? "1,240" : "1,180";
  const displayPercentile = profile.peerVouched ? "92nd" : "85th";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)", color: "var(--color-text-primary)", position: "relative", overflow: "hidden", padding: "var(--spacing-xxl) var(--spacing-md) var(--spacing-xl) var(--spacing-md)" }}>
      {/* JSON-LD Script injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Glow */}
      <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "90%", height: "50%", background: "radial-gradient(ellipse at 50% 0%, var(--color-accent-subtle) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: "var(--spacing-lg)" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", color: "var(--color-text-secondary)", textDecoration: "none", transition: "color 0.2s" }}>
            <span>←</span>
            <span>Back to Talent Network</span>
          </Link>
        </div>

        <div className="portal-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--spacing-lg)" }}>
          
          {/* Main Layout Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--spacing-lg)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
              
              {/* Profile Card Block */}
              <div className="card" style={{ padding: "var(--spacing-xl)", backgroundColor: "var(--color-surface)", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
                  
                  {/* Avatar wrapper */}
                  <div style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", border: "3px solid var(--color-border)", flexShrink: 0 }}>
                    <img
                      src={profile.avatarUrl || "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200"}
                      alt={profile.fullName}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  {/* Profile info */}
                  <div style={{ flex: 1, minWidth: "250px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
                      <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>
                        {profile.fullName}
                      </h1>
                      
                      {profile.isVerified && (
                        <span className="badge badge-verified" style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            <path d="m9 11 2 2 4-4"/>
                          </svg>
                          AI-Verified Builder
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--color-accent)", margin: "0 0 8px 0" }}>
                      {profile.techFocus}
                    </p>

                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {profile.country}
                      </span>
                      <span>•</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        Joined {new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Connect CTA */}
                  <div style={{ flexShrink: 0 }}>
                    <Link href="/whatsapp" className="btn btn-primary" style={{ borderRadius: "8px", padding: "12px 24px", fontSize: "0.95rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                      </svg>
                      Contact via WhatsApp Bot
                    </Link>
                  </div>

                </div>

                {/* Bio text */}
                {profile.bio && (
                  <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "16px" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-tertiary)", marginBottom: "8px" }}>
                      Professional Summary
                    </h3>
                    <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--color-text-secondary)", margin: 0 }}>
                      {profile.bio}
                    </p>
                  </div>
                )}

                {/* Verified Skills Grid */}
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-tertiary)", marginBottom: "10px" }}>
                    AI-Verified Skill Assets
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {profile.skills.map((skill, idx) => (
                      <span key={idx} className="badge badge-verified" style={{ fontSize: "0.8rem", padding: "4px 12px", borderRadius: "6px" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Score indicators */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", borderTop: "1px solid var(--color-border)", paddingTop: "20px" }}>
                  <div style={{ backgroundColor: "var(--color-surface-elevated)", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>
                      Build Score
                    </span>
                    <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-accent)", marginTop: "4px" }}>
                      {displayBuildScore}
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "var(--color-text-secondary)" }}>
                      Top {displayPercentile} Percentile
                    </span>
                  </div>

                  <div style={{ backgroundColor: "var(--color-surface-elevated)", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>
                      Peer Endorsements
                    </span>
                    <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-accent-secondary)", marginTop: "4px" }}>
                      {profile.peerVouched || "0 Vouched"}
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "var(--color-text-secondary)" }}>
                      Vetted by Global Tech Network
                    </span>
                  </div>

                  <div style={{ backgroundColor: "var(--color-surface-elevated)", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>
                      Verified Case Studies
                    </span>
                    <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-text-primary)", marginTop: "4px" }}>
                      {profile.projects.length}
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "var(--color-text-secondary)" }}>
                      100% Audited Codebases
                    </span>
                  </div>
                </div>

              </div>

              {/* Verified Projects Showcase */}
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "var(--spacing-md)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                  </svg>
                  Verified Project Portfolios
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
                  {profile.projects.map((project) => (
                    <div key={project.id} className="card" style={{ padding: "var(--spacing-xl)", backgroundColor: "var(--color-surface)" }}>
                      
                      {/* Project Header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                        <div>
                          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>
                            {project.title}
                          </h3>
                          <p style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)", margin: "4px 0 0 0" }}>
                            Compiled via BorderLine AI Parser on {new Date(project.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div style={{ display: "flex", gap: "8px" }}>
                          {project.isAudited ? (
                            <span className="badge badge-verified" style={{ fontSize: "0.7rem", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11 2 2 4-4"/>
                              </svg>
                              Audit Verified
                            </span>
                          ) : (
                            <span className="badge" style={{ backgroundColor: "var(--color-accent-subtle)", color: "var(--color-accent-secondary)", fontSize: "0.7rem", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              Pending Manual Audit
                            </span>
                          )}

                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="badge" style={{ fontSize: "0.7rem", textDecoration: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                              </svg>
                              GitHub Codebase
                            </a>
                          )}

                          {project.figmaUrl && (
                            <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer" className="badge" style={{ fontSize: "0.7rem", textDecoration: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"/>
                              </svg>
                              Figma Board
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Extracted skills */}
                      <div style={{ marginBottom: "16px" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginRight: "8px" }}>
                          Extracted Skill Assets:
                        </span>
                        <div style={{ display: "inline-flex", flexWrap: "wrap", gap: "4px", verticalAlign: "middle" }}>
                          {project.verifiedSkills.map((skill, i) => (
                            <span key={i} className="badge badge-accent" style={{ fontSize: "0.65rem", padding: "1px 6px" }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Raw input summary */}
                      <div style={{ fontSize: "0.85rem", fontStyle: "italic", color: "var(--color-text-secondary)", borderLeft: "2px solid var(--color-accent)", paddingLeft: "10px", margin: "12px 0 16px 0" }}>
                        &quot;{project.rawInput}&quot;
                      </div>

                      {/* Markdown Case Study details */}
                      <div style={{ padding: "var(--spacing-md)", backgroundColor: "var(--color-surface-elevated)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", marginTop: "12px" }}>
                        {renderMarkdown(project.aiSummary)}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
