import { useState } from 'react';
import { Button } from './components/ui/button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button onClick={() => setCount(count + 1)}>Hello, World</Button>
      <p>{count}</p>
    </>
  );
}

export default App;
