const DECISION_THRESHOLD = 75;

let isAnimating = false;
let pullDeltaX = 0; // distance of the pull of the card in px

function startDrag(e) {
  if (isAnimating) return
  
  // get the first article element
  const actualCard = e.target.closest('article');
  if (!actualCard) return

  // get initial position of mouse or finger
  const startX = e.pageX ?? e.touches[0].pageX;
  
  // listen the mouse and touch movements
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);
  
  document.addEventListener('touchmove', onMove, {pasive: true});
  document.addEventListener('touchend', onEnd, {pasive: true});
  
  
  function onMove (e) {
    // current position of mouse or finger
    const currentX = e.pageX ?? e.touches[0].pageX;
    //the distance between the initial position and the current position
    pullDeltaX = currentX - startX;
    // no movement
    if (pullDeltaX === 0) return
    // change the flag to indicate is animating
    isAnimating = true;
    // calculate the rotation degree of the card using the distance
    const deg = pullDeltaX / 14;
    // move the card and change the opacity, add style to cursor
    actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`
    // actualCard.style.opacity = 1 - Math.abs(pullDeltaX) / 100;
    actualCard.style.cursor = 'grabbing';

    // change the opacity of the choice info
    const opacity = Math.abs(pullDeltaX) / 100;
    const isRight = pullDeltaX > 0;

    const choiceEl = isRight ?
      actualCard.querySelector('.choice-like') :
      actualCard.querySelector('.choice-nope')

    choiceEl.style.opacity = opacity;
  }

  function onEnd (e) {
    // remove the event listeners
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);
    
    document.removeEventListener('touchmove', onMove, {pasive: true});
    document.removeEventListener('touchend', onEnd, {pasive: true});

   // know if the user has taken a decision to remove the card
    const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD
    if (decisionMade) {
      const goRight = pullDeltaX > 0;

      // add class acording to the decision
      actualCard.classList.add(goRight ? 'goRight' : 'goLeft');
      actualCard.addEventListener('transitionend', () => {
        actualCard.remove();
      }, {once: true})
    } else {
      actualCard.classList.add('reset');
      actualCard.classList.remove('go-right', 'go-left')
    }

    // reset the flag to indicate is animating
    actualCard.addEventListener( 'transitionend', () => {
      actualCard.removeAttribute('style');
      actualCard.classList.remove('reset');

      pullDeltaX = 0
      isAnimating = false;
    })
  }
}



document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag, {pasive: true});

