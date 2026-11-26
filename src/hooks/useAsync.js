import { useCallback, useEffect, useState } from 'react'

// Runs an async loader and tracks its state. Ignores stale results when deps change.
export default function useAsync(loader, deps) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true
    setState((s) => ({ ...s, status: 'loading', error: null }))
    loader()
      .then((data) => {
        if (active) setState({ status: 'success', data, error: null })
      })
      .catch((error) => {
        if (active) setState({ status: 'error', data: null, error })
      })
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  return { ...state, retry }
}
