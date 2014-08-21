$.init = function(){
    $.wrap = document.getElementById( 'wrap' );
    $.wrapInner = document.getElementById( 'wrap-inner' );
    $.cbg1 = document.getElementById( 'cbg1' );
    $.cbg1s = document.getElementById( 'cbg1s' );
    $.cbg2 = document.getElementById( 'cbg2' );
    $.cbg2s = document.getElementById( 'cbg2s' );
    $.cbg3 = document.getElementById( 'cbg3' );
    $.cbg3s = document.getElementById( 'cbg3s' );
    $.cbg4 = document.getElementById( 'cbg4' );
    $.cbg4s = document.getElementById( 'cbg4s' );
    $.cmg = document.getElementById( 'cmg' );
    $.cfg = document.getElementById( 'cfg' );	
    $.ctxbg1 = $.cbg1.getContext( '2d' );
    $.ctxbg1s = $.cbg1s.getContext( '2d' );
    $.ctxbg2 = $.cbg2.getContext( '2d' );
    $.ctxbg2s = $.cbg2s.getContext( '2d' );
    $.ctxbg3 = $.cbg3.getContext( '2d' );
    $.ctxbg3s = $.cbg3s.getContext( '2d' );
    $.ctxbg4 = $.cbg4.getContext( '2d' );
    $.ctxbg4s = $.cbg4s.getContext( '2d' );
    $.ctxmg = $.cmg.getContext( '2d' );
    $.ctxfg = $.cfg.getContext( '2d' );
    $.cw = $.cmg.width = $.cfg.width = 1200;
    $.ch = $.cmg.height = $.cfg.height = 400;
    $.wrap.style.width = $.wrapInner.style.width = $.cw + 'px';
    $.wrap.style.height = $.wrapInner.style.height = $.ch + 'px';
    $.wrap.style.marginLeft = ( -$.cw / 2 ) - 10 + 'px';
    $.wrap.style.marginTop = ( -$.ch / 2 ) - 10 + 'px';

    $.ww = Math.floor( $.cw * 1.5 );
    $.wh = Math.floor( $.ch * 1.5 );
    $.cbg1s.width = $.cbg1.width = Math.floor( $.cw * 1.2 );
    $.cbg1s.height = $.cbg1.height = Math.floor( $.ch * 1.4 );
    $.cbg2s.width = $.cbg2.width = Math.floor( $.cw * 1.3 );
    $.cbg2s.height = $.cbg2.height = Math.floor( $.ch * 1.6 );
    $.cbg3s.width = $.cbg3.width = Math.floor( $.cw * 1.4 );
    $.cbg3s.height = $.cbg3.height = Math.floor( $.ch * 1.8 );
    $.cbg4s.width = $.cbg4.width = Math.floor( $.cw * 1.6 );
    $.cbg4s.height = $.cbg4.height = Math.floor( $.ch * 2 );
    $.goingNorth = 0
    $.spaceSpeed = 1.5

    $.screen = {
        x: ( $.ww - $.cw ) / -2,
        y: ( $.wh - $.ch ) / -2
    };

    $.states = {};
    $.enemies = [];
    $.bullets = [];
    $.particleEmitters = [];
    $.keys = {
        state: {
            up: 0,
            down: 0,
            left: 0,
            right: 0,
            a: 0,
            s: 0,
            d: 0,
            f: 0,
            g: 0,
            h: 0,
            j: 0,
            k: 0,
            l: 0
        },
        pressed: {
            up: 0,
            down: 0,
            left: 0,
            right: 0,
            a: 0,
            s: 0,
            d: 0,
            f: 0,
            g: 0,
            h: 0,
            j: 0,
            k: 0,
            l: 0
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


    $.jump1 = 1
    $.jump1s = 1
    $.jump2 = 1
    $.jump2s = 1
    $.jump3 = 1
    $.jump3s = 1

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
        y: -$.ch
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
    var i = 4000;
    while( i-- ) {
        $.util.fillCircle( $.ctxbg1s, $.util.rand( 0, $.cbg1.width ), $.util.rand( 0, $.cbg1.height ), $.util.rand( 0.2, 0.5 ), 'hsla(0, 0%, 100%, ' + $.util.rand( 0.05, 0.2 ) + ')' );
    }

    var i = 800;
    while( i-- ) {
        $.util.fillCircle( $.ctxbg1s, $.util.rand( 0, $.cbg1.width ), $.util.rand( 0, $.cbg1.height ), $.util.rand( 0.1, 0.8 ), 'hsla(0, 0%, 100%, ' + $.util.rand( 0.05, 0.7 ) + ')' );
    }

}

$.renderBackground2 = function() {
    var i = 800;
    while( i-- ) {
        $.util.fillCircle( $.ctxbg2, $.util.rand( 0, $.cbg2.width ), $.util.rand( 0, $.cbg2.height ), $.util.rand( 1, 2 ), 'hsla(0, 0%, 100%, ' + $.util.rand( 0.05, 0.15 ) + ')' );
    }
    var i = 800;
    while( i-- ) {
        $.util.fillCircle( $.ctxbg2s, $.util.rand( 0, $.cbg2.width ), $.util.rand( 0, $.cbg2.height ), $.util.rand( 1, 2 ), 'hsla(0, 0%, 100%, ' + $.util.rand( 0.05, 0.15 ) + ')' );
    }

}

$.renderBackground3 = function() {
    var i = 400;
    while( i-- ) {
        $.util.fillCircle( $.ctxbg3, $.util.rand( 0, $.cbg3.width ), $.util.rand( 0, $.cbg3.height ), $.util.rand( 1, 2.5 ), 'hsla(0, 0%, 100%, ' + $.util.rand( 0.15, 0.2 ) + ')' );
    }
    var i = 400;
    while( i-- ) {
        $.util.fillCircle( $.ctxbg3s, $.util.rand( 0, $.cbg3.width ), $.util.rand( 0, $.cbg3.height ), $.util.rand( 1, 2.5 ), 'hsla(0, 0%, 100%, ' + $.util.rand( 0.15, 0.2 ) + ')' );
    }

}

$.renderBackground4 = function() {
    var size = 100;
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
        var i = $.bullets.length; while( i-- ){ $.bullets[ i ].update( i ) }
        var i = $.bullets.length; while( i-- ){ $.bullets[ i ].render( i ) }
        var i = $.enemies.length; while( i-- ){ $.enemies[ i ].update( i ) }
        var i = $.enemies.length; while( i-- ){ $.enemies[ i ].render( i ) }
        $.hero.update()
        $.hero.render()
        $.ctxmg.restore()
        $.renderMinimap()
        $.spawnEnemies();
        $.enemyOffsetMod += ( $.slow ) ? $.dt / 3 : $.dt;

        $.tick += $.dt;

    }
}

/*==============================================================================
Enemy Spawning
==============================================================================*/
$.getSpawnCoordinates = function( radius ) {
    var quadrant = Math.floor( $.util.rand( 0, 4 ) ),
        x,
        y,
        start;
    
    if( quadrant === 0){
        x = $.util.rand( 0+40, $.ww-40 );
        y = -radius;
        start = 'top';
    } else if( quadrant === 1 && false){
        x = $.ww + radius;
        y = $.util.rand( 0, $.wh );
        start = 'right';
    } else if( quadrant === 2 && false) {
        x = $.util.rand( 0, $.ww );
        y = $.wh + radius;
        start = 'bottom';
    } else {
        if(false){
            x = -radius;
            y = $.util.rand( 0, $.wh );
            start = 'left';
        }
    }

    return { x: x, y: y, start: start };
};


$.spawnEnemy = function( type ) {
    var params = $.definitions.enemies[ type ],
        coordinates = $.getSpawnCoordinates( params.radius );
    params.x = coordinates.x;
    params.y = coordinates.y;
    params.start = coordinates.start;
    params.type = type;
    return new $.Enemy( params );
};


$.spawnEnemies = function() {
    var floorTick = Math.floor( $.tick );
    for( var i = 0; i < $.level.distributionCount; i++ ) {
        var timeCheck = $.level.distribution[ i ];
        if( $.levelDiffOffset > 0 ){
            timeCheck = Math.max( 1, timeCheck - ( $.levelDiffOffset * 2) );
        }
        if( floorTick % timeCheck === 0 ) {
            $.enemies.push( $.spawnEnemy( i ) );
        }
    }
};



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

    if( $.hero.y < $.ch * 0.9 ) {
        yModify = $.hero.y / $.ch;
    } else if( $.hero.y > $.wh - $.ch * 0.1 ) {
        yModify = 1 - ( $.wh - $.hero.y ) / $.ch;
    } else {
        yModify = 0.9;
    }

    xSnap = ( ( $.cw * xModify - $.hero.x ) - $.screen.x ) / 15;
    ySnap = ( ( $.ch * yModify - $.hero.y ) - $.screen.y ) / 40;

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
    //console.log($.cbg1.style.marginTop, $.cbg1.height)
    if(parseFloat($.cbg1.style.marginTop) > $.cbg1.height){
        $.jump1++
    }
    if(parseFloat($.cbg1s.style.marginTop) > $.cbg1s.height){
        $.jump1s++
    }
    if(parseFloat($.cbg2.style.marginTop) > $.cbg2.height){
        $.jump2++
    }
    if(parseFloat($.cbg2s.style.marginTop) > $.cbg2s.height){
        $.jump2s++
    }
    if(parseFloat($.cbg3.style.marginTop) > $.cbg3.height){
        $.jump3++
    }
    if(parseFloat($.cbg3s.style.marginTop) > $.cbg3s.height){
        $.jump3s++
    }


    // animate background canvas
    $.cbg1s.style.marginLeft =  $.cbg1.style.marginLeft = 
        -( ( $.cbg1.width - $.cw ) / 2 ) // half the difference from bg to viewport
        - ( ( $.cbg1.width - $.cw ) / 2 ) // half the diff again, modified by a percentage below
        * ( ( -$.screen.x - ( $.ww - $.cw ) / 2 ) / ( ( $.ww - $.cw ) / 2) ) // viewport offset applied to bg
        - $.rumble.x + 'px';
    $.cbg1.style.marginTop = 
        -( ( $.cbg1.height - $.ch ) / 2 ) 
        - ( ( $.cbg1.height - $.ch ) / 2 )
        * ( ( - $.screen.y - $.goingNorth - ( $.wh - $.ch ) / 2 ) / ( ( $.wh - $.ch ) / 2) ) 
        - $.rumble.y - 2*$.cbg1.height * ($.jump1-1)  + 'px';
    $.cbg1s.style.marginTop = 
        -( ( $.cbg1.height - $.ch ) / 2 ) 
        - ( ( $.cbg1.height - $.ch ) / 2 )
        * ( ( -$.screen.y - $.goingNorth - ( $.wh - $.ch ) / 2 ) / ( ( $.wh - $.ch ) / 2) ) 
        - $.rumble.y - cbg1.height - 2*$.cbg1.height * ($.jump1s-1) + 'px';


    $.cbg2.style.marginLeft = 
        -( ( $.cbg2.width - $.cw ) / 2 ) // half the difference from bg to viewport
        - ( ( $.cbg2.width - $.cw ) / 2 ) // half the diff again, modified by a percentage below
        * ( ( -$.screen.x - ( $.ww - $.cw ) / 2 ) / ( ( $.ww - $.cw ) / 2) ) // viewport offset applied to bg
        - $.rumble.x + 'px';
    $.cbg2s.style.marginLeft = 
        -( ( $.cbg2.width - $.cw ) / 2 ) // half the difference from bg to viewport
        - ( ( $.cbg2.width - $.cw ) / 2 ) // half the diff again, modified by a percentage below
        * ( ( -$.screen.x - ( $.ww - $.cw ) / 2 ) / ( ( $.ww - $.cw ) / 2) ) // viewport offset applied to bg
        - $.rumble.x + 'px';
 
    $.cbg2.style.marginTop = 
        -( ( $.cbg2.height - $.ch ) / 2 ) 
        - ( ( $.cbg2.height - $.ch ) / 2 )
        * ( ( -$.screen.y-$.goingNorth - ( $.wh - $.ch ) / 2 ) / ( ( $.wh - $.ch ) / 2) ) 
        - $.rumble.y - 2*$.cbg2.height * ($.jump2-1)  + 'px';
    $.cbg2s.style.marginTop = 
        -( ( $.cbg2.height - $.ch ) / 2 ) 
        - ( ( $.cbg2.height - $.ch ) / 2 )
        * ( ( -$.screen.y-$.goingNorth - ( $.wh - $.ch ) / 2 ) / ( ( $.wh - $.ch ) / 2) ) 
        - $.rumble.y - cbg2.height - 2*$.cbg2.height * ($.jump2s-1)   + 'px';


    $.cbg3.style.marginLeft = 
        -( ( $.cbg3.width - $.cw ) / 2 ) // half the difference from bg to viewport
        - ( ( $.cbg3.width - $.cw ) / 2 ) // half the diff again, modified by a percentage below
        * ( ( -$.screen.x - ( $.ww - $.cw ) / 2 ) / ( ( $.ww - $.cw ) / 2) ) // viewport offset applied to bg
        - $.rumble.x + 'px';
    $.cbg3s.style.marginLeft = 
        -( ( $.cbg3.width - $.cw ) / 2 ) // half the difference from bg to viewport
        - ( ( $.cbg3.width - $.cw ) / 2 ) // half the diff again, modified by a percentage below
        * ( ( -$.screen.x - ( $.ww - $.cw ) / 2 ) / ( ( $.ww - $.cw ) / 2) ) // viewport offset applied to bg
        - $.rumble.x + 'px';

    $.cbg3.style.marginTop = 
        -( ( $.cbg3.height - $.ch ) / 2 ) 
        - ( ( $.cbg3.height - $.ch ) / 2 )
        * ( ( -$.screen.y-$.goingNorth - ( $.wh - $.ch ) / 2 ) / ( ( $.wh - $.ch ) / 2) ) 
        - $.rumble.y - 2*$.cbg3.height * ($.jump3-1) + 'px';
    $.cbg3s.style.marginTop = 
        -( ( $.cbg3.height - $.ch ) / 2 ) 
        - ( ( $.cbg3.height - $.ch ) / 2 )
        * ( ( -$.screen.y-$.goingNorth - ( $.wh - $.ch ) / 2 ) / ( ( $.wh - $.ch ) / 2) ) 
        - $.rumble.y - cbg3.height - 2*$.cbg3.height * ($.jump3s-1) + 'px';



    $.cbg4.style.marginLeft = 
        -( ( $.cbg4.width - $.cw ) / 2 ) // half the difference from bg to viewport
        - ( ( $.cbg4.width - $.cw ) / 2 ) // half the diff again, modified by a percentage below
        * ( ( -$.screen.x - ( $.ww - $.cw ) / 2 ) / ( ( $.ww - $.cw ) / 2) ) // viewport offset applied to bg
        - $.rumble.x + 'px';
    $.cbg4.style.marginTop = 
        -( ( $.cbg4.height - $.ch ) / 2 ) 
        - ( ( $.cbg4.height - $.ch ) / 2 )
        * ( ( -$.screen.y-$.goingNorth - ( $.wh - $.ch ) / 2 ) / ( ( $.wh - $.ch ) / 2) ) 
        - $.rumble.y + 'px';

    $.goingNorth+=$.spaceSpeed;
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
    if( e === 66 || e === 78 || e === 77 || e === 188 || e === 39 ){ $.keys.state.right = 1; }
    if( e === 40 || e === 83 ){ $.keys.state.down = 1; }
    if( e === 90 || e === 88 || e === 67 || e === 37 || e === 86 ){ $.keys.state.left = 1; }
    if( e === 65 ){ $.keys.state.a = 1; }
    if( e === 83 ){ $.keys.state.s = 1; }
    if( e === 68 ){ $.keys.state.d = 1; }
    if( e === 70 ){ $.keys.state.f = 1; }
    if( e === 71 ){ $.keys.state.g = 1; }
    if( e === 72 ){ $.keys.state.h = 1; }
    if( e === 74 ){ $.keys.state.j = 1; }
    if( e === 75 ){ $.keys.state.k = 1; }
    if( e === 76 ){ $.keys.state.l = 1; }
}

$.keyupcb = function( e ) {
    var e = ( e.keyCode ? e.keyCode : e.which );
    if( e === 38 || e === 87 ){ $.keys.state.up = 0; }
    if( e === 40 || e === 83 ){ $.keys.state.down = 0; }
    if( e === 66 || e === 78 || e === 77 || e === 188 || e === 39 ){ $.keys.state.right = 0; }
    if( e === 90 || e === 88 || e === 67 || e === 37 || e === 86 ){ $.keys.state.left = 0; }
    if( e === 65 ){ $.keys.state.a = 0; }
    if( e === 83 ){ $.keys.state.s = 0; }
    if( e === 68 ){ $.keys.state.d = 0; }
    if( e === 70 ){ $.keys.state.f = 0; }
    if( e === 71 ){ $.keys.state.g = 0; }
    if( e === 72 ){ $.keys.state.h = 0; }
    if( e === 74 ){ $.keys.state.j = 0; }
    if( e === 75 ){ $.keys.state.k = 0; }
    if( e === 76 ){ $.keys.state.l = 0; }

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
