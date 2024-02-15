let isAnimating = false;
let pullDeltaX = 0; // distance of the pull of the card in px

function startDrag(e) {
  if (isAnimating) {
    return
  }
  // get the first article element
  const actualCard = e.target.closest('article');

  // get initial position of mouse or finger
  const startX = event.pageX ?? e.touches[0].pageX;
  
  // listen the mouse and touch movements
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);
  
  document.addEventListener('touchmove', onMove, {pasive: true});
  document.addEventListener('touchend', onEnd, {pasive: true});
  
  
  function onMove () {
    // current position of mouse or finger
    const currentX = event.pageX ?? e.touches[0].pageX;
  
    //the distance between the initial position and the current position
    pullDeltaX = currentX - startX;

    // no movement
    if (pullDeltaX === 0) return

    // change the flag to indicate is animating
    isAnimating = true;
    // calculate the rotation degree of the card using the distance
    const deg = pullDeltaX / 10;
    // move the card and change the opacity, add style to cursor
    actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`
    // actualCard.style.opacity = 1 - Math.abs(pullDeltaX) / 100;
    actualCard.style.cursor = 'grabbing';
  }
  function onEnd (e) {
    // remove the event listeners
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);
    
    document.removeEventListener('touchmove', onMove, {pasive: true});
    document.removeEventListener('touchend', onEnd, {pasive: true});

    // reset the flag
    isAnimating = false;
    // reset the distance
    pullDeltaX = 0;
    // reset the card position
    actualCard.style.transform = 'none';
    // actualCard.style.opacity = 1;
    actualCard.style.cursor = 'grab';
  
  }
}



document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag, {pasive: true});

