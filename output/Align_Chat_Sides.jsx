/* Align visible alpha edges; preserve Y and offset all X keyframes. */
(function () {
    var c = app.project.activeItem;
    if (!(c instanceof CompItem)) { alert('Open the message layout composition first.'); return; }
    var ls = [], sel = c.selectedLayers, i, j;
    for (i=0;i<sel.length;i++) if(sel[i].source instanceof CompItem) ls.push(sel[i]);
    if(ls.length<2) {
        ls=[];
        for(i=1;i<=c.numLayers;i++) if(c.layer(i).source instanceof CompItem && /^\s*\d+\s*\//.test(c.layer(i).name)) ls.push(c.layer(i));
    }
    if(ls.length<2){alert('Select the message precomp layers first.');return;}
    ls.sort(function(a,b){return parseInt(a.name,10)-parseInt(b.name,10);});
    var t=c.time, end=c.duration;
    function props(l){var p=l.transform.position;return p.dimensionsSeparated?[p.getSeparationFollower(0),p.getSeparationFollower(1)]:[p];}
    for(i=0;i<ls.length;i++) {
        var l=ls[i], pp=props(l);
        if(l.locked||l.parent||l.threeDLayer||!/CaptainX|Business/i.test(l.name)) {
            alert('Unsupported layer: '+l.name+'\nUse unparented 2D CaptainX / Business message layers.');return;
        }
        for(j=0;j<pp.length;j++){
            if(pp[j].expressionEnabled){alert('Position expression found: '+l.name);return;}
            if(pp[j].numKeys)t=Math.max(t,pp[j].keyTime(pp[j].numKeys));
        }
        t=Math.max(t,l.inPoint);end=Math.min(end,l.outPoint);
    }
    if(t>=end){alert('No common settled frame. Select a smaller group.');return;}
    for(i=0;i<ls.length;i++)if(Math.abs(ls[i].transform.rotation.valueAtTime(t,false))>0.001){alert('Rotation must be zero: '+ls[i].name);return;}
    app.beginUndoGroup('Align chat sides');
    var probe=null, data=[], left=null, right=null, moved=0;
    try {
        for(i=0;i<ls.length;i++) {
            l=ls[i];
            probe=l.property('ADBE Effect Parade').addProperty('ADBE Point Control');
            probe.name='__CHAT_X_BOUNDS_TEMP__';
            var p=probe.property(1);
            p.expression='var T='+t.toFixed(8)+';var W=thisLayer.width,H=thisLayer.height,a=-1,b=-1;\n'+
                'function hit(x,r){return thisLayer.sampleImage([x,H/2],[r,H/2],false,T)[3]>0.0001;}\n'+
                'for(var x=0;x<W;x+=8){if(hit(Math.min(x+4,W-0.5),4)){a=x;break;}}\n'+
                'for(var x=W;x>0;x-=8){if(hit(Math.max(x-4,0.5),4)){b=x;break;}}\n'+
                'var result=[-999999,-999999];if(a>=0&&b>=0){\n'+
                'var lo=Math.max(0,a-8),hi=Math.min(W,a+16);for(var x=lo;x<hi;x++){if(hit(x+0.5,0.5)){a=x;break;}}\n'+
                'lo=Math.max(0,b-16);hi=Math.min(W,b+8);for(var x=hi-1;x>=lo;x--){if(hit(x+0.5,0.5)){b=x+1;break;}}\n'+
                'var A=thisLayer.toComp([a,H/2],T)[0],B=thisLayer.toComp([b,H/2],T)[0];result=[Math.min(A,B),Math.max(A,B)];}result;';
            var v=p.valueAtTime(t,false),err=p.expressionError;
            probe.remove();probe=null;
            if(err||v[0]===-999999||!isFinite(v[0])||v[1]<=v[0])throw Error('Cannot measure '+l.name+' '+err);
            var isLeft=/CaptainX/i.test(l.name);
            data.push({layer:l,edge:isLeft?v[0]:v[1],left:isLeft});
            if(isLeft&&left===null)left=v[0];
            if(!isLeft&&right===null)right=v[1];
        }
        var result=prompt('Left edge for CaptainX (composition pixels):',left===null?'26':String(Math.round(left)));
        var rx=result===null?null:prompt('Right edge for Business (composition pixels):',right===null?String(c.width-26):String(Math.round(right)));
        if(result!==null&&rx!==null){
            left=Number(result);right=Number(rx);
            if(!isFinite(left)||!isFinite(right)||left>=right)throw Error('Enter valid edges: left must be smaller than right.');
            for(i=0;i<data.length;i++){
                var d=data[i],delta=(d.left?left:right)-d.edge;
                pp=props(d.layer);p=pp[0];
                if(p.numKeys){for(j=1;j<=p.numKeys;j++){v=p.keyValue(j);if(pp.length===2)v+=delta;else v[0]+=delta;p.setValueAtKey(j,v);}}
                else{v=p.value;if(pp.length===2)v+=delta;else v[0]+=delta;p.setValue(v);}
                moved++;
            }
            c.time=t;
            alert('Aligned '+moved+' messages.\nCaptainX: left edge; Business: right edge.\nY unchanged. Preview before saving. Undo once to restore.');
        }
    }catch(e){if(probe)try{probe.remove();}catch(_){}alert('Stopped: '+e.toString()+'\nIf layers moved, Undo once to restore.');}
    finally{app.endUndoGroup();}
})();
