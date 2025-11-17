import React from 'react';

export function ControlPanel({ 
  isPlaying, 
  onPlayPause, 
  speed, 
  onSpeedChange,
  viewMode,
  onViewModeChange,
  onReset
}) {
  return (
    <div className="control-panel bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-lg">
      <div className="flex flex-wrap items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={onPlayPause}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>

        {/* Speed Control */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Speed:</label>
          <input
            type="range"
            min="0.25"
            max="3"
            step="0.25"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="w-24"
          />
          <span className="text-sm text-gray-600 w-12">{speed}x</span>
        </div>

        {/* View Mode Toggle */}
        {onViewModeChange && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">View:</label>
            <select
              value={viewMode}
              onChange={(e) => onViewModeChange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="simplified">Simplified</option>
              <option value="detailed">Detailed</option>
            </select>
          </div>
        )}

        {/* Reset Button */}
        {onReset && (
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

