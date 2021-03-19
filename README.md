# Bootcamp4_CodeQuiz

At some point in your journey to become a full-stack web developer, you’ll likely be asked to complete a coding assessment&mdash;perhaps as part of an interview process. A typical coding assessment includes both multiple-choice questions and interactive coding challenges. 

To help familiarize you with these tests and allow you to use the skills covered in this unit, this week’s homework invites you to build a timed coding quiz with multiple-choice questions. This app will run in the browser and will feature dynamically updated HTML and CSS powered by JavaScript code that you write. It will have a clean, polished, and responsive user interface. 

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## Known Issues
To be honest I ran out of time to finish the game properly. It is broken to some extent and other features are left out. I put in as much time as I could this week and felt it better to submit an incomplete assignment and take a bad grade than to submit nothing.

1. Gameplay is broken
    - I could not implement the correct logic so as it stands, the game only moves to the next question if the correct answer is clicked. 
    - There is no indicator of 'correct' or 'incorrect' depending on what the user clicks
2. No 'clear scores' button
    - I ran out of time to put in a 'clear scores' button in the highscores.html page, to clear scores from localStorage.
3. Timer doesn't work right
    - As of now, the timer counts down. When the clock hits 0, the game should be over immediately. As of now, when the clock is 0, the game will not show "game over" until the user clicks another answer choice.



## Gameplay
Here is what the game looks like as it goes through the steps:

#### Landing page
Upon loading, user sees this:
![](./assets/images/Gameplay1.png)

#### Questions page
When playing, user sees this:
![](./assets/images/Gameplay2.png)

#### Submission page
When game is over, user sees this:
![](./assets/images/Gameplay3.png)

#### High Scores page
When clicks 'submit', game goes to High Scores page. User can click 'Play Again' to play another game
![](./assets/images/Gameplay4.png)
