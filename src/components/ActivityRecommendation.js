import moment from 'moment';
import React from 'react';

export const RecommendationContext = React.createContext();

class ActivityRecommendation extends React.Component {

    applyLocalOffset = (time) => {
        const utcTime = moment.utc(time,"HH:mm:ss A")

        return utcTime.local().format("hh:mm A")

    }

    render(){
        return (
            <div>
                <h2>Activity & Safety Recommendation</h2>
                Sunrise at {this.applyLocalOffset(this.props.sunrise)}
                <br />
                Sunset at {this.applyLocalOffset(this.props.sunset)}
                <br />
                <br />
                Recommendation: wear bright colors so you can be seen.
            </div>
        )
    }


}

export default ActivityRecommendation;