import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('NutriLens render error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center min-h-screen gap-6 p-8"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          <span
            className="material-symbols-outlined text-6xl"
            style={{ color: 'var(--color-error)' }}
          >
            error
          </span>
          <div className="text-center">
            <h2
              className="text-2xl font-extrabold font-headline mb-2"
              style={{ color: 'var(--color-on-surface)' }}
            >
              Something went wrong
            </h2>
            <p className="text-sm mb-1" style={{ color: 'var(--color-on-surface-variant)' }}>
              {this.state.error?.message}
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="px-6 py-3 rounded-2xl font-bold btn-gradient"
            style={{ color: 'var(--color-on-primary)' }}
          >
            Back to Dashboard
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
