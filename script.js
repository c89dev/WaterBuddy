
    var dlcount = null;

    document.getElementById('readyChoice').onclick = function () {
        const goal = document.getElementById('goal');
        dlcount = Number(goal.value);
        localStorage.setItem('dlcount', dlcount)
        window.location.href = 'page2.html';
        console.log('dlcount set to', dlcount);
    }


