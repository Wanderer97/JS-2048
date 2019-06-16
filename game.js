var sum=0;

function randomGenerationNumbers(){		//функция которая заполняет случайную ячейку
	var first=(parseInt(Math.random()*1000)%4);
	var second=(parseInt(Math.random()*100)+parseInt(Math.random()*100))%4;
	var name=""+((first+1)+"."+(second+1));
	if(checkContent(name)){
		setTwoOrFour(name);
		changeColorAndFontSize(name);
	}
	else
		randomGenerationNumbers();
}

function startGame(){					//функция активирующая игру
	document.getElementById("divGame").style.display="block";
	randomGenerationNumbers();
	randomGenerationNumbers();
	document.getElementsByName("start")[0].style.display="none";
	sum=0;
	document.getElementsByName("showingSum")[0].value=sum;
}

function checkContent(name){			//функция проверки наличия значения в ячейке
	if(getNumber(name)=="")
		return true;
	else
		return false;
}

function getNumber(name){				//функция, которая возвращает значение (value) ячейки исходя из её имени 
	return document.getElementsByName(name)[0].value;
}


function setTwoOrFour(name){			//функция заполняющая выбранную ячейку цифрой 2 или 4
	var number=(parseInt(Math.random()*100)%10);
	if(number==0)
		setNumber(name,4);
	else
		setNumber(name,2);
}

function setNumber(name,val){			//функция для установки значения объекту по с именем 'name'
	document.getElementsByName(name)[0].value=val;
}

function push(num){						//функция, обеспечивающая, сдвиг ячеек в определённом направлении и много чего другого
	var flag=true;
	var values=new Array(4);
	for(var i=0;i<values.length;i++){						//
		values[i]=new Array(4);								//	занесение значений
		for(var j=0;j<values[i].length;j++){				//	из ячеек в массив
			var str=Number(i+1)+"."+Number(j+1);			//	для того, чтобы
			values[i][j]=(Number(getNumber(str)));			//	сделать проще
		}													//	операцию сдвига ячеек
	}	
	if(checkLoose(values)){
		alert("К сожалению вы не можете выполнить \nсдвиг ни в одну из сторон.\n Вы окончили игру, набрал "+sum+" очков.");
		flag=false;
	}
	if(flag)
	switch(Number(num)){
		//сдвиг "ВВЕРХ"
		case 1:	if(canUp(values)){ pushUp(values);break;}else {flag=canUp(values);break;}
		//сдвиг "ВЛЕВО"
		case 2:	if(canLeft(values)){ pushLeft(values);break;}else {flag=canLeft(values);break;}
		//сдвиг "ВПРАВО"
		case 3:	if(canRight(values)){ pushRight(values);break;}else {flag=canRight(values);break;}
		//сдвиг "ВНИЗ"
		case 4:	if(canDown(values)){ pushDown(values);break;}else{flag=canDown(values);break;}
		default:break;
	}
	if(flag){
		refreshCells(values);
		if (checkWin(values)){
			alert("поздравляем, вы выиграли!");
			return;
		}
		randomGenerationNumbers();
	}
}

function pushUp(values){			//вверх
	Up(values);
	compVert(values);
	Up(values);
}
function Up(valuesArray){						
	for(var i=0,l=1;i<valuesArray.length;i++,l++)		
		for(var j=0;j<valuesArray[i].length-1;j++)			
			if(valuesArray[j][i]==0)
				for(var k=j+1;k<valuesArray[i].length;k++)
					if(valuesArray[k][i]!=0){
						valuesArray[j][i]=valuesArray[k][i];
						valuesArray[k][i]=0;
						break;
					}
}

function pushLeft(values){			//лево
	Left(values);
	compHor(values);
	Left(values);
}
function Left(valuesArray){
	for(var i=0;i<valuesArray.length;i++)	
		for(var j=0;j<valuesArray[i].length-1;j++)		
			if(valuesArray[i][j]==0)
				for(var k=j+1;k<valuesArray[i].length;k++)
					if(valuesArray[i][k]!=0){
						valuesArray[i][j]=valuesArray[i][k];
						valuesArray[i][k]=0;
						break;
					}
}

function pushRight(values){			//право
	Right(values);
	compHor(values);
	Right(values);
}
function Right(valuesArray){
	for(var i=3;i>=0;i--)	
		for(var j=3;(j-1)>=0;j--)			
			if(valuesArray[i][j]==0)
				for(var k=j-1;k>=0;k--)
					if(valuesArray[i][k]!=0){
						valuesArray[i][j]=valuesArray[i][k];
						valuesArray[i][k]=0;
						break;
					}
}

function pushDown(values){			//вниз
	Down(values);
	compVert(values);
	Down(values);
}
function Down(valuesArray){
	for(var i=3;i>=0;i--)		
		for(var j=3;(j-1)>=0;j--)	
			if(valuesArray[j][i]==0)
				for(var k=j-1;k>=0;k--)
					if(valuesArray[k][i]!=0){
						valuesArray[j][i]=valuesArray[k][i];
						valuesArray[k][i]=0;
						break;
					}
}

