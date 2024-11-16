import { Menu, X, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Link } from './Link';

interface HeaderProps {
  onBookingClick?: () => void;
}

export function Header({ onBookingClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
              JustChatIt
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={onBookingClick}
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              Book a Session Today
            </button>
            <Link 
              href="/login"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-lg transition-all"
            >
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <button
              onClick={() => {
                onBookingClick?.();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left text-purple-600 hover:text-purple-700 font-medium py-2"
            >
              Book a Session Today
            </button>
            <Link 
              href="/login"
              className="block px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center"
            >
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}