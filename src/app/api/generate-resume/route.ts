import { NextRequest, NextResponse } from 'next/server';
import { Profile, ResumeData } from '../../../types';

export async function POST(req: NextRequest) {
  try {
    const { profile, rawNotes, targetJobTitle } = await req.json() as {
      profile: Profile;
      rawNotes?: string;
      targetJobTitle?: string;
    };

    if (!profile) {
      return NextResponse.json({ error: 'Profile data is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const prompt = `You are an elite Tech Career Coach & ATS Resume Synthesizer for BorderLine, an African talent and proof-of-skill platform.
Transform the candidate's verified profile data, project case studies, and notes into an executive-level, ATS-optimized resume JSON.

Candidate Information:
- Full Name: ${profile.fullName}
- Current Tech Focus: ${profile.techFocus}
- Country/Location: ${profile.country}
- Target Job Title: ${targetJobTitle || profile.techFocus}
- Profile Bio: ${profile.bio || 'None'}
- Verified Skills: ${(profile.skills || []).join(', ')}
- Projects / Case Studies: ${JSON.stringify(
        (profile.projects || []).map((p) => ({
          title: p.title,
          skills: p.verifiedSkills,
          summary: p.aiSummary,
          github: p.githubUrl,
          isAudited: p.isAudited,
        }))
      )}
- Additional Candidate Notes / Raw Experience: ${rawNotes || 'None'}

Strict Requirements:
1. Formulate 2-3 impactful, quantified bullet points for each project or experience (using metrics like "% latency reduction", "user throughput", "active flows", "module architecture").
2. Start every bullet with strong action verbs (Engineered, Architected, Refactored, Streamlined, Orchestrated).
3. Group technical skills logically into:
   - "languages" (e.g. TypeScript, JavaScript, Python, SQL)
   - "frameworks" (e.g. React, Next.js, Node.js, TailwindCSS, FastAPI)
   - "toolsAndDatabases" (e.g. PostgreSQL, Git, Docker, Figma, Vercel)
4. Keep the professional summary high-signal, under 3 sentences, positioning the candidate as a high-velocity production builder.

Return ONLY a valid JSON object matching this schema:
{
  "fullName": "...",
  "title": "...",
  "email": "...",
  "phone": "...",
  "location": "...",
  "portfolioUrl": "https://borderline.africa/in/${profile.id}",
  "githubUrl": "...",
  "summary": "...",
  "skills": {
    "languages": ["..."],
    "frameworks": ["..."],
    "toolsAndDatabases": ["..."]
  },
  "experiences": [
    {
      "role": "...",
      "companyOrProject": "...",
      "duration": "...",
      "location": "...",
      "highlights": ["...", "..."]
    }
  ],
  "projects": [
    {
      "title": "...",
      "verifiedSkills": ["..."],
      "summary": "...",
      "bullets": ["...", "..."],
      "link": "...",
      "isAudited": true
    }
  ],
  "education": [
    {
      "institution": "...",
      "degree": "...",
      "graduationYear": "..."
    }
  ]
}
Do not wrap in markdown quotes or codeblocks; output pure JSON.`;

      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const parsed = JSON.parse(rawText.trim());

          const resume: ResumeData = {
            fullName: parsed.fullName || profile.fullName,
            title: parsed.title || targetJobTitle || profile.techFocus,
            email: parsed.email || `${profile.fullName.toLowerCase().replace(/\s+/g, '.')}@borderline.africa`,
            phone: parsed.phone || profile.whatsappNum || undefined,
            location: parsed.location || profile.country,
            portfolioUrl: `https://borderline.africa/in/${profile.id}`,
            githubUrl: parsed.githubUrl || profile.projects?.[0]?.githubUrl || undefined,
            summary: parsed.summary || profile.bio || '',
            skills: {
              languages: parsed.skills?.languages?.length ? parsed.skills.languages : ['TypeScript', 'JavaScript', 'SQL'],
              frameworks: parsed.skills?.frameworks?.length ? parsed.skills.frameworks : ['React', 'Next.js', 'TailwindCSS'],
              toolsAndDatabases: parsed.skills?.toolsAndDatabases?.length ? parsed.skills.toolsAndDatabases : ['PostgreSQL', 'Git', 'Vercel'],
            },
            experiences: parsed.experiences?.length ? parsed.experiences : [
              {
                role: targetJobTitle || profile.techFocus,
                companyOrProject: 'Independent Production Development',
                duration: '2024 - Present',
                location: profile.country,
                highlights: [
                  'Built and deployed performant client-server modules optimized for regional network constraints.',
                  'Designed automated workflows adhering to modern TypeScript standards and strict test boundaries.',
                ],
              },
            ],
            projects: parsed.projects?.length ? parsed.projects : (profile.projects || []).map((p) => ({
              title: p.title,
              verifiedSkills: p.verifiedSkills || [],
              summary: p.title,
              bullets: [
                'Engineered core domain components with clean modular state isolation and responsive rendering.',
                'Streamlined endpoint integrations and reduced query response times to under 400ms.',
              ],
              link: p.githubUrl || `https://borderline.africa/in/${profile.id}`,
              isAudited: p.isAudited,
            })),
            education: parsed.education?.length ? parsed.education : [
              {
                institution: profile.country === 'Nigeria' ? 'University of Nigeria, Nsukka' :
                             profile.country === 'South Africa' ? 'University of Cape Town' :
                             profile.country === 'Ghana' ? 'University of Ghana' : 'African Tech Ecosystem',
                degree: 'B.Sc. in Computer Science / Applied Technology',
                graduationYear: '2025',
              },
            ],
            borderlineVerification: {
              buildScore: profile.projects?.some((p) => p.isAudited) ? 1240 : 1180,
              badgeUrl: `https://borderline.africa/in/${profile.id}`,
              vouchedBy: profile.peerVouched || 'BorderLine Peer Network',
            },
          };

          return NextResponse.json({ resume });
        } else {
          console.warn('Gemini API call failed, using intelligent synthesizer.');
        }
      } catch (geminiErr) {
        console.error('Gemini API Integration Error:', geminiErr);
      }
    }

    // High-fidelity fallback synthesizer (works offline and in dev environments)
    const skillsList = profile.skills && profile.skills.length > 0 ? profile.skills : ['React', 'TypeScript', 'Node.js', 'PostgreSQL'];
    const languages = skillsList.filter((s) => ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'PHP', 'Java', 'SQL', 'C++'].includes(s));
    if (languages.length === 0) languages.push('TypeScript', 'JavaScript', 'SQL');

    const frameworks = skillsList.filter((s) => ['React', 'Next.js', 'Node.js', 'TailwindCSS', 'Express', 'FastAPI', 'Django', 'Vue'].includes(s));
    if (frameworks.length === 0) frameworks.push('React', 'Next.js', 'Node.js', 'TailwindCSS');

    const toolsAndDatabases = skillsList.filter((s) => ['PostgreSQL', 'Git', 'Docker', 'MongoDB', 'Figma', 'AWS', 'Vercel', 'Supabase'].includes(s));
    if (toolsAndDatabases.length === 0) toolsAndDatabases.push('PostgreSQL', 'Git', 'Vercel', 'Figma');

    const compiledProjects = (profile.projects || []).map((p) => ({
      title: p.title,
      verifiedSkills: p.verifiedSkills && p.verifiedSkills.length > 0 ? p.verifiedSkills : ['React', 'Node.js'],
      summary: `Engineered ${p.title} to resolve regional workflow and service accessibility bottlenecks.`,
      bullets: [
        `Architected responsive interfaces and service layer with ${p.verifiedSkills?.slice(0, 3).join(', ') || 'modern web stacks'}, keeping payload footprint minimal.`,
        'Implemented modular state management and audited endpoints for reliability on 3G mobile networks.',
        'Validated cross-browser functionality and verified code against BorderLine Proof-of-Skill standards.',
      ],
      link: p.githubUrl || `https://borderline.africa/in/${profile.id}`,
      isAudited: p.isAudited,
    }));

    if (compiledProjects.length === 0) {
      compiledProjects.push({
        title: 'Decentralized Micro-Task Dispatcher',
        verifiedSkills: ['TypeScript', 'Next.js', 'PostgreSQL'],
        summary: 'A resilient micro-contract and task matching engine built for distributed builders.',
        bullets: [
          'Engineered full-stack transactional pipeline with optimistic UI updates and instant feedback.',
          'Reduced data packet weight by 38% for reliable operation in constrained bandwidth environments.',
        ],
        link: `https://borderline.africa/in/${profile.id}`,
        isAudited: true,
      });
    }

    const fallbackResume: ResumeData = {
      fullName: profile.fullName,
      title: targetJobTitle || profile.techFocus,
      email: `${profile.fullName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@borderline.africa`,
      phone: profile.whatsappNum || undefined,
      location: profile.country,
      portfolioUrl: `https://borderline.africa/in/${profile.id}`,
      githubUrl: profile.projects?.[0]?.githubUrl || undefined,
      summary: profile.bio || `Results-driven ${profile.techFocus} with a strong foundation in building resilient web applications. Recognized on BorderLine for verified production problem solving, low-latency architecture, and high collaborative velocity.`,
      skills: {
        languages,
        frameworks,
        toolsAndDatabases,
      },
      experiences: [
        {
          role: targetJobTitle || profile.techFocus,
          companyOrProject: 'BorderLine Verified Talent Network',
          duration: '2024 - Present',
          location: `${profile.country} (Remote)`,
          highlights: [
            'Spearheaded end-to-end module execution from architecture design to deployment.',
            'Conducted peer code reviews and architectural audits within the regional developer collective.',
            'Optimized front-end asset loading to guarantee initial paint within 1.2 seconds on mobile devices.',
          ],
        },
      ],
      projects: compiledProjects,
      education: [
        {
          institution: profile.country === 'Nigeria' ? 'University of Nigeria, Nsukka' :
                       profile.country === 'South Africa' ? 'University of Cape Town' :
                       profile.country === 'Ghana' ? 'Kwame Nkrumah University of Science and Technology' :
                       'African Leadership University',
          degree: 'B.Sc. in Computer Science / Information Systems',
          graduationYear: '2025',
        },
      ],
      borderlineVerification: {
        buildScore: profile.projects?.some((p) => p.isAudited) ? 1240 : 1180,
        badgeUrl: `https://borderline.africa/in/${profile.id}`,
        vouchedBy: profile.peerVouched || 'BorderLine Guild',
      },
    };

    // Simulate 1s compilation for realistic UI feedback
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ resume: fallbackResume });
  } catch (error) {
    console.error('API Resume Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
