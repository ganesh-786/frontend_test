import React from "react";
import { HelpCircle, ArrowRight, CheckCircle } from "lucide-react";

const ClarifyingQuestion = ({
  question,
  suggestedApis,
  originalQuery,
  onApiSelect,
  isLoading = false,
}) => {
  const handleApiClick = (api) => {
    if (onApiSelect) {
      onApiSelect(api);
    }
  };

  return (
    <div className="clarifying-question">
      <div className="clarifying-header">
        <HelpCircle size={20} className="clarifying-icon" />
        <span className="clarifying-title">API Clarification Needed</span>
      </div>

      <div className="clarifying-content">
        <div className="clarifying-question-text">{question}</div>

        {originalQuery && (
          <div className="original-query">
            <span className="query-label">Your question:</span>
            <span className="query-text">"{originalQuery}"</span>
          </div>
        )}

        {suggestedApis && suggestedApis.length > 0 && (
          <div className="suggested-apis">
            <div className="apis-label">Choose an API:</div>
            <div className="apis-grid">
              {suggestedApis.map((api, index) => (
                <button
                  key={index}
                  className="api-option"
                  onClick={() => handleApiClick(api)}
                  disabled={isLoading}
                >
                  <div className="api-option-content">
                    <span className="api-name">{api}</span>
                    <ArrowRight size={16} className="api-arrow" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="clarifying-note">
          <CheckCircle size={16} className="note-icon" />
          <span>
            Selecting an API will help me provide more targeted and accurate
            information.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClarifyingQuestion;
