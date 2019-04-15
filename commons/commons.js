


function punto(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
	
	//invertir eje y
	var invY = -1;
	
	this.drawPunto = function(){
		push();
			stroke(0);
			strokeWeight(12);
			point(this.x, this.y*invY, this.z);
		pop();
	}
}

function vec(Vx, Vy, Vz){
	//componentes
	this.Vx = Vx;
	this.Vy = Vy;
	this.Vz = Vz;
	
	//magnitud
	this.mag = Math.sqrt( Math.pow(this.Vx,2) + Math.pow(this.Vy,2) + Math.pow(this.Vz,2));
	

}

function wraper(p, v){
	this.p = p;
	this.v = v;
}


function drawVector(p, v, c){
	
	//invertir eje y
	var invY = -1;
	var correccion =2.5;

	
	//paralelas en planos 
	stroke(255);
	strokeWeight(1);
	line(0, 0, 0, v.Vx, 0, v.Vz); //reflexion en xz 
	line(v.Vx, 0, v.Vz, v.Vx, v.Vy*invY, v.Vz);//altura de y
		
	line(0,0, 0, v.Vx, v.Vy*invY,0); //reflexion en xy
	line(v.Vx, v.Vy*invY,0, v.Vx, v.Vy*invY, v.Vz);//altura de z
		
	line(0,0,0, 0, v.Vy*invY,v.Vz); //reflexion en zy
	line(0,v.Vy*invY,v.Vz, v.Vx, v.Vy*invY, v.Vz);//altura de x
	stroke(0);
		
	
	push();	
	if(v.mag != 0){	
		
		push();
		translate(p.x, p.y*invY, p.z);
		
		push();
			stroke(255);
			strokeWeight(10);
			point(0,0,0);
			stroke(c);
			fill(c)
			point(v.Vx,v.Vy*invY,v.Vz);
			line(0, 0, 0, v.Vx, v.Vy*invY, v.Vz);//linea guia
		pop();
			
		//translate((v.Vx)/2, ((v.Vy)/2)*invY, (v.Vz)/2); translate para drawFig
	
		if(v.Vx == 0 && v.Vy*invY < 0  && v.Vz > 0){
			alphaX = getAngleDeg(v.Vy,v.Vz)+270;
			alphaZ = 0;
		}
		if(v.Vx > 0 && v.Vy*invY < 0  && v.Vz > 0){ //(x,y,z)
			alphaX = getAngleDeg(v.Vx,v.Vz)+270+8.5;
			alphaZ = getAngleDeg(v.Vx, v.Vy);
		}
		if(v.Vx > 0 && v.Vy*invY == 0  && v.Vz > 0){ //(x,y,z)
			alphaX = getAngleDeg(v.Vx,v.Vz)+270;
			alphaZ = getAngleDeg(v.Vx, v.Vy);
		}
		
		
		
		
		
		//calcular segun la posicion y; 
		/*if(v.Vx > 0 && v.Vy*invY <= 0  && v.Vz > 0){ //(x,y,z)
			alphaX = getAngleDeg(v.Vx,v.Vz)+270+correccion;
			alphaZ = getAngleDeg(v.Vx, v.Vy);
		}else{
			if(v.Vx > 0 && v.Vy*invY > 0 && v.Vz > 0){ //(x,-y,z)
				alphaX = getAngleDeg(v.Vx,v.Vz)+270+correccion;
				alphaZ = getAngleDeg(v.Vx, v.Vy)+180;
			}else{
				if(v.Vx < 0 && v.Vy*invY <= 0 && v.Vz > 0){ //(-x,y,z)
					alphaX = getAngleDeg(v.Vx,v.Vz)+270-correccion;
					alphaZ = getAngleDeg(v.Vx, v.Vy)+180;
				}else{
					if(v.Vx < 0 && v.Vy*invY > 0 && v.Vz > 0){ //(-x,-y,z)
						alphaX = getAngleDeg(v.Vx,v.Vz)+270-correccion;
						alphaZ = getAngleDeg(v.Vx, v.Vy);
					}else{
						if(v.Vx > 0 && v.Vy*invY <= 0 && v.Vz < 0){ //(x,y,-z)
							alphaX = getAngleDeg(v.Vx,v.Vz)-270-correccion;
							alphaZ = getAngleDeg(v.Vx, v.Vy);
						}else{
							if(v.Vx < 0 && v.Vy*invY <= 0 && v.Vz < 0){ //(-x,y,-z)
								alphaX = getAngleDeg(v.Vx,v.Vz)-270+correccion;
								alphaZ = getAngleDeg(v.Vx, v.Vy)+180;
							}else{
								if(v.Vx > 0 && v.Vy*invY > 0 && v.Vz < 0){ //(x,-y,-z)
									alphaX = getAngleDeg(v.Vx,v.Vz)-270-correccion;
									alphaZ = getAngleDeg(v.Vx, v.Vy)+180;
								}else{
									if(v.Vx < 0 && v.Vy*invY > 0 && v.Vz < 0){ //(-x,-y,-z)
										alphaX = getAngleDeg(v.Vx,v.Vz)-270+correccion;
										alphaZ = getAngleDeg(v.Vx, v.Vy);
									}
								}
							}
						}
					}
				}	
			}
			
		}*/
	/*push(); 
			angleMode(DEGREES);
			rotateZ(alphaZ)
			rotateX(alphaX)
			drawFigure(v.mag, 2, c);
				
	pop();*/
		
		
	}
	pop();
	
}



