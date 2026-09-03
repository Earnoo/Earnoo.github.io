export interface Author {
  name: string;
  isMainCandidate?: boolean;
  affiliation?: string;
}

export interface MetricComparison {
  name: string;
  baseline: string | number;
  proposed: string | number;
  improvement: string;
  unit?: string;
}

export interface IndustryApplication {
  id: string;
  title: string;
  domain: 'Retail & E-Commerce' | 'Intelligent Transportation' | 'Environmental & IoT' | 'Quantitative Finance' | 'Industrial Robotics & Mechatronics' | 'Public Health';
  summary: string;
  impactHighlight: string;
  datasetUsed: string;
  practicalValue: string;
  imageUrl: string;
  resultsKey?: string;
}

export interface Paper {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  authors: Author[];
  venue: string;
  venueType: 'Journal [Q1]' | 'International Conference [Oral]';
  impactFactor?: string;
  year: number;
  doi: string;
  codeUrl?: string;
  pdfUrl?: string;
  citationCount?: number;
  featured: boolean;
  abstract: string;
  keyContributions: string[];
  methodologyOverview: string;
  formulaHighlight: {
    name: string;
    latexOrNotation: string;
    explanation: string;
  };
  metrics: MetricComparison[];
  industryApplications: IndustryApplication[];
  bibtex: string;
  keywords: string[];
  paperNumber?: number;
  hasCertificate?: boolean;
  presentationCertificate?: {
    conference: string;
    date: string;
    location: string;
    oralPresentation: boolean;
  };
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  institutionUrl?: string;
  period: string;
  gpa: string;
  rank?: string;
  supervisor?: string;
  supervisorUrl?: string;
  thesis?: string;
}

export interface ReferenceContact {
  name: string;
  title: string;
  department: string;
  institution: string;
  institutionUrl?: string;
  country: string;
  relation: string;
  email: string;
  phone: string;
  profileUrl?: string;
  hasRecLetter?: boolean;
  recLetterSummary?: string;
  recommendationLetterPdf?: string;
}

export interface TeachingExperience {
  role: string;
  course: string;
  term: string;
  instructor: string;
  instructorUrl?: string;
  institution: string;
  institutionUrl?: string;
}

export interface ProductionProject {
  id: string;
  name: string;
  subtitle: string;
  period: string;
  organization: string;
  organizationUrl?: string;
  liveUrl?: string;
  companyLinks?: { name: string; url: string }[];
  description: string;
  bullets: string[];
  techStack: string[];
  domain: string;
  metrics: string;
  badge?: string;
}
