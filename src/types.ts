/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'fr' | 'dz';

export interface Translations {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  allPrompts: string;
  copyBtn: string;
  copied: string;
  shareBtn: string;
  footerText: string;
  newPrompt: string;
  noResults: string;
  clearFilters: string;
  premiumTag: string;
}

export interface Prompt {
  id: string;
  title: Record<Language, string> | string;
  category: Record<Language, string> | string;
  description: Record<Language, string> | string;
  promptText: string;
}

export interface Category {
  name: Record<Language, string>;
  id: string;
}
