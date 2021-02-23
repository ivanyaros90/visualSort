var state={
  numbers:[""],
  doms:[""],
  history:[],
  indexes:[],
  pivot:0,
  elements:20,
  tableWidth:400,
  tableHeigth:200,
  elementWidth:20,
  generate: function(){
  let parent= document.getElementById("idParent");
  removeAllChildNodes(parent);
  this.numbers=[];
  this.doms=[];
  this.elementWidth=20;
  let actual=[];
  for(let i=0;i<this.elements;i++){
    let x,y;    
    [x,y]=createValue(i,this.elementWidth);    
    parent.appendChild(y);
    this.numbers.push(x);
    this.doms.push(y);
    actual.push(i);
  }
  this.indexes.push(actual); 
}
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};



function action(arg) {
  document.getElementById('child2').classList.add('child2-2');
  document.getElementById('child1').classList.add('child1-2');
};
function removeAllChildNodes(parent){
  while(parent.firstChild  ){
     parent.removeChild(parent.firstChild);
  }
};
function createValue(pos,width){
   let number= 50+Math.floor(Math.random()*151);
   let valor=document.createElement("div");
   //valor.innerText=number;
   valor.style.width=width+"px";
   valor.style.height=number +"px";
   valor.style.bottom="0px";
   valor.style.left=(width*pos)+"px";
   valor.style.backgroundColor="grey";
   valor.style.border="1px";
   valor.style.borderStyle="solid";
   valor.style.borderColor="black";
   valor.style.position="absolute";
   return [number,valor];
}
function generate(){
  let parent= document.getElementById("idParent");
  removeAllChildNodes(parent);
  state.numbers=[];
  state.doms=[];
  for(let i=0;i<6;i++){
    let x,y;    
    [x,y]=createValue(i);    
    parent.appendChild(y);
    state.numbers.push(x);
    state.doms.push(y);
  }  
}
function buttonSelect(){
  selectionSort(window.state,0,20);
}
function buttonSelect2(){
  bubbleSort(window.state);
}
function show(){
  console.log(window.state.history);
}
async function mergeSort(state,i,j){
  if((j-i)>1){
    let middle=i+Math.floor((j-i)/2);
    await mergeSort(state,i,middle);
    await mergeSort(state,middle,j);
    await merge(state,i,middle,j);
    //console.log(state.numbers);
  }
}
async function merge(state,i,m,j){
  let indexes=[];
  let tempVals=[];
  let tempDoms=[];
  let middle=m;
  let inicio=i;
  let fin=j;
  for(let ind=0;ind<(fin-inicio);ind++){
    if(i>=middle){
      tempVals[ind]=state.numbers[m];
      tempDoms[ind]=state.doms[m++];
      continue;
    }
    if(m>=fin){
      tempVals[ind]=state.numbers[i];
      tempDoms[ind]=state.doms[i++];
      continue;
    }
    if(state.numbers[i]<=state.numbers[m]){
      tempVals[ind]=state.numbers[i];
      tempDoms[ind]=state.doms[i++];
    }else{
      tempVals[ind] = state.numbers[m];
      tempDoms[ind] = state.doms[m++];
    }
  }
  let len=tempVals.length;
  for(let ind=0;ind<len;ind++){
    state.numbers[ind+inicio]=tempVals[ind];
    state.doms[ind+inicio]=tempDoms[ind];
    state.doms[ind+inicio].style.left=(ind+inicio)*state.elementWidth+"px";
    await sleep(100);
  
  }
 // await sleep(100);
}
async function insertionSort(state){
  let len=state.numbers.length;
  for(let i=1;i<len;i++){
    if(state.numbers[i]<state.numbers[i-1]){
      let tempVal=state.numbers[i];
      let tempDom=state.doms[i];
      for(var j=i-1;(j>=0)&&(tempVal<state.numbers[j]);j--){
        state.numbers[j+1]=state.numbers[j];
        
        state.doms[j].style.left=state.elementWidth*(j+1)+"px";
        state.doms[j+1]=state.doms[j];
        await sleep(100);
      }
      tempDom.style.left=(j+1)*state.elementWidth+"px";
      tempDom.style.backgroundColor="green";
      state.numbers[j+1]=tempVal;
      state.doms[j+1]=tempDom;
     
      
    }
  }
}
async function bubbleSort(state){
  let len=state.numbers.length;
  let repeat=false;
  let last=0;
  do{
    
  
    for(let j=1;j<(len-last);j++){
      let i=j-1;
      if(state.numbers[j]<state.numbers[i]){
        repeat=true;
        selectionSwap(state,i,j,state.elementWidth);
        await sleep(50);
      }
    }
    last++;
    
  }while(repeat);
  
}
async function selectionSort(state){
  let len=state.numbers.length;
  
  for(let i=0;i<len-1;i++){
    min_index=i;
    for(let j=i+1;j<len;j++){
      if(state.numbers[j]<state.numbers[min_index]) min_index=j;
    }
    state=selectionSwap(state,i,min_index,state.elementWidth);
    state.history.push(state.numbers);
    //await sleep(1000);
    
  }
  //console.log(state);
}
function selectionSwap(state,i,j,width){
  let temp= state.numbers[i];
  state.numbers[i]=state.numbers[j];
  state.numbers[j]=temp;
  state.doms[i].style.left=(j*width)+"px";
  state.doms[j].style.left=(i*width)+"px";
  state.doms[j].style.backgroundColor="green";
  temp=state.doms[i];
  state.doms[i]=state.doms[j];
  state.doms[j]=temp;
  let index=state.indexes[state.indexes.length-1];
  
  return state;
}
window.document.onload=state.generate();