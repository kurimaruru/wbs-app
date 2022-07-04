import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WbsRoot } from './pages/mainWbs/wbsRoot';
import { WbsDetail } from './pages/mainWbs/wbsDetail';
import { ToDoList } from './pages/ToDoList/ToDoList';

export const App = (): JSX.Element | null => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/wbs' element={<WbsRoot />} />
          <Route path='/wbsdetail' element={<WbsDetail />} />
          <Route path='/todo' element={<ToDoList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
