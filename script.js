    const APP_VERSION = '0.0.5'
    let dlcount = null;


    //START BUTTON
    const handleStartClick = (e) => {
        e.preventDefault();
        const goal = document.getElementById('goal');
        dlcount = Number(goal.value);
        localStorage.setItem('dlcount', dlcount);
        window.location.href = 'page2.html';
        console.log('dlcount set to', dlcount);
    }

    const startBtn = document.getElementById('readyChoice');
    if(startBtn) {
    ['pointerdown'].forEach(evt =>
        startBtn.addEventListener(evt, handleStartClick)
    );
    }
    
    //DRINK BUTTON
    const handleDrinkClick = (e) => {
        e.preventDefault();
        let dlcount = Number(localStorage.getItem('dlcount'));
        if(dlcount > 0){
            dlcount--;
            document.getElementById('remainingLbl').textContent = 'Remaining ' + dlcount;
            localStorage.setItem('dlcount', dlcount);
            console.log('Remaining desiliters:', dlcount);
            
            if (dlcount === 0){
                console.log('Desiliters reached!')
            }
        }
        else
        {
            console.log('Desiliters reached!')
            return;
        }
    }
    
    
    const drinkBtn = document.getElementById('drinkBtnId');
    if(drinkBtn) {
    ['pointerdown'].forEach(evt =>
        drinkBtn.addEventListener(evt, handleDrinkClick)
    );
    }

    //RESET BUTTON
    const handleResetClick = (e) => {
        e.preventDefault();
        localStorage.clear();
        dlcount = null;
        window.location.href = 'index.html';
    }

    const resetBtn = document.getElementById('resetBtnId');
    if(resetBtn) {
    ['pointerdown'].forEach(evt =>
        resetBtn.addEventListener(evt, handleResetClick)
    );
    }
    


