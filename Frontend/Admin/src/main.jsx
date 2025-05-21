import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router'
import {AddBlog,BlogInfo,Home,Login,Signup,UpdateBlog,AuthLayout} from '../pages/index.js'
import { Provider } from 'react-redux';
import store from './store/store.js'
import './index.css'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:"/",
        element:(
            <AuthLayout authentication={true}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path:"/add-blog",
        element:(
          <AuthLayout authentication={true}>
            <AddBlog />
          </AuthLayout>
        )
      },
      {
        path:"/blog-information/:id",
        element:(
          <AuthLayout authentication={true}>
            <BlogInfo />
          </AuthLayout>
        )
      },
      {
        path:"/update-blog/:id",
        element:(
          <AuthLayout authentication={true}>
            <UpdateBlog />
          </AuthLayout>
        )
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router} />
</Provider>
)
