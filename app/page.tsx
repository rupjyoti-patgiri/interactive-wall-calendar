"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Edit3 } from 'lucide-react';

// Define the shape of our calendar cell objects so TypeScript knows exactly what's inside
interface CalendarCell {
  date: Date;
  isCurrentMonth: boolean;
}

export default function App() {
  // --- STATE MANAGEMENT ---
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // --- DYNAMIC IMAGES ---
  const monthImages: string[] = [
    "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1483168527879-c66136b56105?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1444459094717-a39f1e3e0903?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1544274411-a7afe6230711?auto=format&fit=crop&q=80&w=1200" 
  ];

  // --- LOCAL STORAGE LOGIC ---
  const getStorageKey = (date: Date): string => `calendar_notes_${date.getFullYear()}_${date.getMonth()}`;

  useEffect(() => {
    setIsLoaded(true);
    try {
      const savedNotes = localStorage.getItem(getStorageKey(currentDate));
      if (savedNotes !== null) {
        setNotes(savedNotes);
      } else {
        setNotes('');
      }
    } catch (error) {
      console.error("Local storage not accessible", error);
    }
  }, [currentDate]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    try {
      localStorage.setItem(getStorageKey(currentDate), newNotes);
    } catch (error) {
      console.error("Failed to save to local storage", error);
    }
  };

  // --- CALENDAR LOGIC ---
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  const jumpToToday = () => {
    setCurrentDate(new Date());
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  // STRICT TYPING: explicitly declaring this array's contents
  const calendarCells: CalendarCell[] = [];
  
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarCells.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }
  
  const remainingCells = 42 - calendarCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarCells.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  // --- SELECTION LOGIC ---
  const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 || !date2) return false;
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isDateBetween = (target: Date, start: Date | null, end: Date | null): boolean => {
    if (!start || !end) return false;
    const startDate = start < end ? start : end;
    const endDate = start < end ? end : start;
    return target > startDate && target < endDate;
  };

  const handleDayClick = (clickedDate: Date) => {
    if (!selectionStart || (selectionStart && selectionEnd)) {
      setSelectionStart(clickedDate);
      setSelectionEnd(null);
    } else {
      setSelectionEnd(clickedDate);
    }
  };

  const handleDayMouseEnter = (date: Date) => {
    if (selectionStart && !selectionEnd) {
      setHoverDate(date);
    }
  };

  const handleMouseLeaveGrid = () => {
    setHoverDate(null);
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-blue-200">
      
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl shadow-neutral-300/50 overflow-hidden flex flex-col md:flex-row relative">
        
        <div className="absolute top-0 left-0 w-full h-4 flex justify-around items-center px-8 z-20 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-2 h-6 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full shadow-inner transform -translate-y-2 border border-gray-400">
               <div className="w-full h-1/2 bg-black/20 rounded-t-full"></div>
            </div>
          ))}
        </div>

        <div className="relative w-full md:w-5/12 h-64 md:h-auto overflow-hidden bg-neutral-900 group">
          <img 
            src={monthImages[month]} 
            alt={`Scenery for ${monthNames[month]}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
            <h2 className="text-white text-5xl font-light tracking-tight mb-1">
              {year}
            </h2>
            <h1 className="text-white text-4xl font-bold uppercase tracking-widest text-blue-400">
              {monthNames[month]}
            </h1>
            
            <div className="mt-6 text-white/80 text-sm font-medium h-6">
              {selectionStart && !selectionEnd && (
                <span className="flex items-center gap-2">
                  <CalendarIcon size={16} className="text-blue-400" /> 
                  Selecting range from {selectionStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}...
                </span>
              )}
              {selectionStart && selectionEnd && (
                <span className="flex items-center gap-2">
                  <CalendarIcon size={16} className="text-blue-400" /> 
                  {selectionStart < selectionEnd 
                    ? `${selectionStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${selectionEnd.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`
                    : `${selectionEnd.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${selectionStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`
                  }
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-7/12 p-6 sm:p-10 flex flex-col pt-12 md:pt-10">
          
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => changeMonth(-1)}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors"
              aria-label="Previous Month"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={jumpToToday}
              className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
            >
              Today
            </button>
            
            <button 
              onClick={() => changeMonth(1)}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors"
              aria-label="Next Month"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs font-bold text-neutral-400 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          <div 
            className="grid grid-cols-7 gap-y-2 mb-8"
            onMouseLeave={handleMouseLeaveGrid}
          >
            {calendarCells.map((cell, index) => {
              const date = cell.date;
              const isToday = isSameDay(date, new Date());
              const isStart = isSameDay(date, selectionStart);
              const isEnd = isSameDay(date, selectionEnd);
              
              const isBetweenSelection = selectionStart && selectionEnd && isDateBetween(date, selectionStart, selectionEnd);
              const isBetweenHover = selectionStart && !selectionEnd && hoverDate && isDateBetween(date, selectionStart, hoverDate);
              const isMidRange = isBetweenSelection || isBetweenHover;

              let baseClasses = "relative h-10 w-full flex items-center justify-center text-sm cursor-pointer transition-all duration-200 select-none ";
              
              if (!cell.isCurrentMonth) baseClasses += "text-neutral-300 ";
              else if (isStart || isEnd) baseClasses += "text-white font-bold z-10 ";
              else if (isToday) baseClasses += "text-blue-600 font-bold ";
              else baseClasses += "text-neutral-700 hover:text-black ";

              let bgClasses = "";
              if (isMidRange) {
                bgClasses = "bg-blue-50 "; 
              }

              // STRICT TYPING LOGIC FIX
              if (isStart && (selectionEnd || hoverDate)) {
                const compareDate = selectionEnd || hoverDate;
                if (compareDate) {
                  if (date < compareDate) bgClasses += "bg-gradient-to-r from-transparent to-blue-50 ";
                  else if (date > compareDate) bgClasses += "bg-gradient-to-l from-transparent to-blue-50 ";
                }
              }
              if (isEnd && selectionStart) {
                if (selectionStart) {
                  if (date > selectionStart) bgClasses += "bg-gradient-to-l from-transparent to-blue-50 ";
                  else if (date < selectionStart) bgClasses += "bg-gradient-to-r from-transparent to-blue-50 ";
                }
              }

              return (
                <div 
                  key={index} 
                  className={`${baseClasses} ${bgClasses}`}
                  onClick={() => handleDayClick(date)}
                  onMouseEnter={() => handleDayMouseEnter(date)}
                >
                  <span className={`
                    absolute h-8 w-8 flex items-center justify-center rounded-full
                    ${(isStart || isEnd) ? 'bg-blue-600 shadow-md shadow-blue-500/40 scale-110' : ''}
                    ${(!isStart && !isEnd && cell.isCurrentMonth) ? 'hover:bg-neutral-200' : ''}
                  `}>
                    {date.getDate()}
                  </span>
                  
                  {isToday && !isStart && !isEnd && (
                    <span className="absolute bottom-1 w-1 h-1 bg-blue-600 rounded-full"></span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-auto border-t border-neutral-100 pt-6">
            <div className="flex items-center gap-2 mb-3 text-neutral-700">
              <Edit3 size={18} className="text-neutral-400" />
              <h3 className="font-semibold text-sm">Notes for {monthNames[month]}</h3>
            </div>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Jot down memos, goals, or reminders for this month..."
              className="w-full h-28 p-3 text-sm bg-neutral-50 text-neutral-700 border border-neutral-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all placeholder:text-neutral-400"
            />
            <p className="text-xs text-neutral-400 mt-2 text-right">
              Notes save automatically to your browser.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}