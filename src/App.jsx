import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Landing from './pages/Landing.jsx'
import History from './pages/History.jsx'
import Photos from './pages/Photos.jsx'
import Videos from './pages/Videos.jsx'
import CheckIn from './pages/CheckIn.jsx'
import CheckInForm from './pages/CheckInForm.jsx'
import Colegas from './pages/Colegas.jsx'
import { TEMPO_INATIVIDADE_MS, useIdleReset } from './hooks/useIdleReset.js'
import { modoTotem } from './modoTotem.js'

function Rotas() {
  // No totem (?totem=1), volta para a tela inicial depois de um tempo sem toques.
  useIdleReset(modoTotem ? TEMPO_INATIVIDADE_MS : 0)

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="historia" element={<History />} />
        <Route path="fotos" element={<Photos />} />
        <Route path="videos" element={<Videos />} />
        <Route path="checkin" element={<CheckIn />} />
        <Route path="checkin/formulario" element={<CheckInForm />} />
        <Route path="colegas" element={<Colegas />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
  )
}
