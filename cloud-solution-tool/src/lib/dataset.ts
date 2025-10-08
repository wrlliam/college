export default [
  {
    title: "What is your business size?",
    answers: [
      { label: "Small", value: 100 },
      { label: "Medium", value: 70 },
      { label: "Large", value: 40 },
    ],
  },
  {
    title: "What type of cloud service do you need?",
    answers: [
      { label: "SaaS (Software as a Service)", value: 100 },
      { label: "PaaS (Platform as a Service)", value: 75 },
      { label: "IaaS (Infrastructure as a Service)", value: 50 },
      { label: "CaaS (Communication as a Service)", value: 60 },
      { label: "XaaS (Anything as a Service)", value: 65 },
    ],
  },
  {
    title: "What is your budget flexibility?",
    answers: [
      { label: "Low (Need most cost-efficient solution)", value: 100 },
      { label: "Moderate (Some budget available)", value: 70 },
      { label: "High (Can invest in complex infrastructure)", value: 40 },
    ],
  },
  {
    title: "What level of security and compliance do you need?",
    answers: [
      { label: "Basic (Standard data protection)", value: 100 },
      { label: "Moderate (Some compliance needs)", value: 70 },
      { label: "High (Strict data protection requirements)", value: 40 },
      {
        label: "Regulated (Industry-specific compliance, e.g. HIPAA, PCI)",
        value: 20,
      },
    ],
  },
  {
    title: "How scalable should your cloud solution be?",
    answers: [
      { label: "Minimal scaling needed", value: 100 },
      { label: "Moderate scaling", value: 70 },
      { label: "High scalability required", value: 40 },
    ],
  },
  {
    title: "What level of customization do you require?",
    answers: [
      { label: "Off-the-shelf solution", value: 100 },
      { label: "Some customization options", value: 70 },
      { label: "Highly customized setup", value: 40 },
    ],
  },
  {
    title: "What is your IT support capability?",
    answers: [
      { label: "No in-house IT support (need fully managed)", value: 100 },
      { label: "Partial IT team (can share management)", value: 70 },
      { label: "Full IT department (prefer control)", value: 40 },
    ],
  },
  {
    title: "What level of performance and reliability is needed?",
    answers: [
      { label: "Standard performance acceptable", value: 100 },
      { label: "High availability needed", value: 70 },
      {
        label: "Mission-critical performance (low latency, high uptime)",
        value: 40,
      },
    ],
  },
];


export const cloudSolutions = [
  { label: "SaaS (Software as a Service)", value: 100 },
  { label: "CaaS (Communication as a Service)", value: 80 },
  { label: "XaaS (Anything as a Service)", value: 75 },
  { label: "PaaS (Platform as a Service)", value: 60 },
  { label: "IaaS (Infrastructure as a Service)", value: 40 },
  { label: "Hybrid Cloud", value: 30 },
  { label: "Private Cloud", value: 20 },
  { label: "On-Premise", value: 0 },
];