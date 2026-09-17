import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BrandPreset {
  id: string;
  name: string;
  primary: string;
  description: string;
}

export const BRAND_PRESETS: BrandPreset[] = [
  {
    id: 'functional-olive',
    name: 'Functional Lab Olive & Charcoal',
    primary: '#847D6A',
    description: 'Official clinic brand palette — refined earthy olive taupe with rich charcoal',
  },
  {
    id: 'royal-blue',
    name: 'Clinical Royal Blue',
    primary: '#1E40AF',
    description: 'High-trust, professional healthcare & orthopedic blue',
  },
  {
    id: 'deep-navy',
    name: 'Hospital Deep Navy',
    primary: '#0F2B5C',
    description: 'Classic clinical authority & medical prestige',
  },
  {
    id: 'ocean-azure',
    name: 'Vitality Ocean Azure',
    primary: '#0284C7',
    description: 'Modern sports rehabilitation & active mobility',
  },
  {
    id: 'kinetic-emerald',
    name: 'Bio-Kinetic Emerald',
    primary: '#059669',
    description: 'Natural recovery, pain-free mobility & holistic health',
  },
  {
    id: 'athletic-crimson',
    name: 'Sports Performance Crimson',
    primary: '#DC2626',
    description: 'Dynamic athletic rehab & targeted recovery',
  },
  {
    id: 'neuro-indigo',
    name: 'Neuro Wellness Indigo',
    primary: '#4F46E5',
    description: 'Neurological rehab, vestibular balance & focus',
  },
  {
    id: 'classic-teal',
    name: 'Classic Medical Teal',
    primary: '#0D5C58',
    description: 'Calm restorative teal palette',
  },
];

interface BrandColors {
  primary: string;
  hover: string;
  deep: string;
  light: string;
  border: string;
  accent: string;
  ring: string;
}

interface BrandContextType {
  colors: BrandColors;
  currentLogoUrl: string;
  logoFileName: string | null;
  activePresetId: string | null;
  setBrandColor: (hex: string, presetId?: string) => void;
  uploadLogo: (file: File) => Promise<void>;
  resetToDefaultBrand: () => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
}

const STORAGE_KEY = 'frl_brand_settings_v1';
const DEFAULT_PRIMARY = '#847D6A';
const DEFAULT_LOGO_URL = '/logo.svg';

// Color conversion helpers
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}

// Generate harmonized color palette from any primary hex
export function generateBrandPalette(primaryHex: string): BrandColors {
  const { r, g, b } = hexToRgb(primaryHex);
  const { h, s, l } = rgbToHsl(r, g, b);

  // Hover: slightly darker
  const hoverRgb = hslToRgb(h, Math.min(1, s * 1.05), Math.max(0.12, l - 0.1));
  // Deep tone for headings/dark accents: deep charcoal tinted with brand hue
  const deepRgb = hslToRgb(h, Math.min(0.25, s), 0.13);
  // Light tint for background cards
  const lightRgb = hslToRgb(h, Math.min(0.45, Math.max(0.15, s * 0.5)), 0.97);
  // Border soft tint
  const borderRgb = hslToRgb(h, Math.min(0.4, Math.max(0.15, s * 0.4)), 0.88);
  // Accent: vibrant energetic tone
  const accentRgb = hslToRgb(h, Math.min(1, s + 0.15), Math.min(0.65, Math.max(0.45, l + 0.08)));

  return {
    primary: primaryHex,
    hover: rgbToHex(hoverRgb.r, hoverRgb.g, hoverRgb.b),
    deep: rgbToHex(deepRgb.r, deepRgb.g, deepRgb.b),
    light: rgbToHex(lightRgb.r, lightRgb.g, lightRgb.b),
    border: rgbToHex(borderRgb.r, borderRgb.g, borderRgb.b),
    accent: rgbToHex(accentRgb.r, accentRgb.g, accentRgb.b),
    ring: `rgba(${r}, ${g}, ${b}, 0.35)`,
  };
}

