import en from '../data/messages/en.json';
import zh from '../data/messages/zh.json';

export const languages = ['en', 'zh'] as const;
export type Lang = (typeof languages)[number];

export const dictionaries = { en, zh };

export const productSections = ['objectstack', 'objectql', 'objectos', 'objectui', 'cloud', 'studio', 'cli'] as const;
export const contentSections = [
  ...productSections,
  'enterprise',
  'pricing',
  'integrations',
  'market',
  'solutions',
  'privacy',
  'terms',
] as const;

export type SectionSlug = (typeof contentSections)[number];

export const productLinks = {
  objectstack: {
    docs: 'https://docs.objectstack.ai',
    github: 'https://github.com/objectstack-ai/framework',
  },
  objectql: {
    docs: 'https://docs.objectstack.ai/objectql',
    github: 'https://github.com/objectstack-ai/framework',
  },
  objectos: {
    docs: 'https://www.objectos.app/docs',
    github: 'https://github.com/objectstack-ai/objectos',
  },
  objectui: {
    docs: 'https://www.objectui.org/docs',
    github: 'https://github.com/objectstack-ai/objectui',
  },
  cloud: {
    docs: 'https://docs.objectstack.ai/cloud',
    github: 'https://github.com/objectstack-ai/cloud',
  },
  studio: {
    docs: 'https://docs.objectstack.ai/studio',
    github: 'https://github.com/objectstack-ai/studio',
  },
  cli: {
    docs: 'https://docs.objectstack.ai/cli',
    github: 'https://github.com/objectstack-ai/cli',
  },
} as const;

export const navGroups = [
  {
    label: { en: 'Platform', zh: '平台' },
    items: [
      {
        label: 'ObjectStack Framework',
        href: '/objectstack',
        description: { en: 'Metadata framework for enterprise AI apps', zh: '企业 AI 应用元数据框架' },
      },
      {
        label: 'ObjectQL',
        href: '/objectql',
        description: { en: 'Query engine and driver contract', zh: '查询引擎与 Driver 契约' },
      },
      {
        label: 'ObjectOS',
        href: '/objectos',
        description: { en: 'Governed runtime for business operations', zh: '受治理的业务运行时' },
      },
      {
        label: 'ObjectUI',
        href: '/objectui',
        description: { en: 'Schema-driven frontend renderer', zh: 'Schema 驱动前端渲染器' },
      },
    ],
  },
  {
    label: { en: 'Developers', zh: '开发者' },
    items: [
      {
        label: 'Docs',
        href: 'https://docs.objectstack.ai',
        description: { en: 'Framework documentation', zh: 'Framework 文档' },
      },
      {
        label: 'Quickstart',
        href: 'https://docs.objectstack.ai/getting-started/quick-start',
        description: { en: 'Create your first project', zh: '创建第一个项目' },
      },
      {
        label: 'CLI',
        href: '/cli',
        description: { en: 'Scaffold, validate, build, deploy', zh: '脚手架、校验、构建、部署' },
      },
      {
        label: 'Studio',
        href: '/studio',
        description: { en: 'Visual metadata development', zh: '元数据可视化开发环境' },
      },
      {
        label: 'GitHub',
        href: 'https://github.com/objectstack-ai/framework',
        description: { en: 'Open-source framework repository', zh: '开源 Framework 仓库' },
      },
    ],
  },
  {
    label: { en: 'AI Development', zh: 'AI 开发' },
    items: [
      {
        label: 'AI Agents',
        href: '/agents',
        description: { en: 'Build governed business agents', zh: '构建受治理的业务 Agent' },
      },
      {
        label: 'MCP Tools',
        href: '/agents#mcp-tools',
        description: { en: 'Expose actions as permission-aware tools', zh: '把动作暴露为权限感知工具' },
      },
      {
        label: 'Guardrails',
        href: '/agents#guardrails',
        description: { en: 'Permissions, audit, tenancy, redaction', zh: '权限、审计、租户与脱敏' },
      },
      {
        label: 'Metadata as Context',
        href: '/agents#metadata-context',
        description: { en: 'Keep app context compact and readable', zh: '让应用上下文紧凑可读' },
      },
    ],
  },
  {
    label: { en: 'Enterprise', zh: '企业' },
    items: [
      {
        label: 'Solutions',
        href: '/solutions',
        description: { en: 'Industry and modernization patterns', zh: '行业与现代化场景' },
      },
      {
        label: 'Security & Runtime',
        href: '/enterprise',
        description: { en: 'Self-hosted governance and support', zh: '自托管治理与支持' },
      },
      {
        label: 'Deployment',
        href: '/cloud',
        description: { en: 'Cloud development and runtime options', zh: '云端开发与运行选项' },
      },
      {
        label: 'Contact Sales',
        href: 'https://tally.so/r/2EeW0V',
        description: { en: 'Talk about enterprise requirements', zh: '讨论企业需求' },
      },
    ],
  },
] as const;

export function getDict(lang: string): any {
  return dictionaries[isLang(lang) ? lang : 'en'];
}

export function isLang(value: string): value is Lang {
  return languages.includes(value as Lang);
}

export function pathFor(lang: Lang, href: string) {
  if (href.startsWith('http')) return href;
  return `/${lang}${href === '/' ? '' : href}`;
}

export function asArray<T = any>(value: unknown): T[] {
  return Array.isArray(value) ? value : [];
}

export function objectValues<T = any>(value: unknown): T[] {
  if (!value || Array.isArray(value) || typeof value !== 'object') return [];
  return Object.values(value as Record<string, T>);
}

export function titledBlocks(value: unknown) {
  return objectValues(value).filter(
    (item): item is Record<string, any> & { title: string; description?: string } =>
      !!item && typeof item === 'object' && 'title' in item,
  );
}

export function splitBlogId(id: string) {
  const lang: Lang = id.endsWith('.zh') ? 'zh' : 'en';
  const slug = id.replace(/\.zh$/, '');
  return { lang, slug };
}

export function formatDate(date: Date | undefined, lang: Lang) {
  if (!date) return '';
  return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}
