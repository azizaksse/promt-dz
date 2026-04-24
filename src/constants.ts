/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Prompt, Category, Language, Translations } from './types';

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    title: "Prompt DZ",
    subtitle: "Your premium gateway to curated AI productivity across three languages.",
    searchPlaceholder: "Search prompts...",
    allPrompts: "All Collections",
    copyBtn: "Copy Text",
    copied: "Copied!",
    shareBtn: "Share",
    footerText: "Crafted for elite workflows.",
    newPrompt: "Design Custom",
    noResults: "No prompts matching your criteria.",
    clearFilters: "Reset View",
    premiumTag: "PREMIUM"
  },
  fr: {
    title: "Prompt DZ",
    subtitle: "Votre portail premium vers une productivité IA optimisée en trois langues.",
    searchPlaceholder: "Rechercher...",
    allPrompts: "Collections",
    copyBtn: "Copier",
    copied: "Copié!",
    shareBtn: "Partager",
    footerText: "Conçu pour les flux de travail d'élite.",
    newPrompt: "Créer un Design",
    noResults: "Aucun résultat trouvé.",
    clearFilters: "Réinitialiser",
    premiumTag: "PREMIUM"
  },
  dz: {
    title: "Prompt DZ",
    subtitle: "بوابتكم الممتازة للإنتاجية بالذكاء الاصطناعي بثلاث لغات.",
    searchPlaceholder: "ابحث هنا...",
    allPrompts: "كل المجموعات",
    copyBtn: "نسخ",
    copied: "تم النسخ!",
    shareBtn: "مشاركة",
    footerText: "مصمم لأعمال النخبة.",
    newPrompt: "تصميم مخصص",
    noResults: "لم يتم العثور على أي نتائج.",
    clearFilters: "إعادة تعيين",
    premiumTag: "نسخة ممتازة"
  }
};

export const CATEGORIES: Category[] = [
  {
    id: "writing",
    name: {
      en: "Writing",
      fr: "Rédaction",
      dz: "كتابة"
    }
  },
  {
    id: "coding",
    name: {
      en: "Coding",
      fr: "Codage",
      dz: "برمجة"
    }
  },
  {
    id: "design",
    name: {
      en: "Design",
      fr: "Design",
      dz: "تصميم"
    }
  },
  {
    id: "business",
    name: {
      en: "Business",
      fr: "Affaires",
      dz: "بيزنس"
    }
  }
];

export const INITIAL_PROMPTS: Prompt[] = [
  {
    id: "1",
    title: {
      en: "Ghostwriter Assistant",
      fr: "Assistant Ghostwriter",
      dz: "مساعد الكتابة الإبداعية"
    },
    category: "writing",
    description: {
      en: "Deep narrative creation for professional storytelling.",
      fr: "Création narrative profonde pour le récit professionnel.",
      dz: "إنشاء قصص عميقة للسرد الاحترافي."
    },
    promptText: "Act as a professional ghostwriter. Write a compelling [genre] story set in [location] focusing on [theme]. Use rich imagery and complex character internal monologues."
  },
  {
    id: "2",
    title: {
      en: "Senior Debugger",
      fr: "Débogueur Senior",
      dz: "خبير إصلاح الأخطاء"
    },
    category: "coding",
    description: {
      en: "Advanced code analysis and refactoring specialist.",
      fr: "Spécialiste de l'analyse et du refactoring de code avancé.",
      dz: "خبير في تحليل الكود وإعادة هيكلته."
    },
    promptText: "Analyze the provided code snippet for logic errors, security vulnerabilities, and performance bottlenecks. Suggest a refactored version using modern design patterns."
  },
  {
    id: "3",
    title: {
      en: "Brand Architect",
      fr: "Architecte de Marque",
      dz: "مهندس العلامة التجارية"
    },
    category: "design",
    description: {
      en: "Strategic visual identity and naming workshop.",
      fr: "Atelier de stratégie d'identité visuelle et de nommage.",
      dz: "ورشة عمل استراتيجية للهوية البصرية والتسمية."
    },
    promptText: "Create a brand strategy for a luxury [industry] start-up. Include a brand name, mission statement, tone of voice guidelines, and a mood board description."
  }
];

export const THEME = {
  accent: "#0f766e", // Teal 700
  background: "#f8fafc", // Slate 50
  text: "#0f172a", // Slate 900
  card: "#ffffff" // White
};
