import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Theme context
const ThemeContext = createContext();

// Theme action types
const TOGGLE_THEME = 'TOGGLE_THEME';
const SET_THEME = 'SET_THEME';

// Theme reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        isDark: !state.isDark,
      };
    case SET_THEME:
      return {
        ...state,
        isDark: action.payload,
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isDark: false,
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      dispatch({ type: SET_THEME, payload: true });
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    dispatch({ type: TOGGLE_THEME });
    
    if (state.isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Set specific theme
  const setTheme = (isDark) => {
    dispatch({ type: SET_THEME, payload: isDark });
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const value = {
    ...state,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
