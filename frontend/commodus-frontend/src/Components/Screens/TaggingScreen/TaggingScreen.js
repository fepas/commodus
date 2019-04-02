import React, { Component } from 'react';
import './TaggingScreen.css';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import NavBar from '../../NavBar/NavBar';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { Link } from 'react-router-dom';



class TaggingScreen extends Component {
    
    state = {
        questions : [],
        question : "Olá",
        questionText : "O céu é azul?",
        CurrentIndex: 0,
        CurrentQuestionId : undefined,
        NumberOfQuestions: 0,
        isPopupOpen: false,
        answers:[]
    }

    componentDidMount() {
        axios.get('http://localhost:3000/movies')
        .then(res => {
          console.log('rodou');  
          const questions = res.data;
          const NumberOfQuestions = res.data.length
          const question = res.data[0].question;
          const CurrentQuestionId = res.data[0].id
          const questionText = res.data[0].affirmations;
          this.setState({question, questions, NumberOfQuestions, questionText, CurrentQuestionId}); 
        })
    }
    handleRegularClick = () => {

        if (this.state.CurrentIndex === this.state.NumberOfQuestions - 1) {
            const CurrentIndex = this.state.CurrentIndex
            const isPopupOpen = true;
            const question = this.state.questions[CurrentIndex].question;
            const CurrentQuestionId = this.state.questions[CurrentIndex].id
            const questionText = this.state.questions[CurrentIndex].affirmations;
            const answer = {
                question_id: this.state.questions[CurrentIndex].id,
                answer: 'Regular',
            } 
            const answers = [...this.state.answers, answer]
            axios.post('http://localhost:3000/answers', {
                answers
            })
            this.setState({CurrentIndex, question, questionText, CurrentQuestionId, isPopupOpen, answers});

        } else {
            const CurrentIndex = this.state.CurrentIndex + 1
            const isPopupOpen = false;
            const question = this.state.questions[CurrentIndex].question;
            const CurrentQuestionId = this.state.questions[CurrentIndex].id
            const questionText = this.state.questions[CurrentIndex].affirmations;
            const answer = {
                question_id: this.state.questions[CurrentIndex - 1].id,
                answer: 'Regular',
            } 
            const answers = [...this.state.answers, answer]
            axios.post('http://localhost:3000/answers', {
                answers
            })
            this.setState({ isPopupOpen, answers});
        }
        
    }

    handleIrregularClick = () => {

        if (this.state.CurrentIndex === this.state.NumberOfQuestions - 1) {
            const CurrentIndex = this.state.CurrentIndex
            const isPopupOpen = true;
            const question = this.state.questions[CurrentIndex].question;
            const CurrentQuestionId = this.state.questions[CurrentIndex].id
            const questionText = this.state.questions[CurrentIndex].affirmations;
            const answer = {
                question_id: this.state.questions[CurrentIndex].id,
                answer: 'Irregular',
            } 
            const answers = [...this.state.answers, answer]
            axios.post('http://localhost:3000/answers', {
                answers
            })
            this.setState({CurrentIndex, question, questionText, CurrentQuestionId, isPopupOpen, answers});
        } else {
            const CurrentIndex = this.state.CurrentIndex + 1
            const isPopupOpen = false;
            const question = this.state.questions[CurrentIndex].question;
            const CurrentQuestionId = this.state.questions[CurrentIndex].id
            const questionText = this.state.questions[CurrentIndex].affirmations;
            const answer = {
                question_id: this.state.questions[CurrentIndex - 1].id,
                answer: 'Irregular',
            } 
            const answers = [...this.state.answers, answer]
            axios.post('http://localhost:3000/answers', {
                answers
            })
            this.setState({ isPopupOpen, answers});
        }
    }

    handleInconclusiveClick = () => {

        if (this.state.CurrentIndex === this.state.NumberOfQuestions - 1) {
            const CurrentIndex = this.state.CurrentIndex
            const isPopupOpen = true;
            const question = this.state.questions[CurrentIndex].question;
            const CurrentQuestionId = this.state.questions[CurrentIndex].id
            const questionText = this.state.questions[CurrentIndex].affirmations;
            const answer = {
                question_id: this.state.questions[CurrentIndex].id,
                answer: 'Inconclusive',
            } 
            const answers = [...this.state.answers, answer]
            axios.post('http://localhost:3000/answers', {
                answers
            })
            this.setState({CurrentIndex, question, questionText, CurrentQuestionId, isPopupOpen, answers});
        } else {
            const CurrentIndex = this.state.CurrentIndex + 1
            const isPopupOpen = false;
            const question = this.state.questions[CurrentIndex].question;
            const CurrentQuestionId = this.state.questions[CurrentIndex].id
            const questionText = this.state.questions[CurrentIndex].affirmations;
            const answer = {
                question_id: this.state.questions[CurrentIndex - 1].id,
                answer: 'Inconclusive',
            } 
            const answers = [...this.state.answers, answer]
            axios.post('http://localhost:3000/answers', {
                answers
            })
            this.setState({ isPopupOpen, answers});
        }
    }
    
    handleFowardClick = () => {
        console.log('foward')

        const CurrentIndex = this.state.CurrentIndex + 1
        const question = this.state.questions[CurrentIndex].question;
        const CurrentQuestionId = this.state.questions[CurrentIndex].id
        const questionText = this.state.questions[CurrentIndex].affirmations;
        this.setState({CurrentIndex, question, questionText, CurrentQuestionId});

    }

