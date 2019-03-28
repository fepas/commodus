import React from 'react';

import NavBar from '../../NavBar/NavBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const InitialScreen = (props) => {
    return (
        <div>
            <NavBar />
            <br />
            <br />
            <Typography variant="h4" color="textPrimary">
                Bem vindo ao Commodus! :)
            </Typography>
            <br />
            <Typography variant="h6" color="textSecondary">
                Para começar a taggear as informações sobre {props.children}, clique no botão abaixo.
            </Typography>
            <br />
            <br />
            <Button component={Link} to="/tag" size="large" variant="contained" color="primary">
                Começar!
            </Button>
        </div>
    );

}

export default InitialScreen;