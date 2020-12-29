window.addEventListener('load', (event) => {
    var loader = document.getElementById('cube-loader');
    document.getElementsByTagName('body')[0].classList.remove('loading')
    setInterval(function (){document.getElementsByTagName('body')[0].classList.add('loaded')}, 2000)
})
