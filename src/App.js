
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './components/CSS/Home.css'
import './components/CSS/Menu.css'
import './components/CSS/FoundPlate.css'
import './components/CSS/LostPlates.css'
import './components/CSS/PlateNotFound.css'
import './components/CSS/Forms.css'
import './components/CSS/Profile.css'
import './components/CSS/Loading.css'
import Home from './components/Home'
import Menu from './components/Menu'
import FoundPlate from './components/FoundPlate'
import PlateNotFound from './components/PlateNotFound'
import LostPlates from './components/LostPlates'
import SignUp from './components/SignUp'
import Login from './components/Login'
import AddFoundPlate from './components/AddFoundPlate'
import AddLostPlate from './components/AddLostPlate'
import Profile from './components/Profile'
import MapComponent from './components/MapComponent'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.compat.css'
import * as actionCreator from './Store/Actions'
import Loading from './components/LoadingElement'
import { connect } from 'react-redux'
let userToken = localStorage.getItem('userToken');
function App(props) {
  useEffect(() => {
    props.getStats()
    if (userToken) {
      props.getMyData()
    }
    return
    /* eslint-disable-next-line */
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <ReactNotification />
        <Loading />
        <Menu />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/foundPlate' component={FoundPlate} />
          <Route path='/plateNotFound' component={PlateNotFound} />
          <Route path='/lostPlates' component={LostPlates} />
          <Route path='/signUp' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/addFoundPlate' component={AddFoundPlate} />
          <Route path='/addLostPlate' component={AddLostPlate} />
          <Route path='/profile' component={Profile} />
          <Route path='/map' component={MapComponent} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyData: () => dispatch(actionCreator.getMyData()),
    getStats: () => dispatch(actionCreator.getStats()),

  }
}
export default connect(null, mapDispatchToProps)(App);

