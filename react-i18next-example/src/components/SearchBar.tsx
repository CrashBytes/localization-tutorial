import React, { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

export const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate search
    setTimeout(() => {
      setResults([]);
      setLoading(false);
    }, 1000);
  };
  
  return (
    <form role="search" onSubmit={handleSubmit}>
      <label htmlFor="search" className="sr-only">
        {t('products.search.label')}
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label={t('products.search.aria.searchInput')}
        aria-describedby="search-help"
        placeholder={t('products.search.placeholder')}
      />
      <span id="search-help" className="sr-only">
        {t('products.search.aria.searchInput')}
      </span>
      <button 
        type="submit"
        aria-label={t('products.search.aria.submitButton')}
        disabled={!query || loading}
      >
        {t('products.search.button')}
      </button>
      <button
        type="button"
        onClick={() => setQuery('')}
        aria-label={t('products.search.aria.clearButton')}
        disabled={!query}
      >
        ×
      </button>
      
      {/* Screen reader announcement region */}
      <div
        role="region"
        aria-live="polite"
        aria-label={t('products.search.aria.resultsRegion')}
      >
        {loading && <p>{t('products.search.aria.loading')}</p>}
        {!loading && results.length === 0 && query && (
          <p>{t('products.search.aria.noResults')}</p>
        )}
        {!loading && results.length > 0 && (
          <p>{t('products.search.resultsCount', { count: results.length })}</p>
        )}
      </div>
    </form>
  );
};
