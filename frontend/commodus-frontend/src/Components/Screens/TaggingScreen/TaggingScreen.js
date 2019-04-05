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
import TextField from '@material-ui/core/TextField';
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
        answers:[],
        answeredQuestions: [],
        isCommentOpen: false,
        Comment: '',
    }

    componentDidMount() {
        axios.get('http://localhost:3000/movies')
        .then(res => { 
          const questions = res.data;
          const NumberOfQuestions = res.data.length
          const question = res.data[0].question;
          const CurrentQuestionId = res.data[0].id
          const questionText = res.data[0].affirmations;
          this.setState({question, questions, NumberOfQuestions, questionText, CurrentQuestionId}); 
        })
    }
    handleRegularClick = () => {


            const CurrentIndex = this.state.CurrentIndex
            console.log('current index', CurrentIndex)
            const question = this.state.questions[CurrentIndex].question;
            const CurrentQuestionId = this.state.questions[CurrentIndex].id
            const questionText = this.state.questions[CurrentIndex].affirmations;
            const answeredQuestions = [...this.state.answeredQuestions, CurrentQuestionId]
            const answer = {
                question_id: this.state.questions[CurrentIndex].id,
                answer: 'Regular',
            } 
            const answers = [...this.state.answers, answer]
            axios.post('http://localhost:3000/answers', {
                answers
            })
            this.setState({answers, answeredQuestions});

    }  

    handleIrregularClick = () => {

            const CurrentIndex = this.state.CurrentIndex
            console.log('current index', CurrentIndex)
            const question = this.state.questions[CurrentIndex].question;
            const CurrentQuestionId = this.state.questions[CurrentIndex].id
            const questionText = this.state.questions[CurrentIndex].affirmations;
            const answeredQuestions = [...this.state.answeredQuestions, CurrentQuestionId]
            const answer = {
                question_id: this.state.questions[CurrentIndex].id,
                answer: 'Irregular',
            } 
            const answers = [...this.state.answers, answer]
            axios.post('http://localhost:3000/answers', {
                answers
            })
            this.setState({ answers, answeredQuestions});
            
    }

    handleInconclusiveClick = () => {
            const CurrentIndex = this.state.CurrentIndex 
            console.log('current index', CurrentIndex)
            const question = this.state.questions[CurrentIndex].question;
            const CurrentQuestionId = this.state.questions[CurrentIndex].id
            const questionText = this.state.questions[CurrentIndex].affirmations;
            const answeredQuestions = [...this.state.answeredQuestions, CurrentQuestionId]
            const answer = {
                question_id: this.state.questions[CurrentIndex].id,
                answer: 'Inconclusivo',
            } 
            const answers = [...this.state.answers, answer]
            axios.post('http://localhost:3000/answers', {
                answers
            })
            this.setState({ answers, answeredQuestions});
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

    stayComment = () => {
        this.setState({ isCommentOpen: false}); 
    }

    end = () => {
        this.setState({ isPopupOpen: true });
    }

    addComment = () => {
        this.setState({ isCommentOpen: true });
    }

    handleChange(event) {
        this.setState({ Comment: event.target.value });
    }

    setComment = () => {
        const comment = {
            question_id: this.state.questions[this.state.CurrentIndex].id,
            comment: this.state.Comment
        }
        axios.post('http://localhost:3000/comments', {
            comment
        })

        this.setState({isCommentOpen: false, Comment: ''})
    }

    render () {

        let currentAnswer = 'Não respondido'

        const answersArray = this.state.answers


        answersArray.map( (item) => {
            if(item.question_id === this.state.CurrentQuestionId){
                currentAnswer = item.answer
            }
        })
        
        let buttonBackward;
        let buttonFoward;
        let options;
        let finalButton;

        let isFinished = false


        let answeredQuestionsArray = this.state.answeredQuestions.slice()

        let answeredArray = [...new Set(answeredQuestionsArray)]

        if (answeredArray.length === this.state.questions.length) {
            isFinished = true
        }

        if (isFinished) {
            finalButton = (
                <Button 
                size="large" 
                variant="contained" 
                color="primary" 
                className="Button-Option"
                onClick={this.end}
                >
                    Finalizar
                </Button>
            )
        }

        if (!isFinished) {
            finalButton = (
                <Button
                disabled
                size="large" 
                variant="contained" 
                color="primary" 
                className="Button-Option"
                onClick={this.end}>
                    Finalizar
                </Button>
            )
        }


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

        if (currentAnswer === 'Inconclusivo') {
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

            <Typography variant="h7">   
                Resposta Atual: {currentAnswer}
            </Typography>

            <div className="Selector">

            {buttonBackward}
            {buttonFoward}    

            </div>
            <div className="Final">
                <Button 
                size="large" 
                variant="outlined" 
                color="primary" 
                className="Button-Option"
                onClick={this.addComment}
                >
                    Adicionar Comentário
                </Button> 

                {finalButton}               
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


            <Dialog className="Dialog"
            open={this.state.isCommentOpen}
            onClose={this.stayComment}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="sm"
            >
                <DialogContent>
                    <TextField
                        fullWidth
                        id="outlined-multiline-flexible"
                        label="Insira seu comentário"
                        multiline
                        rows="4"
                        value={this.state.Comment}
                        onChange={this.handleChange.bind(this)}
                        className="Text-Field"
                        margin="normal"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={this.stayComment} >
                        Cancelar
                    </Button>
                    <Button color="primary" onClick={this.setComment}>
                        Comentar
                    </Button>
                </DialogActions>
            </Dialog>
            

        </div>            
        );
    }
}

export default TaggingScreen;