import { Auth } from 'components/pages/Auth'
import { DetailPost } from 'components/pages/DetailPost'
import { Help } from 'components/pages/Help'
import { MyPage } from 'components/pages/MyPage'
import { PrivateRoute } from 'components/templates/route/PrivateRoute'
import { PublicRoute } from 'components/templates/route/PublicRoute'
import { Navigate, Route, Routes } from 'react-router'
import { Main } from './components/pages/Main'

function App() {
  // アプリケーションのルーティングを定義
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }
      />
      <Route
        path="/:id"
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
      <Route path="/help" element={<Help />} />
      {/* パスが一致しない場合は一覧ページにリダイレクトされる */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
export default App