function drawFigure(mag, figW, color){
	
	this.figW = figW;
	
	push();
	fill(color);
	noStroke();
	
	
	//cuerpo
	beginShape();
		vertex(figW,mag/2,-figW);
		vertex(figW,mag/2,figW);
		vertex(-figW,mag/2,figW);
		vertex(-figW,mag/2,-figW);
	endShape(CLOSE);
	beginShape();
		vertex(figW+2,-mag/2+5,-figW-2);
		vertex(figW+2,-mag/2+5,figW+2);
		vertex(-figW-2,-mag/2+5,figW+2);
		vertex(-figW-2,-mag/2+5,-figW-2);
	endShape(CLOSE);
	
	beginShape();
		vertex(figW,mag/2,-figW);
		vertex(figW,-mag/2+5,-figW);
		vertex(-figW,-mag/2+5,-figW);
		vertex(-figW,mag/2,-figW);	
	endShape(CLOSE);
	beginShape();
		vertex(figW,mag/2,figW);
		vertex(figW,-mag/2+5,figW);
		vertex(-figW,-mag/2+5,figW);
		vertex(-figW,mag/2,figW);
	endShape(CLOSE);
	beginShape();
		vertex(figW,mag/2,figW);
		vertex(figW,-mag/2+5,figW);
		vertex(figW,-mag/2+5,-figW);
		vertex(figW,mag/2,-figW);
	endShape(CLOSE);
	beginShape();
		vertex(-figW,mag/2,figW);
		vertex(-figW,-mag/2+5,figW);
		vertex(-figW,-mag/2+5,-figW);
		vertex(-figW,mag/2,-figW);
	endShape(CLOSE);

	//punta de flecha
	beginShape();
		vertex(figW+2,-mag/2+5,-figW-2);
		vertex(figW+2,-mag/2+5,figW+2);
		vertex(0,-mag/2,0);
	endShape(CLOSE);
	beginShape();
		vertex(figW+2,-mag/2+5,figW+2);
		vertex(-figW-2,-mag/2+5,figW+2);
		vertex(0,-mag/2,0);
	endShape(CLOSE);
	beginShape();
		vertex(-figW-2,-mag/2+5,figW+2);
		vertex(-figW-2,-mag/2+5,-figW-2);
		vertex(0,-mag/2,0);
	endShape(CLOSE);
	beginShape();
		vertex(-figW-2,-mag/2+5,-figW-2);
		vertex(figW+2,-mag/2+5,-figW-2);
		vertex(0,-mag/2,0);
	endShape(CLOSE);
	
	
	pop();
	
}

