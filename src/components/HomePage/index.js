import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const HomePage = () => (
  <>
    <Header />
    <div className="home-page-bg">
      <div className="instructions-container">
        <h1 className="instructions-heading">Instructions</h1>
        <ul className="instructions-list">
          <li>
            <span className="list-heading">Total Questions:</span> 10
          </li>
          <li>
            <span className="list-heading">Types of Questions:</span> MCQs
          </li>
          <li>
            <span className="list-heading">Duration:</span> 10 Mins
          </li>
          <li>
            <span className="list-heading">Marking Scheme:</span> Every Correct
            response, get 1 mark
          </li>
          <li>
            All the progress will be lost, if you reload during the assessment
          </li>
        </ul>
        <Link to="/assessment">
          <button type="button" className="start-assessment-button">
            Start Assessment
          </button>
        </Link>
      </div>
      <div>
        <img
          src="https://res.cloudinary.com/dyuf16cea/image/upload/v1707576157/Next%20Asses%20Project%20Resource/HomePageImage_knepq4.png"
          alt="assessment"
          className="assessment-home-img"
        />
      </div>
    </div>
  </>
)

export default HomePage
