import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import styles from '../../styles/components/LanguageSelector.module.css';

interface Language {
  code: string;
  label: string;
  flag: string;
}

export default function LanguageSelector() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = [
    { code: 'fr', label: t('lang_fr'), flag: '/assets/flag-fr.svg' },
    { code: 'en', label: t('lang_en'), flag: '/assets/flag-en.svg' },
    { code: 'es', label: t('lang_es'), flag: '/assets/flag-es.svg' },
    { code: 'it', label: t('lang_it'), flag: '/assets/flag-it.svg' },
    { code: 'de', label: t('lang_de'), flag: '/assets/flag-de.svg' },
    { code: 'nl', label: t('lang_nl'), flag: '/assets/flag-nl.svg' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  const handleLocaleChange = (newLocale: string) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.languageSelector} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <div className={styles.currentLanguageContent}>
          {currentLanguage && (
            <img 
              src={currentLanguage.flag} 
              alt={`${currentLanguage.label} flag`}
              className={styles.flag}
            />
          )}
          <span className={styles.currentLanguage}>
            {currentLanguage?.label || 'Language'}
          </span>
        </div>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M4.427 9.573l3.396-3.396a.25.25 0 01.354 0l3.396 3.396a.25.25 0 01-.177.427H4.604a.25.25 0 01-.177-.427z"/>
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {languages.map((language) => (
            <li key={language.code}>
              <button
                className={`${styles.option} ${locale === language.code ? styles.active : ''}`}
                onClick={() => handleLocaleChange(language.code)}
                role="option"
                aria-selected={locale === language.code}
              >
                <div className={styles.optionContent}>
                  <img 
                    src={language.flag} 
                    alt={`${language.label} flag`}
                    className={styles.flag}
                  />
                  <span>{language.label}</span>
                </div>
                {locale === language.code && (
                  <svg
                    className={styles.checkmark}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 