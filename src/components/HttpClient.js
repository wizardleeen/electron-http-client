import React, { useState } from 'react';
import axios from 'axios';
import './HttpClient.css';

const HttpClient = () => {
  const [request, setRequest] = useState({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    headers: '',
    body: ''
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Parse headers
      let headers = {};
      if (request.headers.trim()) {
        const headerLines = request.headers.split('\n');
        headerLines.forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            headers[key.trim()] = valueParts.join(':').trim();
          }
        });
      }

      // Parse body
      let data = null;
      if (request.body.trim() && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
        try {
          data = JSON.parse(request.body);
        } catch {
          data = request.body;
        }
      }

      const startTime = Date.now();
      const axiosResponse = await axios({
        method: request.method,
        url: request.url,
        headers,
        data,
        timeout: 30000
      });
      const endTime = Date.now();

      setResponse({
        status: axiosResponse.status,
        statusText: axiosResponse.statusText,
        headers: axiosResponse.headers,
        data: axiosResponse.data,
        time: endTime - startTime
      });
    } catch (err) {
      setError({
        message: err.message,
        response: err.response ? {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data
        } : null
      });
    } finally {
      setLoading(false);
    }
  };

  const clearResponse = () => {
    setResponse(null);
    setError(null);
  };

  return (
    <div className="http-client">
      <div className="request-panel">
        <form onSubmit={handleSubmit}>
          <div className="request-line">
            <select
              value={request.method}
              onChange={(e) => setRequest({...request, method: e.target.value})}
              className="method-select"
            >
              {methods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
            <input
              type="text"
              value={request.url}
              onChange={(e) => setRequest({...request, url: e.target.value})}
              placeholder="Enter URL"
              className="url-input"
              required
            />
            <button type="submit" disabled={loading} className="send-button">
              {loading ? 'Sending...' : 'Send'}
            </button>
            <button type="button" onClick={clearResponse} className="clear-button">
              Clear
            </button>
          </div>

          <div className="request-body">
            <div className="section">
              <h3>Headers</h3>
              <textarea
                value={request.headers}
                onChange={(e) => setRequest({...request, headers: e.target.value})}
                placeholder="Content-Type: application/json\nAuthorization: Bearer token"
                className="headers-textarea"
                rows={4}
              />
            </div>

            {['POST', 'PUT', 'PATCH'].includes(request.method) && (
              <div className="section">
                <h3>Body</h3>
                <textarea
                  value={request.body}
                  onChange={(e) => setRequest({...request, body: e.target.value})}
                  placeholder='{\n  "key": "value"\n}'
                  className="body-textarea"
                  rows={6}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {(response || error) && (
        <div className="response-panel">
          <h3>Response</h3>
          
          {response && (
            <div className="response-content">
              <div className="response-meta">
                <span className={`status status-${Math.floor(response.status / 100)}xx`}>
                  {response.status} {response.statusText}
                </span>
                <span className="time">{response.time}ms</span>
              </div>
              
              <div className="response-headers">
                <h4>Headers</h4>
                <pre>{JSON.stringify(response.headers, null, 2)}</pre>
              </div>
              
              <div className="response-body">
                <h4>Body</h4>
                <pre>{JSON.stringify(response.data, null, 2)}</pre>
              </div>
            </div>
          )}

          {error && (
            <div className="error-content">
              <div className="error-message">
                <strong>Error:</strong> {error.message}
              </div>
              {error.response && (
                <div className="error-response">
                  <div className="response-meta">
                    <span className="status status-error">
                      {error.response.status} {error.response.statusText}
                    </span>
                  </div>
                  <div className="response-body">
                    <h4>Error Response</h4>
                    <pre>{JSON.stringify(error.response.data, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HttpClient;
