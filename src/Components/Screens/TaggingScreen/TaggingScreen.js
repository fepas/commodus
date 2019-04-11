import React, { Component } from 'react';
import './TaggingScreen.css';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import NavBar from '../../NavBar/NavBar';

import Dialog from '@material-ui/core/Dialog';



import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';




class TaggingScreen extends Component {
    
    state = {
        users: [],
        handleSignIn: false,
        signInDone: false,
        newUser: '',
        actualUser: '',
        actualScreen: 1,
        questions : [],
        question : "ERRO DE CONEXÃO",
        questionText : "ERRO DE CONEXÃO",
        currentAnswer : 'Não respondido',
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
        axios.get('http://localhost:3000/users')
        .then(res => { 
          const users = res.data;
          this.setState({users}); 
        })
    }
    handleRegularClick = () => {


            const CurrentIndex = this.state.CurrentIndex
            console.log('current index', CurrentIndex)
            const question = this.state.questions[CurrentIndex].question;
            const CurrentQuestionId = this.state.questions[CurrentIndex].id
            const questionText = this.state.questions[CurrentIndex].affirmations;
            const answeredQuestions = [...this.state.answeredQuestions, CurrentQuestionId]
            const currentAnswer = 'Regular'
            const answer = {
                user_id: this.state.actualUser,
                question_id: this.state.questions[CurrentIndex].id,
                answer: 'Regular',
                comment: this.state.Comment
            } 
            const answers = [...this.state.answers, answer]
            axios.post('http://localhost:3000/answers', {
                answer
            })
            this.setState({answers, answeredQuestions, currentAnswer});

    }  

    handleIrregularClick = () => {

            const CurrentIndex = this.state.CurrentIndex
            console.log('current index', CurrentIndex)
            const question = this.state.questions[CurrentIndex].question;
            const CurrentQuestionId = this.state.questions[CurrentIndex].id
            const questionText = this.state.questions[CurrentIndex].affirmations;
            const answeredQuestions = [...this.state.answeredQuestions, CurrentQuestionId]
            const currentAnswer = 'Irregular'
            const answer = {
                user_id: this.state.actualUser,
                question_id: this.state.questions[CurrentIndex].id,
                answer: 'Irregular',
                comment: this.state.Comment
            } 
            const answers = [...this.state.answers, answer]
            axios.post('http://localhost:3000/answers', {
                answer
            })
            this.setState({ answers, answeredQuestions, currentAnswer});
            
    }

    handleInconclusiveClick = () => {
            const CurrentIndex = this.state.CurrentIndex 
            console.log('current index', CurrentIndex)
            const question = this.state.questions[CurrentIndex].question;
            const CurrentQuestionId = this.state.questions[CurrentIndex].id
            const questionText = this.state.questions[CurrentIndex].affirmations;
            const answeredQuestions = [...this.state.answeredQuestions, CurrentQuestionId]
            const currentAnswer = 'Inconclusivo'
            const answer = {
                user_id: this.state.actualUser,
                question_id: this.state.questions[CurrentIndex].id,
                answer: 'Inconclusivo',
                comment: this.state.Comment
            } 
            const answers = [...this.state.answers, answer]
            axios.post('http://localhost:3000/answers', {
                answer
            })
            this.setState({ answers, answeredQuestions, currentAnswer});
    }
    
    handleFowardClick = () => {
        console.log('foward')

        const CurrentIndex = this.state.CurrentIndex + 1
        const question = this.state.questions[CurrentIndex].question;
        const CurrentQuestionId = this.state.questions[CurrentIndex].id
        const questionText = this.state.questions[CurrentIndex].affirmations;
        const Comment = '';
        this.setState({ Comment, CurrentIndex, question, questionText, CurrentQuestionId});

    }

    handleBackwardClick = () => {
        console.log('backward')

        const CurrentIndex = this.state.CurrentIndex - 1
        const question = this.state.questions[CurrentIndex].question;
        const CurrentQuestionId = this.state.questions[CurrentIndex].id
        const questionText = this.state.questions[CurrentIndex].affirmations;
        const Comment = '';
        this.setState({Comment, CurrentIndex, question, questionText, CurrentQuestionId});
    }

    handleChangeUser = (event) => {
        this.setState({
          actualUser: event.target.value,
        });
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

        if (this.state.currentAnswer === 'Regular') {
            this.setState({isCommentOpen: false})
            this.handleRegularClick()
        }
        if (this.state.currentAnswer === 'Irregular') {
            this.setState({isCommentOpen: false})
            this.handleIrregularClick()
        }
        if (this.state.currentAnswer === 'Inconclusivo') {
            this.setState({isCommentOpen: false})
            this.handleInconclusiveClick()
        }       
    }

    continueUser = () => {
        this.setState({isUserOpen:true})
    }

    handleGoToTag = () => {
        this.setState({actualScreen: 2})
    }
    handleGoToLogin = () => {
        this.setState({actualScreen: 1})
    }
    handleGoToEnd = () => {
        this.setState({actualScreen: 3})
    }

