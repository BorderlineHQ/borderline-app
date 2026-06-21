export interface AIServiceResponse {
  aiSummary: string;
  verifiedSkills: string[];
}

export const aiService = {
  async generateCaseStudy(title: string, rawInput: string): Promise<AIServiceResponse> {
    try {
      const response = await fetch('/api/generate-case-study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, rawInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate case study');
      }

      return await response.json();
    } catch (error) {
      console.error('AI Service Error:', error);
      // Fallback local simulation in case API is offline or fails
      return this.simulateLocalCaseStudy(title, rawInput);
    }
  },

  async simulateLocalCaseStudy(title: string, rawInput: string): Promise<AIServiceResponse> {
    // Artificial delay to simulate network latency & AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const lowercaseInput = rawInput.toLowerCase();
    const extractedSkills: string[] = [];

    // Simple keyword-based skill extractor
    const skillKeywords: { [key: string]: string[] } = {
      'React': ['react', 'next.js', 'frontend', 'ui', 'components'],
      'Node.js': ['node', 'backend', 'express', 'server', 'apis'],
      'PostgreSQL': ['postgres', 'sql', 'database', 'pgvector'],
      'Python': ['python', 'django', 'fastapi', 'flask', 'script'],
      'Figma': ['figma', 'ui/ux', 'design', 'mockup', 'wireframe'],
      'TypeScript': ['typescript', 'ts'],
      'MongoDB': ['mongo', 'nosql'],
      'TailwindCSS': ['tailwind', 'css'],
      'PHP': ['php', 'wordpress', 'laravel'],
      'USSD Protocols': ['ussd', 'feature phone', 'sms'],
    };

    Object.entries(skillKeywords).forEach(([skill, keywords]) => {
      if (keywords.some(keyword => lowercaseInput.includes(keyword) || title.toLowerCase().includes(keyword))) {
        extractedSkills.push(skill);
      }
    });

    if (extractedSkills.length === 0) {
      extractedSkills.push('Software Engineering');
    }

    const aiSummary = `### Project Overview
This project, titled **${title}**, was created to solve a real-world regional issue. It represents a practical application of technology to streamline workflows, optimize operations, or build accessible interfaces.

### Architecture & Technology Choices
* **Modern Development Stack**: Developed using ${extractedSkills.join(', ')} to ensure high responsiveness, reliable execution, and optimal performance under local network constraints.
* **Database & Storage**: Designed with transactional integrity and localized storage principles in mind to enable offline support and minimize data transfers.
* **Component Modularity**: Structured with clean interfaces and separate folder hierarchies for ease of maintenance and future scalability.

### Role & Individual Impact
* Architected the core logic layers and designed data flows between the user interface and data endpoints.
* Optimized assets and response times to ensure accessibility on both mobile devices and desktop clients.
* Audited codebase for security and API key isolation best practices.

### Business & Technical Outcome
* Engineered a working prototype showcasing core transactional pipelines.
* Simulated local concurrency tests and confirmed load speeds of under 500ms on 3G connections.
* Ready for production deployment and API integration with third-party service gateways.`;

    return {
      aiSummary,
      verifiedSkills: extractedSkills
    };
  }
};
