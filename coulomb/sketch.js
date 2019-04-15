/**
 * 
 */

var canvas;
var xIni = 300;
var yIni = 250;

var cargas =[];
var fuerzas = [];
var angulos = [];
var fuerzasV = [];
var editI = -1;
var nuevoI = 1;
var offSetY =0.0;
var offSetX =0.0;

var add;

function setup(){
	canvas = createCanvas(900,800);
	canvas.parent("canvas_container");
	color = "rgb(147,165,55)";
	q0 = new carga(xIni,yIni,color,"q0");
	q0.qValue(100.0);
	q0.uValue("μC");
	q0.signoValue("+");
	cargas.push(q0);
	resetEdit();
	
	add = new rectangleAdd(605,445, 50);
	
}

function draw(){
	background(0);
	push();
	stroke(255);
	line(600,10,600,490);
	line(10,500,890,500);
	pop();
	
	push();
	fill(255);
	text("CARGAS:",610,15);
	text("_ _ _ _ _ _ _ _ _ _ _ _ _",610,15);
	if(cargas.length >1){
		text("FUERZAS:",610,130);
		text("_ _ _ _ _ _ _ _ _ _ _ _ _",610,130);
		text("DISTANCIAS:",610,230);
		text("_ _ _ _ _ _ _ _ _ _ _ _ _",610,230);
		text("ÁNGULOS:",610,330);
		text("_ _ _ _ _ _ _ _ _ _ _ _ _",610,330);
	}
	
	pop();
	
	for(var i = 0; i< cargas.length; i++ ){
	if(i>0){
		push();
			fill(255);
			stroke(255);
			strokeWeight(3);
			line(cargas[0].x,cargas[0].y, cargas[i].x, cargas[i].y);
			translate((cargas[0].x+cargas[i].x)/2, (cargas[0].y+cargas[i].y)/2);
			rect(-10,-20,50,15);
			fill(0);
			strokeWeight(0);
			text((dist(cargas[0].x,cargas[0].y, cargas[i].x, cargas[i].y)/100-0.5).toFixed(2)+"m",2,-5);
		pop();
	}
	
	
	}
	for(var i = 0; i< cargas.length; i++ ){
		cargas[i].show();
		push();
			fill(255);
			
			text(cargas[i].name+"="+cargas[i].signo+cargas[i].q+cargas[i].u,610,(i*15)+30);
			if(i>0){
				f=fuerzaE(cargas[i], cargas[0], dist(cargas[0].x,cargas[0].y, cargas[i].x, cargas[i].y)/100-0.5);
				text("F"+i+"-0 ="+f.toFixed(2)+" N",610,(i*15)+130);
				text("r"+i+"-0 ="+(dist(cargas[0].x,cargas[0].y, cargas[i].x, cargas[i].y)/100-0.5).toFixed(2)+" m",610,(i*15)+230);
				fuerzas[i-1] = f;
				if(cargas[i].signo == cargas[0].signo){
					an = getAngleDegP(cargas[i].x, cargas[i].y, cargas[0].x, cargas[0].y);
					if (an <180){
						angulos[i-1] = an +180;
					}else{
						angulos[i-1] = an -180;
					}
				}else{
					angulos[i-1] = getAngleDegP(cargas[i].x, cargas[i].y, cargas[0].x, cargas[0].y);
				}
				
				text("∠ F"+i+"-0 = "+(angulos[i-1]).toFixed(2)+"°",610,(i*15)+330);
				
			}
			
			
		pop();
	}
	
	
	add.show();
	drawDCL(10,505);
	
}

