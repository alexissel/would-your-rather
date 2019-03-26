import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { handleInitialData } from './shared'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question,
	}
}

export function handleAddQuestion(optionOneText, optionTwoText) {
	return (dispatch, getState) => {
		const { authedUser } = getState()

		dispatch(showLoading())

		return saveQuestion({optionOneText, optionTwoText, author: authedUser}).then((question) => { dispatch(handleInitialData()) }).then(() => dispatch(hideLoading()))
	}
}

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}

export function handleAddQuestionAnswer(qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState()

		dispatch(showLoading())

		return saveQuestionAnswer({authedUser, qid, answer}).then(() => dispatch(handleInitialData())).then(() => dispatch(hideLoading()))
	}
}