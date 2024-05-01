import {Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import AssessmentPage from './components/AssessmentPage'
import NotFoundPage from './components/NotFoundPage'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <ProtectedRoute exact path="/assessment" component={AssessmentPage} />
    <Route exact path="/not-found" component={NotFoundPage} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
