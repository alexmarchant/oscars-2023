import { useEffect } from 'react'
import { useAuthStore } from '../stores/auth'
import { useNavigate } from 'react-router-dom'

export function useRedirectIfSession() {
  const session = useAuthStore(state => state.session)
  const navigate = useNavigate()

  // Redirect when session gets set
  useEffect(() => {
    if (session) {
      navigate('/')
    }
  }, [session, navigate])
}