import { useState } from 'react';
import KbEditor from "./components/KbEditor";
import KbArticle from './components/KbArticle';
import './app.css';

// Both the edit and view modes are displayed side by side for convenience
// The "view mode" component only re-renders after the save btn is pressed
function App() {
  const [HTMLContent, setHTMLContent] = useState('');
  return (
    <div className='root-content'>
      <KbEditor updateArticle={setHTMLContent} />
      <KbArticle HTMLContent={HTMLContent} />
    </div>
  );
}

export default App;
