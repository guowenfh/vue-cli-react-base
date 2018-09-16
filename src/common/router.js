import BasicLayout from 'layouts/BasicLayout'
import IndexLayout from 'layouts/IndexLayout'
import Login from 'routes/Login/'
import PictureDetails from 'routes/Index/PictureDetails'
import PictureModel from 'routes/Index/PictureModel'
import PageNotFound from 'components/PageNotFound/'

const routes = [
  {
    component: BasicLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Login
      },
      {
        path: '/index',
        component: IndexLayout,
        routes: [
          {
            name: '模特图',
            path: '/index/PictureModel/',
            component: PictureModel
          },
          {
            name: '细节图',
            path: '/index/PictureDetails/',
            component: PictureDetails
          }
        ]
      },
      {
        path: '*',
        component: PageNotFound
      }
    ]
  }
]

export default routes
