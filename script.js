var todoItem=[];
var meetingItem=[];

var strToObje = localStorage.getItem('todo');
var APIData = JSON.parse(strToObje);
if(APIData != null){
    for(var i=0;i<APIData.length;i++){
        let str1="taskCheckBox"+i;
        let str2 ="taskLabel"+i;
        // console.log(str1+str2);
        var ul = document.getElementById("listItemsContainer");
        var li = document.createElement("li");
        li.setAttribute("class","addedItem");
        var input= document.createElement("input");
        input.type = 'checkbox';
        input.setAttribute("class","checkBox");
        input.setAttribute('onchange','handleChange(this);')
        input.setAttribute("id",str1);
        var label = document.createElement("label" );
        label.setAttribute("class","textBox");
        label.setAttribute("id",str2);
        li.appendChild(input);
        li.appendChild(label);
        var item = document.createTextNode(APIData[i].title);
        label.appendChild(item);
        ul.appendChild(li);
    }
}
var inputTextItem = document.getElementById("inputTextBox");
inputTextItem.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("addingTaskButton").click();
  }
});
var i=0;
var k=0;
function addItem(){
    if(inputTextItem.value != ""){
        if(k==0 && APIData!=undefined){
            for(var j=0;j<APIData.length;j++){
                var obj1={
                    title:APIData[j].title,
                }
                todoItem.push(obj1);
            }
            k++;
            i=j;
        }
        let str1="taskCheckBox"+i;
        let str2 ="taskLabel"+i;
        // console.log(str1+str2);
        var ul = document.getElementById("listItemsContainer");
        var li = document.createElement("li");
        li.setAttribute("class","addedItem");
        var input= document.createElement("input");
        input.type = 'checkbox';
        input.setAttribute("class","checkBox");
        input.setAttribute('onchange','handleChange(this);')
        input.setAttribute("id",str1);
        var label = document.createElement("label");
        label.setAttribute("class","textBox");
        label.setAttribute("id",str2);
        li.appendChild(input);
        li.appendChild(label);
        var item = document.createTextNode(inputTextItem.value);
        label.appendChild(item);
        ul.appendChild(li);
        document.getElementById("inputTextBox").value='';
        // console.log(document.getElementById(str2));
        i++;
        var obj={
            title:document.getElementById(str2).innerHTML,
        }
        todoItem.push(obj);
        var objToStr =JSON.stringify(todoItem);
        localStorage.setItem('todo',objToStr);
    }
}   
document.getElementById("inputTextBox").addEventListener("input",(inputed)=>{
    if((inputed.target.value)!=''){
        document.getElementById("addingTaskButton").setAttribute("style","display: inline;");
    }    
    else{
        document.getElementById("addingTaskButton").setAttribute("style","display: none;");
    }
});
var isShow=false;
function meetingMenu(){
    if(isShow){
        document.getElementById("forDisplay").setAttribute("style","display: none;");
        isShow=false;
    }
    else{
        document.getElementById("forDisplay").setAttribute("style","display: inline;");
        isShow=true;
    }
}
var arr=[];
function handleChange(checkbox) {
    let str = checkbox.id;
    str=str.charAt(str.length-1);
    arr.push(parseInt(str));
    str="taskLabel"+str;
    if(checkbox.checked == true){
        document.getElementById(str).setAttribute("style"," text-decoration: line-through;text-decoration-color:#F06292;");
        var newArr=[];
        for(var i=0;i<APIData.length;i++){
            if(arr.includes(i)==false){
                newArr.push(APIData[i]);
            }
        }
        while(document.getElementById("taskLabel"+i)){
            if(arr.includes(i)==false){
                var obj={
                    title:document.getElementById("taskLabel"+i).innerHTML,
                }
                newArr.push(obj);
            }
            i++;
        }
        var objToStr =JSON.stringify(newArr);
        localStorage.setItem('todo',objToStr);
    }
    else{
        document.getElementById(str).setAttribute("style"," text-decoration: none;");
        // var newArr=[];
        // for(var i=0;i<APIData.length;i++){
        //     if(arr.includes(i)==true){
        //         console.log(APIData[i]);
        //     }
        // }
    }        
}
function butifyNo(no){
    let ch;
    if(no<10){
        ch=" "
    }
    else{
        ch=""
    }
    return ch
}
var meetingInputTextItem = document.getElementsByClassName("meetingTextBox");
var meetingRemainNo = 1;
function meetingAddButton(){
    if(document.getElementById("taskLabel"+meetingRemainNo).value !=""){
        console.log(document.getElementById("taskLabel"+meetingRemainNo).value)
        let ch = butifyNo(meetingRemainNo);
        document.getElementById("meetingRemainNo").value=ch+meetingRemainNo;
        let str1="taskCheckBox"+meetingRemainNo;
        let str2 ="taskLabel"+meetingRemainNo;
        // console.log(str1+str2);
        var ul = document.getElementById("meetingListItemContainer");
        var li = document.createElement("li");
        li.setAttribute("class","meetingListItem");
        var input= document.createElement("input");
        input.type = 'checkbox';
        input.setAttribute("class","meetingItemCheckBox");
        input.setAttribute('onchange','handleChange(this);')
        input.setAttribute("id",str1);
        var label = document.createElement("input");
        label.type = 'text';
        label.placeholder ="Add Task...."
        label.setAttribute("class","meetingTextBox");
        label.setAttribute("id",str2);
        li.appendChild(input);
        li.appendChild(label);
        ul.appendChild(li);
        meetingRemainNo++;
    }
}
var meetingDoneNo = 0;
function meetingDoneButton(){
    if(meetingRemainNo>0){
        meetingDoneNo++;
        meetingRemainNo= meetingRemainNo - 1;
        let ch = butifyNo(meetingRemainNo);
        let ch1 =butifyNo(meetingDoneNo);
        document.getElementById("meetingDoneNo").value=ch1+meetingDoneNo;
        document.getElementById("meetingRemainNo").value=ch+meetingRemainNo;
    }
}