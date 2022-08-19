import React from 'react';

export const RecommendationContext = React.createContext();

class ActivityRecommendation extends React.Component {

    constructor(){
        super();

        this.state = {
            activityType: "",
            activityIntensity : ""
        }

    }

    render(){
        return (
            <div>
                <h2>Activity & Safety Recommendation</h2>
                <p>coming soon...</p>
            </div>
        )

    }


}

export default ActivityRecommendation;