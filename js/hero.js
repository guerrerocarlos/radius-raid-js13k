/*==============================================================================
Init
==============================================================================*/
$.Hero = function() {
    this.x = $.ww / 2;
    this.y = $.wh * 0.95 ;
    this.vx = 0;
    this.vy = 0;
    this.vmax = 20;
    this.direction = 0;
    this.accel = 2;
    this.radius = 10;
    this.life = 1;
    this.takingDamage = 0;
    this.fillStyle = '#fff';
    this.width = 400;
    this.numCannons = 8;
    this.weapon = {
        fireRate: 5,
        fireRateTick: 5,
        spread: 0.3,
        count: 1,
        bullet: {
            size: 15,
            lineWidth: 2,
            damage: 1,
            speed: 10,
            piercing: 0,
            strokeStyle: '#fff'
        },
        fireFlag: 0
    };
};

/*==============================================================================
Update
==============================================================================*/
$.Hero.prototype.update = function() {
    $.fireArray = [$.keys.state.a,$.keys.state.s,$.keys.state.d,$.keys.state.f,$.keys.state.h,$.keys.state.j,$.keys.state.k,$.keys.state.l]
    if( this.life > 0 ) {
        /*==============================================================================
        Apply Forces
        ==============================================================================*/
        if( $.keys.state.left ) {
            this.vx -= this.accel * $.dt;
            if( this.vx < -this.vmax ) {
                this.vx = -this.vmax;
            }
        } else if( $.keys.state.right ) {
            this.vx += this.accel * $.dt;
            if( this.vx > this.vmax ) {
                this.vx = this.vmax;
            }
        }
        this.vy *= 0.9;
        this.vx *= 0.9;
        this.x += this.vx * $.dt;
        this.y += this.vy * $.dt;
        /*==============================================================================
        Lock Bounds
        ==============================================================================*/
        if( this.x >= $.ww - this.width/2-20) {
            this.x = $.ww - this.width/2-20;
        }
        if( this.x <= this.width/2+20) {
            this.x = this.width/2+20;
        }
        if( this.y >= $.wh - this.radius ) {
            this.y = $.wh - this.radius;
        }
        if( this.y <= this.radius ) {
            this.y = this.radius;
        }
        /*==============================================================================
        Update Direction
        ==============================================================================*/
        var dx = $.mouse.x - this.x,
            dy = $.mouse.y - this.y;
        this.direction = Math.atan2( dy, dx );
        /*==============================================================================
        Fire Weapon
        ==============================================================================*/
        if( this.weapon.fireRateTick < this.weapon.fireRate ){
            this.weapon.fireRateTick += $.dt;
        } else {
            if( $.autofire || ( !$.autofire && $.mouse.down ) || $.fireArray.indexOf(1)>-1 ){
                $.audio.play( 'shoot' );
                //if( $.powerupTimers[ 2 ] > 0 || $.powerupTimers[ 3 ] > 0 || $.powerupTimers[ 4 ] > 0) {
                //    $.audio.play( 'shootAlt' );
                //}
                this.weapon.fireRateTick = this.weapon.fireRateTick - this.weapon.fireRate;
                this.weapon.fireFlag = 6;
                if( this.weapon.count > 1 ) {
                    var spreadStart = -this.weapon.spread / 2;
                    var spreadStep = this.weapon.spread / ( this.weapon.count - 1 );
                } else {
                    var spreadStart = 0;
                    var spreadStep = 0;
                }
                var gunX = this.x + Math.cos( this.direction ) * ( this.radius + this.weapon.bullet.size );
                var gunX = this.x
                var gunY = this.y + Math.sin( this.direction ) * ( this.radius + this.weapon.bullet.size );
                var gunY = this.y
                for(i=-4 ; i<4 ; i++){
                    if($.fireArray[i+4]==1){
                        //for( var i = 0; i < this.weapon.count; i++ ) {
                            $.bulletsFired++;
                            var color = this.weapon.bullet.strokeStyle;
                            //if( $.powerupTimers[ 2 ] > 0 || $.powerupTimers[ 3 ] > 0 || $.powerupTimers[ 4 ] > 0) {
                            //    var colors = [];
                            //    if( $.powerupTimers[ 2 ] > 0 ) { colors.push( 'hsl(' + $.definitions.powerups[ 2 ].hue + ', ' + $.definitions.powerups[ 2 ].saturation + '%, ' + $.definitions.powerups[ 2 ].lightness + '%)' ); }
                            //    if( $.powerupTimers[ 3 ] > 0 ) { colors.push( 'hsl(' + $.definitions.powerups[ 3 ].hue + ', ' + $.definitions.powerups[ 3 ].saturation + '%, ' + $.definitions.powerups[ 3 ].lightness + '%)' ); }
                            //    if( $.powerupTimers[ 4 ] > 0 ) { colors.push( 'hsl(' + $.definitions.powerups[ 4 ].hue + ', ' + $.definitions.powerups[ 4 ].saturation + '%, ' + $.definitions.powerups[ 4 ].lightness + '%)' ); }
                            //    color = colors[ Math.floor( $.util.rand( 0, colors.length ) ) ];
                            //}
                            $.bullets.push( new $.Bullet( {
                                x: gunX+this.width/8*i+this.width/8/2,
                                y: gunY,
                                speed: this.weapon.bullet.speed,
                                direction: -$.pi/2+(i+0.5)*$.pi/16,//this.direction + spreadStart + i * spreadStep,
                                damage: this.weapon.bullet.damage,
                                size: this.weapon.bullet.size,
                                lineWidth: this.weapon.bullet.lineWidth,
                                strokeStyle: color,
                                piercing: this.weapon.bullet.piercing
                            } ) );
                        //}
                    }
                }
            }
        }
        /*==============================================================================
        Check Collisions
        ==============================================================================*/
        this.takingDamage = 0;
        var ei = $.enemies.length;
        while( ei-- ) {
            var enemy = $.enemies[ ei ];
            if( enemy.inView && $.util.distance( this.x, this.y, enemy.x, enemy.y ) <= this.radius + enemy.radius ) {
                $.particleEmitters.push( new $.ParticleEmitter( {
                    x: this.x,
                    y: this.y,
                    count: 2,
                    spawnRange: 0,
                    friction: 0.85,
                    minSpeed: 2,
                    maxSpeed: 15,
                    minDirection: 0,
                    maxDirection: $.twopi,
                    hue: 0,
                    saturation: 0
                } ) );
                this.takingDamage = 1;
                this.life -= 0.0075;
                $.rumble.level = 3;
                if( Math.floor( $.tick ) % 5 == 0 ){
                    $.audio.play( 'takingDamage' );
                }
            }
        }
    }
};

