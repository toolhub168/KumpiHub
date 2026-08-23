import { useEffect } from 'react'
import { supabase } from './supabaseClient'

function URLRedirect() {
  useEffect(() => {
    const redirectUser = async () => {
      const shortCode = window.location.pathname.split('/')[2]

      if (!shortCode) return

      const { data, error } = await supabase
        .from('urls')
        .select('original_url')
        .eq('short_code', shortCode)
        .single()

      if (error || !data) {
        alert('Short URL not found')
        return
      }

      window.location.href = data.original_url
    }

    redirectUser()
  }, [])

  return <p>Redirecting...</p>
}

export default URLRedirect