// Extract dominant vibrant color from an image element
export function extractDominantColorFromImage(imageEl: HTMLImageElement): Promise<string> {
  return new Promise((resolve) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(DEFAULT_PRIMARY);
        return;
      }

      canvas.width = 120;
      canvas.height = 120;
      ctx.drawImage(imageEl, 0, 0, 120, 120);

      const imgData = ctx.getImageData(0, 0, 120, 120).data;
      let highestSaturationColor = DEFAULT_PRIMARY;
      let maxScore = -1;

      // Scan pixels
      for (let i = 0; i < imgData.length; i += 16) {
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];
        const a = imgData[i + 3];

        if (a < 120) continue; // Skip transparency

        // Skip pure white/gray or near black
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
        const brightness = (r + g + b) / 3;

        if (brightness > 245 || brightness < 20) continue;

        const saturation = max === 0 ? 0 : delta / max;
        // Prioritize saturated colors that aren't overly dark
        const score = saturation * (brightness > 60 && brightness < 200 ? 1.5 : 1);

        if (score > maxScore) {
          maxScore = score;
          highestSaturationColor = rgbToHex(r, g, b);
        }
      }

      resolve(highestSaturationColor);
    } catch {
      resolve(DEFAULT_PRIMARY);
    }
  });
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colors, setColors] = useState<BrandColors>(() => generateBrandPalette(DEFAULT_PRIMARY));
  const [currentLogoUrl, setCurrentLogoUrl] = useState<string>(DEFAULT_LOGO_URL);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [activePresetId, setActivePresetId] = useState<string | null>('functional-olive');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Apply colors to root CSS variables
  const applyColorsToCss = (palette: BrandColors) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', palette.primary);
    root.style.setProperty('--brand-hover', palette.hover);
    root.style.setProperty('--brand-deep', palette.deep);
    root.style.setProperty('--brand-light', palette.light);
    root.style.setProperty('--brand-border', palette.border);
    root.style.setProperty('--brand-accent', palette.accent);
    root.style.setProperty('--brand-ring', palette.ring);
  };

  // Load saved settings from localStorage on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.primary) {
          const palette = generateBrandPalette(parsed.primary);
          setColors(palette);
          applyColorsToCss(palette);
          setActivePresetId(parsed.activePresetId || null);
        }
        if (parsed.logoUrl) {
          setCurrentLogoUrl(parsed.logoUrl);
          setLogoFileName(parsed.logoFileName || null);
        }
      } else {
        applyColorsToCss(colors);
      }
    } catch {
      applyColorsToCss(colors);
    }
  }, []);

  const setBrandColor = (hex: string, presetId?: string) => {
    const palette = generateBrandPalette(hex);
    setColors(palette);
    applyColorsToCss(palette);
    setActivePresetId(presetId || null);

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const current = saved ? JSON.parse(saved) : {};
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...current,
          primary: hex,
          activePresetId: presetId || null,
        })
      );
    } catch (e) {
      console.warn('Could not save brand color to localStorage', e);
    }
  };

  const uploadLogo = async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const dataUrl = e.target?.result as string;
          if (!dataUrl) return resolve();

          // Create temporary image to sample dominant color
          const tempImg = new Image();
          tempImg.crossOrigin = 'anonymous';
          tempImg.onload = async () => {
            const dominantHex = await extractDominantColorFromImage(tempImg);
            const palette = generateBrandPalette(dominantHex);

            setCurrentLogoUrl(dataUrl);
            setLogoFileName(file.name);
            setColors(palette);
            applyColorsToCss(palette);
            setActivePresetId(null);

            try {
              localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                  primary: dominantHex,
                  logoUrl: dataUrl,
                  logoFileName: file.name,
                  activePresetId: null,
                })
              );
            } catch (err) {
              console.warn('Could not store uploaded logo in localStorage', err);
            }
            resolve();
          };
          tempImg.onerror = () => {
            setCurrentLogoUrl(dataUrl);
            setLogoFileName(file.name);
            resolve();
          };
          tempImg.src = dataUrl;
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const resetToDefaultBrand = () => {
    const palette = generateBrandPalette(DEFAULT_PRIMARY);
    setColors(palette);
    setCurrentLogoUrl(DEFAULT_LOGO_URL);
    setLogoFileName(null);
    setActivePresetId('functional-olive');
    applyColorsToCss(palette);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <BrandContext.Provider
      value={{
        colors,
        currentLogoUrl,
        logoFileName,
        activePresetId,
        setBrandColor,
        uploadLogo,
        resetToDefaultBrand,
        isCustomizerOpen,
        setIsCustomizerOpen,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = (): BrandContextType => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};
