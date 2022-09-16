document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.checkbox-card'))
  const turn = document.querySelector('.turn')
  const controls = document.querySelector('.controls')
  const reset_button = document.querySelector('.controls')

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

  let won = false
  const play = (card, index) => {
    const span_hidden_text = card.childNodes[0]
    if (span_hidden_text === 'red' || span_hidden_text === 'yellow') {
      return
    } else {
      card.classList.add(current_player)
      span_hidden_text.textContent = current_player
      boxes[index] = current_player

      for (let i = 0; i < indices_winning_conditions.length; i++) {
        const winning_case = indices_winning_conditions[i]
        const first = boxes[winning_case[0]]
        const second = boxes[winning_case[1]]
        const third = boxes[winning_case[2]]
        console.log(first, second, third)
        if (first === '' || second === '' || third === '') {
          continue
        }

        if (first === second && second === third) {
          won = true
          break
        }
      }

      if (won) {
        controls.innerHTML =
          current_player === 'red'
            ? '<span class="red-player">Red</span> Player Won'
            : '<span class="yellow-player">Yellow</span> Player Won'
      }

      if (!boxes.includes('')) {
        controls.innerHTML = 'Tie'
      }

      console.log(won, current_player, controls.textContent)
    }
    console.log(span_hidden_text === null)
  }

  cards.forEach((card, index) =>
    card.addEventListener('click', () => play(card, index))
  )
})
