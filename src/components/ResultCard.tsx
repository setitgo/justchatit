import { ExternalLink } from 'lucide-react';

interface Statistic {
  text: string;
  source: string;
  url: string;
}

interface Section {
  id: string;
  title: string;
  icon: JSX.Element;
  inputLabel: string;
  inputPlaceholder: string;
  secondaryInputLabel?: string;
  secondaryInputPlaceholder?: string;
  source: string;
  sourceUrl: string;
  statistics: Statistic[];
}

interface ResultCardProps {
  section: Section;
  value: string;
  secondaryValue?: string;
  onChange: (value: string) => void;
  onSecondaryChange?: (value: string) => void;
  calculatedValue: number;
}

export function ResultCard({ 
  section, 
  value, 
  secondaryValue,
  onChange, 
  onSecondaryChange,
  calculatedValue 
}: ResultCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-purple-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-lg">
          {section.icon}
        </div>
        <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
          {section.title}
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {section.inputLabel}
          </label>
          <input
            type="number"
            min="0"
            placeholder={section.inputPlaceholder}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        {section.secondaryInputLabel && onSecondaryChange && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {section.secondaryInputLabel}
            </label>
            <input
              type="number"
              min="0"
              placeholder={section.secondaryInputPlaceholder}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={secondaryValue}
              onChange={(e) => onSecondaryChange(e.target.value)}
            />
          </div>
        )}

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="text-lg font-semibold text-purple-900 mb-2">
            Potential Annual Savings
          </div>
          <div className="text-3xl font-bold text-purple-700">
            ${calculatedValue.toLocaleString()}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Key Statistics:</h4>
          <div className="space-y-3">
            {section.statistics.map((stat, index) => (
              <div key={index} className="text-sm">
                <p className="text-gray-700 mb-1">{stat.text}</p>
                <a
                  href={stat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-medium"
                >
                  <span>Source: {stat.source}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <a
            href={section.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            <span>Learn more about {section.source}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}