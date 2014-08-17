$.init = function(){
    $.wrap = document.getElementById( 'wrap' );
    $.wrapInner = document.getElementById( 'wrap-inner' );
    $.cbg1 = document.getElementById( 'cbg1' );
    $.cbg2 = document.getElementById( 'cbg2' );
    $.cbg3 = document.getElementById( 'cbg3' );
    $.cbg4 = document.getElementById( 'cbg4' );
    $.cmg = document.getElementById( 'cmg' );
    $.cfg = document.getElementById( 'cfg' );	
    $.ctxbg1 = $.cbg1.getContext( '2d' );
    $.ctxbg2 = $.cbg2.getContext( '2d' );
    $.ctxbg3 = $.cbg3.getContext( '2d' );
    $.ctxbg4 = $.cbg4.getContext( '2d' );
    $.ctxmg = $.cmg.getContext( '2d' );
    $.ctxfg = $.cfg.getContext( '2d' );
    $.cw = $.cmg.width = $.cfg.width = 1200;
    $.ch = $.cmg.height = $.cfg.height = 400;
    $.wrap.style.width = $.wrapInner.style.width = $.cw + 'px';
    $.wrap.style.height = $.wrapInner.style.height = $.ch + 'px';
    $.wrap.style.marginLeft = ( -$.cw / 2 ) - 10 + 'px';
    $.wrap.style.marginTop = ( -$.ch / 2 ) - 10 + 'px';

    $.ww = Math.floor( $.cw * 1.2 );
    $.wh = Math.floor( $.ch * 2 );
    $.cbg1.width = Math.floor( $.cw * 1.1 );
    $.cbg1.height = Math.floor( $.ch * 1.4 );
    $.cbg2.width = Math.floor( $.cw * 1.15 );
    $.cbg2.height = Math.floor( $.ch * 1.6 );
    $.cbg3.width = Math.floor( $.cw * 1.2 );
    $.cbg3.height = Math.floor( $.ch * 1.8 );
    $.cbg4.width = Math.floor( $.cw * 2 );
    $.cbg4.height = Math.floor( $.ch * 1.4 );

    $.screen = {
        x: ( $.ww - $.cw ) / -2,
        y: ( $.wh - $.ch ) / -2
    };

    $.states = {};
    $.enemies = [];
    $.keys = {
        state: {
            up: 0,
            down: 0,
            left: 0,
            right: 0,
            f: 0,
            m: 0,
            p: 0
        },
        pressed: {
            up: 0,
            down: 0,
            left: 0,
            right: 0,
            f: 0,
            m: 0,
            p: 0
        }
    };
    $.mouse = {
        x: $.ww / 2,
        y: $.wh / 2,
        sx: 0,
        sy: 0,
        ax: window.innerWidth / 2,
        ay: 0,
        down: 0
    };
    $.cOffset = {
        left: 0,
        top: 0
    };
    $.minimap = {
        x: 20,
        y: $.ch - Math.floor( $.ch * 0.1 ) - 20,
        width: Math.floor( $.cw * 0.1 ),
        height: Math.floor( $.ch * 0.1 ),
        scale: Math.floor( $.cw * 0.1 ) / $.ww,
        color: 'hsla(0, 0%, 0%, 0.85)',
        strokeColor: '#3a3a3a'
    },



    $.resizecb();
    $.bindEvents();
    $.setupStates();
    $.reset()
    $.renderBackground1();
    $.renderBackground2();
    $.renderBackground3();
    $.renderBackground4();
    //$.renderFavicon();
    //$.setState( 'menu' );
    $.loop();

}


