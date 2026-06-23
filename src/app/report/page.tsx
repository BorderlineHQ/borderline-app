import React from 'react';
import Link from 'next/link';

export default function Report() {
  return (
    <section className="report-section" style={{ padding: 'var(--spacing-xxl) var(--spacing-md)', backgroundColor: 'var(--color-bg)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,2.8rem)', fontWeight: 700, color: 'var(--color-text-primary)' }}>BorderLine Survey 2024</h1>
          <Link href="/" className="btn btn-primary" style={{ borderRadius: '9999px', padding: '8px 16px', fontSize: '0.9rem' }}>← Back Home</Link>
        </div>
        {/* Embed the markdown report – browsers will render it as plain text, but it provides quick access */}
        <iframe
          src="/docs/product_strategy.md"
          title="BorderLine Survey Report"
          style={{ width: '100%', height: '80vh', border: '1px solid var(--color-border)', borderRadius: '8px', backgroundColor: 'var(--color-surface)' }}
        ></iframe>
        <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
          For a richer experience, download the PDF version from <a href="/docs/survey_report.pdf" target="_blank" rel="noopener noreferrer">here</a>.
        </p>
      </div>
    </section>
  );
}
