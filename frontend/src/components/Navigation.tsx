import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Book, Activity, Beaker, Shield } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Layout, label: 'Dashboard', path: '/' },
    { icon: Activity, label: 'Learning Progress', path: '/progress' },
    { icon: Book, label: 'Resources', path: '/resources' },
    { icon: Beaker, label: 'Labs', path: '/labs' },
    { icon: Shield, label: 'Security Tools', path: '/tools' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">
                Ethical Hacking Platform
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium 
                    ${location.pathname === item.path 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 