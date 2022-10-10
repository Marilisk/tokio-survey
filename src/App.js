import c from './App.module.css';
import SurveyFormContainer from './Components/Survey/SurveyFormContainer.jsx';
import { Routes, Route } from 'react-router-dom';
import EditLayout from './Components/EditLayout/EditLayout';

function App() {
  return <div>
  <div className={c.surveyWrapper}>
    <Routes>
      <Route path='/' element={<SurveyFormContainer />} />
      <Route path='edit/*' element={<EditLayout />} />
    </Routes>
  </div>
</div>
}

export default App;
