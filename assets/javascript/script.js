document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.checkbox-card'))
  const turn = document.querySelector('.turn')
  const display_player = document.querySelector('.display-player')
  const controls = document.querySelector('.controls')
  const reset_button = document.querySelector('.reset')

  let boxes = ['', '', '', '', '', '', '', '', '']
  let current_player = 'red'
  let isActive = true
  let card_ids = []

  const red_player_won = 'Red Player Won!'
  const yellow_player_won = 'Yellow Player Won!'
  const tie = 'Tie'

  const indices_winning_conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const isClickValid = (card) => {
    const span_hidden_text = card.childNodes[0]
    if (
      span_hidden_text === 'red' ||
      span_hidden_text === 'Yellow' ||
      !isActive
    ) {
      return false
    }
    return true
  }

  const checkWinner = () => {
    let won = false
    for (let i = 0; i < indices_winning_conditions.length; i++) {
      //get the winning case based on index
      const winning_case = indices_winning_conditions[i]
      const first = boxes[winning_case[0]]
      const second = boxes[winning_case[1]]
      const third = boxes[winning_case[2]]

      //check if the boxes are not clicked
      if (first === '' || second === '' || third === '') {
        continue
      }

      //check if the same user clicked the cards
      if (first === second && second === third) {
        won = true
        break
      }
    }

    //display text for winner
    if (won) {
      controls.innerHTML =
        current_player === 'red'
          ? '<span class="red-player">Red</span> Player Won'
          : '<span class="yellow-player">Yellow</span> Player Won'

      controls.classList.remove('hide')
      isActive = false
    }

    if (!boxes.includes('')) {
      controls.innerHTML = 'Tie'
      controls.classList.remove('hide')
    }
  }

  //change player controls
  const changePlayer = () => {
    display_player.classList.remove(`${current_player}-player`)
    current_player = current_player === 'red' ? 'yellow' : 'red'
    display_player.textContent = current_player
    display_player.classList.add(`${current_player}-player`)
  }

  const play = (card, index) => {
    const span_hidden_text = card.childNodes[0]
    if (isClickValid(card)) {
      card.classList.add(current_player)
      span_hidden_text.textContent = current_player
      boxes[index] = current_player

      checkWinner()
      changePlayer()
    } else {
      return
    }
  }

  cards.forEach((card, index) =>
    card.addEventListener('click', () => play(card, index))
  )
})
