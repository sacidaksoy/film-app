import React, { useEffect, useState } from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/slices';

function Navbar() {
	const [show, handleShow] = useState(false)
	const navigate = useNavigate();
	const { token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 100) {
				handleShow(true)
			} else {
				handleShow(false)
			}
			return () => {
				window.removeEventListener("scroll")
			}
		})
	}, [])

	return (
		<div className={`nav ${show && "nav__black"}`}>
			<img
				className='nav__logo'
				src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
				alt="netflix-logo"
				style={{ cursor: 'pointer' }}
				onClick={() => navigate('/')}
			/>
			{token ? (
				<button
					className="logout__btn"
					type="submit"
					style={{ cursor: 'pointer' }}
					onClick={() => {
						dispatch(authActions.setToken(false));
						dispatch(authActions.setAuthCridentials({
							username: '',
							password: ''
						}))
					}}
				>
					<img className='logout__img' src='/logout.png' />
					<strong>Logout</strong>
				</button>
			) : (
				<img
					className='nav__avatar'
					src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
					alt="netflix-avatar"
				/>
			)}
		</div>
	)
}

export default Navbar