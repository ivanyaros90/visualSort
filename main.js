console.log('Hello World!');

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
   
   let valor=document.createElement("div");
   valor.style.width="50px";
   valor.style.height= Math.floor(Math.random()*101 ) +"px";
   valor.style.bottom="0px";
   valor.style.left=(50*pos)+"px";
   valor.style.backgroundColor="grey";
   valor.style.position="absolute";
   return valor;
}
function generate(){
  let parent= document.getElementById("idParent");
  removeAllChildNodes(parent);
  for(let i=0;i<6;i++){
    parent.appendChild(createValue(i));
  }
  
  
}