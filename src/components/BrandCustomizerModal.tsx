import React, { useState, useRef } from 'react';
import { Palette, Upload, Check, RefreshCw, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useBrand, BRAND_PRESETS } from '../context/BrandContext';

interface BrandCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandCustomizerModal: React.FC<BrandCustomizerModalProps> = ({ isOpen, onClose }) => {
  const {
    colors,
    currentLogoUrl,
    logoFileName,
    activePresetId,
    setBrandColor,
    uploadLogo,
    resetToDefaultBrand,
  } = useBrand();

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customHexInput, setCustomHexInput] = useState(colors.primary);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, SVG, JPG, or WebP).');
      return;
    }
    setIsProcessing(true);
    setFeedbackMessage(null);
    try {
      await uploadLogo(file);
      setFeedbackMessage(`Logo "${file.name}" loaded! Dominant color extracted and applied across the entire UI.`);
    } catch {
      setFeedbackMessage('Failed to process image file. Please try another image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleCustomHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      setBrandColor(val);
      setFeedbackMessage(`Applied custom color ${val} globally.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
              style={{ backgroundColor: colors.primary }}
            >
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Logo & Brand Color System</h2>
              <p className="text-xs text-gray-500">
                Synchronize your clinic logo and color palette across the entire application
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">
          {feedbackMessage && (
            <div
              className="p-3.5 rounded-2xl text-xs font-medium flex items-center gap-2.5 animate-in slide-in-from-top duration-200 border"
              style={{
                backgroundColor: colors.light,
                borderColor: colors.border,
                color: colors.deep,
              }}
            >
              <Sparkles className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />
              <span>{feedbackMessage}</span>
            </div>
          )}

          {/* Current Live Preview Card */}
          <div
            className="p-4 rounded-2xl border flex items-center justify-between transition"
            style={{ backgroundColor: colors.light, borderColor: colors.border }}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-xl bg-white border border-gray-200/80 p-1 flex items-center justify-center shadow-xs overflow-hidden">
                <img
                  src={currentLogoUrl}
                  alt="Current Clinic Logo"
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    // Fallback to text if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">Functional Rehab Lab</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Active Brand
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {logoFileName ? `Custom logo: ${logoFileName}` : 'Official vector SVG branding active'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg border border-black/10 shadow-inner"
                style={{ backgroundColor: colors.primary }}
                title={`Current primary: ${colors.primary}`}
              />
            </div>
          </div>

          {/* Upload Logo Section */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Upload Clinic Logo Image
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/50 scale-[0.99]'
                  : 'border-gray-200 hover:border-gray-400 bg-gray-50/50 hover:bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition"
                  style={{ backgroundColor: colors.light, color: colors.primary }}
                >
                  {isProcessing ? (
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  ) : (
                    <Upload className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Click to upload or drag & drop logo
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Supports PNG, SVG, JPG, WebP. Dominant color is auto-extracted and applied instantly!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Preset Palettes */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
              One-Click Logo Color Palettes
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {BRAND_PRESETS.map((preset) => {
                const isActive = activePresetId === preset.id || colors.primary.toLowerCase() === preset.primary.toLowerCase();
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setBrandColor(preset.primary, preset.id);
                      setCustomHexInput(preset.primary);
                      setFeedbackMessage(`Applied "${preset.name}" across all components.`);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition relative group ${
                      isActive
                        ? 'border-gray-900 bg-gray-50 ring-2 ring-gray-900/10'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div
                        className="w-6 h-6 rounded-md shadow-xs border border-black/10"
                        style={{ backgroundColor: preset.primary }}
                      />
                      {isActive && (
                        <span className="w-4 h-4 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px]">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-900 leading-tight">
                        {preset.name.split(' ')[0]}
                      </span>
                      <span className="block text-[10px] text-gray-400 font-mono">
                        {preset.primary}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Hex Color Picker */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Exact Hex Color Code
            </label>
            <div className="flex items-center gap-3">
              <div className="relative flex items-center">
                <input
                  type="color"
                  value={colors.primary}
                  onChange={(e) => {
                    setBrandColor(e.target.value);
                    setCustomHexInput(e.target.value);
                  }}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-gray-200 p-1 bg-white"
                  title="Pick exact color"
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={customHexInput}
                  onChange={handleCustomHexChange}
                  placeholder="#847D6A"
                  maxLength={7}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-900 focus:outline-hidden focus:bg-white focus:border-gray-900 transition"
                />
              </div>
              <button
                onClick={resetToDefaultBrand}
                className="px-3 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 rounded-xl transition flex items-center gap-1.5 shrink-0"
                title="Reset to official Functional Rehab Lab theme"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50/70 rounded-b-3xl">
          <span className="text-xs text-gray-500">
            Changes save automatically to browser storage
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-xs transition hover:opacity-95"
            style={{ backgroundColor: colors.primary }}
          >
            Apply & View Website
          </button>
        </div>
      </div>
    </div>
  );
};