function drawVec2(p, v, c){
	var inv = -1;
	var alphaX = 0;
	var alphaY = 0;
	var alphaZ  = 0;
	
	if(v.mag > 0){
		
		noStroke();
		translate(p.x,p.y*inv,p.z);
		push();
			
			//puntos con esferas
			push()
				noStroke();
				fill(0)
				sphere(3);
				translate(v.Vx, v.Vy*inv, v.Vz);
				//sphere(3);
			pop();
			
			
			//calcular rotacion
			if(v.Vx ==0 && v.Vy*inv <0 && v.Vz >0){
				alphaX = getAngleDeg(v.Vy, v.Vz)+270;
				alphaZ = 0;
			}else if(v.Vx ==0 && v.Vy*inv >0 && v.Vz >0){
					alphaX = getAngleDeg(v.Vy, v.Vz)+270;
					alphaZ = 0;
			} else if(v.Vx ==0 && v.Vy*inv <0 && v.Vz<0){
					alphaX = getAngleDeg(v.Vy, v.Vz)+90;
					alphaZ = 0;
			} else if(v.Vx ==0 && v.Vy*inv >0 && v.Vz<0){
					alphaX = getAngleDeg(v.Vy, v.Vz)+90;
					alphaZ = 0;
			} else if(v.Vx ==0 && v.Vy==0 && v.Vz>0){
					alphaX = -90;
					alphaZ = 0;
			} else if(v.Vx ==0 && v.Vy==0 && v.Vz<0){
					alphaX = 90;
					alphaZ = 0;
			} else if(v.Vx ==0 && v.Vy*inv <0 && v.Vz ==0){
					alphaX = 0;
					alphaZ = 0;
			} else if(v.Vx ==0 && v.Vy*inv >0 && v.Vz ==0){
					alphaX = 180;
					alphaZ = 0;
			} else if(v.Vx >0 && v.Vy*inv <0 && v.Vz >0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = 90-getAngleDeg(v.Vy, vXZ.mag);
				alphaY = getAngleDeg(v.Vx, v.Vz)+270;
			}
			 else if(v.Vx >0 && v.Vy*inv >0 && v.Vz >0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = 90-getAngleDeg(v.Vy, vXZ.mag);
				alphaY = getAngleDeg(v.Vx, v.Vz)+270;
				
			}else if(v.Vx >0 && v.Vy*inv <0 && v.Vz <0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = 90-getAngleDeg(v.Vy, vXZ.mag);
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx >0 && v.Vy*inv >0 && v.Vz <0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = 90-getAngleDeg(v.Vy, vXZ.mag);
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx >0 && v.Vy==0 && v.Vz >0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = getAngleDeg(v.Vy, vXZ.mag)+270;
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx >0 && v.Vy==0 && v.Vz <0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = getAngleDeg(v.Vy, vXZ.mag)+90;
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx >0 && v.Vy==0 && v.Vz ==0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = getAngleDeg(v.Vy, vXZ.mag)+270;
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx >0 && v.Vy*inv <0 && v.Vz ==0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = getAngleDeg(v.Vy, vXZ.mag)+270;
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx >0 && v.Vy*inv >0 && v.Vz ==0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = getAngleDeg(v.Vy, vXZ.mag)+270;
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx <0 && v.Vy*inv <0 && v.Vz >0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = getAngleDeg(v.Vy, vXZ.mag)+270;
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx <0 && v.Vy*inv >0 && v.Vz >0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = getAngleDeg(v.Vy, vXZ.mag)+270;
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx <0 && v.Vy*inv <0 && v.Vz <0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = 90-getAngleDeg(v.Vy, vXZ.mag);
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx <0 && v.Vy*inv >0 && v.Vz <0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = 90-getAngleDeg(v.Vy, vXZ.mag);
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx <0 && v.Vy==0 && v.Vz >0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = getAngleDeg(v.Vy, vXZ.mag)+270;
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx <0 && v.Vy==0 && v.Vz <0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = 90-getAngleDeg(v.Vy, vXZ.mag);
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx <0 && v.Vy==0 && v.Vz ==0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = getAngleDeg(v.Vy, vXZ.mag)+270;
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx <0 && v.Vy*inv<0 && v.Vz ==0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = getAngleDeg(v.Vy, vXZ.mag)+270;
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}else if(v.Vx <0 && v.Vy*inv>0 && v.Vz ==0){
				vXZ = new vec(v.Vx,0,v.Vz);
				alphaZ = getAngleDeg(v.Vy, vXZ.mag)+270;
				alphaY = getAngleDeg(v.Vx, v.Vz)+90;
				
			}
			
			
			
			//flechas
			push();
				normalMaterial();
				translate(v.Vx/2, (v.Vy*inv)/2, v.Vz/2);
				angleMode(DEGREES);
				rotateY(alphaY);
				rotateX(alphaX);
				rotateZ(alphaZ);
				
				drawFigure(v.mag, 2, c);
			//	cylinder(2, v.mag);
			pop();
			
			//guias;
		/*	stroke(c);
			strokeWeight(5);
			line(0,0,0,v.Vx, v.Vy*inv, v.Vz);
			
			line(0,0,0,0, v.Vy*inv, 0);
			line(0,v.Vy*inv,0,v.Vx, v.Vy*inv, v.Vz);
			
			line(v.Vx,0,v.Vz,v.Vx, v.Vy*inv,v.Vz);
			line(0,0,0,v.Vx,0, v.Vz);
			
			*/
		pop();
		
	}
}

