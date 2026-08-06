import { altRollStress, insertEngheckButton, stressCheckMultipleOnes } from "./stress.js";
import { altRollStructure, structCheckMultipleOnes, insertHullCheckButton, insertSecondaryRollButton } from "./structure.js";

Hooks.once("lancer.registerFlows", (flowSteps, flows) => {
  // Capture originals before overwriting so NPC actors can delegate back to them.
  // If Ilysen's NPC rebake module loaded first, these will be Ilysen's functions.
  const orig = {
    rollStructureTable: flowSteps.get("rollStructureTable"),
    checkStructureMultipleOnes: flowSteps.get("checkStructureMultipleOnes"),
    structureInsertHullCheckButton: flowSteps.get("structureInsertHullCheckButton"),
    structureInsertSecondaryRollButton: flowSteps.get("structureInsertSecondaryRollButton"),
    rollOverheatTable: flowSteps.get("rollOverheatTable"),
    checkOverheatMultipleOnes: flowSteps.get("checkOverheatMultipleOnes"),
    overheatInsertEngCheckButton: flowSteps.get("overheatInsertEngCheckButton"),
  };

  // Wraps a PC-only function: NPCs are routed to the original step instead.
  const pcOnly = (customFn, origFn) => (state) => {
    if (state.actor.is_npc()) return origFn ? origFn(state) : true;
    return customFn(state);
  };

  //Structure flow steps
  flowSteps.set("rollStructureTable", pcOnly(altRollStructure, orig.rollStructureTable));
  flowSteps.set("checkStructureMultipleOnes", pcOnly(structCheckMultipleOnes, orig.checkStructureMultipleOnes));
  flowSteps.set("structureInsertHullCheckButton", pcOnly(insertHullCheckButton, orig.structureInsertHullCheckButton));
  flowSteps.set("structureInsertSecondaryRollButton", pcOnly(insertSecondaryRollButton, orig.structureInsertSecondaryRollButton));
  //Stress flow steps
  flowSteps.set("rollOverheatTable", pcOnly(altRollStress, orig.rollOverheatTable));
  flowSteps.set("checkOverheatMultipleOnes", pcOnly(stressCheckMultipleOnes, orig.checkOverheatMultipleOnes));
  flowSteps.set("overheatInsertEngCheckButton", pcOnly(insertEngheckButton, orig.overheatInsertEngCheckButton));
});