function carga(x, y, color, name){
	this.x = x;
	this.y = y;
	this.name = name;
	
	
	this.qValue= function(value){
		this.q = value;
	} 	
		
	this.signoValue =function(value){
		this.signo = value;
	}
	
	this.uValue = function(value){
		this.u = value;
	}
	
	this.show = function(){
		if(this.isOver()){
			push();
			strokeWeight(5);
			stroke(255)
			fill(color);
			ellipse(this.x, this.y, 50);
			noStroke();
			fill(0);
			textSize(18);
			textStyle(BOLD);
			text(this.signo+this.name, this.x-20, this.y+5);
			
			
			strokeWeight(1);
			stroke(255);
			fill(255)
			textStyle(NORMAL);
			rect(this.x+30, this.y-25, 80,25);
			noStroke();
			fill(0);
			textSize(15);
			text(this.signo+" "+this.q+this.u, this.x+30, this.y-5);
			pop();
			
			
		}else{
			push();
			strokeWeight(1);
			stroke(255)
			fill(color);
			ellipse(this.x, this.y, 50);
			noStroke();
			fill(0);
			textSize(18);
			textStyle(BOLD);
			text(this.signo+this.name, this.x-20, this.y+5);
		
			pop();
		}
		 return this;
	}
	
	this.isOver = function(){
		var d = dist(mouseX, mouseY, this.x, this.y);
		
		if (d <25){
			return true;
		}else{
			return false;
		}
	}
	
} 

function rectangleAdd(x,y, w){
	
	this.x = x;
	this.y = y;
	this.w = w;
		
	this.show = function(){
		if(nuevoI<=5){
			push();	
				fill(220);
				rect(x,y,50,50);
				fill(9,67,153);
				stroke(255);
				ellipse(x+25, y+25, 50);
			pop();
		}else{
			push();	
				fill(255);
				rect(x,y,50,50);
				fill(9,67,153);
				stroke(255);
				ellipse(x+25, y+25, 50);
			pop();
		}
		
	}
	
	this.isOver = function(){
		if(mouseX >this.x && mouseY > this.y && mouseX < this.x+this.w && mouseY < this.y+this.w){
			return true;
		}
	}
	
	
}


function mousePressed(){
	for(var i=0; i<cargas.length; i++){
			if(cargas[i].isOver()){
				
			cargas[i].clicked = true;
			editCarga(cargas[i]);
			editI = i;
			offsetY = mouseY-cargas[i].y;
			offsetX = mouseX-cargas[i].x;
			$('#selected1').remove();
			$('#s').append("<p id='selected1'>Carga: <strong>"+cargas[i].name+"</strong> Seleccionada.</p>");
			
			}
			
		}
	if(add.isOver() && nuevoI<=5){
		color = "rgb(9,67,153)";
		var nx = Math.floor((Math.random() * 550) + 25);
		var ny = Math.floor((Math.random() * 450) + 25);
		q = new carga(nx, ny,color,"q"+nuevoI);
		q.qValue(100.0);
		q.uValue("μC");
		q.signoValue("+");
		cargas.push(q);
		nuevoI++;
	
	}
}

function resetEdit(){
	$('#q').val('');
	$('#signo').val('+');
	$('#unidades').val('μC');
	$('#guardar').attr("disabled", "disabled");
	$('#cancelar').attr("disabled", "disabled");
	
	for(var i=0; i<cargas.length; i++){
		cargas[i].clicked = false;
	}
	
	$('#selected1').remove();
	
}


function editCarga(carga){
	$('#q').val(carga.q);
	$('#signo').val(carga.signo);
	$('#unidades').val(carga.u);
	$('#guardar').removeAttr("disabled");
	$('#cancelar').removeAttr("disabled");

	
}


function saveCarga(){
	var q = Math.abs(parseFloat($('#q').val()));
	var u = $('#unidades').val();
	var signo = $('#signo').val();
	var valid = false;push();
	fill(255);
	rect(610, 400, 100, 100);
pop();
	
	if(isNaN(q) || q == '' || q == 0){
		alert("Atención!\n el valor de la carga deber ser numérico distinto de 0");
	}else{
		var valid = true;
	}
	
	if(valid){
		
		cargas[editI].qValue(q);
		cargas[editI].uValue(u);
		cargas[editI].signoValue(signo);
		resetEdit();
	}
	$('#selected1').remove();
}