function getAngleDeg(op,ad) {
	  var angleRad = Math.atan((op)/(ad));
	  var angleDeg = angleRad * 180 / Math.PI;
	  return(angleDeg);
	}

function toRadians (angle) {
	  return angle * (Math.PI / 180);
}

function productoVectC(A, B){
	return new vec((A.Vy*B.Vz)-(A.Vz*B.Vy), (A.Vz*B.Vx-A.Vx*B.Vz),(A.Vx*B.Vy-A.Vy*B.Vx));
}

function productoEscC(A,B){
	return A.Vx*B.Vx + A.Vy*B.Vy + A.Vz*B.Vz;
}

function productoEsc(magA, magB, ang){
	return magA*magB*Math.cos(toRadians(ang));
}

function productoVec(magA, magB, ang){
	return magA*magB*Math.sin(toRadians(ang));
}
/** cinematica **/
function desplazamientoI(x0, v0, a, ti){
	var xi = x0 + v0*ti + (0.5)*(a)*Math.pow(ti,2);
	return xi;
}

function tiempoI(vi, v0, a){
	var ti = (vi-v0)/a;
	return ti; 
}

function velocidadI(xi, v0, a, x0){
	var vi = Math.sqrt(Math.pow(v0,2) + 2*a*(xi-x0));
	return vi;
}

function tiempoSimulacion(t0, tf){
	var deltaT = (tf-t0)/1000;
	return deltaT;
}

function draw2DVect(x,y,v){
	var alpha = 0;
	
	push();
		stroke(255,0,0);
		strokeWeight(2);
		translate(x,y);
		
		if(v.vy*-1>0 && v.Vx >0){
			alpha = getAngleDeg(v.Vx,v.Vy)+180;
		}else if(v.Vy*-1 <0 && v.Vx >0){
			alpha = getAngleDeg(v.Vy,v.Vx)+270;
		}else if(v.Vy*-1 <0 && v.Vx <0){
			alpha = getAngleDeg(v.Vx,v.Vy);
		}else if(v.Vy*-1 >0 && v.Vx <0){
			alpha = getAngleDeg(v.Vy,v.Vx)+90;
		}else if(v.Vy*-1 ==0 && v.Vx >0){
			alpha = 270;
		}else if(v.Vy*-1 == 0 && v.Vx <0){
			alpha = 90;
		}else if(v.Vy*-1 < 0 && v.Vx ==0){
			alpha = 0;
		}else if(v.Vy*-1 > 0 && v.Vx ==0){
			alpha = 180;
		}
		
		
		push();
		angleMode(DEGREES);
		rotate(alpha);
		line(0,0+5,0,v.mag+5);
		fill(255,0,0);
	
		beginShape();
		vertex(0, v.mag+5);
		vertex(0-5, v.mag-5);
		vertex(0+5, v.mag-5);
		endShape(CLOSE);
		
		pop();
	pop();
	
}

