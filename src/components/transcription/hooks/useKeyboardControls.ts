import { useEffect, useCallback } from 'react';

interface UseKeyboardControlsProps 
{
  handlePrevSegment: () => void;
  handleNextSegment: () => void;
  togglePlayPause: () => void;
}

export function useKeyboardControls({ handlePrevSegment, handleNextSegment, togglePlayPause }: UseKeyboardControlsProps) 
{
  // Effect for keyboard controls
  const handleKeyDown = useCallback((event: KeyboardEvent) => 
  {
    const target = event.target as HTMLElement;
    // Ignore if focus is on an input, select, textarea, or contentEditable element
    if (target && (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) 
    {
      return;
    }

    switch (event.key) 
    {
      case 'ArrowLeft':
        event.preventDefault();
        handlePrevSegment();
        break;
      case 'ArrowRight':
        event.preventDefault();
        handleNextSegment();
        break;
      case ' ': // Space bar
        event.preventDefault();
        togglePlayPause();
        break;
      default:
        break;
    }
  }, [handlePrevSegment, handleNextSegment, togglePlayPause]);

  useEffect(() => 
  {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
} 