import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WbsRoot } from './pages/mainWbs/wbsRoot';

export const App = (): JSX.Element | null => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WbsRoot />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
