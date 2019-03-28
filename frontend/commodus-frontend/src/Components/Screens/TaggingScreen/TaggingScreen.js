import React, { Component } from 'react';
import './TaggingScreen.css';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import NavBar from '../../NavBar/NavBar';


class TaggingScreen extends Component {
    
    state = {
        question : "Olá",
        questionText : "O céu é azul?"
    }

    render () {
        return(
        
        <div className="Tagging-Screen">
            <NavBar />
            <br />
            <br />

            <Typography variant="h5" gutterBottom>
                {this.state.question}
            </Typography>

            <Card className="Card">
                <CardContent>
                    <Typography component="p">
                        {this.state.questionText}
                    </Typography>
                </CardContent>
            </Card>
            
            

        </div>            
        );
    }
}

export default TaggingScreen;