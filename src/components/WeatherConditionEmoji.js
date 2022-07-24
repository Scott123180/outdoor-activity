/*

for current sky conditions:
https://www.weather.gov/hun/zfp_terminology
WeatherConditionEmoji.js

*/

import React from "react";

class WeatherConditionEmoji extends React.Component {
    constructor(props){
        super(props);
    }

    render() {

        return <p style={{color: "yellow"}}>Here is the current weather conditions for your area: {this.props.textDescription}</p>

    }

}

export default WeatherConditionEmoji;