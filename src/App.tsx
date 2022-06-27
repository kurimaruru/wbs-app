import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WbsRoot } from './pages/mainWbs/wbsRoot';
import { ToDoList } from './pages/ToDoList/ToDoList';

export const App = (): JSX.Element | null => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WbsRoot />} />
          <Route path='/todo' element={<ToDoList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
