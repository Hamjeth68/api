import './App.css';
import AppointmentForm from './Components/AppointmentForm';

type AppProps = {
 
};

const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
        <AppointmentForm/>
    </div>
  );
};

export default App;
