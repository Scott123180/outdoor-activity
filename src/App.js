import './App.css';
import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to a weather app!
      <Weather />
      </header>
      <footer>
        Disclaimer: Use application at your own risk. Data and information may be innacurate. Application is in development and features may be broken. 
        Please consult your physician before excercise. Weather data from weather.gov. 
        <a href='https://github.com/Scott123180/outdoor-activity' target="_blank" rel="noreferrer">Github and attributions.</a>
      </footer>
    </div>
  );
}

export default App;
