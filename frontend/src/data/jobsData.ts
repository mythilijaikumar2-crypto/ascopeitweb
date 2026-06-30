// Shared job data used by both the Careers listing page and the CareerDetail page

export interface JobRole {
  id: string
  title: string
  location: string
  type: string
  dept: string
  desc: string
  responsibilities: string[]
  requirements: string[]
}

export const openRoles: JobRole[] = [
  {
    id: 'go-backend',
    title: 'Senior Go Backend Engineer',
    location: 'Remote',
    type: 'Full-Time',
    dept: 'Backend Systems',
    desc: 'We are seeking a concurrency specialist to design high-throughput Go microservices, manage PostgreSQL indexing, and construct event stream pipelines.',
    responsibilities: [
      'Build modular backend workers utilizing channels and select concurrency models.',
      'Design database schema migrations, views, and optimize queries under 10ms.',
      'Define clean REST and gRPC API contract schemas with TypeScript frontends.'
    ],
    requirements: [
      '5+ years programming backends with Go/Node in production systems.',
      'Solid knowledge of relational database structures and Redis cache pipelines.',
      'Hands-on experience with Docker container building and basic VPC network security.'
    ]
  },
  {
    id: 'react-architect',
    title: 'Lead React Architect',
    location: 'Remote',
    type: 'Full-Time',
    dept: 'Frontend Products',
    desc: 'Join us to design pixel-perfect design system modules, optimize browser execution times, and set up state-management standards across products.',
    responsibilities: [
      'Construct reusable component matrices conversion Figma designs into HTML structures.',
      'Optimize Web Vitals indexes, implementing bundle tree-shaking and component lazy-loading.',
      'Coordinate state structures across client networks utilizing modern context tools.'
    ],
    requirements: [
      '6+ years developing frontend systems with React and TypeScript.',
      'Deep understanding of browser rendering pipelines, DOM reflows, and performance audits.',
      'Prior experience building customizable corporate design systems.'
    ]
  },
  {
    id: 'sre-engineer',
    title: 'Senior Site Reliability Engineer (SRE)',
    location: 'Remote',
    type: 'Full-Time',
    dept: 'Infrastructure',
    desc: 'Configure auto-scaling clusters, manage VPC routers, and help developers deploy packages with automated, zero-error CI/CD pipelines.',
    responsibilities: [
      'Define Terraform architecture blueprints for cluster replications.',
      'Set up automated logging metrics using Prometheus and Grafana alerts.',
      'Manage cloud hosting configurations to optimize server usage and costs.'
    ],
    requirements: [
      '4+ years managing production cloud infrastructure (AWS or GCP).',
      'Expertise in writing Kubernetes manifests and managing ingress controllers.',
      'Familiarity with writing shell automation scripts and setting up GitHub Actions.'
    ]
  }
]

export const speculativeRole: JobRole = {
  id: 'speculative',
  title: 'Speculative Engineering Candidate',
  location: 'Remote',
  type: 'Full-Time / Contract',
  dept: 'General Alignment',
  desc: 'Submit your CV and engineering focus to be considered for future engineering positions on our team.',
  responsibilities: [
    'Proactively design robust features in your alignment area.',
    'Maintain premium architecture standards and write modular, dry code.',
    'Collaborate with developers inside a flat remote environment.'
  ],
  requirements: [
    'Proven development achievements in frontend, backend, or DevOps.',
    'Commitment to type safety, clean code reviews, and modular systems.',
    'Ability to collaborate independently inside asynchronous pipelines.'
  ]
}

export const allRoles: JobRole[] = [...openRoles, speculativeRole]

export function getJobById(id: string): JobRole | undefined {
  return allRoles.find((job) => job.id === id)
}