//encontrar angulo e
function getAngleDegP(x1, y1, x0, y0){
	var op;
	var ad;
	var angDeg
	
	
	if(x1 < x0 && y1 < y0){
		op = x0-x1;
		ad = y0-y1;
		angDeg = getAngleDeg(op,ad)+90;
	}else if(x1 > x0 && y1 < y0){
		ad = x1-x0;
		op = y0-y1;
		angDeg = getAngleDeg(op,ad);
	}else if(x1 < x0 && y1 > y0){
		ad = x0-x1;
		op = y1-y0;
		angDeg = getAngleDeg(op,ad)+180;
	}else if(x1 > x0 && y1 > y0){
		op = x1-x0;
		ad = y1-y0;
		angDeg = getAngleDeg(op,ad)+270;
		
	}else if(x1 == x0 && y1 <y0){
		op = x1-x0;
		ad = y1-y0;
		angDeg = 90;
	}else if(x1 == x0 && y1 >y0){
		op = x1-x0;
		ad = y1-y0;
		angDeg =270;
	}else if(x1 > x0 && y1 ==y0){
		op = x1-x0;
		ad = y1-y0;
		angDeg = 0;
	}else if(x1 < x0 && y1 ==y0){
		op = x1-x0;
		ad = y1-y0;
		angDeg = 180;
	}
	return angDeg;
}

function draw2DVectC(x,y,v, color, i){
	var alpha = 0;
	
	push();
		stroke(color);
		strokeWeight(2);
		translate(x,y);
		
		if(v.Vx >0 && v.Vy > 0){
			alpha = getAngleDeg(v.Vx, v.Vy);
		}else if(v.Vx >0 && v.Vy <0){
			alpha = getAngleDeg(Math.abs(v.Vy), v.Vx)+90;
		}else if(v.Vx<0 && v.Vy <0){
			alpha = getAngleDeg(v.Vx, v.Vy)+180;
		}else if(v.Vx <0 && v.Vy >0){
			alpha = getAngleDeg(v.Vy, Math.abs(v.Vx))+270;
		}else if(v.Vx ==0 && v.Vy >0){
			alpha = 0;
		}else if(v.Vx ==0 && v.Vy<0){
			alpha = 180;
		}else if(v.Vx >0 && v.Vy ==0){
			alpha = 90;
		}else if(v.Vx <0 && v.Vy ==0){
			alpha = 270;
		}
		
		
		
		angleMode(DEGREES);
		
		if(v.mag<130){
			push();
			rotate(alpha+180);
			fill(color);
			line(0,0+12.5,0,v.mag+12.5);
			beginShape();
			vertex(0, v.mag+17.5);
			vertex(0-5, v.mag+12.5);
			vertex(0+5, v.mag+12.5);
			endShape(CLOSE);
			fill(0);
			noStroke();
			translate(5, v.mag+17.5)
			rotate(-(alpha+180));
			textSize(10);
			text("F"+i,0,0);
			pop();
			
			
		}else{
			push();
			rotate(alpha+180);
			fill(color);
			line(0,0+12.5,0,130);
			beginShape();
			vertex(0, 130);
			vertex(0-5, 130-5);
			vertex(0+5, 130-5);
			endShape(CLOSE);
			fill(0);
			noStroke();
			translate(5, 130)
			rotate(-(alpha+180));
			textSize(10);
			text("F"+i,0,0);
			pop();
			
		}
	pop();
	
}

//encontrar angulo reak
function getAngleDegR(x1, y1){
	var op;
	var ad;
	var angDeg
	
	
	if(x1 < 0 && y1 < 0){
		ad = Math.abs(x1);
		op = Math.abs(y1);
		angDeg = getAngleDeg(op,ad)+180;
	}else if(x1 > 0 && y1 < 0){
		op = x1;
		ad = Math.abs(y1);
		angDeg = getAngleDeg(op,ad)+270;
	}else if(x1 < 0 && y1 > 0){
		op = Math.abs(x1);
		ad = y1;
		angDeg = getAngleDeg(op,ad)+90;
	}else if(x1 > 0 && y1 > 0){
		ad = x1;
		op = y1;
		angDeg = getAngleDeg(op,ad);
		
	}else if(x1 == 0 && y1 <0){
		
		angDeg = 270;
	}else if(x1 == 0 && y1 >0){
		angDeg =90;
	}else if(x1 > 0 && y1 ==0){
		angDeg = 0;
	}else if(x1 < 0 && y1 ==0){
		angDeg = 180;
	}
	return angDeg;
}

