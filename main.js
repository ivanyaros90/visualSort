var state={
  numbers:[""],
  doms:[""],
  pivot:0,
  elements:20,
  tableWidth:800,
  tableHeigth:400,

};
state.generate= ()=>{
  let parent= document.getElementById("idParent");
  removeAllChildNodes(parent);
  this
  this.state.numbers=[];
  this.state.doms=[];
  for(let i=0;i<6;i++){
    let x,y;    
    [x,y]=createValue(i);    
    parent.appendChild(y);
    this.state.numbers.push(x);
    this.state.doms.push(y);
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



function action(arg) {
  document.getElementById('child2').classList.add('child2-2');
  document.getElementById('child1').classList.add('child1-2');
}
function removeAllChildNodes(parent){
  while(parent.firstChild  ){
     parent.removeChild(parent.firstChild);
  }
}
function createValue(pos=0){
   let number= Math.floor(Math.random()*101);
   let valor=document.createElement("div");
   //valor.innerText=number;
   valor.style.width="50px";
   valor.style.height=number +"px";
   valor.style.bottom="0px";
   valor.style.left=(50*pos)+"px";
   valor.style.backgroundColor="grey";
   valor.style.border="2px";
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
  selectionSort(window.state);
}
async function selectionSort(state){
  let len=state.numbers.length;
  
  for(let i=0;i<len-1;i++){
    min_index=i;
    for(let j=i+1;j<len;j++){
      if(state.numbers[j]<state.numbers[min_index]) min_index=j;
    }
    state=selectionSwap(state,i,min_index);
    await sleep(1000);
    
  }
  //console.log(state);
}
function selectionSwap(state,i,j){
  let temp= state.numbers[i];
  state.numbers[i]=state.numbers[j];
  state.numbers[j]=temp;
  state.doms[i].style.left=j*50+"px";
  state.doms[j].style.left=i*50+"px";
  state.doms[j].style.backgroundColor="green";
  temp=state.doms[i];
  state.doms[i]=state.doms[j];
  state.doms[j]=temp;


  return state;
}
window.document.onload=state.generate();