    handleSignIn = () => {
        const user = {
            user_login_rede: this.state.newUser,
        }
        axios.post('http://localhost:3000/users', {
            user
        })

        this.setState({newUser: '', signInDone: 'true'})
    }

    handleChangeNewUser = (event) => {
        this.setState({
            newUser: event.target.value,
        })
    }

    _refreshPage = () => {
        window.location.reload();
      }

    render () {

        console.log(this.state.currentAnswer)

        let currentAnswer = 'Não respondido'
        console.log(currentAnswer)

        const answersArray = this.state.answers

        answersArray.map( (item) => {
            if(item.question_id === this.state.CurrentQuestionId){
                currentAnswer = item.answer
            }
        })
        
        let signInMessage;
        let buttonBackward;
        let buttonFoward;
        let options;
        let finalButton;
        let actualScreen;

        let listUsers;

        if (this.state.users.length > 0) {
            listUsers = (
                this.state.users.map( (user ) => {
                    return(<MenuItem key={user.user.user_login_rede}value={user.user.user_login_rede}>{user.user.user_login_rede}</MenuItem>)
                })
            )
        }

        if (this.state.users.length < 1) {
            listUsers = ( <MenuItem value="">
                <em>Nenhum usuario cadastrado</em>
            </MenuItem>
            )
        }

        if (this.state.signInDone) {
            signInMessage = (
                <div>
                    <br></br>
                    <Button onClick={this._refreshPage} variant="outlined" color="primary">
                        Cadastro concluido! clique AQUI para continuar
                    </Button>
                </div>
            )
        } else {
             signInMessage = (
                 <div></div>
             )
         }

        let isFinished = false

        let loadedUsers = (
            this.state.users.map( (user ) => {
                return(<MenuItem key={user}value={user}>{user}</MenuItem>)
            })
        )

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
        let commentDisabled = true

        currentAnswer === 'Não respondido' ? commentDisabled = true : commentDisabled = false

        if(this.state.actualScreen === 1){
            actualScreen = (
                <div>
                    <NavBar />
                    <br />
                    <br />
                    <Typography variant="h4" color="textPrimary">
                        Bem vindo ao Commodus! :)
                    </Typography>
                    <br />
                    <Typography variant="h6" color="textSecondary">
                        Para começar a taggear as informações sobre filmes, selecione seu usuário e clique em COMEÇAR.
                    </Typography>
                    <br></br>
                    <div >
                    <FormControl >
                        <InputLabel shrink htmlFor="user-label-placeholder">
                            Usuários
                        </InputLabel>
                            <Select
                            value={this.state.actualUser}
                            onChange={this.handleChangeUser}
                            input={<Input name="user" id="user-label-placeholder" />}
                            displayEmpty
                            name="age"
                            >
                                <MenuItem value="">
                                    <em>Não selecionado</em>
                                </MenuItem>
                                    {listUsers}
                                </Select>
                        <FormHelperText>O seu usuário é o seu login de rede</FormHelperText>
                    </FormControl>
                    </div>
                    <br></br>


                    <br />
                    <Button onClick={this.handleGoToTag} disabled={this.state.actualUser.length === 0 ? true : false }size="large" variant="contained" color="primary">
                        Começar!
                    </Button>
                    <br></br>
                    <br></br>
                    <Typography variant="h8" color="textSecondary">
                        Não encontrou seu login de rede? Registre-se! 
                    </Typography>                    
                    <TextField
                        id="filled-name"
                        label="Insira seu login de rede"
                        value={this.state.newUser}
                        onChange={this.handleChangeNewUser}
                        margin="normal"
                        variant="filled"
                    />      
                    <br></br>
                    <br></br>
                    <Button onClick={this.handleSignIn} size="small" variant="contained" color="primary">
                        Registrar-se
                    </Button>   

                    {signInMessage}

                </div>                 
            )
        }
        if(this.state.actualScreen === 2){
            actualScreen =(
                <h1><NavBar />
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
                <div className="Final">
                    <Button 
                    size="large" 
                    variant="outlined" 
                    color="primary"
                    disabled={commentDisabled} 
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
                            Você tem certeza das respostas anteriores? Você ainda pode voltar e trocar as respostas.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.stay} color="primary">
                            Não, quero trocar alguma resposta
                        </Button>
                        <Button onClick={this.handleGoToEnd} color="primary" autoFocus>
                            Sim, tenho CERTEZA e quero continuar
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
                </Dialog></h1>
            )
        }

        if(this.state.actualScreen === 3) {
            actualScreen = (<div className="End">
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
            <Button onClick={this._refreshPage} size="large" variant="contained" color="primary">
               Voltar ao Início
            </Button>
        </div>)
        }

            
        return(

        
        
        
        
        <div className="Tagging-Screen">

        {actualScreen}

        </div>            
        );
    }
}

export default TaggingScreen;