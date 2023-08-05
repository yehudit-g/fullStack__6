import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';

import Login from './Pages/Login';
import UserLayout from './Components/UserLayout';
import MainPage from './Pages/Users/MainPage';
import Albums from './Pages/Users/Albums/Albums';
import Photos from './Pages/Users/Albums/Photos';
import Posts from './Pages/Users/Posts/Posts';
import Comments from './Pages/Users/Posts/Comments';
import Todos from './Pages/Users/Todos';
import Info from './Pages/Users/Info';

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
          <Route path="users/:id" element={<UserLayout />}>
            <Route index element={<MainPage />} />
            <Route path="albums" element={<Albums />} />
            <Route path="albums/:idAlbums/photos" element={<Photos />} />
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
