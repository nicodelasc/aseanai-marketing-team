import addressExtractionAsset from '../assets/address-extraction.svg';
import aiLaunchpadAsset from '../assets/ai-launchpad.svg';
import brokerageNavigationAsset from '../assets/brokerage-navigation.svg';
import contractManagementAsset from '../assets/contract-management.svg';
import financialReportAsset from '../assets/financial-report.svg';
import liveCaptioningAsset from '../assets/live-captioning.svg';
import portSecurityAsset from '../assets/port-security.svg';

export type Phase = 'question' | 'thinking' | 'result';

export type Option = {
  label: string;
  nextId: NodeId;
};

export type QuestionNode = {
  id: NodeId;
  type: 'question';
  prompt: string;
  eyebrow: string;
  options: Option[];
};

export type ResultNode = {
  id: NodeId;
  type: 'result';
  title: string;
  tagline: string;
  summary: string;
  heroAsset: string;
  badges: string[];
  impactPoints: string[];
  primaryCta: {
    label: string;
    href: string;
  };
};

export type GameNode = QuestionNode | ResultNode;

export type NodeId =
  | 'start'
  | 'operations_branch'
  | 'knowledge_branch'
  | 'generation_branch'
  | 'contract_management'
  | 'financial_report_generation'
  | 'brokerage_navigation'
  | 'port_security'
  | 'ai_launchpad'
  | 'live_captioning'
  | 'address_extraction';

export const START_NODE_ID: NodeId = 'start';

