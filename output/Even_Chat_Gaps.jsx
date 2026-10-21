/* Run in the message-layout composition. No project is saved automatically. */
(function () {
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) { alert('Open the MESSAGES KEYFRAMES composition first.'); return; }
    var selected = comp.selectedLayers, layers = [], i;
    for (i = 0; i < selected.length; i++) {
        if (selected[i].source instanceof CompItem) layers.push(selected[i]);
    }
    if (layers.length < 2) {
        layers = [];
        for (i = 1; i <= comp.numLayers; i++) {
            var candidate = comp.layer(i);
            if (candidate.source instanceof CompItem && /^\s*\d+\s*\//.test(candidate.name)) layers.push(candidate);
        }
    }
    if (layers.length < 2) { alert('Select at least two message precomp layers and run again.'); return; }
    var answer = prompt('Gap between messages, in composition pixels:', '30');
    if (answer === null) return;
    var gap = Number(answer);
    if (!isFinite(gap) || gap < 0) { alert('Enter a number of zero or greater.'); return; }
    function ordinal(layer) {
        var m = /^\s*(\d+)\s*\//.exec(layer.name);
        return m ? Number(m[1]) : 100000 - layer.index;
    }
    layers.sort(function (a, b) { return ordinal(a) - ordinal(b); });
    function positionProps(layer) {
        var p = layer.property('ADBE Transform Group').property('ADBE Position');
        return p.dimensionsSeparated ? [p.getSeparationFollower(0), p.getSeparationFollower(1)] : [p];
    }
    // Measure the settled state of every message at one common time.
    var t = comp.time, latestIn = 0, earliestOut = comp.duration;
    for (i = 0; i < layers.length; i++) {
        var l = layers[i];
        if (l.locked || l.parent !== null || l.threeDLayer) {
            alert('Cannot process locked, parented or 3D layer: ' + l.name + '\nNo positions changed.'); return;
        }
        var ps = positionProps(l);
        for (var j = 0; j < ps.length; j++) {
            if (ps[j].expressionEnabled) { alert('Position has an expression: ' + l.name + '\nNo positions changed.'); return; }
            if (ps[j].numKeys) t = Math.max(t, ps[j].keyTime(ps[j].numKeys));
        }
        var tr = l.property('ADBE Transform Group');
        if (Math.abs(tr.property('ADBE Rotate Z').valueAtTime(t, false)) > 0.001) {
            alert('Rotation must be zero: ' + l.name); return;
        }
        latestIn = Math.max(latestIn, l.inPoint);
        earliestOut = Math.min(earliestOut, l.outPoint);
    }
    t = Math.max(t, latestIn);
    if (t >= earliestOut) { alert('The layers do not share a settled visible frame. Select a smaller group.'); return; }
    if (!confirm('Arrange ' + layers.length + ' messages with ' + gap + ' px gaps?\nFirst: ' + layers[0].name + '\nLast: ' + layers[layers.length - 1].name + '\nX positions stay unchanged. Undo once to restore.')) return;
    app.beginUndoGroup('Even chat gaps');
    var probe = null, bounds = [], moved = 0;
    try {
        // sampleImage scans alpha rather than using the transparent precomp rectangle.
        for (i = 0; i < layers.length; i++) {
            l = layers[i];
            probe = l.property('ADBE Effect Parade').addProperty('ADBE Point Control');
            probe.name = '__CHAT_BOUNDS_TEMP__';
            var control = probe.property(1);
            control.expression =
                'var T=' + t.toFixed(8) + ';\n' +
                'var W=thisLayer.width,H=thisLayer.height,step=8,top=-1,bot=-1;\n' +
                'function hit(y,r){return thisLayer.sampleImage([W/2,y],[W/2,r],false,T)[3]>0.0001;}\n' +
                'for(var y=0;y<H;y+=step){if(hit(Math.min(y+step/2,H-0.5),step/2)){top=y;break;}}\n' +
                'for(var y=H;y>0;y-=step){if(hit(Math.max(y-step/2,0.5),step/2)){bot=y;break;}}\n' +
                'var result=[-999999,-999999];\n' +
                'if(top>=0&&bot>=0){\n' +
                'var a=Math.max(0,top-step),b=Math.min(H,top+step*2);\n' +
                'for(var y=a;y<b;y++){if(hit(y+0.5,0.5)){top=y;break;}}\n' +
                'a=Math.max(0,bot-step*2);b=Math.min(H,bot+step);\n' +
                'for(var y=b-1;y>=a;y--){if(hit(y+0.5,0.5)){bot=y+1;break;}}\n' +
                'var A=thisLayer.toComp([W/2,top],T)[1],B=thisLayer.toComp([W/2,bot],T)[1];\n' +
                'result=[Math.min(A,B),Math.max(A,B)];}\nresult;';
            var pair = control.valueAtTime(t, false);
            var expressionError = control.expressionError;
            probe.remove(); probe = null;
            if (expressionError || pair[0] === -999999 || !isFinite(pair[0]) || pair[1] <= pair[0]) {
                throw new Error('Cannot measure visible content: ' + l.name + '\n' + expressionError);
            }
            bounds.push([pair[0], pair[1]]);
        }
        // All measurements finish before any Position property is changed.
        var bottom = bounds[0][1];
        for (i = 1; i < layers.length; i++) {
            var delta = bottom + gap - bounds[i][0];
            ps = positionProps(layers[i]);
            var p = ps.length === 2 ? ps[1] : ps[0];
            if (p.numKeys) {
                for (var k = 1; k <= p.numKeys; k++) {
                    var v = p.keyValue(k);
                    if (ps.length === 2) v += delta; else v[1] += delta;
                    p.setValueAtKey(k, v);
                }
            } else {
                v = p.value;
                if (ps.length === 2) v += delta; else v[1] += delta;
                p.setValue(v);
            }
            moved++;
            bottom = bounds[i][1] + delta;
        }
        comp.time = t;
        alert('Done. Moved ' + moved + ' messages.\nGap: ' + gap + ' px. X positions unchanged.\nPreview the full chat and scrolling before saving.\nUndo once if needed.');
    } catch (e) {
        if (probe !== null) { try { probe.remove(); } catch (_) {} }
        alert('Stopped: ' + e.toString() + '\nIf any messages moved, Undo once to restore.');
    } finally { app.endUndoGroup(); }
})();
