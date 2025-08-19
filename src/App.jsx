import React, { useState, useEffect } from 'react';
import { Calendar, Droplets, Bell, Settings, List, Grid, Moon, Sun } from 'lucide-react';

const WaterSupplyReminder = () => {
  const [lastSupplyDate, setLastSupplyDate] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [view, setView] = useState('home'); // 'home', 'calendar', 'list'
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedDate = localStorage.getItem('lastSupplyDate');
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedNotifications = localStorage.getItem('notificationsEnabled') === 'true';
    
    if (savedDate) setLastSupplyDate(savedDate);
    setIsDarkMode(savedDarkMode);
    setNotificationsEnabled(savedNotifications);
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (lastSupplyDate) {
      localStorage.setItem('lastSupplyDate', lastSupplyDate);
    }
  }, [lastSupplyDate]);

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('notificationsEnabled', notificationsEnabled.toString());
  }, [notificationsEnabled]);

  // Calculate all supply dates (past and future) from a starting point
  const getAllSupplyDates = (startDate, monthsRange = 3) => {
    if (!startDate) return [];
    
    const dates = [];
    const start = new Date(startDate);
    const today = new Date();
    
    // Calculate dates going backwards (past dates)
    for (let i = 1; i <= 60; i++) {
      const pastDate = new Date(start);
      pastDate.setDate(start.getDate() - (i * 2));
      dates.unshift(pastDate);
    }
    
    // Add the start date
    dates.push(new Date(start));
    
    // Calculate dates going forwards (future dates)
    for (let i = 1; i <= 60; i++) {
      const futureDate = new Date(start);
      futureDate.setDate(start.getDate() + (i * 2));
      dates.push(futureDate);
    }
    
    return dates;
  };

  // Calculate next supply dates
  const getNextSupplyDates = (lastDate, count = 7) => {
    if (!lastDate) return [];
    
    const dates = [];
    const last = new Date(lastDate);
    
    for (let i = 1; i <= count; i++) {
      const nextDate = new Date(last);
      nextDate.setDate(last.getDate() + (i * 2)); // Every alternate day
      dates.push(nextDate);
    }
    
    return dates;
  };

  const getNextSupplyDate = () => {
    const nextDates = getNextSupplyDates(lastSupplyDate, 1);
    return nextDates.length > 0 ? nextDates[0] : null;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateShort = (date) => {
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilNext = (nextDate) => {
    if (!nextDate) return 0;
    const today = new Date();
    const diffTime = nextDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
    }
  };

  const nextSupplyDate = getNextSupplyDate();
  const daysUntil = nextSupplyDate ? getDaysUntilNext(nextSupplyDate) : 0;
  const upcomingDates = getNextSupplyDates(lastSupplyDate, 7);

  // Calendar component
  const CalendarView = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Get all supply dates for the current month
    const allSupplyDates = getAllSupplyDates(lastSupplyDate);
    const supplyDates = allSupplyDates
      .filter(date => date.getMonth() === currentMonth && date.getFullYear() === currentYear)
      .map(date => date.getDate());
    
    const renderCalendarDays = () => {
      const days = [];
      
      // Empty cells for days before month starts
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(<div key={`empty-${i}`} className="p-3"></div>);
      }
      
      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
     // नया code करें:
     const isToday = day === today.getDate() && 
                currentMonth === today.getMonth() && 
                currentYear === today.getFullYear();
        const isSupplyDay = supplyDates.includes(day);
        
        days.push(
          <div
            key={day}
            className={`p-3 text-center rounded-lg transition-colors ${
             isToday 
             ? `${isDarkMode ? 'bg-green-600 text-white border-2 border-green-400' : 'bg-green-500 text-white border-2 border-green-300'}` 
             : isSupplyDay 
             ? `${isDarkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-700'}` 
             : `${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
            }`}
          >
            <span className="text-sm font-medium">{day}</span>
            {isSupplyDay && (
              <Droplets className="w-3 h-3 mx-auto mt-1 text-blue-500" />
            )}
          </div>
        );
      }
      
      return days;
    };

    return (
      <div className="space-y-4">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {today.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="grid grid-cols-7 gap-1 text-xs font-medium text-gray-500 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <Droplets className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Water Supply
            </h1>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <div className={`flex rounded-lg p-1 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-sm`}>
          {[
            { key: 'home', icon: Grid, label: 'Home' },
            { key: 'calendar', icon: Calendar, label: 'Calendar' },
            { key: 'list', icon: List, label: 'Upcoming' }
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md transition-colors ${
                view === key
                  ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                  : `${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        {view === 'home' && (
          <div className="space-y-6">
            {/* Date Input */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <label className={`block text-sm font-medium mb-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Last Water Supply Date
              </label>
              <input
                type="date"
                value={lastSupplyDate}
                onChange={(e) => setLastSupplyDate(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              />
              {lastSupplyDate && (
                <p className={`text-xs mt-2 ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}>
                  ✓ Date saved automatically
                </p>
              )}
            </div>

            {!lastSupplyDate && (
              <div className={`rounded-2xl p-6 ${
                isDarkMode ? 'bg-yellow-900 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'
              } shadow-lg text-center`}>
                <div className="flex justify-center mb-3">
                  <Calendar className={`w-8 h-8 ${
                    isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? 'text-yellow-200' : 'text-yellow-800'
                }`}>
                  Set Your Last Supply Date
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-yellow-300' : 'text-yellow-700'
                }`}>
                  Enter the last date when water was supplied to start tracking your schedule automatically.
                </p>
              </div>
            )}
            {/* Next Supply Info */}
            {nextSupplyDate && (
              <div className={`rounded-2xl p-6 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg text-center`}>
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${
                    isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
                  }`}>
                    <Droplets className={`w-8 h-8 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  </div>
                </div>
                <h2 className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Next Water Supply
                </h2>
                <p className={`text-2xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {formatDateShort(nextSupplyDate)}
                </p>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {daysUntil === 0 ? 'Today' : 
                   daysUntil === 1 ? 'Tomorrow' : 
                   `In ${daysUntil} days`}
                </p>
                <p className={`text-xs mt-2 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {formatDate(nextSupplyDate)}
                </p>
              </div>
            )}

            {/* Quick Settings */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Settings
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className={`w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                  <span className={`${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Browser Notifications
                  </span>
                </div>
                <button
                  onClick={requestNotificationPermission}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    notificationsEnabled
                      ? `${isDarkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800'}`
                      : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                  }`}
                >
                  {notificationsEnabled ? 'Enabled' : 'Enable'}
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'calendar' && (
          <div className={`rounded-2xl p-6 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <CalendarView />
          </div>
        )}

        {view === 'list' && (
          <div className={`rounded-2xl p-6 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Upcoming Supply Days
            </h3>
            <div className="space-y-3">
              {upcomingDates.map((date, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    index === 0 
                      ? `${isDarkMode ? 'bg-blue-900 border border-blue-700' : 'bg-blue-50 border border-blue-200'}` 
                      : `${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Droplets className={`w-4 h-4 ${
                      index === 0 
                        ? `${isDarkMode ? 'text-blue-400' : 'text-blue-600'}` 
                        : `${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`
                    }`} />
                    <div>
                      <p className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {formatDateShort(date)}
                      </p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {date.toLocaleDateString('en-IN', { weekday: 'long' })}
                      </p>
                    </div>
                  </div>
                  {index === 0 && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-200 text-blue-800'
                    }`}>
                      Next
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaterSupplyReminder;
