#target aftereffects
// Select Footage comps in Project panel, then run this script.
(function () {
    if (!app.project) { alert('Open an After Effects project first.'); return; }
    function natural(a, b) {
        var aa = a.toLowerCase().match(/\d+|\D+/g) || [];
        var bb = b.toLowerCase().match(/\d+|\D+/g) || [];
        for (var i = 0; i < Math.min(aa.length, bb.length); i++) {
            if (aa[i] === bb[i]) continue;
            if (/^\d+$/.test(aa[i]) && /^\d+$/.test(bb[i])) {
                var diff = parseInt(aa[i], 10) - parseInt(bb[i], 10);
                if (diff) return diff;
            } else return aa[i] < bb[i] ? -1 : 1;
        }
        return aa.length - bb.length;
    }
    var comps = [], selection = app.project.selection;
    for (var i = 0; i < selection.length; i++) {
        if (selection[i] instanceof CompItem) comps.push(selection[i]);
    }
    if (!comps.length) { alert('Select the destination Footage comps in the Project panel first.'); return; }
    comps.sort(function (a, b) { return natural(a.name, b.name) || a.id - b.id; });
    var folder = Folder.selectDialog('Choose the folder containing your photos');
    if (!folder) return;
    var files = folder.getFiles(function (f) {
        return f instanceof File && /\.(jpg|jpeg|png|tif|tiff|bmp)$/i.test(f.name);
    });
    files.sort(function (a, b) { return natural(decodeURI(a.name), decodeURI(b.name)); });
    if (!files.length) { alert('No supported photos found in this folder.'); return; }
    if (files.length < comps.length) {
        alert('Not enough photos: ' + files.length + ' photos / ' + comps.length + ' comps. No changes made.'); return;
    }
    var ui = new Window('dialog', 'Batch Add Photos');
    ui.orientation = 'column'; ui.alignChildren = 'fill';
    ui.add('statictext', undefined, comps.length + ' comps / ' + files.length + ' photos');
    ui.add('statictext', undefined, 'Comps and photos are sorted by name (1, 2, ... 10).');
    var fit = ui.add('dropdownlist', undefined, ['Fill frame (crop edges)', 'Fit inside (keep entire photo)']); fit.selection = 0;
    var hide = ui.add('checkbox', undefined, 'Hide text placeholders named MEDIA / PHOTO / IMAGE'); hide.value = true;
    var preview = [];
    for (i = 0; i < comps.length; i++) preview.push(comps[i].name + '  <-  ' + decodeURI(files[i].name));
    var list = ui.add('edittext', undefined, preview.join('\n'), {multiline: true, readonly: true, scrolling: true});
    list.preferredSize = [580, 260];
    var buttons = ui.add('group'); buttons.alignment = 'right';
    buttons.add('button', undefined, 'Cancel', {name: 'cancel'});
    buttons.add('button', undefined, 'Add photos', {name: 'ok'});
    if (ui.show() !== 1) return;
    var done = 0, errors = [];
    app.beginUndoGroup('Batch Add Photos');
    try {
        var importedFolder = app.project.items.addFolder('Batch Photos - ' + folder.name);
        for (i = 0; i < comps.length; i++) {
            var layer = null;
            try {
                var options = new ImportOptions(files[i]); options.sequence = false;
                options.importAs = ImportAsType.FOOTAGE;
                var footage = app.project.importFile(options); footage.parentFolder = importedFolder;
                var comp = comps[i];
                layer = comp.layers.add(footage, comp.duration);
                layer.name = 'BATCH PHOTO - ' + decodeURI(files[i].name);
                layer.startTime = 0; layer.inPoint = 0; layer.outPoint = comp.duration;
                var transform = layer.property('ADBE Transform Group');
                transform.property('ADBE Anchor Point').setValue([footage.width / 2, footage.height / 2]);
                transform.property('ADBE Position').setValue([comp.width / 2, comp.height / 2]);
                var sx = comp.width * comp.pixelAspect / (footage.width * footage.pixelAspect);
                var sy = comp.height / footage.height;
                var scale = (fit.selection.index === 0 ? Math.max(sx, sy) : Math.min(sx, sy)) * 100;
                transform.property('ADBE Scale').setValue([scale, scale]);
                // Hide only old layers made by this script and named text placeholders.
                for (var j = 2; j <= comp.numLayers; j++) {
                    var old = comp.layer(j);
                    if (/^BATCH PHOTO - /.test(old.name) ||
                        (hide.value && old instanceof TextLayer && /^(MEDIA|PHOTO|IMAGE)([\s_\-]*\d+)?$/i.test(old.name))) {
                        old.enabled = false;
                    }
                }
                done++;
            } catch (error) {
                if (layer) { try { layer.remove(); } catch (ignored) {} }
                errors.push(comps[i].name + ': ' + error.toString());
            }
        }
    } finally { app.endUndoGroup(); }
    alert('Added photos to ' + done + ' / ' + comps.length + ' comps.' +
        (files.length > comps.length ? '\nUnused photos: ' + (files.length - comps.length) : '') +
        (errors.length ? '\n\nErrors:\n' + errors.join('\n') : '') + '\n\nUndo: Ctrl+Z');
})();
