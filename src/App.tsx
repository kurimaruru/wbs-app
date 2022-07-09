import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { WbsRoot } from './pages/MainWbs/wbsRoot';
import { WbsDetail } from './pages/MainWbs/wbsDetail';
import { ToDoList } from './pages/ToDoList/ToDoList';
import { Calendar } from './pages/Calendar/Calendar';

export const App = (): JSX.Element | null => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate replace to='/wbs' />} />
          <Route path='/wbs' element={<WbsRoot />} />
          <Route path='/wbsdetail' element={<WbsDetail />} />
          <Route path='/todo' element={<ToDoList />} />
          <Route path='/calendar' element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
