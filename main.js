let btn = document.querySelector('.btn');
let ref = document.querySelector('.ref');
let nam = document.querySelector('.nam');
// let tb = document.querySelector('.tb')
let fil = document.querySelector('#file');

let mode = 'create';
let tmp; 
let tm;

let data ;
if(localStorage.localprod != null){
    data = JSON.parse(localStorage.localprod);
}
else{
    let data = [];         
}

file.addEventListener('change',()=>{
  let reader = new FileReader();
  
  
  reader.addEventListener('load',()=>{
    const url = reader.result;
    tm = url;
  })
  
  reader.readAsDataURL(file.files[0]);
})

btn.addEventListener('click', ()=> {
    let obj = {
        tm : tm,
        ref : ref.value,
        nam : nam.value
    }
    
    
    if(mode === 'create'){
      data.push(obj);
      localStorage.setItem('localprod', JSON.stringify(data));
      
    }
    else{
      data[tmp] = obj;
      mode = 'create';
      btn.innerHTML='Create';
    }
    cler();
    showdata();
    console.log(obj);
    
})

function cler(){
    ref.value = '';
    nam.value = '';
} 

function showdata(){
    let table = '';
    for(let i=0; i<data.length; i++ ){
     table += `
     <tr>
       <td>
       <a href='${data[i].tm}'>
          <img id='image' src='${data[i].tm}'>
       </a>
       </td>
       <td> ${data[i].ref} </td>
       <td> ${data[i].nam}</td> 
       <td id='del'onclick='delet(${ i })'> delete</td> 
       <td id='up' onclick=update(${ i })> update</td> 
    </tr>`;
   
    }
    document.querySelector('.tb').innerHTML = table;
}
showdata();
function delet(i){
    data.splice(i,1);
    localStorage.localprod = JSON.stringify(data);showdata();
}



function update(i) {
  ref.value = data[i].ref;
  nam.value = data[i].nam;
  mode = 'update';
  btn.innerHTML='update';
  tmp = i;
  
  showdata();
}