/*==============================================================================
Render
==============================================================================*/
$.Hero.prototype.render = function() {
    if( this.life > 0 ) {
        if( this.takingDamage ) {
            var fillStyle = 'hsla(0, 0%, ' + $.util.rand( 0, 100 ) + '%, 1)';
            $.ctxmg.fillStyle = 'hsla(0, 0%, ' + $.util.rand( 0, 100 ) + '%, ' + $.util.rand( 0.01, 0.15 ) + ')';
            $.ctxmg.fillRect( -$.screen.x, -$.screen.y, $.cw, $.ch );
        } else if( this.weapon.fireFlag > 0 ) {
            this.weapon.fireFlag -= $.dt;
            var fillStyle = 'hsla(' + $.util.rand( 0, 359 ) + ', 100%, ' + $.util.rand( 20, 80 ) + '%, 1)';
        } else {
            var fillStyle = this.fillStyle;
        }
        var fillStyle2 = 'hsla(40, 40%, ' + $.util.rand( 0, 100 ) + '%, 1)';
        var fillStyleWhite = 'hsla(40, 40%, 100%, 1)';

        $.ctxmg.save()
        $.ctxmg.beginPath()
        // Set faux rounded corners
        $.ctxmg.fillStyle = fillStyleWhite
        $.ctxmg.strokeStyle = fillStyleWhite
        $.ctxmg.lineJoin = "round";
        $.ctxmg.lineWidth = 5
        $.ctxmg.moveTo(this.x-8-5-(this.width/2),this.y+0)
        $.ctxmg.lineTo(this.x-5-(this.width/2),this.y+0)
        $.ctxmg.lineTo(this.x-(this.width/2),this.y+18)
        $.ctxmg.lineTo(this.x+this.width/2,this.y+18)
        $.ctxmg.lineTo(this.x+this.width/2+5,this.y+0)
        $.ctxmg.lineTo(this.x+this.width/2+5+8,this.y+0)
        $.ctxmg.lineTo(this.x+this.width/2+5+8,this.y+25)
        $.ctxmg.lineTo(this.x-8-5-(this.width/2),this.y+25)
        $.ctxmg.fillStyle = fillStyleWhite
        $.ctxmg.closePath()
        $.ctxmg.stroke()
        $.ctxmg.fill()
        $.ctxmg.restore();
        for(i=-4;i<4;i++){
            $.ctxmg.save()
            //if($.fireArray[-i+3])
            //    $.ctxmg.fillStyle = fillStyle
            //$.ctxmg.translate( this.x-this.width/2/8-1.5, this.y );
            //$.ctxmg.translate( this.x, this.y );
            //$.ctxmg.rotate( -$.pi/16-$.pi/32*i );
            //$.ctxmg.fillStyle = fillStyle2
            //$.ctxmg.fillRect(0-this.width/8*i ,3,4,10)
            var newx = this.x + this.width/8*i + this.width/8/2
            $.ctxmg.lineJoin = "round";
            $.ctxmg.lineWidth = 2
            $.ctxmg.moveTo( newx - 2 , this.y - (i+0.5)*0.2)
            $.ctxmg.lineTo( newx + 2 , this.y + (i+0.5)*0.2)
            $.ctxmg.lineTo( newx + 2 + (i+0.5)*-3, this.y + 14)
            $.ctxmg.lineTo( newx - 2 + (i+0.5)*-3, this.y + 14)
            $.ctxmg.closePath()
            $.ctxmg.fill()
            //$.ctxmg.rotate( +$.pi/16+$.pi/32*i );
            $.ctxmg.restore()
        }
        $.util.fillCircle( $.ctxmg, this.x, this.y+18, this.radius - 3, fillStyleWhite );

        /*
        $.ctxmg.save();
        $.ctxmg.translate( this.x, this.y );
        $.ctxmg.rotate( this.direction - $.pi / 4 );
        $.ctxmg.fillStyle = fillStyle;
        $.ctxmg.fillRect( 0, 0, this.radius, this.radius );
        $.ctxmg.restore();

        $.ctxmg.save();
        $.ctxmg.translate( this.x, this.y );
        $.ctxmg.rotate( this.direction - $.pi / 4 + $.twopi / 3 );
        $.ctxmg.fillStyle = fillStyle;
        $.ctxmg.fillRect( 0, 0, this.radius, this.radius );
        $.ctxmg.restore();

        $.ctxmg.save();
        $.ctxmg.translate( this.x, this.y );
        $.ctxmg.rotate( this.direction - $.pi / 4 - $.twopi / 3 );
        $.ctxmg.fillStyle = fillStyle;
        $.ctxmg.fillRect( 0, 0, this.radius, this.radius );
        $.ctxmg.restore();

        $.util.fillCircle( $.ctxmg, this.x, this.y, this.radius - 3, fillStyle );
        */
    }	
};
