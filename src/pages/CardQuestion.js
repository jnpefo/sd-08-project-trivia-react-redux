import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleSelected, sendScore } from '../redux/actions';

class CardQuestion extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.calcScore = this.calcScore.bind(this);
  }

  handleClick(className) {
    const { toggleSelectedProp } = this.props;
    toggleSelectedProp();
    
    if (className === "correct-answer") {
    //   const getLocalS = JSON.parse(localStorage.getItem("state"));
    //   const previousScore = getLocalS.player.score;
    //   getLocalS.player.score = previousScore + action.payload.score;
      
    //   const previousAssertion = getLocalS.player.assertions;
    //   getLocalS.player.assertions = previousAssertion + 1;
    //   localStorage.setItem('state', JSON.stringify(getLocalS));
      setTimeout(() => this.calcScore(), 1000) ;
    }
  }

  calcScore() {
    const { questions: { difficulty }, timer, sendScoreProp } = this.props;
    let mult = 0;
      if (difficulty === 'easy') mult = 1;
      if (difficulty === 'medium') mult = 2;
      if (difficulty === 'hard')  mult =3;
    const score = 10 + (timer * mult);

    sendScoreProp(score);
  }

  render() {
    const { questions, selected } = this.props;
    const { category, question, options } = questions;
    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{question}</h2>
        {options.map((alternatives) => (
          <button
            type="button"
            key={ alternatives.option }
            data-testid={ alternatives.className }
            disabled={ selected }
            className={ selected ? alternatives.className : 'alternative-button' }
            onClick={ () => this.handleClick(alternatives.className) }
          >
            {alternatives.option}
          </button>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleSelectedProp: () => dispatch(toggleSelected()),
  sendScoreProp: (score) => dispatch(sendScore(score)),

});

const mapStateToProps = (state) => ({
  selected: state.game.selected,
  timer: state.game.timeLeft,
});

CardQuestion.propTypes = {
  questions: PropTypes.shape().isRequired,
  toggleSelectedProp: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardQuestion);
