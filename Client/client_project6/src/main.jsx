import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';

import Login from './Pages/Login';
import SignIn from './Pages/SignIn';
import UserLayout from './Components/UserLayout';
import MainPage from './Pages/MainPage';
import Posts from './Pages/Posts/Posts';
import Comments from './Pages/Posts/Comments';
import Todos from './Pages/Todos';
import Info from './Pages/info';

function App() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) ?? undefined)

  const calculationOnePage = () => {
    if(!currentUser) {
      return <Navigate to={'/login'}/>
    }

    const id = currentUser.id;
    return <Navigate to={'/users/:' + id}/>
  }

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={calculationOnePage()} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignIn />} />
          <Route path="users/:id" element={<UserLayout />}>
            <Route index element={<MainPage />} />
            <Route path="posts" element={<Posts />}/>
            <Route path="posts/:idPost/comments" element={<Comments />} />
            <Route path="todos" element={<Todos />} />
            <Route path="info" element={<Info />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}


ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);
