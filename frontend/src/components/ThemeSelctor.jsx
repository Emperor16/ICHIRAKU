import React from 'react'
import { PaletteIcon } from "lucide-react"
import { useEffect, useState } from 'react';

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];
function ThemeSelctor() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  useEffect(() =>{
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className='dropdown dropdown-end'>
        <div tabIndex={ 0 } role='button' className='btn btn-ghost btn-sm gap-1'>
            <PaletteIcon className='size-4' />
            <span className='hidden sm:inline'>Theme</span>
        </div>
    
        <ul 
        tabIndex={ 0 } 
        className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4'>
            {THEMES.map((t) => (
                <li key={t}>
                    <button onClick={() => setTheme(t)}
                        className={`flex justify-between ${
                        theme === t ? 'bg-primary text-primary-content' : ''
                        }`}
                    >
                        <span className='capitalize'>{t}</span>
                        <div className='flex gap-0.5' data-theme={t}>
                            <span className='w-2 h-4 rounded-sm bg-primary' />
                            <span className='w-2 h-4 rounded-sm bg-secondary' />
                            <span className='w-2 h-4 rounded-sm bg-accent' />
                            <span className='w-2 h-4 rounded-sm bg-neutral' />
                        </div>
                    </button>
                </li>
            ))}
        </ul>
    </div>
  );
}


export default ThemeSelctor