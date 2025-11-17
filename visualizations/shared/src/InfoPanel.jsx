import React from 'react';

export function InfoPanel({ title, content, onClose, citations }) {
  if (!title && !content) return null;

  return (
    <div className="info-panel fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-xl max-w-md z-50">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            >
              ×
            </button>
          )}
        </div>
        <div className="text-sm text-gray-700 mb-3">
          {content}
        </div>
        {citations && citations.length > 0 && (
          <div className="border-t pt-3 mt-3">
            <h4 className="text-xs font-semibold text-gray-600 mb-2">References:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {citations.map((citation, idx) => (
                <li key={idx} className="font-mono">{citation}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

