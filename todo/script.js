const _0x15d0=['getItem','keyup','status','stop','catch','appendChild','toString','.record','data','then','target','checkbox','filter','keyCode','stringify','trim','src','querySelector','buttons','arrayBuffer','removeChild','audio','push','task\x20checked','setItem','input','controls','createTextNode','add','length','fas\x20fa-trash-alt','return\x20/\x22\x20+\x20this\x20+\x20\x22/','^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}','parse','fromCharCode','span','map','log','Started','addEventListener','classList','remove','data:audio/ogg;base64;,','test','checked','constructor','.add','dataavailable','querySelectorAll','recording','tasks','value','text','click','type','apply','createElement','parentElement','start','toggle','task'];(function(_0x56628a,_0x15d0db){const _0x3b865c=function(_0x1e36c4){while(--_0x1e36c4){_0x56628a['push'](_0x56628a['shift']());}},_0x1a947b=function(){const _0x2bf022={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0xd9add2,_0x3c9a7f,_0x1aea18,_0x210ebb){_0x210ebb=_0x210ebb||{};let _0x2ca1c7=_0x3c9a7f+'='+_0x1aea18,_0x290480=0x0;for(let _0x37dc60=0x0,_0x43061b=_0xd9add2['length'];_0x37dc60<_0x43061b;_0x37dc60++){const _0x271ca1=_0xd9add2[_0x37dc60];_0x2ca1c7+=';\x20'+_0x271ca1;const _0x4377e4=_0xd9add2[_0x271ca1];_0xd9add2['push'](_0x4377e4),_0x43061b=_0xd9add2['length'],_0x4377e4!==!![]&&(_0x2ca1c7+='='+_0x4377e4);}_0x210ebb['cookie']=_0x2ca1c7;},'removeCookie':function(){return'dev';},'getCookie':function(_0x151dd0,_0x2ac50c){_0x151dd0=_0x151dd0||function(_0x1eba27){return _0x1eba27;};const _0xc50aad=_0x151dd0(new RegExp('(?:^|;\x20)'+_0x2ac50c['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)')),_0x10d915=function(_0x110413,_0x4554ad){_0x110413(++_0x4554ad);};return _0x10d915(_0x3b865c,_0x15d0db),_0xc50aad?decodeURIComponent(_0xc50aad[0x1]):undefined;}},_0x31c2d3=function(){const _0x58ef0f=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x58ef0f['test'](_0x2bf022['removeCookie']['toString']());};_0x2bf022['updateCookie']=_0x31c2d3;let _0x7f27cb='';const _0x1fc071=_0x2bf022['updateCookie']();if(!_0x1fc071)_0x2bf022['setCookie'](['*'],'counter',0x1);else _0x1fc071?_0x7f27cb=_0x2bf022['getCookie'](null,'counter'):_0x2bf022['removeCookie']();};_0x1a947b();}(_0x15d0,0x1cf));const _0x3b86=function(_0x56628a,_0x15d0db){_0x56628a=_0x56628a-0x0;let _0x3b865c=_0x15d0[_0x56628a];return _0x3b865c;};const _0x1aea18=function(){let _0x8d5971=!![];return function(_0x416628,_0x4aa9d1){const _0x20f1db=_0x8d5971?function(){if(_0x4aa9d1){const _0x2ba8a1=_0x4aa9d1[_0x3b86('0x13')](_0x416628,arguments);return _0x4aa9d1=null,_0x2ba8a1;}}:function(){};return _0x8d5971=![],_0x20f1db;};}(),_0x3c9a7f=_0x1aea18(this,function(){const _0x20fd90=function(){const _0xe665ef=_0x20fd90[_0x3b86('0x9')](_0x3b86('0x38'))()[_0x3b86('0x9')](_0x3b86('0x39'));return!_0xe665ef[_0x3b86('0x7')](_0x3c9a7f);};return _0x20fd90();});_0x3c9a7f();var add=document[_0x3b86('0x2a')](_0x3b86('0xa')),input=document[_0x3b86('0x2a')](_0x3b86('0x32')),ul=document[_0x3b86('0x2a')]('ul'),stored_tasks=localStorage[_0x3b86('0x19')](_0x3b86('0xe')),recording_button=document[_0x3b86('0x2a')](_0x3b86('0x20')),li;add['addEventListener'](_0x3b86('0x11'),addTask),input['addEventListener'](_0x3b86('0x1a'),_0x4ab9eb=>{_0x4ab9eb[_0x3b86('0x26')]==0xd&&(_0x4ab9eb['preventDefault'](),add[_0x3b86('0x11')]());}),recording_button[_0x3b86('0x3')](_0x3b86('0x11'),()=>{recording_button[_0x3b86('0x4')][_0x3b86('0x35')](_0x3b86('0xd')),startRecording();});function startRecording(){navigator['mediaDevices']['getUserMedia']({'audio':!![]})[_0x3b86('0x22')](_0x2e0cdb=>{const _0x4dcfd5=new MediaRecorder(_0x2e0cdb);_0x4dcfd5[_0x3b86('0x16')](),console[_0x3b86('0x1')](_0x3b86('0x2'));let _0x4e851b=[];_0x4dcfd5[_0x3b86('0x3')](_0x3b86('0xb'),_0x320499=>{_0x4e851b[_0x3b86('0x2f')](_0x320499[_0x3b86('0x21')]);}),_0x4dcfd5[_0x3b86('0x3')](_0x3b86('0x1c'),()=>{let _0x15d5a7=new Blob(_0x4e851b);_0x15d5a7[_0x3b86('0x2c')]()[_0x3b86('0x22')](_0x2f77be=>{base64=btoa(String[_0x3b86('0x3b')](...new Uint8Array(_0x2f77be))),recording_button[_0x3b86('0x4')][_0x3b86('0x5')](_0x3b86('0xd')),addTask({'task':base64[_0x3b86('0x1f')]()},!![],'audio');});}),setTimeout(()=>{_0x4dcfd5[_0x3b86('0x1c')]();},0xfa0);})[_0x3b86('0x1d')](_0x16a513=>{alert(_0x16a513);});}window['onload']=()=>{stored_tasks==null||stored_tasks==[]?(stored_tasks=[],localStorage[_0x3b86('0x31')](_0x3b86('0xe'),JSON[_0x3b86('0x27')]([]))):(stored_tasks=JSON[_0x3b86('0x3a')](stored_tasks),stored_tasks[_0x3b86('0x0')](_0x40f73a=>addTask(_0x40f73a,![],_0x40f73a[_0x3b86('0x12')])));};function addTask(_0x28b031=undefined,_0x12c069=!![],_0x3c7813=_0x3b86('0x10')){let _0x33587e=document[_0x3b86('0x14')]('li'),_0x41c2f4,_0x5d5185=input[_0x3b86('0xf')][_0x3b86('0x28')](),_0x5c89a1={'task':undefined,'status':undefined,'type':_0x3c7813};if(_0x12c069==![]){if(_0x3c7813==_0x3b86('0x10'))_0x41c2f4=document[_0x3b86('0x34')](_0x28b031[_0x3b86('0x18')]);else{if(_0x3c7813==_0x3b86('0x2e'))_0x41c2f4=document[_0x3b86('0x14')](_0x3b86('0x2e')),_0x41c2f4[_0x3b86('0x33')]=!![],_0x41c2f4['src']=_0x3b86('0x6')+_0x28b031[_0x3b86('0x18')];else return;}}else{if(_0x3c7813==_0x3b86('0x10')&&_0x5d5185[_0x3b86('0x36')]>0x0)_0x41c2f4=document['createTextNode'](_0x5d5185),_0x5c89a1[_0x3b86('0x18')]=_0x5d5185;else{if(_0x3c7813==_0x3b86('0x2e'))_0x5c89a1[_0x3b86('0x18')]=_0x28b031[_0x3b86('0x18')],_0x41c2f4=document[_0x3b86('0x14')](_0x3b86('0x2e')),_0x41c2f4['controls']=!![],_0x41c2f4[_0x3b86('0x29')]=_0x3b86('0x6')+_0x28b031[_0x3b86('0x18')];else return;}}var _0x71940=document[_0x3b86('0x14')](_0x3b86('0x3c'));_0x71940['classList']=_0x3b86('0x2b');let _0x588ba1=document[_0x3b86('0x14')]('input');_0x588ba1[_0x3b86('0x4')]=_0x3b86('0x1b'),_0x588ba1[_0x3b86('0x12')]=_0x3b86('0x24'),_0x588ba1[_0x3b86('0x3')](_0x3b86('0x11'),onStatusChanged);_0x28b031[_0x3b86('0x1b')]!=undefined?_0x588ba1['checked']=_0x28b031[_0x3b86('0x1b')]:(_0x12c069=!![],_0x588ba1[_0x3b86('0x8')]=![],_0x5c89a1[_0x3b86('0x1b')]=![]);let _0x37af80=document[_0x3b86('0x14')]('i');_0x37af80[_0x3b86('0x4')]=_0x3b86('0x37'),_0x37af80[_0x3b86('0x3')](_0x3b86('0x11'),onDelete);_0x12c069&&(_0x5c89a1['id']=stored_tasks['length'],stored_tasks['push'](_0x5c89a1),localStorage[_0x3b86('0x31')](_0x3b86('0xe'),JSON[_0x3b86('0x27')](stored_tasks)));_0x71940[_0x3b86('0x1e')](_0x588ba1),_0x71940[_0x3b86('0x1e')](_0x37af80),_0x33587e[_0x3b86('0x1e')](_0x41c2f4),_0x33587e['appendChild'](_0x71940);if(_0x28b031[_0x3b86('0x1b')])_0x33587e[_0x3b86('0x4')]=_0x3b86('0x30');else _0x33587e[_0x3b86('0x4')]='task';if(_0x12c069)_0x33587e['id']=''+_0x5c89a1['id'];else _0x33587e['id']=''+_0x28b031['id'];console[_0x3b86('0x1')](_0x33587e),ul[_0x3b86('0x1e')](_0x33587e),input['value']='';}function get_li(_0x270554){return _0x270554[_0x3b86('0x23')][_0x3b86('0x15')][_0x3b86('0x15')];}function onStatusChanged(_0x2edc0f){let _0x2e0743=get_li(_0x2edc0f);_0x2e0743[_0x3b86('0x4')][_0x3b86('0x17')](_0x3b86('0x8')),stored_tasks[_0x2e0743['id']][_0x3b86('0x1b')]=!stored_tasks[_0x2e0743['id']]['status'],localStorage[_0x3b86('0x31')](_0x3b86('0xe'),JSON[_0x3b86('0x27')](stored_tasks));}function updateID(){for(let _0x13c79b=0x0;_0x13c79b<stored_tasks[_0x3b86('0x36')];_0x13c79b++){stored_tasks[_0x13c79b]['id']=_0x13c79b;}li=document[_0x3b86('0xc')]('li');for(let _0x2646a8=0x0;_0x2646a8<li['length'];_0x2646a8++){li[_0x2646a8]['id']=''+_0x2646a8;}localStorage[_0x3b86('0x31')](_0x3b86('0xe'),JSON[_0x3b86('0x27')](stored_tasks));}function onDelete(_0x234934){let _0x57609e=get_li(_0x234934);ul[_0x3b86('0x2d')](_0x57609e),stored_tasks=stored_tasks[_0x3b86('0x25')](_0x590b22=>_0x590b22['id']!=_0x57609e['id']),updateID();}