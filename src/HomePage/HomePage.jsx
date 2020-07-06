import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './homepage.css';
import { userActions } from '../_actions';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoibXJyb2JvdDc5IiwiYSI6ImNrY2ExMWdkcTFxdHUyenRpdXpkYTExZzkifQ.29B03bWcg95Ay1IX1p1P0A';

class HomePage extends React.Component {
    constructor(props) {
super(props);
this.state = {
lng: 5,
lat: 34,
zoom: 2
};
}


  
    componentDidMount() {
        
		
        this.props.getUsers();
        const map = new mapboxgl.Map({
container: this.mapContainer,
style: 'mapbox://styles/mapbox/streets-v11',
center: [this.state.lng, this.state.lat],
zoom: this.state.zoom
});
            
    }

        

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="homepage">
                <h1>Hi {user.firstName}!</h1>
                <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
                </div>
                <p>
                    <Link to="/login">Logout</Link>
                </p>

            </div>

        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
