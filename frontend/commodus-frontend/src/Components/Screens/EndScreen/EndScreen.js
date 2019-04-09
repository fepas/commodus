import React from 'react';

import NavBar from '../../NavBar/NavBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

import  './EndScreen.css'

const EndScreen = (props) => {
    return (
        <div className="End">
            <NavBar />
            <br />
            <br />
            <Typography variant="h4" color="textPrimary">
                Obrigado por responder! :)
            </Typography>
            <br />
            <Typography variant="h6" color="textSecondary">
                Para responder novamente, clique no botão abaixo.
            </Typography>
            <br />
            <br />
            <Button component={Link} to="/" size="large" variant="contained" color="primary">
               Voltar ao Início
            </Button>
        </div>
    );

}

export default EndScreen;