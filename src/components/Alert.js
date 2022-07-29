import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

class Alert extends React.Component {

    constructor(props){
        super(props);
    }
    
    render() {

        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Alert
                    </Typography>
                    <Typography variant="h5" component="div">
                       picture 
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {this.props.event} 
                    </Typography>
                    <Typography variant="body2">
                        additional description
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default Alert;