export const gameTree: Record<NodeId, GameNode> = {
  start: {
    id: 'start',
    type: 'question',
    eyebrow: 'Start Here',
    prompt: 'Explore a starting point',
    options: [
      {
        label: 'Live activities',
        nextId: 'operations_branch'
      },
      {
        label: 'Information and analytics',
        nextId: 'knowledge_branch'
      }
    ]
  },
  operations_branch: {
    id: 'operations_branch',
    type: 'question',
    eyebrow: 'Next',
    prompt: 'What does this solution mainly work with?',
    options: [
      { label: 'Visuals or scans', nextId: 'port_security' },
      { label: 'Speech or audio', nextId: 'live_captioning' }
    ]
  },
  knowledge_branch: {
    id: 'knowledge_branch',
    type: 'question',
    eyebrow: 'Next',
    prompt: 'Explore a case focus',
    options: [
      { label: 'Using an app', nextId: 'brokerage_navigation' },
      { label: 'Writing content', nextId: 'generation_branch' },
      { label: 'Cleaning records', nextId: 'address_extraction' }
    ]
  },
  generation_branch: {
    id: 'generation_branch',
    type: 'question',
    eyebrow: 'Final',
    prompt: 'Explore the area',
    options: [
      { label: 'Contracts', nextId: 'contract_management' },
      { label: 'Finance', nextId: 'financial_report_generation' },
      { label: 'Project planning', nextId: 'ai_launchpad' }
    ]
  },
  contract_management: {
    id: 'contract_management',
    type: 'result',
    title: 'Contract Intelligence Studio',
    tagline: 'Helps teams create, review, and search contracts faster.',
    summary:
      'An AI contract tool that drafts contracts, spots unusual clauses, and makes stored contracts easier to search.',
    heroAsset: contractManagementAsset,
    badges: ['Azure OpenAI', 'Vector DB', 'Azure AI Search'],
    impactPoints: [
      'Generates first-draft contracts tuned to business scenario inputs.',
      'Highlights risky clauses and recommends revisions against legal playbooks.',
      'Makes stored contracts searchable through semantic retrieval and AI highlights.'
    ],
    primaryCta: {
      label: 'View case study',
      href: 'https://example.com/case-studies/contract-intelligence-studio'
    }
  },
  financial_report_generation: {
    id: 'financial_report_generation',
    type: 'result',
    title: 'Financial News Briefing Engine',
    tagline: 'Turns complicated financial news into clear report summaries.',
    summary:
      'An AI reporting tool that turns complex news into short financial updates, highlights key points, and supports multiple languages.',
    heroAsset: financialReportAsset,
    badges: ['Multilingual Summarisation', 'Compliance Guardrails', 'Financial Services'],
    impactPoints: [
      'Distills fast-moving news into executive-ready report summaries.',
      'Supports multilingual output for regional teams and stakeholders.',
      'Keeps response structure aligned with compliance-sensitive communication needs.'
    ],
    primaryCta: {
      label: 'View case study',
      href: 'https://example.com/case-studies/financial-news-briefing-engine'
    }
  },
  brokerage_navigation: {
    id: 'brokerage_navigation',
    type: 'result',
    title: 'Brokerage Guide Chatbot',
    tagline: 'Helps users find the right features inside a brokerage app.',
    summary:
      'An in-app assistant that answers questions, helps users get started, and points them to the right brokerage features.',
    heroAsset: brokerageNavigationAsset,
    badges: ['Knowledge Graph', 'Chatbot UX', 'Brokerage Onboarding'],
    impactPoints: [
      'Guides users to the right brokerage features without forcing menu hunting.',
      'Supports onboarding journeys with contextual, conversational assistance.',
      'Connects product knowledge to user intent through graph-driven retrieval.'
    ],
    primaryCta: {
      label: 'View case study',
      href: 'https://example.com/case-studies/brokerage-guide-chatbot'
    }
  },
  port_security: {
    id: 'port_security',
    type: 'result',
    title: 'Port Sentinel Vision',
    tagline: 'Checks X-ray scans and flags suspicious items for review.',
    summary:
      'An AI logistics tool that reviews X-ray images, highlights possible prohibited items, and gives confidence scores for human review.',
    heroAsset: portSecurityAsset,
    badges: ['Computer Vision', 'X-ray Analysis', 'Logistics Security'],
    impactPoints: [
      'Screens cargo imagery for suspicious items at operational speed.',
      'Assigns confidence scores to help reviewers triage inspections.',
      'Extends port security workflows with AI-assisted image analysis.'
    ],
    primaryCta: {
      label: 'View case study',
      href: 'https://example.com/case-studies/port-sentinel-vision'
    }
  },
  ai_launchpad: {
    id: 'ai_launchpad',
    type: 'result',
    title: 'AI Launchpad',
    tagline: 'Helps teams scope a new AI project and generate starter materials.',
    summary:
      'A guided platform where teams answer setup questions and get a starter repo or use-case pack for a new AI project.',
    heroAsset: aiLaunchpadAsset,
    badges: ['Project Scoping', 'Starter Repo Generation', 'Delivery Enablement'],
    impactPoints: [
      'Collects the operational facts needed to scope an AI delivery realistically.',
      'Transforms answers into reusable project setup artefacts.',
      'Accelerates early discovery for both business and engineering teams.'
    ],
    primaryCta: {
      label: 'View case study',
      href: 'https://example.com/case-studies/ai-launchpad'
    }
  },
  live_captioning: {
    id: 'live_captioning',
    type: 'result',
    title: 'Live Captioning Relay',
    tagline: 'Creates live captions and translations for streaming content.',
    summary:
      'An AI captioning tool that listens to live streams and produces real-time subtitles and translations in Thai, Indonesian, and Arabic.',
    heroAsset: liveCaptioningAsset,
    badges: ['Real-Time Translation', 'Live Streaming', 'GCP'],
    impactPoints: [
      'Processes live speech into translated captions with low-latency delivery.',
      'Supports multilingual audience reach across Southeast Asia and the Middle East.',
      'Separates audio and text stages to keep streaming workflows resilient.'
    ],
    primaryCta: {
      label: 'View case study',
      href: 'https://example.com/case-studies/live-captioning-relay'
    }
  },
  address_extraction: {
    id: 'address_extraction',
    type: 'result',
    title: 'Postal Address Recovery Engine',
    tagline: 'Finds usable addresses inside messy document sets.',
    summary:
      'An AI extraction workflow that cleans up messy address data and pulls out valid addresses for postal operations.',
    heroAsset: addressExtractionAsset,
    badges: ['BigQuery', 'Regex Validation', 'Gemini Extraction'],
    impactPoints: [
      'Filters noisy address lists through rules before sending edge cases to AI.',
      'Recovers structured delivery data from low-quality source material.',
      'Improves downstream postal operations with cleaner address intelligence.'
    ],
    primaryCta: {
      label: 'View case study',
      href: 'https://example.com/case-studies/postal-address-recovery-engine'
    }
  }
};

export const nodeOrder: NodeId[] = Object.keys(gameTree) as NodeId[];
