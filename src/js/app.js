;(function(document) {

    window.app = {
        nColor: 'rgb(21, 30, 30)'
    };

    function start() {
        app.canvas = document.getElementById('app');

		window.ctx = app.canvas.getContext('2d');
		window.l = ctx.lineTo.bind(ctx);
		window.m = ctx.moveTo.bind(ctx);
		window.bp = ctx.beginPath.bind(ctx);
		window.cp = ctx.closePath.bind(ctx);

		window.pause = false;
		window.res = {x: 1280, y: 800};
		app.size = {x: window.innerWidth, y: window.innerHeight};
		window.ratio = app.size.x / res.x;
		app.canvas.width = app.size.x;
        app.canvas.height = app.size.y;

        this.game = new Game();
    }

    function resize() {
        app.size.x = window.innerHeight;
        app.size.y = window.innerHeight;

        app.canvas.width = app.size.x;
        app.canvas.height = app.size.y;
    }

    window.onload = start;
    window.onresize = resize;
})(document);