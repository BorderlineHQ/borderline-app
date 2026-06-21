# BorderLine: Survey Analysis & Team Discussion Guide
*User Research Validation Report (N = 37)*

This report compiles the empirical data from our survey, renders visual charts for easy team consumption, and maps out concrete discussion points to guide our fellowship team alignment.

---

## 1. Demographic & Segmentation Charts

### Geographic Distribution of Respondents
```mermaid
pie title Country Distribution (N=37)
    "Zambia (48.6%)" : 18
    "Ghana (27.0%)" : 10
    "Mozambique (13.5%)" : 5
    "Nigeria (5.4%)" : 2
    "Ivory Coast (2.7%)" : 1
    "South Africa (2.7%)" : 1
```

### Primary Technical Focus
```mermaid
pie title Area of Tech Focus
    "Other (35.1%)" : 13
    "Software Engineering / Web (29.7%)" : 11
    "Digital Marketing & Content (21.6%)" : 8
    "Data Science / AI / Analytics (10.8%)" : 4
    "UI/UX Design (2.7%)" : 1
```

### Academic & Professional Status
```mermaid
pie title Current Professional Status
    "Undergraduate Student (89.2%)" : 33
    "Recent Graduate (8.1%)" : 3
    "Junior Freelancer (2.7%)" : 1
```

---

## 2. Core Friction Points & Showcase Preferences

### Core Hiring Barriers (Select All That Apply)
```text
Hiring Barrier                                                  % of Respondents
────────────────────────────────────────────────────────────────────────────────
Experience Gatekeeping (3+ yrs required) ░░░░░░░░░░░░░░░ 70.3% (26)
Lack of Industry Connections             ░░░░░░░░░░ 48.6% (18)
Legacy Platforms Exclude New Profiles    ░░░░░░░░ 37.8% (14)
Resumes Limit Practical Skills           ░░░ 13.5% (5)
Cross-Border Language Barriers           ░░░ 13.5% (5)
```

### Current Showcase Methods
```mermaid
pie title How Users Currently Show Work
    "No Structured Method (51.4%)" : 19
    "Standard Word/PDF Resume (40.5%)" : 15
    "Personal Portfolio Website (5.4%)" : 2
    "Raw GitHub/Figma Repos (2.7%)" : 1
```

---

## 3. Accessibility & Chatbot Validation

### Frequency of Internet/Mobile Data Disruptions
```mermaid
pie title Mobile Data Interruption Frequency
    "Frequently (A few times/wk) (32.4%)" : 12
    "Constantly (Daily issue) (27.0%)" : 10
    "Occasionally (27.0%)" : 10
    "Rarely (Stable Wi-Fi) (13.5%)" : 5
```

### WhatsApp Assistant Adoption Interest
```mermaid
pie title Will you use a WhatsApp Assistant?
    "Yes (Saves data/time) (54.1%)" : 20
    "Maybe (Depending on ease) (29.7%)" : 11
    "No (Prefer web browser) (16.2%)" : 6
```

---

## 4. Key Strategic Insights ("So What?")

1. **The Target Cohort (Undergraduates)**: **89.2%** of respondents are current university students. This indicates our initial go-to-market strategy should focus on campus partnerships (e.g., GCTU, TTU) rather than generic social media ads.
2. **The "Other" Tech Focus (35.1%)**: The largest single group for tech focus chose "Other" (35.1%), followed by software engineering (29.7%). This tells us we shouldn't build BorderLine exclusively for developers. We must support UI/UX, product design, technical writing, graphics, and digital marketing.
3. **The Presentation Paradox**: A massive **91.9%** either have no structured way to show their work or rely on standard PDF/Word resumes. This validates the need for our *AI Portfolio Builder* to structure and package their raw project files.
4. **The Internet Barrier (59.4% Daily/Weekly Interruptions)**: Nearly 60% of our core audience suffers frequent or constant internet disruptions. This is a crucial finding—our web app must be extremely lightweight, and our **WhatsApp integration is mandatory** for accessibility.

---

## 5. Team Discussion Prompts (Moving Forward)

To encourage collaboration, here are key questions each team member should address during our next meeting:

### 🛠️ For Godwin (Engineering & Database)
* **Vector Matching**: Since 70.3% of users are blocked by "3+ years experience" requirements, how can we leverage PostgreSQL (`pgvector`) in Supabase to match users based on *semantic skill similarity* rather than chronological history keywords?
* **Low-Data API**: How can we optimize backend database structures to keep payload sizes minimal for users on slow mobile networks?

### 🎨 For Titos (UI/UX Design & Vetting)
* **Designing the AI Builder Flow**: Given that 51.4% have no structured portfolio, how can we design a "blank state" user experience that doesn't feel intimidating? Can we make the onboarding flow feel like a warm, supportive conversation rather than a job application form?
* **Visualizing the Trust Seal**: How do we visually present the "AI-Verified" trust badge on recruiter feeds to make it stand out?

### 📈 For Brahima (Product & Marketing)
* **Campus Outreach**: Since 89.2% of users are university students, can we design a "Portfolio Build-a-thon" campaign on target campuses (Zambia and Ghana) to gather our first 100 users?
* **User Onboarding via WhatsApp**: How should we market the WhatsApp integration? Should we position it as a "resume-updating assistant" or a "data-free job alert service"?
