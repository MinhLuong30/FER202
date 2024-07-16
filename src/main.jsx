
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Contact from './Pages/Contact.jsx'
import Home from './Pages/Home.jsx'
import ArtDetail from './Pages/ArtDetail.jsx'
import ArtTools from './Pages/ArtTools.jsx'

const router = createBrowserRouter([
  {
      path: '/',
      element: <Home />,
      errorElement: <div>404 Not Found</div>,
  },
  {
    path: '/MinhLTSE182480',
    element: <ArtTools/>,
    errorElement: <div>404 Not Found</div>,
},
{
  path: '/contact',
  element: <Contact/>,
  errorElement: <div>404 Not Found</div>,
},
{
  path: '/detail',
  element: <ArtDetail/>,
  errorElement: <div>404 Not Found</div>,
},
]);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={router}/>
)