function mouseDragged() {
	for(var i=0; i<cargas.length; i++){
		if(cargas[i].isOver()){
			cargas[i].x = mouseX;
			cargas[i].y = mouseY;
			
			//bordes
			if(cargas[i].x < 25){
			   cargas[i].x = 25;
			}
			if(cargas[i].x > 575){
				   cargas[i].x = 575;
			}if(cargas[i].y < 25){
			   cargas[i].y = 25;
			}
			if(cargas[i].y > 475){
				   cargas[i].y = 475;
			}
			
			//otras cargas
			for(var j=0; j<cargas.length; j++ ){
				if(j == i){
					//do nothing
				}else{
					//revisar distancia de x
					if( dist(cargas[i].x, cargas[i].y, cargas[j].x, cargas[j].y)<50 && cargas[i].x < cargas[j].x){
						cargas[i].x = cargas[j].x-51;
					}
					if( dist(cargas[i].x, cargas[i].y, cargas[j].x, cargas[j].y)<50 && cargas[i].x > cargas[j].x){
						cargas[i].x = cargas[j].x+51;
					}
					if( dist(cargas[i].x, cargas[i].y, cargas[j].x, cargas[j].y)<50 && cargas[i].y > cargas[j].y){
						cargas[i].y = cargas[j].y+51;
					}
				}
			}
			
		}
		
	}
}

$(function() {
	  $('#guardar').click(saveCarga);
});

$(function() {
	  $('#cancelar').click(resetEdit);
});

function fuerzaE(Q0, Q1, r){
	var k = 9.0e9;
	var f;
	var q0;
	var q1;
	
	
	if(Q0.u == "mC"){
		q0 = Q0.q*(1e-3);
	}else if(Q0.u == "μC"){
		q0 = Q0.q*(1e-6);
	}else if(Q0.u == "nC"){
		q0 = Q0.q*(1e-9);
	}else if(Q0.u == "C"){
		q0 = Q0.q;
	}
	
	
	if(Q1.u == "mC"){
		q1 = Q1.q*(1e-3);
	}else if(Q1.u == "μC"){
		q1 = Q1.q*(1e-6);
	}else if(Q1.u == "nC"){
		q1 = Q1.q*(1e-9);
	}else if(Q1.u == "C"){
		q1 = Q1.q;
	}
	
	f = k*(q0*q1)/(r*r);
	return f;
}

function drawDCL(x,y){
	mult=1;
	c="rgb(0,0,255)";
	c1 = "rgb(255,0,0)";
		
	var Fnet;	
	var sumX = 0;
	var sumY = 0;
	var fnetAngle = 0;
		
	push();
		rect(x,y, 300, 290);//10, 505
		push();
		noStroke();
		rect(x+1,y-5, 299, 25);//10, 505
		text("SUPERPOSICIÓN DE FUERZAS",x+5,y+5);
		fill(255);
		text("SUMATORIA",410,520);
		pop();
		ellipse(x+150,y+145,25);
		text(cargas[0].name,x+142,y+147);
		for(var i=0; i<cargas.length-1; i++){
		
		
			angleMode(RADIANS);
			fuerzasV[i] = new vec(fuerzas[i]*Math.cos(angulos[i]*Math.PI/180),fuerzas[i]*Math.sin(angulos[i]*Math.PI/180),0);
			push();
			fill(255);
			text("F"+(i+1)+"-0 = ("+(fuerzasV[i].Vx).toFixed(2)+" i) + ("+(fuerzasV[i].Vy).toFixed(2)+" j) N",410,(i*15)+575);
			pop();
			
			if(fuerzas.length > 1){
				draw2DVectC(x+150,y+145,fuerzasV[i],c,(i+1)+"-0");	
			}
			
			sumX += fuerzasV[i].Vx; 
			sumY += fuerzasV[i].Vy;
		}
		Fnet = new vec(sumX, sumY, 0);
		fnetAngle = getAngleDegR(Fnet.Vx, Fnet.Vy, 0, 0);
		
		
		if(Fnet.mag > 0){
			push();
			fill(255);
			stroke(255);
			line(410,660,710,660);
			text("Ft = ("+(Fnet.Vx).toFixed(2)+" i) + ("+(Fnet.Vy).toFixed(2)+" j) N",410,675);
			text("∠ Ft = "+fnetAngle.toFixed(2)+"°",410,690);
			pop();
			draw2DVectC(x+150,y+145,Fnet,c1,"t");
		}
		
		
	pop();
}



