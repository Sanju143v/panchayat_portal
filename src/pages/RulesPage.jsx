import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Search, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export default function RulesPage() {
  const { state, searchRules } = useApp();
  const [query, setQuery] = useState('');
  const [expandedRule, setExpandedRule] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(state.rules.map(r => r.category))];

  const filteredRules = (() => {
    let rules = state.rules;

    if (query.trim()) {
      rules = searchRules(query);
    }

    if (selectedCategory !== 'all') {
      rules = rules.filter(r => r.category === selectedCategory);
    }

    return rules;
  })();

  return (
    <div className="fade-in">
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 'var(--space-xl)' }}>
        Search the society bylaws and regulations. ಸಮಾಜದ ನಿಯಮಗಳು ಮತ್ತು ನಿಬಂಧನೆಗಳನ್ನು ಹುಡುಕಿ.
      </p>

      {/* Search */}
      <div className="rulebook-search">
        <div style={{ position: 'relative', flex: 1 }}>
          <Search
            size={18}
            style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
          />
          <input
            id="rule-search"
            type="text"
            className="form-input"
            placeholder="Search rules... e.g., 'parking', 'gym timing', 'pet policy'..."
            style={{ paddingLeft: 44, paddingTop: '1rem', paddingBottom: '1rem', borderRadius: 'var(--radius-xl)', fontSize: '1rem' }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 'var(--space-xl)', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`lang-option ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
            style={{ textTransform: 'capitalize' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rules List */}
      {filteredRules.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><BookOpen size={32} /></div>
          <div className="empty-state-title">No matching rules found</div>
          <div className="empty-state-desc">
            Try different keywords or browse by category. You can also ask the AI Assistant for specific rule queries.
          </div>
        </div>
      ) : (
        <div>
          {filteredRules.map(rule => (
            <div
              key={rule.id}
              className="rule-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setExpandedRule(expandedRule === rule.id ? null : rule.id)}
            >
              <div className="rule-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <span className="rule-number">{rule.number}</span>
                  <span className="rule-category">{rule.category}</span>
                </div>
                {expandedRule === rule.id ? <ChevronUp size={18} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />}
              </div>
              <div className="rule-title">{rule.title}</div>
              {expandedRule === rule.id && (
                <div className="rule-content" style={{ marginTop: 'var(--space-md)', animation: 'fade-in 0.3s ease-out' }}>
                  {rule.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
