
    var dlcount = null;

    document.getElementById('readyChoice').ontouchstart = function () {
        const goal = document.getElementById('goal');
        dlcount = Number(goal.value);
        localStorage.setItem('dlcount', dlcount)
        window.location.href = 'page2.html';
        console.log('dlcount set to', dlcount);
    }


