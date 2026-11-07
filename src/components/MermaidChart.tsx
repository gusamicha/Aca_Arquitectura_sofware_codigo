import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { ZoomIn, ZoomOut, RotateCcw, Code, Eye, AlertCircle } from 'lucide-react';

interface MermaidChartProps {
  chartId: string;
  chartCode: string;
  title: string;
  legend: string;
  explanation: string;
  isDarkMode: boolean;
}

export const MermaidChart: React.FC<MermaidChartProps> = ({
  chartId,
  chartCode,
  title,
  legend,
  explanation,
  isDarkMode
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showSource, setShowSource] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: isDarkMode ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        themeVariables: isDarkMode ? {
          darkMode: true,
          background: '#0c0a09',
          primaryColor: '#1e293b',
          primaryTextColor: '#f8fafc',
          primaryBorderColor: '#38bdf8',
          lineColor: '#94a3b8',
          secondaryColor: '#1e1b4b',
          tertiaryColor: '#14271c',
          edgeLabelBackground: '#1e293b'
        } : {
          darkMode: false,
          background: '#ffffff',
          primaryColor: '#f0f9ff',
          primaryTextColor: '#0f172a',
          primaryBorderColor: '#0284c7',
          lineColor: '#475569',
          secondaryColor: '#f8fafc',
          tertiaryColor: '#f0fdf4',
          edgeLabelBackground: '#ffffff'
        }
      });

      const uniqueRenderId = `mermaid-${chartId}-${Date.now()}`;

      mermaid.render(uniqueRenderId, chartCode)
        .then(({ svg }) => {
          if (isMounted) {
            setSvgContent(svg);
            setHasError(false);
            setErrorMessage('');
          }
        })
        .catch((err) => {
          console.error("Error rendering mermaid diagram", err);
          if (isMounted) {
            setHasError(true);
            setErrorMessage(err?.message || "Error al renderizar el diagrama.");
          }
        });
    } catch (err: any) {
      if (isMounted) {
        setHasError(true);
        setErrorMessage(err?.message || "Error inicializando Mermaid.");
      }
    }

    return () => {
      isMounted = false;
    };
  }, [chartId, chartCode, isDarkMode]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.6));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 shadow-xs overflow-hidden transition-all print-avoid-break">
      {/* Header bar of the chart */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/90">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            {title}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Renderizado vectorial interactivo mediante Mermaid.js
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1.5 self-end sm:self-center no-print">
          <button
            type="button"
            onClick={() => setShowSource(!showSource)}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              showSource
                ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                : 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700/80'
            }`}
            title={showSource ? "Ver diagrama visual" : "Ver código Mermaid"}
          >
            {showSource ? <Eye className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
            <span>{showSource ? "Diagrama" : "Código"}</span>
          </button>

          {!showSource && (
            <>
              <div className="h-4 w-px bg-stone-300 dark:bg-stone-700 mx-1" aria-hidden="true" />
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700/80 transition-colors"
                title="Acercar (Zoom In)"
                aria-label="Acercar zoom del diagrama"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700/80 transition-colors"
                title="Alejar (Zoom Out)"
                aria-label="Alejar zoom del diagrama"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700/80 transition-colors"
                title="Restablecer Zoom"
                aria-label="Restablecer tamaño del diagrama"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Diagram Canvas or Source Code */}
      <div className="p-4 sm:p-6 bg-stone-50/30 dark:bg-stone-950/40 min-h-[280px] flex items-center justify-center overflow-x-auto">
        {showSource ? (
          <div className="w-full">
            <pre className="p-4 text-xs font-mono bg-stone-900 text-stone-100 rounded-lg overflow-x-auto leading-relaxed border border-stone-800">
              <code>{chartCode}</code>
            </pre>
          </div>
        ) : hasError ? (
          <div className="p-6 text-center text-red-600 dark:text-red-400 flex flex-col items-center max-w-md">
            <AlertCircle className="w-8 h-8 mb-2" />
            <p className="font-semibold text-sm">Error de renderizado en el modelo</p>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">{errorMessage}</p>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="w-full overflow-x-auto flex justify-center py-2 transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>

      {/* Legend & Explanation Footer */}
      <div className="px-5 py-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 space-y-3">
        {/* Legend */}
        <div className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300">
          <span className="font-semibold text-stone-900 dark:text-stone-100 shrink-0">Leyenda:</span>
          <span className="leading-relaxed">{legend}</span>
        </div>

        {/* Technical Explanation */}
        <div className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pt-2 border-t border-stone-100 dark:border-stone-800/60">
          <strong className="text-stone-800 dark:text-stone-200 block mb-1">Explicación Arquitectónica:</strong>
          {explanation}
        </div>
      </div>
    </div>
  );
};
