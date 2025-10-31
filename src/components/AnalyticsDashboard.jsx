import React, { useState, useEffect, useRef } from "react";
import "./AnalyticsDashboard.css";

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    merchantSegment: "",
    intent: "",
  });
  const fetchTimeoutRef = useRef(null);

  useEffect(() => {
    console.log("🔍 AnalyticsDashboard component mounted");
    const loadData = async () => {
      console.log("🔍 About to fetch analytics data");
      await fetchAnalyticsData();
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAnalyticsData = async (customFilters = null) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      // Use custom filters if provided, otherwise use state filters
      const activeFilters = customFilters || filters;

      if (activeFilters.dateFrom)
        queryParams.append("dateFrom", activeFilters.dateFrom);
      if (activeFilters.dateTo)
        queryParams.append("dateTo", activeFilters.dateTo);
      if (activeFilters.merchantSegment)
        queryParams.append("merchantSegment", activeFilters.merchantSegment);
      if (activeFilters.intent)
        queryParams.append("intent", activeFilters.intent);

      console.log("Fetching analytics with filters:", activeFilters);
      console.log("Query params:", queryParams.toString());

      const response = await fetch(`/api/analytics/dashboard?${queryParams}`);

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Analytics data received:", data);

      if (data.success) {
        console.log("Analytics data breakdown:", {
          totalQuestions: data.data?.totalQuestions,
          topQuestionsCount: data.data?.topQuestions?.length || 0,
          topQuestions: data.data?.topQuestions?.slice(0, 3) || [],
          intentDistribution: data.data?.intentDistribution,
          hasMerchantInsights: !!data.data?.merchantSegmentInsights,
        });
        console.log(
          "🔍 FULL ANALYTICS DATA:",
          JSON.stringify(data.data, null, 2)
        );
        setAnalyticsData(data.data);
        setError(null);
      } else {
        setError(data.error || "Failed to fetch analytics data");
      }
    } catch (err) {
      setError(`Failed to fetch analytics data: ${err.message}`);
      console.error("Analytics fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    // Clear any pending fetch timeout
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    // Use current filters state to fetch data with debouncing
    console.log("Applying filters:", filters);

    // Debounce the fetch to prevent rapid consecutive requests
    fetchTimeoutRef.current = setTimeout(() => {
      fetchAnalyticsData(filters);
    }, 300); // Wait 300ms before fetching
  };

  const clearFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      merchantSegment: "",
      intent: "",
    });
    fetchAnalyticsData();
  };

  if (loading) {
    return (
      <div className="analytics-dashboard">
        <div className="loading">Loading analytics data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-dashboard">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="analytics-dashboard">
        <div className="no-data">No analytics data available</div>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-header">
        <h1>📊 Analytics Dashboard</h1>
        <p>Track most-asked questions by merchant segment</p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <h3>Filters</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Date From:</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Date To:</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange("dateTo", e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Merchant Segment:</label>
            <select
              value={filters.merchantSegment}
              onChange={(e) =>
                handleFilterChange("merchantSegment", e.target.value)
              }
            >
              <option value="">All Segments</option>
              <option value="basic">Basic</option>
              <option value="shopify">Shopify</option>
              <option value="advanced">Advanced</option>
              <option value="plus">Plus</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Intent:</label>
            <select
              value={filters.intent}
              onChange={(e) => handleFilterChange("intent", e.target.value)}
            >
              <option value="">All Intents</option>
              <option value="setup">Setup</option>
              <option value="troubleshooting">Troubleshooting</option>
              <option value="optimization">Optimization</option>
              <option value="billing">Billing</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>
        <div className="filter-actions">
          <button onClick={applyFilters} className="apply-btn">
            Apply Filters
          </button>
          <button onClick={clearFilters} className="clear-btn">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="overview-cards">
        <div className="card">
          <div className="card-header">Total Questions</div>
          <div className="card-value">{analyticsData.totalQuestions}</div>
        </div>
        <div className="card">
          <div className="card-header">Average Confidence</div>
          <div className="card-value">
            {(analyticsData.confidenceTrends.averageConfidence * 100).toFixed(
              1
            )}
            %
          </div>
        </div>
        <div className="card">
          <div className="card-header">High Confidence</div>
          <div className="card-value">
            {analyticsData.confidenceTrends.confidenceDistribution.high}
          </div>
        </div>
        <div className="card">
          <div className="card-header">Medium Confidence</div>
          <div className="card-value">
            {analyticsData.confidenceTrends.confidenceDistribution.medium}
          </div>
        </div>
        <div className="card">
          <div className="card-header">Low Confidence</div>
          <div className="card-value">
            {analyticsData.confidenceTrends.confidenceDistribution.low}
          </div>
        </div>
      </div>

      {/* Top Questions */}
      <div className="section">
        <h3>🔝 Top Questions</h3>
        <div className="questions-list">
          {(() => {
            console.log(
              "🔍 Rendering top questions. analyticsData.topQuestions:",
              analyticsData.topQuestions
            );
            console.log("🔍 Type check:", typeof analyticsData.topQuestions);
            console.log(
              "🔍 Is array?",
              Array.isArray(analyticsData.topQuestions)
            );
            console.log("🔍 Length:", analyticsData.topQuestions?.length);

            if (
              analyticsData.topQuestions &&
              analyticsData.topQuestions.length > 0
            ) {
              return analyticsData.topQuestions.map((item, index) => {
                console.log(`🔍 Rendering item ${index}:`, item);
                return (
                  <div key={index} className="question-item">
                    <div className="question-rank">#{index + 1}</div>
                    <div className="question-text">{item.question}</div>
                    <div className="question-count">{item.count} times</div>
                  </div>
                );
              });
            } else {
              console.log("🔍 No top questions to render");
              return (
                <div className="no-questions">No questions tracked yet</div>
              );
            }
          })()}
        </div>
      </div>

      {/* Intent Distribution */}
      <div className="section">
        <h3>🎯 Intent Distribution</h3>
        <div className="intent-distribution">
          {analyticsData.intentDistribution &&
          Object.keys(analyticsData.intentDistribution).length > 0 ? (
            Object.entries(analyticsData.intentDistribution).map(
              ([intent, count]) => (
                <div key={intent} className="intent-item">
                  <div className="intent-name">{intent.replace(/_/g, " ")}</div>
                  <div className="intent-bar">
                    <div
                      className="intent-fill"
                      style={{
                        width: `${
                          analyticsData.totalQuestions > 0
                            ? (count / analyticsData.totalQuestions) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="intent-count">{count}</div>
                </div>
              )
            )
          ) : (
            <div className="no-intents">No intent data available</div>
          )}
        </div>
      </div>

      {/* Merchant Segment Insights */}
      <div className="section">
        <h3>🏪 Merchant Segment Insights</h3>
        <div className="segment-insights">
          <div className="segment-group">
            <h4>By Plan Tier</h4>
            {analyticsData.merchantSegmentInsights?.byPlanTier &&
            Object.keys(analyticsData.merchantSegmentInsights.byPlanTier)
              .length > 0 ? (
              Object.entries(
                analyticsData.merchantSegmentInsights.byPlanTier
              ).map(([tier, data]) => (
                <div key={tier} className="segment-item">
                  <div className="segment-name">{tier}</div>
                  <div className="segment-count">{data.count} questions</div>
                  <div className="segment-intents">
                    {Object.entries(data.intents || {}).map(
                      ([intent, count]) => (
                        <span key={intent} className="intent-tag">
                          {intent}: {count}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-segments">No plan tier data available</div>
            )}
          </div>

          <div className="segment-group">
            <h4>By Store Type</h4>
            {analyticsData.merchantSegmentInsights?.byStoreType &&
            Object.keys(analyticsData.merchantSegmentInsights.byStoreType)
              .length > 0 ? (
              Object.entries(
                analyticsData.merchantSegmentInsights.byStoreType
              ).map(([type, data]) => (
                <div key={type} className="segment-item">
                  <div className="segment-name">{type}</div>
                  <div className="segment-count">{data.count} questions</div>
                  <div className="segment-intents">
                    {Object.entries(data.intents || {}).map(
                      ([intent, count]) => (
                        <span key={intent} className="intent-tag">
                          {intent}: {count}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-segments">No store type data available</div>
            )}
          </div>
        </div>
      </div>

      {/* Source Effectiveness */}
      <div className="section">
        <h3>📚 Source Effectiveness</h3>
        <div className="source-effectiveness">
          {analyticsData.sourceEffectiveness &&
          analyticsData.sourceEffectiveness.length > 0 ? (
            analyticsData.sourceEffectiveness
              .slice(0, 10)
              .map((source, index) => (
                <div key={index} className="source-item">
                  <div className="source-title">
                    {source.title || "Unknown"}
                  </div>
                  <div className="source-category">
                    {source.category || "Unknown"}
                  </div>
                  <div className="source-stats">
                    <span>Used {source.usageCount || 0} times</span>
                    <span>
                      Avg Score: {((source.averageScore || 0) * 100).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              ))
          ) : (
            <div className="no-sources">
              No source effectiveness data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
