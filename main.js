var state={
  numbers:[""],
  doms:[""],
  original:[],
  history:[],
  indexes:[],
  pivot:0,
  elements:20,
  tableWidth:400,
  tableHeigth:200,
  elementWidth:20,
  run: async function(){
    let elem1=this.doms[0];
    let elem2=this.doms[19];
    elem1.style.transition="left 2s";
    elem2.style.transition="left 2s";
    elem1.style.left="380px";
    elem2.style.left="0px";

  },
  calculateValues:function(ind,original){
    let res=[];
    ind.forEach(element => {
      res.push(original[element]);     
    });
    console.log(res);
    return res;
  },
  showButtons:function(){
    let parent=document.getElementById("steps");
    removeAllChildNodes(parent);
    let i=0;
    this.indexes.forEach(step => {
      let s=document.createElement("li");
      s.id="step"+i;
      s.innerText="Step " +i++;
      s.onclick=function(){
        
        let id=parseInt(this.id.substr(4));
        window.state.step(id);
        

      };
      parent.appendChild(s);

      
    });


  },
  renderStatic:function(values){
    let parent= document.getElementById("idParent");
    removeAllChildNodes(parent);
    let i=0;
    values.forEach(element=>{
      [,y]=createValue(i++,this.elementWidth,element);
      parent.appendChild(y);
    })

  },
  step:function(id=0){
    if(typeof this.indexes[id] === 'undefined') {
      alert("step no existe"+id);
    }else{
      let now= this.indexes[id].slice();
      let values=this.calculateValues(now,this.original);
      this.renderStatic(values);



    }
  }, 
  generate: function(){
    let parent= document.getElementById("idParent");
    removeAllChildNodes(parent);
    this.numbers=[];
    this.doms=[];
    this.elementWidth=20;
    let actual=[];
    this.indexes=[];
    for(let i=0;i<this.elements;i++){
      let x,y;    
      [x,y]=createValue(i,this.elementWidth);    
      parent.appendChild(y);
      this.numbers.push(x);
      this.doms.push(y);
      actual.push(i);
    }
    this.original=this.numbers.slice();
    this.indexes.push(actual); 
  },
  selectionSort: function(){
    let len=this.numbers.length;  
    for(let i=0;i<len-1;i++){
      min_index=i;
      for(let j=i+1;j<len;j++){
        if(this.numbers[j]<this.numbers[min_index]) min_index=j;
      }
      this.selectionSwap(i,min_index,this.elementWidth);
      let index=this.indexes[this.indexes.length-1].slice();
      let t=index[i];
      index[i]=index[min_index];
      index[min_index]=t;
      this.indexes.push(index);
      this.history.push(this.numbers);
      
      
    }

  },
  selectionSwap:function(i,j,width){
    let temp= this.numbers[i];
    this.numbers[i]=this.numbers[j];
    this.numbers[j]=temp;
    this.doms[i].style.left=(j*width)+"px";
    this.doms[j].style.left=(i*width)+"px";
    this.doms[j].style.backgroundColor="green";
    temp=this.doms[i];
    this.doms[i]=this.doms[j];
    this.doms[j]=temp;
    let index=this.indexes[this.indexes.length-1];    
    
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
function createValue(pos,width,val=""){
   let number=val;
   if(val===""){
   number= 50+Math.floor(Math.random()*151);
   }
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

function buttonSelect(){
  window.state.selectionSort();
}
function buttonSelect2(){
  bubbleSort(window.state);
}
function show(){
  console.log(window.state.indexes);
  window.state.showButtons();
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
function selectionSort(state){
  let len=state.numbers.length;
  
  for(let i=0;i<len-1;i++){
    min_index=i;
    for(let j=i+1;j<len;j++){
      if(state.numbers[j]<state.numbers[min_index]) min_index=j;
    }
    state=selectionSwap(state,i,min_index,state.elementWidth);
    let index=state.indexes[state.indexes.length-1].slice();
    let t=index[i];
    index[i]=index[min_index];
    index[min_index]=t;
    state.indexes.push(index);
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