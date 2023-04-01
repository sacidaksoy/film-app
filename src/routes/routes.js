import Home from "../pages/Home";
import Login from "../pages/Login";
import MovieDetail from "../pages/MovieDetails";
import NotFound from "../pages/NotFound";


const routes = [
    {
        title: 'Home Page',
        path: '/',
        exact: true,
        element: <Home />,
        children: [],
        isPrivate: true
    },
    {
        title: 'Page Not Found',
        path: '*',
        exact: true,
        element: <NotFound />,
        children: [],
        isPrivate: false
    },
    {
        title: 'Login Page',
        path: '/login',
        exact: true,
        element: <Login />,
        children: [],
        isPrivate: false
    },
    {
        title: 'Page Not Found',
        path: '/movies/:id',
        exact: true,
        element: <MovieDetail />,
        children: [],
        isPrivate: true
    },
];

export default routes;
