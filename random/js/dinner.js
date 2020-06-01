// JavaScript Document

// canvas的長寬
var canvasWidth;
var canvasHeight;

// 圓要分成幾塊
var count=2;
var colorArray=["#a2baab","#b5d463","#c39663","#38bc11","#957e11","#c2955c","#8e88ee","#118fee","#6d99ee","#a25b9a","#f57f9a","#08c09a","#bdc54f","#f0b901","#b1e201","#a6cbd2","#14d2d2","#d984d2","#ca8032","#7aabab"];
var textArray=[];
textArray[0]="option1"
textArray[1]="option2"

window.onload=function()
{
	/* jquery 要用$('#id')[0] 去 getContext() */
	var canvas=document.getElementById('myCanvas');
	var leftContainer=document.getElementById('left_container');

	// 求canvas長、寬
	canvasWidth=leftContainer.clientWidth;
	canvasHeight=canvasWidth/2;

	// 設定canvas的長寬，CSS只會設定容器，無法設定canvas大小
	canvas.setAttribute('width',canvasWidth+"px");
	canvas.setAttribute('height',canvasHeight+"px");
	// canvas 拿取畫布
	var ctx=canvas.getContext("2d");
	// 移動原點到中間
	ctx.translate(canvasWidth/2,canvasHeight/2);

	refresh(ctx);
	drawArrow(ctx);
	// 綁定click事件
	var startBn=document.getElementById("start");
	startBn.onclick=function(){ start(ctx); };

	var newBn=document.getElementById("newOption");
	newBn.onclick=function()
	{
		var num=textArray.length+1;
		if(num<=20)
		{
			var rContainer=document.getElementById("right_container");

			var element=document.createElement("input");
			element.setAttribute("class","input"+num);
			element.setAttribute("class","input"+num);
			element.setAttribute("placeholder","option"+num);
			// 綁定click事件
			element.onblur=function(){ textArray[num-1]=element.value; refresh(ctx); drawArrow(ctx); }
			textArray[num-1]="option"+num;
			rContainer.insertBefore(element,document.getElementById("cut"));
			count++;
			refresh(ctx);
			drawArrow(ctx);
		}
	}
	// input的初始化
	var input1=document.getElementById('input1');
	input1.onblur=function(){ textArray[0]=input1.value; refresh(ctx); drawArrow(ctx); }
	var input2=document.getElementById('input2');
	input2.onblur=function(){ textArray[1]=input2.value; refresh(ctx); drawArrow(ctx); }

	// 視窗大小調整時，重繪畫布
	window.onresize=function()
	{
		// 求canvas長、寬
		canvasWidth=leftContainer.clientWidth;
		canvasHeight=canvasWidth/2;

		// 設定canvas的長寬，CSS只會設定容器，無法設定canvas大小
		canvas.setAttribute('width',canvasWidth+"px");
		canvas.setAttribute('height',canvasHeight+"px");
		// canvas 拿取畫布
		var ctx=canvas.getContext("2d");
		// 移動原點到中間
		ctx.translate(canvasWidth/2,canvasHeight/2);

		refresh(ctx);
		drawArrow(ctx);
	}

}

// 開始旋轉
function start(ctx)
{
	// 旋轉
	var angle=0;
	// 旋轉的速度
	var speed=20+10*Math.random();
	var t=setInterval(function()
	{
		speed*=0.95;
		if(speed<=0.1)
		{
			clearInterval(t);
			// 計算是指到哪一個
			var num=Math.floor(angle/(360/count));
			document.getElementById("answer").innerHTML="選中的是: "+textArray[num];
		}
		else
		{
			angle+=speed;
			if(angle>=360)
				angle-=360;
			// 儲存canvas設定狀態
			ctx.save();
			ctx.rotate(angle*Math.PI/180*-1);
			refresh(ctx);
			// 回復原本的基準點、畫布狀態
			ctx.restore();
			drawArrow(ctx);
		}
	},60);
}

// 將轉盤畫出
function refresh(ctx)
{
			ctx.clearRect(canvasWidth*-1,canvasHeight*-1,canvasWidth,canvasHeight);
			drawArc(ctx);
			drawCenter(ctx);
			insertText(ctx);
}

// 畫扇形
function drawArc(ctx)
{
	var angle=360/count;

	for(var i=0;i<count;i++)
	{
		ctx.fillStyle=colorArray[i];
		ctx.beginPath();
		// 從原點開始畫線再畫弧
		ctx.moveTo(0,0);
		// 畫弧 arc(x,y,r,startAngle,endAngle);
		if(canvasHeight<=250)
			ctx.arc(0,0,canvasHeight/2,(i)*angle*Math.PI/180,(i+1)*angle*Math.PI/180);
		else
			ctx.arc(0,0,canvasHeight/3,(i)*angle*Math.PI/180,(i+1)*angle*Math.PI/180);
		ctx.closePath();
		// 畫出路徑
		ctx.stroke();
		// 填充顏色
		ctx.fill();
	}
}

// 畫中心的圓
function drawCenter(ctx)
{
	ctx.fillStyle="#f00";
	ctx.beginPath();;
	// 從原點開始畫線再畫弧
	ctx.moveTo(0,0);
	// 畫弧 arc(x,y,r,startAngle,endAngle);
	ctx.arc(0,0,canvasHeight/36,0,2*Math.PI);
	ctx.fill();
}

// 畫箭頭
function drawArrow(ctx)
{
	ctx.beginPath();;
	// 從原點開始畫線再畫弧
	ctx.moveTo(0,canvasHeight/36*-1);
	ctx.fillStyle="#f00";
	ctx.lineTo(0,canvasHeight/36);
	ctx.lineTo(canvasHeight/8,0);
    ctx.closePath();
    ctx.fill();
}

// 加入每個選項
function insertText(ctx)
{
	var angle=360/count;

	for(var i=0;i<count;i++)
	{
		// 儲存當下的畫布，要將字做旋轉
		ctx.save();
		ctx.beginPath();
		ctx.rotate(((i*360/count)+(360/count/2))*Math.PI/180);
		ctx.fillStyle="#222";
		ctx.font="1.2rem 微軟正黑體";
		ctx.fillText(textArray[i],canvasHeight/15,0);
		//回復畫布
		ctx.restore();
	}
}