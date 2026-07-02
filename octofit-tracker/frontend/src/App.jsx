import heroImg from './assets/octofitapp-small.png'
import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-7">
          <span className="badge bg-primary-subtle text-primary-emphasis mb-3">
            OctoFit Tracker
          </span>
          <h1 className="display-4 fw-bold">Track fitness, lead teams, and build momentum.</h1>
          <p className="lead text-muted">
            A modern multi-tier app for workouts, activity logging, leaderboards, and team challenges.
          </p>
          <div className="d-flex flex-wrap gap-3 mt-4">
            <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
              Check API health
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://react.dev/" target="_blank" rel="noreferrer">
              Learn React 19
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <img src={heroImg} alt="OctoFit Tracker logo" className="img-fluid rounded-4 shadow" />
        </div>
      </div>
    </main>
  )
}

export default App
