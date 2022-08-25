import './App.css';
import Weather from './components/Weather';
import moment from 'moment';

function App() {
  return (
    <div className="App" style={{padding: 10}}>
      <header className="App-header">
        Welcome to a weather activity app!
        <br/>
        <br/>
        Current time: {moment().local().format("hh:mm A")}
        <br/>
        <br/>
      <Weather />
      </header>
      <footer className="Footer">
        Disclaimer: Use application at your own risk. Data and information may be innacurate. 
        Alerts may be test messages issued by US government and not real alerts. Application is in development and features may be broken. 
        Please consult your physician before excercise. Weather data from weather.gov. and other sources.
        &nbsp;<a href='https://github.com/Scott123180/outdoor-activity' target="_blank" rel="noreferrer">Github and attributions.</a>
      </footer>
    </div>
  );
}

export default App;