/*==============================================================================
Create Favicon
==============================================================================*/
$.renderFavicon = function() {
    var favicon = document.getElementById( 'favicon' ),
        favc = document.createElement( 'canvas' ),
        favctx = favc.getContext( '2d' ),
        faviconGrid = [
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
            [ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
            [ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
            [ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
            [ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
            [ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
            [ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
            [ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
            [ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
            [ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
            [ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
            [ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
            [ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
            [ 1,  , 1,  , 1,  , 1,  , 1,  ,  , 1,  , 1,  , 1 ],
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
        ];
    favc.width = favc.height = 16;
    favctx.beginPath();
    for( var y = 0; y < 16; y++ ) {
        for( var x = 0; x < 16; x++ ) {
            if( faviconGrid[ y ][ x ] === 1 ) {
                favctx.rect( x, y, 1, 1 );
            }
        }
    }
    favctx.fill();
    favicon.href = favc.toDataURL();
};


/*==============================================================================
Reset
==============================================================================*/
$.reset = function() {
    $.indexGlobal = 0;
    $.dt = 1;
    $.lt = 0;
    $.elapsed = 0;
    $.tick = 0;

    $.gameoverTick = 0;
    $.gameoverTickMax = 200;
    $.gameoverExplosion = 0;

    $.instructionTick = 0;
    $.instructionTickMax = 400;

    $.levelDiffOffset = 0;
    $.enemyOffsetMod = 0;
    $.slow = 0;

    $.screen = {
        x: ( $.ww - $.cw ) / -2,
        y: ( $.wh - $.ch ) / -2
    };
    $.rumble = {
        x: 0,
        y: 0,
        level: 0,
        decay: 0.4
    };

    $.mouse.down = 0;

    $.level = {
        current: 0,
        kills: 0,
        killsToLevel: $.definitions.levels[ 0 ].killsToLevel,
        distribution: $.definitions.levels[ 0 ].distribution,
        distributionCount: $.definitions.levels[ 0 ].distribution.length
    };

    $.enemies.length = 0;
    //$.bullets.length = 0;
    //$.explosions.length = 0;
    //$.powerups.length = 0;
    //$.particleEmitters.length = 0;
    //$.textPops.length = 0;
    //$.levelPops.length = 0;
    //$.powerupTimers.length = 0;

    //for( var i = 0; i < $.definitions.powerups.length; i++ ) {
    //    $.powerupTimers.push( 0 );
    //}

    $.kills = 0;
    $.bulletsFired = 0;
    $.powerupsCollected = 0;
    $.score = 0;

    $.hero = new $.Hero();

    //$.levelPops.push( new $.LevelPop( {
    //    level: 1
    //} ) );
};


/*==============================================================================
Render Backgrounds
==============================================================================*/
$.renderBackground1 = function() {
    var i = 4000;
    while( i-- ) {
        $.util.fillCircle( $.ctxbg1, $.util.rand( 0, $.cbg1.width ), $.util.rand( 0, $.cbg1.height ), $.util.rand( 0.2, 0.5 ), 'hsla(0, 0%, 100%, ' + $.util.rand( 0.05, 0.2 ) + ')' );
    }

    var i = 800;
    while( i-- ) {
        $.util.fillCircle( $.ctxbg1, $.util.rand( 0, $.cbg1.width ), $.util.rand( 0, $.cbg1.height ), $.util.rand( 0.1, 0.8 ), 'hsla(0, 0%, 100%, ' + $.util.rand( 0.05, 0.7 ) + ')' );
    }
}

$.renderBackground2 = function() {
    var i = 800;
    while( i-- ) {
        $.util.fillCircle( $.ctxbg2, $.util.rand( 0, $.cbg2.width ), $.util.rand( 0, $.cbg2.height ), $.util.rand( 1, 2 ), 'hsla(0, 0%, 100%, ' + $.util.rand( 0.05, 0.15 ) + ')' );
    }
}

$.renderBackground3 = function() {
    var i = 400;
    while( i-- ) {
        $.util.fillCircle( $.ctxbg3, $.util.rand( 0, $.cbg3.width ), $.util.rand( 0, $.cbg3.height ), $.util.rand( 1, 2.5 ), 'hsla(0, 0%, 100%, ' + $.util.rand( 0.05, 0.1 ) + ')' );
    }
}

$.renderBackground4 = function() {
    var size = 50;
    $.ctxbg4.fillStyle = 'hsla(0, 0%, 50%, 0.2)';
    var i = Math.round( $.cbg4.height / size );
    while( i-- ) {
        $.ctxbg4.fillRect( 0, i * size + 25, $.cbg4.width, 1 );
    }
    i = Math.round( $.cbg4.width / size );
    while( i-- ) {
        var max_bright = 0.25
        var tcw = $.cbg4.width/2
            $.ctxbg4.fillStyle = 'hsla(0, 0%, 50%, '+max_bright*Math.abs((tcw-Math.abs(i*size-tcw))/(tcw))  +')';
        $.ctxbg4.fillRect( i * size, 0, 1, $.cbg4.height );
    }
}
/*==============================================================================
Animation Loop
==============================================================================*/
$.loop = function () {
    requestAnimFrame($.loop)

    $.states['test']()
}


$.setupStates = function(){
    $.states['test'] = function(){
        $.updateDelta()
        $.clearScreen()

        $.updateScreen()

        $.ctxmg.save()
        $.ctxmg.translate( $.screen.x - $.rumble.x, $.screen.y - $.rumble.y );
        $.hero.update()
        $.hero.render()
        $.ctxmg.restore()
        $.renderMinimap()

    }
}

$.renderMinimap = function() {
    $.ctxmg.fillStyle = $.minimap.color;
    $.ctxmg.fillRect( $.minimap.x, $.minimap.y, $.minimap.width, $.minimap.height );

    $.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 0.1)';
    $.ctxmg.fillRect( 
        Math.floor( $.minimap.x + -$.screen.x * $.minimap.scale ), 
        Math.floor( $.minimap.y + -$.screen.y * $.minimap.scale ), 
        Math.floor( $.cw * $.minimap.scale ), 
        Math.floor( $.ch * $.minimap.scale )
    );

    /*
    //$.ctxmg.beginPath();
    for( var i = 0; i < $.enemies.length; i++ ){
        var enemy = $.enemies[ i ],
            x = $.minimap.x + Math.floor( enemy.x * $.minimap.scale ),
            y = $.minimap.y + Math.floor( enemy.y * $.minimap.scale );
        if( $.util.pointInRect( x + 1, y + 1, $.minimap.x, $.minimap.y, $.minimap.width, $.minimap.height ) ) {
            //$.ctxmg.rect( x, y, 2, 2 );
            $.ctxmg.fillStyle = 'hsl(' + enemy.hue + ', ' + enemy.saturation + '%, 50%)';
            $.ctxmg.fillRect( x, y, 2, 2 );
        }
    }
    //$.ctxmg.fillStyle = '#f00';
    //$.ctxmg.fill();

    $.ctxmg.beginPath();
    for( var i = 0; i < $.bullets.length; i++ ){
        var bullet = $.bullets[ i ],
            x = $.minimap.x + Math.floor( bullet.x * $.minimap.scale ),
            y = $.minimap.y + Math.floor( bullet.y * $.minimap.scale );
        if( $.util.pointInRect( x, y, $.minimap.x, $.minimap.y, $.minimap.width, $.minimap.height ) ) {
            $.ctxmg.rect( x, y, 1, 1 );
        }
    }
    $.ctxmg.fillStyle = '#fff';
    $.ctxmg.fill();
    */

    $.ctxmg.fillStyle = $.hero.fillStyle;
    $.ctxmg.fillRect( $.minimap.x + Math.floor( $.hero.x * $.minimap.scale ), $.minimap.y + Math.floor( $.hero.y * $.minimap.scale ), 2, 2 );

    $.ctxmg.strokeStyle = $.minimap.strokeColor;
    $.ctxmg.strokeRect( $.minimap.x - 0.5, $.minimap.y - 0.5, $.minimap.width + 1, $.minimap.height + 1 );
};



/*==============================================================================
Miscellaneous
==============================================================================*/
$.clearScreen = function() {
    $.ctxmg.clearRect( 0, 0, $.cw, $.ch );
};

$.updateDelta = function() {
    var now = Date.now();
    $.dt = ( now - $.lt ) / ( 1000 / 60 );
    $.dt = ( $.dt < 0 ) ? 0.001 : $.dt;
    $.dt = ( $.dt > 10 ) ? 10 : $.dt;
    $.lt = now;
    $.elapsed += $.dt;
};
$.updateScreen = function() {
    var xSnap,
        xModify,
        ySnap,
        yModify;

    if( $.hero.x < $.cw / 2 ) {
        xModify = $.hero.x / $.cw;
    } else if( $.hero.x > $.ww - $.cw / 2 ) {
        xModify = 1 - ( $.ww - $.hero.x ) / $.cw;
    } else {
        xModify = 0.5;
    }

    if( $.hero.y < $.ch / 2 ) {
        yModify = $.hero.y / $.ch;
    } else if( $.hero.y > $.wh - $.ch / 2 ) {
        yModify = 1 - ( $.wh - $.hero.y ) / $.ch;
    } else {
        yModify = 0.5;
    }

    xSnap = ( ( $.cw * xModify - $.hero.x ) - $.screen.x ) / 30;
    ySnap = ( ( $.ch * yModify - $.hero.y ) - $.screen.y ) / 30;

    // ease to new coordinates
    $.screen.x += xSnap * $.dt;
    $.screen.y += ySnap * $.dt;
    //console.log($.screen.x)

    // update rumble levels, keep X and Y changes consistent, apply rumble
    if( $.rumble.level > 0 ) {
        $.rumble.level -= $.rumble.decay;
        $.rumble.level = ( $.rumble.level < 0 ) ? 0 : $.rumble.level;
        $.rumble.x = $.util.rand( -$.rumble.level, $.rumble.level );
        $.rumble.y = $.util.rand( -$.rumble.level, $.rumble.level );
    } else {
        $.rumble.x = 0;
        $.rumble.y = 0;
    }

    //$.screen.x -= $.rumble.x;
    //$.screen.y -= $.rumble.y;

    // animate background canvas
    $.cbg1.style.marginLeft = 
        -( ( $.cbg1.width - $.cw ) / 2 ) // half the difference from bg to viewport
        - ( ( $.cbg1.width - $.cw ) / 2 ) // half the diff again, modified by a percentage below
        * ( ( -$.screen.x - ( $.ww - $.cw ) / 2 ) / ( ( $.ww - $.cw ) / 2) ) // viewport offset applied to bg
        - $.rumble.x + 'px';
    $.cbg1.style.marginTop = 
        -( ( $.cbg1.height - $.ch ) / 2 ) 
        - ( ( $.cbg1.height - $.ch ) / 2 )
        * ( ( -$.screen.y - ( $.wh - $.ch ) / 2 ) / ( ( $.wh - $.ch ) / 2) ) 
        - $.rumble.y + 'px';
    $.cbg2.style.marginLeft = 
        -( ( $.cbg2.width - $.cw ) / 2 ) // half the difference from bg to viewport
        - ( ( $.cbg2.width - $.cw ) / 2 ) // half the diff again, modified by a percentage below
        * ( ( -$.screen.x - ( $.ww - $.cw ) / 2 ) / ( ( $.ww - $.cw ) / 2) ) // viewport offset applied to bg
        - $.rumble.x + 'px';
    $.cbg2.style.marginTop = 
        -( ( $.cbg2.height - $.ch ) / 2 ) 
        - ( ( $.cbg2.height - $.ch ) / 2 )
        * ( ( -$.screen.y - ( $.wh - $.ch ) / 2 ) / ( ( $.wh - $.ch ) / 2) ) 
        - $.rumble.y + 'px';
    $.cbg3.style.marginLeft = 
        -( ( $.cbg3.width - $.cw ) / 2 ) // half the difference from bg to viewport
        - ( ( $.cbg3.width - $.cw ) / 2 ) // half the diff again, modified by a percentage below
        * ( ( -$.screen.x - ( $.ww - $.cw ) / 2 ) / ( ( $.ww - $.cw ) / 2) ) // viewport offset applied to bg
        - $.rumble.x + 'px';
    $.cbg3.style.marginTop = 
        -( ( $.cbg3.height - $.ch ) / 2 ) 
        - ( ( $.cbg3.height - $.ch ) / 2 )
        * ( ( -$.screen.y - ( $.wh - $.ch ) / 2 ) / ( ( $.wh - $.ch ) / 2) ) 
        - $.rumble.y + 'px';
    $.cbg4.style.marginLeft = 
        -( ( $.cbg4.width - $.cw ) / 2 ) // half the difference from bg to viewport
        - ( ( $.cbg4.width - $.cw ) / 2 ) // half the diff again, modified by a percentage below
        * ( ( -$.screen.x - ( $.ww - $.cw ) / 2 ) / ( ( $.ww - $.cw ) / 2) ) // viewport offset applied to bg
        - $.rumble.x + 'px';
    $.cbg4.style.marginTop = 
        -( ( $.cbg4.height - $.ch ) / 2 ) 
        - ( ( $.cbg4.height - $.ch ) / 2 )
        * ( ( -$.screen.y - ( $.wh - $.ch ) / 2 ) / ( ( $.wh - $.ch ) / 2) ) 
        - $.rumble.y + 'px';

    $.mousescreen();
};


/*==============================================================================
Events
==============================================================================*/
$.mousemovecb = function( e ) {
    e.preventDefault();
    $.mouse.ax = e.pageX;
    $.mouse.ay = e.pageY;
    $.mousescreen();
};

$.mousescreen = function() {
    $.mouse.sx = $.mouse.ax - $.cOffset.left;
    $.mouse.sy = $.mouse.ay - $.cOffset.top;
    $.mouse.x = $.mouse.sx - $.screen.x;
    $.mouse.y = $.mouse.sy - $.screen.y;
};

$.mousedowncb = function( e ) {
    e.preventDefault();
    $.mouse.down = 1;
};

$.mouseupcb = function( e ) {
    e.preventDefault();
    $.mouse.down = 0;
};

$.keydowncb = function( e ) {
    var e = ( e.keyCode ? e.keyCode : e.which );
    if( e === 38 || e === 87 ){ $.keys.state.up = 1; }
    if( e === 39 || e === 68 ){ $.keys.state.right = 1; }
    if( e === 40 || e === 83 ){ $.keys.state.down = 1; }
    if( e === 37 || e === 65 ){ $.keys.state.left = 1; }
    if( e === 70 ){ $.keys.state.f = 1; }
    if( e === 77 ){ $.keys.state.m = 1; }
    if( e === 80 ){ $.keys.state.p = 1; }
}

$.keyupcb = function( e ) {
    var e = ( e.keyCode ? e.keyCode : e.which );
    if( e === 38 || e === 87 ){ $.keys.state.up = 0; }
    if( e === 39 || e === 68 ){ $.keys.state.right = 0; }
    if( e === 40 || e === 83 ){ $.keys.state.down = 0; }
    if( e === 37 || e === 65 ){ $.keys.state.left = 0; }
    if( e === 70 ){ $.keys.state.f = 0; }
    if( e === 77 ){ $.keys.state.m = 0; }
    if( e === 80 ){ $.keys.state.p = 0; }
}

$.resizecb = function( e ) {
    var rect = $.cmg.getBoundingClientRect();
    $.cOffset = {
        left: rect.left,
        top: rect.top
    }
}

$.blurcb = function() {
    if( $.state == 'play' ){
        $.setState( 'pause' );
    }
}

$.bindEvents = function() {
    window.addEventListener( 'mousemove', $.mousemovecb );
    window.addEventListener( 'mousedown', $.mousedowncb );
    window.addEventListener( 'mouseup', $.mouseupcb );
    window.addEventListener( 'keydown', $.keydowncb );
    window.addEventListener( 'keyup', $.keyupcb );
    window.addEventListener( 'resize', $.resizecb );
    window.addEventListener( 'blur', $.blurcb );
};



/*==============================================================================
Start Game on Load
==============================================================================*/
window.addEventListener( 'load', function() {
    document.documentElement.className += ' loaded';
    $.init();
});