    handleBackwardClick = () => {
        console.log('backward')

        const CurrentIndex = this.state.CurrentIndex - 1
        const question = this.state.questions[CurrentIndex].question;
        const CurrentQuestionId = this.state.questions[CurrentIndex].id
        const questionText = this.state.questions[CurrentIndex].affirmations;
        this.setState({CurrentIndex, question, questionText, CurrentQuestionId});
    }

    stay = () => {
        this.setState({ isPopupOpen: false });
        
    }
    render () {

        let currentAnswer = 'Não respondido'

        const answersArray = this.state.answers
        console.log(answersArray);

        answersArray.map( (item) => {
            if(item.question_id === this.state.CurrentQuestionId){
                currentAnswer = item.answer
            }
        })
        
        let buttonBackward;
        let buttonFoward;

        let options;

        if (currentAnswer === 'Regular') {
            options = (
                <div className="Options">                
                    <Button 
                    size="large" 
                    variant="contained" 
                    color="primary" 
                    className="Button-Option"
                    onClick={this.handleRegularClick}>
                        Regular
                    </Button>

                    <Button 
                    size="large" 
                    variant="outlined" 
                    color="secondary" 
                    className="Button-Option"
                    onClick={this.handleIrregularClick}>
                        Irregular
                    </Button>
                    
                    <Button 
                    size="large" 
                    variant="outlined" 
                    color="default" 
                    className="Button-Option"
                    onClick={this.handleInconclusiveClick}>
                        Inconclusivo
                    </Button>
                </div>
            )
        }

        if (currentAnswer === 'Inconclusive') {
            options = (
                <div className="Options">                
                    <Button 
                    size="large" 
                    variant="outlined" 
                    color="primary" 
                    className="Button-Option"
                    onClick={this.handleRegularClick}>
                        Regular
                    </Button>

                    <Button 
                    size="large" 
                    variant="outlined" 
                    color="secondary" 
                    className="Button-Option"
                    onClick={this.handleIrregularClick}>
                        Irregular
                    </Button>
                    
                    <Button 
                    size="large" 
                    variant="contained" 
                    color="default" 
                    className="Button-Option"
                    onClick={this.handleInconclusiveClick}>
                        Inconclusivo
                    </Button>
                </div>
            )
        }

        if (currentAnswer === 'Irregular') {
            options = (
                <div className="Options">                
                    <Button 
                    size="large" 
                    variant="outlined" 
                    color="primary" 
                    className="Button-Option"
                    onClick={this.handleRegularClick}>
                        Regular
                    </Button>

                    <Button 
                    size="large" 
                    variant="contained" 
                    color="secondary" 
                    className="Button-Option"
                    onClick={this.handleIrregularClick}>
                        Irregular
                    </Button>
                    
                    <Button 
                    size="large" 
                    variant="outlined" 
                    color="default" 
                    className="Button-Option"
                    onClick={this.handleInconclusiveClick}>
                        Inconclusivo
                    </Button>
                </div>
            )
        }

        if (currentAnswer === 'Não respondido') {
            options = (
                <div className="Options">                
                    <Button 
                    size="large" 
                    variant="outlined" 
                    color="primary" 
                    className="Button-Option"
                    onClick={this.handleRegularClick}>
                        Regular
                    </Button>

                    <Button 
                    size="large" 
                    variant="outlined" 
                    color="secondary" 
                    className="Button-Option"
                    onClick={this.handleIrregularClick}>
                        Irregular
                    </Button>
                    
                    <Button 
                    size="large" 
                    variant="outlined" 
                    color="default" 
                    className="Button-Option"
                    onClick={this.handleInconclusiveClick}>
                        Inconclusivo
                    </Button>
                </div>
            )
        }

        if( this.state.CurrentIndex === 0){
            buttonBackward = (
            <Button
            disabled
            variant="outlined"
            onClick={this.handleBackwardClick}>
                Anterior 
            </Button> )
        } else {
            buttonBackward = (
            <Button
            variant="outlined"
            onClick={this.handleBackwardClick}>
                Anterior 
            </Button> )
        }

        if(this.state.CurrentIndex === this.state.NumberOfQuestions -1){
            buttonFoward = (
            <Button 
            disabled
            variant="outlined"
            onClick={this.handleFowardClick}>
                Próximo 
            </Button>
            )
        } else {
            buttonFoward = (
            <Button 
            variant="outlined"
            onClick={this.handleFowardClick}>
                Próximo 
            </Button>
            )
        }
            
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

            {options}

            <Typography variant="h6">   
                Resposta Atual: {currentAnswer}
            </Typography>

            <div className="Selector">

            {buttonBackward}
            {buttonFoward}    

            </div>

            <Typography variant="h6">
                    {this.state.CurrentIndex+1}/{this.state.NumberOfQuestions}
            </Typography>

            <Dialog
            open={this.state.isPopupOpen}
            onClose={this.stay}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Parabéns! Você terminou de responder todas as questões!</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Você deseja editar alguma das respostas anteriores?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.stay} color="primary">
                        Sim, me leve de volta para as perguntas
                    </Button>
                    <Button component={Link} to="/end" color="primary" autoFocus>
                        Não, continuar
                    </Button>
                </DialogActions>
            </Dialog>
            

        </div>            
        );
    }
}

export default TaggingScreen;