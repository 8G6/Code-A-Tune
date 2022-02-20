

id=(ID)=>{return document.getElementById(ID)}

hide  = (ele) => {id(ele).style.display='none'}

show  = (ele) => {id(ele).style.display=null}


setEnd=(ele)=>  {
    var range,selection;
    if(document.createRange){
        range = document.createRange();
        range.selectNodeContents(ele);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
    else if(document.selection){ 
        range = document.body.createTextRange();
        range.moveToElementText(ele);
        range.collapse(false);
        range.select();
    }

}

sss = (sheet)=> {
                console.log(sheet)
                document.getElementById("style").setAttribute("href", sheet);  
            }

line_c=1

heigh=()=>{
    let code = id('code')
    let text = code.innerText
    code.innerHTML=`<pre><code class="javascript">${text}</code></pre>`
 
}

document.addEventListener("keyup", (e)=>{
    
    if(e.keyCode==13){
        heigh()
        id('code').querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
        line_c++
        id("number").innerHTML += `<br><span style="top:${22+line_c}px;position:relative;">${line_c}</span>`
    }
    if(e.keyCode==8 || e.keyCode==46){
        id("number").innerHTML = id('number').innerHTML.replace(`<br><span style="top:${22+line_c}px;position:relative;">${line_c}</span>`,'')
        line_c -= line_c>=2 ? 1 : 0
    }
    
})
