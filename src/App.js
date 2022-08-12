import './App.css';
import Weather from './components/Weather';

function App() {
  return (
    <div className="App" style={{padding: 10}}>
      <header className="App-header">
        Welcome to a weather app!
        <br/>
        <br/>
      <Weather />
      </header>
      <footer className="Footer">
        Disclaimer: Use application at your own risk. Data and information may be innacurate. Application is in development and features may be broken. 
        Please consult your physician before excercise. Weather data from weather.gov. 
        &nbsp;<a href='https://github.com/Scott123180/outdoor-activity' target="_blank" rel="noreferrer">Github and attributions.</a>
      </footer>
    </div>
  );
}

export default App;
