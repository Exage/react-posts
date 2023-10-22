import { Routes, Route } from 'react-router-dom'
import './App.scss'

import { Home } from './pages/Home'
import { Post } from './pages/Post'
import { Error } from './pages/Error'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path='/react-posts-s/' element={<Home />}/>
				<Route path='/react-posts-s/login' element={<Login />}/>
				<Route path='/react-posts-s/register' element={<Register />}/>
				<Route path='/react-posts-s/post/:postid' element={<Post />}/>
				<Route path='*' element={<Error />}/>
			</Routes>
		</div>
	)
}

export default App
