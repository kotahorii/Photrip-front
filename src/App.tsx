import { Auth } from 'components/pages/Auth'
import { DetailPost } from 'components/pages/DetailPost'
import { MyPage } from 'components/pages/MyPage'
import { PrivateRoute } from 'components/templates/route/PrivateRoute'
import { PublicRoute } from 'components/templates/route/PublicRoute'
import { Navigate, Route, Routes } from 'react-router'
import { Main } from './components/pages/Main'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />
      <Route
        path="/main"
        element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }
      />
      <Route
        path="/main/:id"
        element={
          <PrivateRoute>
            <DetailPost />
          </PrivateRoute>
        }
      />
      <Route
        path="/myPage"
        element={
          <PrivateRoute>
            <MyPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/main" replace />} />
    </Routes>
  )
}
export default App
