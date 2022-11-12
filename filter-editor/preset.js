/***
 * Functions that burn and load presets on the filter pedal itself
 ***/

/**
 * Burns the current settings of the filter pedal to a preset at the given index.
 * @param presetIndex a value from 0-127
 */
function burnPreset(presetIndex) {
  console.log(`setting preset at index ${presetIndex}`);

  if (navigator.requestMIDIAccess) {navigator.requestMIDIAccess({ sysex: true })
    .then((access) => {
      const output = access.outputs.values().next().value;

      output.open();

      // Bytes are annotated below, corresponding to the syntax given by SourceAudio. 
      // Bytes that need to be set are marked *, the rest should not be changed
      //     Start  ------ID------   --Command-- ---presetIndex*-- --If Name-- -End-
      msg = [0xf0, 0x00, 0x01, 0x6c, 0x00, 0x6e, 0x00, presetIndex, 0x00, 0x00, 0xf7];

      output.send(msg);
    })
  }
}

/**
 * Loads the filter pedal settings of the preset at the given index.
 * @param presetIndex a value from 0-127
 */
function loadPreset(presetIndex) {
  console.log(`loading preset hi from index ${presetIndex}}`);

  if (navigator.requestMIDIAccess) {navigator.requestMIDIAccess({ sysex: true })
    .then((access) => {
      const output = access.outputs.values().next().value;

      output.open();

      // Bytes are annotated below, corresponding to the syntax given above. 
      // Bytes that need to be set are marked *, the rest should not be changed
      //     Start  ------ID------   --Command-- ---presetIndex--- -End-
      msg = [0xf0, 0x00, 0x01, 0x6c, 0x00, 0x77, 0x00, presetIndex, 0xf7];

      output.send(msg);
    })
  }
}