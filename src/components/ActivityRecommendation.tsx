import * as moment from 'moment';
import * as React from 'react';



const applyLocalOffset = (time: any) => {
        const utcTime = moment.utc(time,"HH:mm:ss A")

        return utcTime.local().format("hh:mm A")

    }


const ActivityRecommendation = (props: any) => {
        return (
            <div>
                <h2>Activity & Safety Recommendation</h2>
                Sunrise at {applyLocalOffset(props.sunrise)}
                <br />
                Sunset at {applyLocalOffset(props.sunset)}
                <br />
                <br />
                Recommendation: wear bright colors so you can be seen.
            </div>
        );
}

export default ActivityRecommendation;