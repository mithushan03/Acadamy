
import React from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  user?: {
    name: string;
    studentId: string;
    program: string;
  };
  onLogout?: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-blue-900">
              SEUSL
            </div>
            <div>
              <h1 className="text-xl font-bold">South Eatern University Of Sri Lanka</h1>
              <p className="text-blue-200 text-sm">Academic Portal</p>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold">{user.name}</p>
                <p className="text-blue-200 text-sm">{user.studentId} • {user.program}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-blue-700"
                onClick={onLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
