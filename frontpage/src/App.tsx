import { useState } from 'react';
import List from './components/list';
import Form from './components/form';

function App() {
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <div className="app-container">
      {error && (
        <div className="notification is-danger is-light mb-5">
          <button className="delete" onClick={() => setError(null)}></button>
          {error}
        </div>
      )}
      
      <div className="columns">
        <div className="column is-7">
          <List 
            setError={setError}
            refreshTrigger={refreshTrigger}
          />
        </div>
        <div className="column is-5">
          <Form 
            onRefresh={handleRefresh}
            setError={setError}
          />
        </div>
      </div>
    </div>
  );
}

export default App;