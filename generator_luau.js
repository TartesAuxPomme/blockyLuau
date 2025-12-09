// Création du générateur Lua s'il n'existe pas
if (!Blockly.Lua) {
  Blockly.Lua = new Blockly.Generator('Lua');
}

// Ordres basiques (inspirés par les générateurs Blockly)
Blockly.Lua.ORDER_ATOMIC = 0;
Blockly.Lua.ORDER_NONE = 99;

// helper: valueToCode wrapper
// (on peut réutiliser Blockly.Lua.valueToCode une fois que la classe est créée)

Blockly.Lua['roblox_print'] = function(block) {
  var txt = Blockly.Lua.valueToCode(block, 'TXT', Blockly.Lua.ORDER_NONE) || '""';
  return 'print(' + txt + ')\n';
};

Blockly.Lua['roblox_wait'] = function(block) {
  var t = Blockly.Lua.valueToCode(block, 'TIME', Blockly.Lua.ORDER_NONE) || '1';
  return 'task.wait(' + t + ')\n';
};

Blockly.Lua['roblox_instance_new'] = function(block) {
  var typeName = block.getFieldValue('TYPE') || 'Part';
  var name = block.getFieldValue('NAME') || 'NewInstance';
  var parent = Blockly.Lua.valueToCode(block, 'PARENT', Blockly.Lua.ORDER_NONE) || 'workspace';
  var varName = Blockly.Lua.nameDB_ ? Blockly.Lua.nameDB_.getDistinctName('inst', Blockly.Variables.NAME_TYPE) : 'inst';
  var code = varName + ' = Instance.new("' + typeName.replace(/"/g, '\\"') + '")\n';
  code += varName + '.Name = "' + name.replace(/"/g, '\\"') + '"\n';
  code += varName + '.Parent = ' + parent + '\n';
  return [varName, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Lua['roblox_set_property'] = function(block) {
  var obj = Blockly.Lua.valueToCode(block, 'OBJ', Blockly.Lua.ORDER_NONE) || 'nil';
  var prop = block.getFieldValue('PROP') || 'Property';
  var val = Blockly.Lua.valueToCode(block, 'VAL', Blockly.Lua.ORDER_NONE) || 'nil';
  return obj + '.' + prop + ' = ' + val + '\n';
};

Blockly.Lua['roblox_find_service'] = function(block) {
  var svc = block.getFieldValue('SERVICE') || 'Workspace';
  var code = 'game:GetService("' + svc.replace(/"/g, '\\"') + '")';
  return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Lua['roblox_fire_event'] = function(block) {
  var ev = Blockly.Lua.valueToCode(block, 'EVENT', Blockly.Lua.ORDER_NONE) || 'nil';
  var data = Blockly.Lua.valueToCode(block, 'DATA', Blockly.Lua.ORDER_NONE) || '';
  return ev + ':FireServer(' + (data ? data : '') + ')\n';
};

// Fournir une fonction workspaceToCode similaire à celle de Blockly
Blockly.Lua.workspaceToCode = function(workspace) {
  var topBlocks = workspace.getTopBlocks(true);
  var code = '';
  for (var i = 0; i < topBlocks.length; i++) {
    var line = Blockly.Lua.blockToCode(topBlocks[i]);
    if (Array.isArray(line)) line = line[0];
    if (line) code += line;
  }
  return code;
};

// Réutilise Blockly.Generator.blockToCode pour générer
if (!Blockly.Lua.blockToCode) {
  Blockly.Lua.blockToCode = function(block) {
    var func = Blockly.Lua[block.type];
    if (typeof func === 'function') {
      return func(block);
    }
    return '';
  };
}
