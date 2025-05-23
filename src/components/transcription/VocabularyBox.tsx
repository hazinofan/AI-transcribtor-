import React from 'react';
import { useTranslation } from 'next-i18next';
import { KeyVocabulary } from '../../types/transcription';
import styles from '../../styles/components/VocabularyBox.module.css';

interface VocabularyBoxProps 
{
  keyVocabulary: KeyVocabulary[][] | null;
  currentSegment: number;
}

export function VocabularyBox({ keyVocabulary, currentSegment }: VocabularyBoxProps) 
{
  const { t } = useTranslation('common');

  if (!keyVocabulary || !keyVocabulary[currentSegment] || keyVocabulary[currentSegment].length === 0) 
  {
    return null;
  }

  return (
    <div className={styles.vocabularyBox}>
      <h3 className={styles.vocabularyTitle}>{t('key_vocabulary')}</h3>
      <ul className={styles.vocabularyList}>
        {keyVocabulary[currentSegment].map((vocab, j) => (
          <li key={j} className={styles.vocabularyItem}>
            <span className={styles.vocabularyArabic}>{vocab.original}</span>
            <span className={styles.vocabularyTranslation}>{vocab.translation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 