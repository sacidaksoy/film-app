// RouterConfig.js
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import routes from "./routes";
import React from "react";



function Router() {

    const token = useSelector(state => state.auth.token);

    return (
        <Routes>
            {
                routes.map(routeItem => {
                    const { path, exact, element, isPrivate } = routeItem;

                    const RenderPrivateRouteElement = () => {
                        if (token) {
                            return (
                                <div>
                                    <Navbar />
                                    {element}
                                </div>
                            );
                        } 

                        return (<Navigate to="/login" />)
                    }

                    if (isPrivate) {
                        return (
                            <Route
                                key={path}
                                path={path} 
                                exact={exact}
                                element={<RenderPrivateRouteElement />}
                            />
                        )
                    }
                    
                    return <Route key={path} path={path} exact={exact} element={element} />
                })
            }
        </Routes>
    );
}

export default Router;

// function RouterConfig() {


//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/movies/:id" element={<MovieDetail />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// export default RouterConfig;
