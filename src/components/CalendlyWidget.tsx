import { useEffect } from 'react';

interface CalendlyWidgetProps {
  url: string;
}

export function CalendlyWidget({ url }: CalendlyWidgetProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className="calendly-inline-widget" 
      data-url={url}
      style={{ minWidth: '320px', height: '700px' }}
    />
  );
}