function checkWin(arr){				//функция, которая определяет выиграл ли игрок
	for(var i=0;i<arr.length;i++)	
		for(var j=0;j<arr[i].length;j++){
			if(Number(arr[i][j])==2048)
				return true;
	}
	return false;
}

function checkLoose(arr){			//функция, определяющая поражение игрока
	if(!canUp(arr))
		if(!canLeft(arr))
			if(!canRight(arr))
				if(!canDown(arr))
					return true;
	return false;
}
function clearCells(){				//функция для очистки значений во всех клетках
	for(var f=1;f<=4;f++)
		for(var s=1;s<=4;s++){
			name=(""+f+"."+s);
			var a=document.getElementsByName(name);
			a[0].value="";
		}
}
function refreshCells(valuesArray){	// функция, для обновления значений в ячейках
	for(var i=0;i<valuesArray.length;i++)
		for(var j=0;j<valuesArray[i].length;j++){				
			var str=Number(i+1)+"."+Number(j+1);			
			if(valuesArray[i][j]==0)
				setNumber(str,"");
			else
				setNumber(str,valuesArray[i][j]);	
			changeColorAndFontSize(str);
		}														
}

function changeColorAndFontSize(name){	//функция, изменяющая дизайн игровых ячеек
	var numb,fontSize;
	switch(getNumber(name)){
		case "2": numb=255; fontSize=8; break;
		case "4": numb=235; fontSize=9;break;
		case "8": numb=215; fontSize=10;break;
		case "16": numb=195;fontSize=11;break;
		case "32": numb=175;fontSize=12;break;
		case "64": numb=155;fontSize=13;break;
		case "128": numb=135;fontSize=14;break;
		case "256": numb=115;fontSize=15;break;
		case "512": numb=95; fontSize=16;break;
		case "1024":numb=75; fontSize=17;break;
		case "2048":numb=55; fontSize=18;break;
		default: numb=0;fontSize=16;break;
	}
	var element=document.getElementsByName(name);
	var newColor="#ff"+numb.toString(16)+numb.toString(16);
	element[0].style.backgroundColor=newColor;
	element[0].style.fontSize=fontSize+"pt";
	element[0].style.boxShadow="0px 0px 20px "+newColor;
}

function canUp(valuesArray){		//проверка, можно ли выполнить сдвиг вверх
	for(var i=0;i<valuesArray.length;i++)				
		for(var j=0;j<valuesArray[i].length-1;j++){	
			var a=valuesArray[j][i],b=valuesArray[j+1][i];
			if( (Number(a)==0 && Number(b)!=0)||  (((Number(a)==Number(b)))&&Number(a)!=0))
				return true;
		}
	return false;
}

function canLeft(valuesArray){		//проверка, можно ли выполнить сдвиг влево
	for(var i=0;i<valuesArray.length;i++)				
		for(var j=0;j<valuesArray[i].length-1;j++){	
			var a=valuesArray[i][j],b=valuesArray[i][j+1];
			if( (Number(a)==0 && Number(b)!=0)||  (((Number(a)==Number(b)))&&Number(a)!=0))
				return true;
		}
	return false;
}

function canRight(valuesArray){		//проверка, можно ли выполнить сдвиг вправо
	for(var i=0;i<valuesArray.length;i++)					
		for(var j=3;j-1>=0;j--){	
			var a=valuesArray[i][j],b=valuesArray[i][j-1];
			if( (Number(a)==0 && Number(b)!=0)||  (((Number(a)==Number(b)))&&Number(a)!=0))
				return true;
		}
	return false;
}

function canDown(valuesArray){		//проверка, можно ли выполнить сдвиг вниз
	for(var i=0;i<valuesArray.length;i++)
		for(var j=3;j-1>=0;j--){	
			var a=valuesArray[j][i],b=valuesArray[j-1][i];
			if( (Number(a)==0 && Number(b)!=0)||  (((Number(a)==Number(b)))&&Number(a)!=0))
				return true;
		}
	return false;
}


function compVert(valuesArray){		//складывание одинаковых значений по вертикали
	for(var i=0;i<valuesArray.length;i++)
		for(var j=0;j<(valuesArray[i].length-1);j++)
			if(valuesArray[j][i]==valuesArray[j+1][i]){
				valuesArray[j][i]*=2;
				valuesArray[j+1][i]=0;
				sum+=Number(valuesArray[j][i]);
				document.getElementsByName("showingSum")[0].value=sum;
			}
}

function compHor(valuesArray){		//складывание одинаковых значений по горизонтали
	for(var i=3;i>=0;i--)
		for(var j=3;(j-1)>=0;j--)
			if(valuesArray[i][j]==valuesArray[i][j-1]){
				valuesArray[i][j]*=2;
				valuesArray[i][j-1]=0;
				sum+=Number(valuesArray[i][j]);
				document.getElementsByName("showingSum")[0].value=sum;
			}	
}
