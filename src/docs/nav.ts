// The docs sidebar. Order here is reading order: it drives the sidebar,
// breadcrumbs, previous/next links and the search index.

export type NavItem = {
  title: string
  href: string
  badge?: 'New' | 'Beta' | 'Soon'
}

export type NavGroup = {
  title: string
  items: NavItem[]
}

export const DOCS_NAV: NavGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Quickstart', href: '/docs/getting-started/quickstart' },
      { title: 'Core concepts', href: '/docs/getting-started/concepts' },
      { title: 'Choosing an app type', href: '/docs/getting-started/app-types' },
      { title: 'Workspaces & roles', href: '/docs/getting-started/workspaces' },
    ],
  },
  {
    title: 'Build Agents',
    items: [
      { title: 'Autonomous Agent', href: '/docs/build/autonomous-agent' },
      { title: 'Agent Flow', href: '/docs/build/agent-flow' },
      { title: 'AI Chatbot', href: '/docs/build/chatbot' },
      { title: 'Multi-prompt Agent', href: '/docs/build/multi-prompt-agent', badge: 'Beta' },
      { title: 'Workflows', href: '/docs/build/workflows' },
      { title: 'Triggers & schedules', href: '/docs/build/triggers' },
      { title: 'Variables & memory', href: '/docs/build/variables' },
      { title: 'Writing instructions', href: '/docs/build/instructions' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'Build an AI receptionist', href: '/docs/guides/ai-receptionist' },
      { title: 'Run an outbound campaign', href: '/docs/guides/outbound-campaign' },
      { title: 'Support agent on every channel', href: '/docs/guides/support-agent' },
      { title: 'Add chat to your website', href: '/docs/guides/website-chat' },
      { title: 'Set up an agency', href: '/docs/guides/agency' },
    ],
  },
  {
    title: 'Blocks',
    items: [
      { title: 'Overview', href: '/docs/blocks' },
      { title: 'Trigger', href: '/docs/blocks/trigger' },
      { title: 'AI Model', href: '/docs/blocks/ai-model' },
      { title: 'Agent', href: '/docs/blocks/agent' },
      { title: 'Intent Classifier', href: '/docs/blocks/intent-classifier' },
      { title: 'Parameter Extractor', href: '/docs/blocks/parameter-extractor' },
      { title: 'Knowledge Search', href: '/docs/blocks/knowledge-search' },
      { title: 'Doc Extractor', href: '/docs/blocks/doc-extractor' },
      { title: 'Condition', href: '/docs/blocks/condition' },
      { title: 'For Each & Repeat Until', href: '/docs/blocks/loops' },
      { title: 'Custom Function', href: '/docs/blocks/custom-function' },
      { title: 'Template & variables', href: '/docs/blocks/transform' },
      { title: 'HTTP Request', href: '/docs/blocks/http-request' },
      { title: 'Answer & End', href: '/docs/blocks/output' },
    ],
  },
  {
    title: 'Knowledge',
    items: [
      { title: 'Knowledge bases', href: '/docs/knowledge' },
      { title: 'Data sources', href: '/docs/knowledge/sources' },
      { title: 'Chunking & indexing', href: '/docs/knowledge/indexing' },
      { title: 'Retrieval settings', href: '/docs/knowledge/retrieval' },
      { title: 'Testing retrieval', href: '/docs/knowledge/testing' },
      { title: 'External knowledge', href: '/docs/knowledge/external' },
    ],
  },
  {
    title: 'Tools & Integrations',
    items: [
      { title: 'Model providers', href: '/docs/integrations/models' },
      { title: 'Tools', href: '/docs/integrations/tools' },
      { title: 'Custom tools (OpenAPI)', href: '/docs/integrations/custom-tools' },
      { title: 'Plugins', href: '/docs/integrations/plugins' },
      { title: 'MCP', href: '/docs/integrations/mcp' },
      { title: 'Tracing', href: '/docs/integrations/tracing' },
    ],
  },
  {
    title: 'Channels',
    items: [
      { title: 'Overview', href: '/docs/channels' },
      { title: 'Voice agents', href: '/docs/channels/voice' },
      { title: 'Phone numbers', href: '/docs/channels/phone-numbers' },
      { title: 'Outbound & batch calls', href: '/docs/channels/batch-calls' },
      { title: 'SMS', href: '/docs/channels/sms' },
      { title: 'WhatsApp', href: '/docs/channels/whatsapp' },
      { title: 'Email', href: '/docs/channels/email' },
      { title: 'Website & widgets', href: '/docs/channels/web' },
    ],
  },
  {
    title: 'Test & Deploy',
    items: [
      { title: 'Testing & debugging', href: '/docs/deploy/testing' },
      { title: 'Publishing & versions', href: '/docs/deploy/publishing' },
      { title: 'API keys & access', href: '/docs/deploy/api-keys' },
    ],
  },
  {
    title: 'Monitor',
    items: [
      { title: 'Logs & annotations', href: '/docs/monitor/logs' },
      { title: 'Analytics', href: '/docs/monitor/analytics' },
      { title: 'Voice sessions', href: '/docs/monitor/voice-sessions' },
      { title: 'Governance & audit', href: '/docs/monitor/governance' },
    ],
  },
  {
    title: 'Workspaces & Billing',
    items: [
      { title: 'Client workspaces', href: '/docs/workspaces/clients' },
      { title: 'Branding', href: '/docs/workspaces/branding' },
      { title: 'Billing & credits', href: '/docs/workspaces/billing' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Overview', href: '/docs/api' },
      { title: 'Authentication', href: '/docs/api/authentication' },
      { title: 'Chat completions', href: '/docs/api/chat-completions' },
      { title: 'Threads', href: '/docs/api/threads' },
      { title: 'Agent info & suggestions', href: '/docs/api/agent-info' },
      { title: 'Workflow runs', href: '/docs/api/runs' },
      { title: 'Voice sessions', href: '/docs/api/voice' },
      { title: 'Knowledge API', href: '/docs/api/knowledge' },
      { title: 'Webhook triggers & MCP', href: '/docs/api/triggers-mcp' },
      { title: 'Streaming', href: '/docs/api/streaming' },
      { title: 'Errors', href: '/docs/api/errors' },
      { title: 'JavaScript SDK', href: '/docs/api/javascript-sdk' },
    ],
  },
  {
    title: 'Classic API',
    items: [
      { title: 'About the classic API', href: '/docs/api/classic' },
      { title: 'Chat messages', href: '/docs/api/classic/chat-messages' },
      { title: 'Completion messages', href: '/docs/api/classic/completion-messages' },
      { title: 'Workflows', href: '/docs/api/classic/workflows' },
      { title: 'Files', href: '/docs/api/classic/files' },
      { title: 'Conversations & messages', href: '/docs/api/classic/conversations' },
      { title: 'Feedback, audio & app info', href: '/docs/api/classic/app' },
      { title: 'Annotations', href: '/docs/api/classic/annotations' },
    ],
  },
  {
    title: 'Troubleshooting',
    items: [
      { title: 'Common errors', href: '/docs/troubleshooting' },
      { title: 'Voice & telephony', href: '/docs/troubleshooting/voice' },
      { title: 'Knowledge & retrieval', href: '/docs/troubleshooting/knowledge' },
      { title: 'Limits & quotas', href: '/docs/troubleshooting/limits' },
      { title: 'FAQ', href: '/docs/troubleshooting/faq' },
    ],
  },
]

export const FLAT_NAV = DOCS_NAV.flatMap(g => g.items.map(i => ({ ...i, group: g.title })))

export const findNav = (pathname: string) => {
  const clean = pathname.replace(/\/$/, '') || '/docs'
  const i = FLAT_NAV.findIndex(n => n.href === clean)
  return { index: i, item: FLAT_NAV[i], prev: FLAT_NAV[i - 1], next: FLAT_NAV[i + 1] }
}
