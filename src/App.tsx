/** @jsxImportSource @emotion/react */
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { WbsRoot } from './pages/MainWbs/wbsRoot';
import { WbsDetail } from './pages/MainWbs/wbsDetail';
import { ToDoList } from './pages/ToDoList/ToDoList';
import { Calendar } from './pages/Calendar/Calendar';

export const App = (): JSX.Element | null => {
  return (
    <>
      <Global
        styles={css`
          ${emotionReset}

          *, *::after, *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
        `}
      />
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
