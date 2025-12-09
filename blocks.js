// Définit les blocs Roblox personnalisés
Blockly.defineBlocksWithJsonArray([
  {
    "type": "roblox_print",
    "message0": "print %1",
    "args0": [{"type":"input_value","name":"TXT"}],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230
  },
  {
    "type": "roblox_wait",
    "message0": "wait %1 secondes",
    "args0": [{"type":"input_value","name":"TIME","check":"Number"}],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230
  },
  {
    "type": "roblox_instance_new",
    "message0": "Instance.new %1 nom %2 parent %3",
    "args0": [
      {"type":"field_input","name":"TYPE","text":"Part"},
      {"type":"field_input","name":"NAME","text":"MyPart"},
      {"type":"input_value","name":"PARENT"}
    ],
    "output": null,
    "colour": 160
  },
  {
    "type": "roblox_set_property",
    "message0": "définir %1.%2 = %3",
    "args0": [
      {"type":"input_value","name":"OBJ"},
      {"type":"field_input","name":"PROP","text":"Position"},
      {"type":"input_value","name":"VAL"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160
  },
  {
    "type": "roblox_find_service",
    "message0": "game:GetService('%1')",
    "args0": [{"type":"field_input","name":"SERVICE","text":"Workspace"}],
    "output": null,
    "colour": 20
  },
  {
    "type": "roblox_fire_event",
    "message0": "RemoteEvent %1:FireServer %2",
    "args0": [
      {"type":"input_value","name":"EVENT"},
      {"type":"input_value","name":"DATA"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 0
  }
]);
