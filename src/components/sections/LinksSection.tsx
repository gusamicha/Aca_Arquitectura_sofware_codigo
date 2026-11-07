import React, { useState } from 'react';
import { initialMediaLinks } from '../../data/dossierData';
import { Youtube, GitBranch, ExternalLink, Save, Check, Play, Edit3, RotateCcw } from 'lucide-react';

export const LinksSection: React.FC = () => {
  const [links, setLinks] = useState(() => {
    try {
      const saved = localStorage.getItem('sga_media_links');
      return saved ? JSON.parse(saved) : initialMediaLinks;
    } catch {
      return initialMediaLinks;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [youtubeInput, setYoutubeInput] = useState(links.youtubeUrl);
  const [repoInput, setRepoInput] = useState(links.repositoryUrl);
  const [notesInput, setNotesInput] = useState(links.demoNotes);

  // Helper to extract YouTube video ID from various URL formats
  const getYouTubeId = (url: string): string | null => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    } catch {
      return null;
    }
  };

  const videoId = getYouTubeId(links.youtubeUrl);

  const handleSave = () => {
    const updated = {
      youtubeUrl: youtubeInput,
      repositoryUrl: repoInput,
      demoNotes: notesInput
    };
    setLinks(updated);
    try {
      localStorage.setItem('sga_media_links', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setIsEditing(false);
  };

  const handleReset = () => {
    setLinks(initialMediaLinks);
    setYoutubeInput(initialMediaLinks.youtubeUrl);
    setRepoInput(initialMediaLinks.repositoryUrl);
    setNotesInput(initialMediaLinks.demoNotes);
    try {
      localStorage.removeItem('sga_media_links');
    } catch (e) {
      console.error(e);
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 bg-white dark:bg-stone-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Youtube className="w-6 h-6 text-red-600" />
              <span>12. Sustentación Multimedia y Repositorio de Código</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Enlaces a la sustentación grabada en video y al repositorio de código fuente con especificaciones técnicas.
            </p>
          </div>

          <div className="flex items-center gap-2 no-print">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar Enlaces</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Enlaces</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
              title="Restablecer enlaces predeterminados"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Edit fields form */}
        {isEditing && (
          <div className="p-5 mb-6 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-xs space-y-4 no-print">
            <div>
              <label className="font-bold block text-stone-900 dark:text-stone-100 mb-1">
                Enlace del Video de YouTube (Sustentación):
              </label>
              <input
                type="text"
                value={youtubeInput}
                onChange={(e) => setYoutubeInput(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
              />
              <span className="text-[11px] text-stone-500 mt-1 block">
                Puede ser formato estándar (youtube.com/watch?v=...) o corto (youtu.be/...).
              </span>
            </div>

            <div>
              <label className="font-bold block text-stone-900 dark:text-stone-100 mb-1">
                Enlace del Repositorio de Código (GitHub / GitLab):
              </label>
              <input
                type="text"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                placeholder="https://github.com/usuario/repositorio"
                className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
              />
            </div>

            <div>
              <label className="font-bold block text-stone-900 dark:text-stone-100 mb-1">
                Notas y Puntos Clave de la Sustentación:
              </label>
              <textarea
                rows={2}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* YouTube Video Player Embed */}
          <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1.5">
                <Youtube className="w-4 h-4" />
                Video de Sustentación en YouTube
              </span>
              <a
                href={links.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1"
              >
                <span>Ver en YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embed container */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black/90 border border-stone-300 dark:border-stone-700 flex items-center justify-center">
              {videoId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Video de Sustentación del Dossier SGA"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="p-6 text-center text-stone-400 text-xs">
                  <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="font-semibold">No se detectó un video válido de YouTube</p>
                  <p className="text-[11px] text-stone-500 mt-1">Haga clic en 'Editar Enlaces' para pegar la URL del video.</p>
                </div>
              )}
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              <strong>Descripción:</strong> {links.demoNotes}
            </p>
          </div>

          {/* Repository Information Card */}
          <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <GitBranch className="w-4 h-4 text-amber-600" />
                Repositorio Institucional de Código
              </span>

              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Control de Versiones y Artefactos de Software
              </h3>

              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                El código fuente del sistema, los esquemas de bases de datos DDL, los archivos de configuración Docker Compose, y los pipelines de integración continua (CI/CD) se encuentran versionados en el repositorio oficial del equipo de ingeniería.
              </p>

              <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 font-mono text-xs text-stone-800 dark:text-stone-200 break-all">
                {links.repositoryUrl}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-700/80 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-stone-500">
                Rama principal: <span className="font-mono font-bold text-stone-800 dark:text-stone-200">main</span>
              </span>

              <a
                href={links.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors shadow-xs"
              >
                <span>Acceder al Repositorio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
