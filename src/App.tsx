import { useState } from 'react';
import { Button } from './components/ui/button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold">Hello, World</h1>
      <h2>Main Branch</h2>
      <Button onClick={() => setCount(count + 1)}>Count +1</Button>
      <p>{count}</p>
    </>
  );
}

export default App;
