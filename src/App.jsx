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
				<Route index element={<Home />}/>
				<Route path='/login' element={<Login />}/>
				<Route path='/register' element={<Register />}/>
				<Route path='/p/:postid' element={<Post />}/>
				<Route path='*' element={<Error />}/>
			</Routes>
		</div>
	)
}

export default App
