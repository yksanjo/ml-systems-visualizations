import React from 'react';

export function ParameterSlider({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step = 1,
  unit = '',
  description 
}) {
  return (
    <div className="parameter-slider mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <span className="text-sm text-gray-600">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
}

