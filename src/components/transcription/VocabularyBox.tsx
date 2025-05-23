import React from 'react';
import { useTranslation } from 'next-i18next';
import { KeyVocab } from '../../types/transcription';
import styles from '../../styles/transcription.module.css';

interface VocabularyBoxProps 
{
  keyVocab: KeyVocab[][] | null;
  currentSegment: number;
}

export function VocabularyBox({ keyVocab, currentSegment }: VocabularyBoxProps) 
{
  const { t } = useTranslation('common');

  if (!keyVocab || !keyVocab[currentSegment] || keyVocab[currentSegment].length === 0) 
  {
    return null;
  }

  return (
    <div className={styles.vocabularyBox}>
      <h3 className={styles.vocabularyTitle}>{t('key_vocabulary')}</h3>
      <ul className={styles.vocabularyList}>
        {keyVocab[currentSegment].map((vocab, j) => (
          <li key={j} className={styles.vocabularyItem}>
            <span className={styles.vocabularyArabic}>{vocab.original}</span>
            <span className={styles.vocabularyTranslation}>{vocab.translation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 