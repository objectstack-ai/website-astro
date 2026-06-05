import * as OpenCC from 'opencc-js';

const convert = OpenCC.Converter({ from: 'cn', to: 'twp' });

export const s2t = (value: string): string => convert(value);

export function deepS2T<T>(value: T): T {
  if (typeof value === 'string') return s2t(value) as T;
  if (Array.isArray(value)) return value.map((item) => deepS2T(item)) as T;
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, deepS2T(item)]),
  ) as T;
}
