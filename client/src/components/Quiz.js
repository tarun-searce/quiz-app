import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Questions from './Questions'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestions';
import { PushAnswer } from '../hooks/setResult';


export default function Quiz() {

  const [check, setChecked] = useState(undefined)
  const [counter, setCounter] = useState(9)
  const result = useSelector(state => state.result.result);
  const { queue, trace } = useSelector(state => state.questions);
  const dispatch = useDispatch()

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if(!counter){
      onNext();
      setCounter(9);
    }
  }, [counter]);

  // next button event handler
  function onNext() {

    if(trace < queue.length) {
      // increase the trace value by one using MoveNextAction
      dispatch(MoveNextQuestion());

      // insert a new result in the array. 
      if(result.length <= trace) {
        dispatch(PushAnswer(check))
      }
    } 
  
    // reset the value of the checked variable 
    setChecked(undefined)
  }

  // Prev button event handler 
  function onPrev() {
      if(trace > 0) {
          // decrease the trace value by one using MovePrevQuestion 
          dispatch(MovePrevQuestion());
      }
  }

  function onChecked(check) {
      setChecked(check)
  }

  // redirect to /result after exam
  if(result.length && result.length >= queue.length) {
      return <Navigate to={'/result'} replace={true}></Navigate>
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>
      <p className='title text-light'> 00:0{counter} seconds remaining</p>

      {/* display questions */}
      <Questions onChecked={onChecked} />
      
    </div>
  )
}

